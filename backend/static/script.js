document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const tableContainer = document.getElementById('table-container');
    const columnaSeleccionada = document.getElementById('columna-seleccionada');
    const cuadroTextoPersonalizado = document.getElementById('cuadro-texto-personalizado');
    const enviarMensajeBtn = document.getElementById('enviar-mensaje-btn');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('file-input');
        const file = fileInput.files[0];

        if (!file) {
            showError('No file selected');
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
                populateColumnSelect(data.columns);
            } else {
                showError('An error occurred');
            }
            // Clear the error message after receiving a response
            clearError();
        })
        .catch(error => {
            showError('An error occurred');
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
            showError('No file selected');
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e) {
            const contents = e.target.result;
            parseFileContents(file.name, contents, mensajePersonalizado, file);
        };

        reader.readAsText(file);
    });

    function parseFileContents(filename, contents, mensajePersonalizado, file) {
        if (filename.endsWith('.csv')) {
            const rows = contents.split('\n');
            rows.forEach(row => {
                console.log(mensajePersonalizado);
            });
        } else if (filename.endsWith('.xml')) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(contents, 'text/xml');
            const rows = xmlDoc.getElementsByTagName('*');
            for (let i = 0; i < rows.length; i++) {
                console.log(mensajePersonalizado);
            }
        } else if (filename.endsWith('.xlsx')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const contents = e.target.result;
                const workbook = XLSX.read(contents, { type: 'binary' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                jsonData.forEach(row => {
                    console.log(mensajePersonalizado);
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
});
