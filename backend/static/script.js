$(document).ready(function() {
  $("#upload-form").submit(function(e) {
    e.preventDefault();
    var fileInput = $("#file-input")[0];
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("file", file);

    $.ajax({
      url: "http://localhost:5000/",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
        console.log(response);
        $("#message-container").show();
      },
      error: function(error) {
        console.log(error);
      }
    });
  });

  $("#enviar-button").click(function() {
    var mensaje = $("#mensaje-input").val();

    $.ajax({
      url: "http://localhost:5000/enviar_mensaje",
      type: "POST",
      data: JSON.stringify({ "mensaje": mensaje }),
      contentType: "application/json",
      success: function(response) {
        console.log(response);
        $("#response").text("Mensaje enviado correctamente");
      },
      error: function(error) {
        console.log(error);
        $("#response").text("Error al enviar el mensaje");
      }
    });
  });
});
