<script>
export default {
    name: "MobileMenuButton",
    props: {
        location: String,
        descAria: String,
        btnId: String
    }
}
</script>

<template>
    <button type="button" :aria-label="descAria" @click="$emit('mobileMenu')" :id="btnId">
        <img :src="location" alt="Navigeringsmeny"> 
    </button>
</template>

<style scoped>


button {
    width: 60px;
    height: 60px;
    position: absolute;
    right: 20px;
    top: 10px;
    border-radius: 10px;
    border: 1px solid black;
    background-color: white;
}

button img {
    height: 100%;
}
</style>