<template>
  <div>
    <h1>File Upload</h1>
    <input type="file" @change="handleFileUpload" accept=".csv, .xml">
    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      if (!this.file) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Aquí puedes manejar la respuesta del servidor
        })
        .catch(error => {
          console.error(error);
          // Manejar errores
        });
    },
  },
};
</script>
