from flask import Flask, request, jsonify
# dsd s


from flask_cors import CORS
import csv
import chardet
import xml.etree.ElementTree as ET
import pandas as pd

app = Flask(__name__)
CORS(app)


@app.route('/mostrar_datos', methods=['POST'])
def mostrar_datos():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})

    if file:
        filename = file.filename
        if filename.endswith('.csv'):
            try:
                data, columns = read_csv_data(file)
                return jsonify({'message': 'File uploaded successfully', 'columns': columns})
            except Exception as e:
                return jsonify({'error': 'Error processing CSV file', 'details': str(e)})
        elif filename.endswith('.xml'):
            try:
                data, columns = read_xml_data(file)
                return jsonify({'message': 'File uploaded successfully', 'columns': columns})
            except Exception as e:
                return jsonify({'error': 'Error processing XML file', 'details': str(e)})
        elif filename.endswith('.xlsx'):
            try:
                data, columns = read_excel_data(file)
                return jsonify({'message': 'File uploaded successfully', 'columns': columns})
            except Exception as e:
                return jsonify({'error': 'Error processing Excel file', 'details': str(e)})
        else:
            return jsonify({'error': 'Invalid file format'})

    return jsonify({'error': 'No file uploaded'})


def read_csv_data(file):
    data = []
    raw_data = file.read()
    encoding = chardet.detect(raw_data)['encoding']
    file.seek(0)  # Vuelve al principio del archivo
    reader = csv.reader(file, delimiter=',')

    try:
        decoded_data = raw_data.decode(encoding)
        reader = csv.reader(decoded_data.splitlines(), delimiter=',')

        for row in reader:
            row_without_spaces = [cell.strip() for cell in row]
            data.append(row_without_spaces)

        columns = data[0]
        data = data[1:]  # Eliminar la fila de nombres de columna de los datos

    except UnicodeDecodeError:
        file.seek(0)  # Vuelve al principio del archivo
        reader = csv.reader(file, delimiter=';')

        for row in reader:
            row_without_spaces = [cell.strip() for cell in row]
            data.append(row_without_spaces)

        columns = data[0]
        data = data[1:]  # Eliminar la fila de nombres de columna de los datos

    return data, columns


def read_xml_data(file):
    data = []
    tree = ET.parse(file)
    root = tree.getroot()

    columns = [element.tag.strip() for element in root[0]]
    data.append(columns)  # Agregar los nombres de columna a los datos

    for child in root:
        row = [element.text.strip() for element in child]
        data.append(row)

    return data, columns


def read_excel_data(file):
    data = []
    df = pd.read_excel(file)

    columns = df.columns.tolist()
    data.append(columns)  # Agregar los nombres de columna a los datos

    for _, row in df.iterrows():
        data.append([str(cell).strip() for cell in row])

    return data, columns


if __name__ == '__main__':
    app.run()