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
    const fileContent = e.target.result;

    const requestData = {
      file: fileContent,
      data: { message_column: columnaSeleccionada.value },
    };

    fetch('http://127.0.0.1:5000/enviar_mensaje', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          showError(data.error);
        } else {
          showMessage('Mensajes enviados exitosamente');
        }
      })
      .catch(error => {
        showError('Ha ocurrido un error');
        console.error(error);
      });
  };

  reader.readAsText(file);
});







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

  function showMessage(message) {
    const successMessage = document.createElement('p');
    successMessage.id = 'success-message';
    successMessage.textContent = message;

    const existingSuccessMessage = document.getElementById('success-message');
    if (existingSuccessMessage) {
      existingSuccessMessage.replaceWith(successMessage);
    } else {
      form.appendChild(successMessage);
    }
  }
});
