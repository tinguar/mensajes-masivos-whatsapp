$(document).ready(function() {
  $("#upload-form").submit(function(e) {
    e.preventDefault();
    var fileInput = $("#file-input")[0];
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("file", file);

    $.ajax({
      url: "http://localhost:5000/cargar-archivo",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
        console.log(response);
        obtenerNombresColumnas(); // Retrieve column names after successful file upload
        $("#message-container").show();
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  $("#send-messages").click(function(e) {
    e.preventDefault();
    var mensajePersonalizado = $("#mensaje-input").val(); // Obtener el mensaje personalizado del campo de texto

    $.ajax({
      url: "http://localhost:5000/enviar-mensajes",
      type: "POST",
      data: { mensaje: mensajePersonalizado }, // Enviar el mensaje personalizado en la solicitud
      success: function(response) {
        console.log(response);
        alert("Mensajes enviados correctamente");
      },
      error: function(error) {
        console.log(error);
        alert("Error al enviar los mensajes");
      }
    });
  });

  $("#select-column-numero").click(function(e) {
    e.preventDefault();
    var columnaSeleccionada = $("#columna-select").val();

    $.ajax({
      url: "http://localhost:5000/numero-columna",
      type: "POST",
      data: { columna: columnaSeleccionada }, // Enviar la columna seleccionada en la solicitud
      success: function(response) {
        console.log(response);
        alert("Columna de número seleccionada correctamente");
      },
      error: function(error) {
        console.log(error);
        alert("Error al seleccionar la columna de número");
      }
    });
  });

  $("#select-column-mensaje").click(function(e) {
    e.preventDefault();
    var columnaSeleccionada = $("#columna-mensaje-select").val();

    // Insertar el marcador de columna en la posición actual del cursor en el campo de texto del mensaje
    var mensajeInput = $("#mensaje-input")[0];
    var mensajeActual = mensajeInput.value;
    var cursorPos = mensajeInput.selectionStart;
    var nuevoMensaje = mensajeActual.slice(0, cursorPos) + " [" + columnaSeleccionada + "]" + mensajeActual.slice(cursorPos);
    $("#mensaje-input").val(nuevoMensaje);

    // Restaurar la posición del cursor después de insertar el nombre de la columna
    var nuevaCursorPos = cursorPos + columnaSeleccionada.length + 3; // 3 es la longitud de los caracteres adicionales ([ y ])
    mensajeInput.setSelectionRange(nuevaCursorPos, nuevaCursorPos);
  });

  function obtenerNombresColumnas() {
    $.ajax({
      url: "http://localhost:5000/nombres-columnas",
      type: "GET",
      dataType: "json",
      success: function(response) {
        if (response.columnas_principales && response.columnas_principales.length > 0) {
          var columnas = response.columnas_principales;
          var columnasHTML = "";

          for (var i = 0; i < columnas.length; i++) {
            columnasHTML += "<option value='" +columnas[i]+ "'>" +columnas[i]+ "</option>";
          }

          $("#columna-select").html(columnasHTML);
          $("#columna-mensaje-select").html(columnasHTML);
        } else {
          $("#columna-select").html("<option>No se encontraron columnas</option>");
          $("#columna-mensaje-select").html("<option>No se encontraron columnas</option>");
        }
      },
      error: function(error) {
        console.log(error);
        $("#columna-select").html("<option>Error al obtener los nombres de las columnas</option>");
        $("#columna-mensaje-select").html("<option>Error al obtener los nombres de las columnas</option>");
      }
    });
  }
});