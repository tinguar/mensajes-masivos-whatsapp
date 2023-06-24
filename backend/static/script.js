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

    $.ajax({
      url: "http://localhost:5000/enviar-mensajes",
      type: "POST",
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
          columnasHTML += "<p>" + columnas[i] + "</p>";
        }

        $("#columnas").html(columnasHTML);
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
});