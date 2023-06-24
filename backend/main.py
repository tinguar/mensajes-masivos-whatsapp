import pandas as pd
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import pywhatkit as pw
import pyautogui as pa
import time
from tkinter import *
import tempfile
import os

app = Flask(__name__)
CORS(app)

# Directorio temporal para guardar los archivos
TEMP_DIR = tempfile.gettempdir()
cached_data = None  # Variable global para almacenar los datos en caché
columnas_principales = []  # Variable global para almacenar los nombres de las columnas principales

# Ruta para cargar el archivo
@app.route('/cargar-archivo', methods=['POST'])
def cargar_archivo():
    file = request.files['file']
    data = get_data(file)
    if data is None:
        return jsonify({'error': 'Formato de archivo no válido'})

    global cached_data
    global columnas_principales
    cached_data = data
    columnas_principales = data.columns.tolist()

    return jsonify({'success': True, 'message': 'Archivo cargado correctamente'})

# Ruta para enviar los mensajes
@app.route('/enviar-mensajes', methods=['POST'])
def enviar_mensajes():
    if cached_data is None:
        return jsonify({'error': 'No se ha cargado ningún archivo'})

    numeros = cached_data['NUMERO']
    mensaje_personalizado = request.form['mensaje']

    # Iterar sobre los datos de cada columna
    for index, row in cached_data.iterrows():
        mensaje = mensaje_personalizado  # Reiniciar el mensaje personalizado para cada fila

        # Reemplazar los marcadores de columna en el mensaje personalizado
        for col in columnas_principales:
            marcador = f"[{col}]"
            if marcador in mensaje:
                valor_celda = row[col]
                mensaje = mensaje.replace(marcador, str(valor_celda))

        numero = str(row['NUMERO'])  # Obtener el número de teléfono de la columna 'NUMERO'
        sendmsj(numero, mensaje)  # Enviar mensaje de WhatsApp

    return jsonify({'success': True, 'message': 'Mensajes enviados correctamente'})

# Ruta para obtener los nombres de las columnas principales
@app.route('/nombres-columnas', methods=['GET'])
def nombres_columnas():
    if cached_data is None:
        return jsonify({'error': 'No se ha cargado ningún archivo'})

    return jsonify({'columnas_principales': columnas_principales})


# Función para leer los datos del archivo y guardarlos en caché
def get_data(file):
    # Guardar archivo en el directorio temporal
    temp_file_path = os.path.join(TEMP_DIR, file.filename)
    file.save(temp_file_path)

    # Cargar archivo en memoria
    data = None
    if file.filename.endswith('.csv'):
        # Si es un archivo CSV
        data = pd.read_csv(temp_file_path, encoding='utf-8')
    elif file.filename.endswith('.xlsx') or file.filename.endswith('.xls'):
        # Si es un archivo Excel
        data = pd.read_excel(temp_file_path)

    return data


# Función para enviar mensajes de WhatsApp
def sendmsj(Number, mensaje):
    win = Tk()
    screen_width = win.winfo_screenwidth()
    screen_height= win.winfo_screenheight()
    numero = "+" + Number  # Agregar el código de país al número
    pw.sendwhatmsg_instantly(numero, mensaje)
    pa.moveTo(screen_width * 0.694, screen_height * 0.90)
    pa.click()
    pa.press('enter')
    time.sleep(2)
    pa.hotkey('ctrl', 'w')


if __name__ == '__main__':
    app.run()

