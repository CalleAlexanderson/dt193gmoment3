<template>
    <article @click="$emit('deleteBook')">
        <h2>
            {{ book.title }}
        </h2>
        <p class="author">av {{ book.author }}</p>
        <p class="series" v-if="book.series != null">ingår i serien {{ book.series }}</p>
        <p class="series" v-else>ensamstående bok</p>
        <p class="isbn">{{ book.isbn }}</p>
        <p class="finished" v-if="book.finished">Slutläst</p>
        <p class="finished" v-else>Påbörjad</p>
        <a class="bookLink" v-bind:href="'https://www.bokus.com/bok/' + book.isbn">Köp {{ book.title }}</a>
    </article>
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