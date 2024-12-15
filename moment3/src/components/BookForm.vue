<template>
    <p id="formWarningField">&nbsp;</p>
    <!--  -->
    <form @submit.prevent="addBook()">
        <div>
            <label for="title">Titel *:</label>
            <input v-model="formTitle" type="text" name="title" id="title">
        </div>
        <div>
            <label for="author">Författare *:</label>
            <input v-model="formAuthor" type="text" name="author" id="author">
        </div>
        <div>
            <label for="series">Serie:</label>
            <input v-model="formSeries" type="text" name="series" id="series">
        </div>
        <div>
            <label for="isbn">ISBN *:</label>
            <input v-model="formIsbn" type="text" name="isbn" id="isbn">
        </div>
        <div>
            <label for="finished">Slutläst:</label>
            <input type="checkbox" name="finished" id="finished">
        </div>
        <button type="submit">Lägg till</button>
    </form>
</template>

<script>
export default {
    props: {
        book: Object
    },
    emits: ["bookAdded"],
    data(){
        return {
            formTitle: "",
            formAuthor: "",
            formSeries: "",
            formIsbn: "",
            finished: false,
        }
    },
    methods: {
        async addBook() {
            let warningField = document.getElementById('formWarningField')
            // kollar så fälten är ifyllda
            if (this.formTitle == "" || this.formAuthor == "" || this.formIsbn == "") {
                warningField.innerHTML = "Fyll i alla fält markerade med *";
                return;
            } else {
                warningField.innerHTML = "&nbsp;";
            }
            // konverterar isbn till int och sen kollar om den är ett nummer
            this.formIsbn = parseInt(this.formIsbn);
            if (isNaN(this.formIsbn)) {
                warningField.innerHTML = "ISBN måste vara ett nummer";
                return;
            }
            // kollar om checkbox slutläst är klickade
            if (document.getElementById('finished').checked) {
                this.finished = true;
            } else {
                this.finished = false;
            }
            
            // anrop till post request på server
            const url = "http://127.0.0.1:3000/books";
            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        title: this.formTitle,
                        author: this.formAuthor,
                        isbn: this.formIsbn,
                        series: this.formSeries,
                        finished: this.finished
                    }),
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                console.log(json.message);
                if (json.message == "book already exist in database") {
                    warningField.innerHTML = "Bok redan lagrad";
                } else {
                    warningField.innerHTML = "&nbsp;";
                }
                console.log(json);
            } catch (error) {
                console.error(error.message);
            }
            // gör en emit till BooksView för att köra funktionen som hämtar böckerna
            this.$emit('bookAdded')
        },
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

@media only screen and (min-width: 1024px) {}
</style>