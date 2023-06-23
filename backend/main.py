from datetime import time
import pywhatkit as pw
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import xml.etree.ElementTree as ET
import pandas as pd
import tempfile
import csv
import chardet

app = Flask(__name__)
CORS(app)

current_file = None  # Variable global para almacenar el archivo actual

def read_csv_data(file):
    # Detectar la codificación del archivo CSV
    raw_data = file.read()
    encoding = chardet.detect(raw_data)['encoding']

    # Decodificar y leer el archivo CSV
    decoded_data = raw_data.decode(encoding)
    csv_reader = csv.reader(decoded_data.splitlines(), delimiter=',')

    # Obtener los datos y las columnas del archivo CSV
    data = list(csv_reader)
    columns = data[0]

    return data[1:], columns


def read_xml_data(file):
    # Leer y analizar el archivo XML
    tree = ET.parse(file)
    root = tree.getroot()

    # Obtener los elementos de datos y las etiquetas
    data = []
    columns = []
    for child in root:
        if not columns:
            columns = list(child.attrib.keys())
        data.append(list(child.attrib.values()))

    return data, columns


def read_excel_data(file):
    # Leer el archivo de Excel
    excel_data = pd.read_excel(file)

    # Obtener los datos y las columnas del archivo de Excel
    data = excel_data.values.tolist()
    columns = excel_data.columns.tolist()

    return data, columns


def sendmsj(number, message, columns):
    # Verificar si el número y el mensaje son válidos
    if not number or not message:
        return

    # Enviar el mensaje a través de WhatsApp usando pywhatkit
    pw.sendwhatmsg(number, message, time.now().hour, time.now().minute + 1)


@app.route('/mostrar_datos', methods=['POST'])
def mostrar_datos():
    global current_file  # Acceder a la variable global

    if 'file' not in request.files:
        return jsonify({'error': 'No se ha subido ningún archivo'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No se ha seleccionado ningún archivo'})

    if file:
        filename = file.filename
        if filename.endswith('.csv'):
            try:
                data, columns = read_csv_data(file)
                current_file = tempfile.NamedTemporaryFile(delete=False)
                file.save(current_file.name)
                return jsonify({'message': 'Archivo subido exitosamente', 'columns': columns})
            except Exception as e:
                return jsonify({'error': 'Error al procesar el archivo CSV', 'details': str(e)})
        elif filename.endswith('.xml'):
            try:
                data, columns = read_xml_data(file)
                current_file = tempfile.NamedTemporaryFile(delete=False)
                file.save(current_file.name)
                return jsonify({'message': 'Archivo subido exitosamente', 'columns': columns})
            except Exception as e:
                return jsonify({'error': 'Error al procesar el archivo XML', 'details': str(e)})
        elif filename.endswith('.xlsx'):
            try:
                data, columns = read_excel_data(file)
                current_file = tempfile.NamedTemporaryFile(delete=False)
                file.save(current_file.name)
                return jsonify({'message': 'Archivo subido exitosamente', 'columns': columns})
            except Exception as e:
                return jsonify({'error': 'Error al procesar el archivo de Excel', 'details': str(e)})
        else:
            return jsonify({'error': 'Formato de archivo inválido'})

    return jsonify({'error': 'No se ha subido ningún archivo'})


@app.route('/enviar_mensaje', methods=['POST'])
@cross_origin(origin='http://localhost:63342', headers=['Content-Type'], methods=['POST'])
def enviar_mensajes():
    global current_file  # Acceder a la variable global

    if current_file is None:
        return jsonify({'error': 'No hay un archivo en caché'})

    if 'data' not in request.json:
        return jsonify({'error': 'No se han proporcionado datos para enviar mensajes'})

    data = request.json['data']

    if data:
        number_column = 'NUMERO'  # Nombre fijo de la columna para el número de teléfono
        message_column = data.get('message_column')

        if not message_column:
            return jsonify({'error': 'La columna de mensaje es requerida'})

        try:
            if current_file.name.endswith('.csv'):
                csv_data, csv_columns = read_csv_data(current_file.name)
                send_messages_from_data(csv_data, csv_columns, number_column, message_column)
            elif current_file.name.endswith('.xml'):
                xml_data, xml_columns = read_xml_data(current_file.name)
                send_messages_from_data(xml_data, xml_columns, number_column, message_column)
            elif current_file.name.endswith('.xlsx'):
                excel_data, excel_columns = read_excel_data(current_file.name)
                send_messages_from_data(excel_data, excel_columns, number_column, message_column)
            else:
                return jsonify({'error': 'Formato de archivo inválido'})

            current_file.close()
            current_file = None

            return jsonify({'message': 'Mensajes enviados exitosamente'})
        except Exception as e:
            return jsonify({'error': 'Error al procesar el archivo', 'details': str(e)})

    return jsonify({'error': 'No se han proporcionado datos para enviar mensajes'})


def send_messages_from_data(data, columns, number_column, message_column):
    number_index = columns.index(number_column)
    message_index = columns.index(message_column)

    for row in data:
        number = row[number_index]
        message = row[message_index]
        sendmsj(number, message, columns)


if __name__ == '__main__':
    app.run()





# @app.after_request
# def add_cors_headers(response):
#     response.headers['Access-Control-Allow-Origin'] = 'http://localhost:63342'
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
#     response.headers['Access-Control-Allow-Methods'] = 'POST'
#     return response