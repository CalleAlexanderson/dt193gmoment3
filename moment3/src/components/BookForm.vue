<template>
    <form action="">
        <div>
            <label for=""></label>
            <input type="text">
        </div>
        <div>
            <label for=""></label>
            <input type="text">
        </div>
        <div>
            <label for=""></label>
            <input type="text">
        </div>
        <div>
            <label for=""></label>
            <input type="text">
        </div>
        <div>
            <label for=""></label>
            <input type="checkbox" name="" id="">
        </div>
    </form>
</template>

<script>
export default {
    props: {
        book: Object
    }
}
</script>

<style scoped>
article {
    border: 2px solid black;
    padding: 4px;
    margin: 10px auto;
    width: 80%;
    max-width: 400px;
}

h2 {}

@media only screen and (min-width: 600px) {

    article {
        width: 90%;
    }
}

@media only screen and (min-width: 1024px) {
}
</style>