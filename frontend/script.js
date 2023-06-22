function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:5000/upload', true);
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        showMessage(response);
    };
    xhr.send(formData);
}

function showMessage(response) {
    var messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = '';

    if (response.error) {
        var errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = 'Error: ' + response.error;
        messageContainer.appendChild(errorDiv);
    } else {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = response.message;
        messageContainer.appendChild(messageDiv);

        if (response.data) {
            var dataDiv = document.createElement('div');
            dataDiv.textContent = 'Data: ' + JSON.stringify(response.data);
            messageContainer.appendChild(dataDiv);
        }
    }
}
