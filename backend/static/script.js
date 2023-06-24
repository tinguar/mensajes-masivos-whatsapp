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
        obtenerNombresColumnas(); // Llama a la función para obtener los nombres de las columnas
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

  function obtenerNombresColumnas() {
    $.ajax({
      url: "http://localhost:5000/nombres-columnas",
      type: "GET",
      dataType: "json",
      success: function(response) {
        var columnas = response.columnas_principales;
        var columnasHTML = "";

        for (var i = 0; i < columnas.length; i++) {
          columnasHTML += "<p onclick='seleccionarColumna(this)'>" + columnas[i] + "</p>"; // Agregar onclick para seleccionar la columna
        }

        $("#columnas").html(columnasHTML);
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
});

function seleccionarColumna(elemento) {
  var columnaSeleccionada = $(elemento).text();
  var mensajeActual = $("#mensaje-input").val();
  var nuevoMensaje = mensajeActual + " [" + columnaSeleccionada + "]";
  $("#mensaje-input").val(nuevoMensaje);
}
