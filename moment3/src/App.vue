<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ConnectAPI from './components/ConnectAPI.vue';
</script>

<template>
  <Header />

  <RouterView />
  <ConnectAPI />
  <Footer />
</template>

<style scoped>

</style>
