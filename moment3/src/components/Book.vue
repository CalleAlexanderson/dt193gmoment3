<template>
    <article @click="$emit('deleteBook')">
        <h2>
            {{ book.title }}
        </h2>
        <p class="author">Av {{ book.author }}</p>
        <p class="series" v-if="book.series != null && book.series != ''">Ingår i serien "{{ book.series }}"</p>
        <p class="series" v-else>Ensamstående bok</p>
        <p class="isbn">ISBN: {{ book.isbn }}</p>
        <p class="finished" v-if="book.finished">Slutläst</p>
        <p class="finished" v-else>Påbörjad</p>
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
    background-color: #327878;
    color: white;
    padding: 6px;
    margin: 10px auto;
    width: 80%;
    max-width: 180px;
    height: 300px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
    box-shadow: 1px 2px 4px black;
}

article:hover{
    background-color: #1e4b4b;
    transition: 0.25s;
}

h2{
    border-bottom: 2px solid white;
}

h2,
p {
margin: 10px 0;
text-shadow: 1px 1px 1px black;
}

@media only screen and (min-width: 600px) {

    article {
        width: 90%;
    }
}

@media only screen and (min-width: 1024px) {
}
</style>