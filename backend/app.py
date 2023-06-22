from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

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
            try:
                df = pd.read_csv(file)
                data = df.to_dict()
                return jsonify({'message': 'File uploaded successfully', 'data': data})
            except Exception as e:
                return jsonify({'error': 'Error processing CSV file', 'details': str(e)})
        elif filename.endswith('.xml'):
            # Aquí puedes agregar el código para procesar el archivo XML si es necesario
            return jsonify({'error': 'XML file format not supported'})
        else:
            return jsonify({'error': 'Invalid file format'})

    return jsonify({'error': 'No file uploaded'})

if __name__ == '__main__':
    app.run()