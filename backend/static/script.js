document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('upload-form');
  const tableContainer = document.getElementById('table-container');
  const columnaSeleccionada = document.getElementById('columna-seleccionada');
  const cuadroTextoPersonalizado = document.getElementById('cuadro-texto-personalizado');
  const enviarMensajeBtn = document.getElementById('enviar-mensaje-btn');

  let currentFile = '';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
      showError('No se ha seleccionado ningún archivo');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:5000/mostrar_datos', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          showError(data.error);
        } else if (data.columns) {
          currentFile = file.name; // Almacena el nombre del archivo en la variable currentFile
          populateColumnSelect(data.columns);
        } else {
          showError('Ha ocurrido un error');
        }
        // Limpiar el mensaje de error después de recibir una respuesta
        clearError();
      })
      .catch(error => {
        showError('Ha ocurrido un error');
        console.error(error);
      });
  });

  columnaSeleccionada.addEventListener('change', () => {
    const selectedColumn = columnaSeleccionada.value;
    cuadroTextoPersonalizado.value = cuadroTextoPersonalizado.value.trim() + (cuadroTextoPersonalizado.value ? ' ' : '') + `[${selectedColumn}]`;
  });

  enviarMensajeBtn.addEventListener('click', () => {
    const mensajePersonalizado = cuadroTextoPersonalizado.value;

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
      showError('No se ha seleccionado ningún archivo');
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result;
      parseFileContents(file.name, contents, mensajePersonalizado, file);
    };

    reader.readAsText(file);
  });

  function parseFileContents(filename, contents, mensajePersonalizado, file) {
    if (filename.endsWith('.csv')) {
      const rows = contents.split('\n');
      rows.forEach(row => {
        const data = row.split(',');
        const number = data[0].trim();
        const message = mensajePersonalizado.replace('[selectedColumn]', data[1]);
        sendMensaje(number, message);
      });
    } else if (filename.endsWith('.xml')) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(contents, 'text/xml');
      const rows = xmlDoc.getElementsByTagName('*');
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const number = row.getAttribute('number').trim();
        const message = mensajePersonalizado.replace('[selectedColumn]', row.getAttribute('message'));
        sendMensaje(number, message);
      }
    } else if (filename.endsWith('.xlsx')) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const contents = e.target.result;
        const workbook = XLSX.read(contents, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        jsonData.forEach(row => {
          const number = row[0].trim();
          const message = mensajePersonalizado.replace('[selectedColumn]', row[1]);
          sendMensaje(number, message);
        });
      };

      reader.readAsBinaryString(file);
    }
  }

  function populateColumnSelect(columns) {
    columnaSeleccionada.innerHTML = '<option value="">Seleccione una columna</option>';
    columns.forEach(column => {
      const option = document.createElement('option');
      option.value = column;
      option.textContent = column;
      columnaSeleccionada.appendChild(option);
    });
  }

  function showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.id = 'error-message';
    errorMessage.textContent = message;

    const existingErrorMessage = document.getElementById('error-message');
    if (existingErrorMessage) {
      existingErrorMessage.replaceWith(errorMessage);
    } else {
      form.appendChild(errorMessage);
    }
  }

  function clearError() {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function sendMensaje(number, message) {
    // Realizar la solicitud HTTP a tu API para enviar el mensaje
    fetch('http://127.0.0.1:5000/enviar_mensaje', {
      method: 'POST',
      body: JSON.stringify({ number, message }),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors' // Agrega esta línea para especificar que se permita CORS

    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta de la API
        console.log(data);
      })
      .catch(error => {
        showError('Ha ocurrido un error');
        console.error(error);
      });
  }
});
