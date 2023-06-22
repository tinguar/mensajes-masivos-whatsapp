from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Habilitar CORS en la aplicación Flask


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})

    if file:
        filename = file.filename
        if filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif filename.endswith('.xml'):
            df = pd.read_xml(file)
        else:
            return jsonify({'error': 'Invalid file format'})

        # Aquí puedes realizar cualquier procesamiento o manipulación de los datos

        return jsonify({'message': 'File uploaded successfully'})
    else:
        return jsonify({'error': 'No file uploaded'})


if __name__ == '__main__':
    app.run()
