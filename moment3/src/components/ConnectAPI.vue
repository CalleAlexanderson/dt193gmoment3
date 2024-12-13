<template>
    <p>API connection</p>
</template>

<script>
    import axios from 'axios';
    console.log(axios.isCancel('something'));
    axios.get('http://127.0.0.1:3000/books')
  .then(function (response) {
    // handle success
    console.log("funkar");
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
</script>