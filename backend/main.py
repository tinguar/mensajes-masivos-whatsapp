import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
import pywhatkit as pw
import pyautogui as pa
import time
from tkinter import *
import tempfile
import io

app = Flask(__name__)
CORS(app)


# Función para leer los datos del archivo y guardarlos en caché
def get_data(file):
    # Cargar archivo en memoria
    data = None
    if file.filename.endswith('.csv'):
        # Si es un archivo CSV
        data = pd.read_csv(file, encoding='utf-8')
    elif file.filename.endswith('.xlsx') or file.filename.endswith('.xls'):
        # Si es un archivo Excel
        data = pd.read_excel(file, encoding='utf-8')
    return data


# Ruta para obtener los datos del archivo
@app.route('/', methods=['POST'])
def index():
    file = request.files['file']
    data = get_data(file)
    print(data)
    if data is None:
        return jsonify({'error': 'Formato de archivo no válido'})

    # Leer la columna 'NUMERO'
    numeros = data['NUMERO']
    print(numeros)

    # Enviar mensajes de WhatsApp
    for numero in numeros:
        sendmsj(str(numero))
        print(sendmsj(str(numero)))

    return jsonify({'success': True, 'message': 'Mensajes enviados correctamente'})


# Función para enviar mensajes de WhatsApp
def sendmsj(Number):
    win = Tk()
    screen_width = win.winfo_screenwidth()
    screen_height= win.winfo_screenheight()
    mensaje = "¡Este es un mensaje de prueba!"
    numero = "+" + Number  # Agregar el código de país al número
    pw.sendwhatmsg_instantly(numero, mensaje)
    pa.moveTo(screen_width * 0.694, screen_height * 0.90)
    pa.click()
    pa.press('enter')
    time.sleep(2)
    pa.hotkey('ctrl', 'w')


if __name__ == '__main__':
    app.run()
