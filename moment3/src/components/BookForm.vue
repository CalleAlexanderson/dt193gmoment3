<template>
    <p id="form_warning_field">&nbsp;</p>
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
        <div id="checkbox_div">
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
    data() {
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
            let warningField = document.getElementById('form_warning_field')
            // kollar så fälten är ifyllda
            if (this.formTitle == "" || this.formAuthor == "" || this.formIsbn == "") {
                warningField.style.backgroundColor = "darkred"
                warningField.innerHTML = "Fyll i alla fält markerade med *";
                return;
            } else {
                warningField.style.backgroundColor = "white"
                warningField.innerHTML = "&nbsp;";
            }
            // kollar så titeln är kortare än 60 karaktärer
            if (this.formTitle.length > 60) {
                warningField.style.backgroundColor = "darkred"
                warningField.innerHTML = "Titeln får inte vara längre än 60 tecken";
                return;
            } else {
                warningField.style.backgroundColor = "white"
                warningField.innerHTML = "&nbsp;";
            }
            // konverterar isbn till int och sen kollar om den är ett nummer
            this.formIsbn = parseInt(this.formIsbn);
            if (isNaN(this.formIsbn)) {
                warningField.innerHTML = "ISBN måste vara ett nummer";
                warningField.style.backgroundColor = "darkred"
                return;
            } else {
                warningField.style.backgroundColor = "white"
                warningField.innerHTML = "&nbsp;";
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
            this.formTitle = "";
            this.formAuthor = "";
            this.formSeries = "";
            this.formIsbn = "";
            document.getElementById('finished').checked = false;
            this.$emit('bookAdded')
        },
    }
}
</script>

<style scoped>
#form_warning_field {
    color: white;
    padding: 8px;
    font-size: 1.2rem;
    margin: 8px auto;
    max-width: 300px;
    border-radius: 6px;
    text-align: center;
}

form {
    font-size: 1.3rem;
    display: block;
    margin: 5px auto;
    width: 90%;
    max-width: 300px;
    border: 2px solid #1e4b4b;
    border-radius: 10px;
    padding: 4px;
}

form div {
    margin: 5px auto;
    width: 95%;
    display: flex;
    flex-direction: column;
}

input {
    font-size: 1.1rem;
    padding: 4px;
}

#checkbox_div {
    display: block;
}

#checkbox_div input {
    margin: 0 4px;
    width: 1rem;
    height: 1rem;
}

button {
    padding: 8px;
    display: block;
    margin: 5px auto;
    font-size: 1.2rem;
    background-color: #327878;
    color: white;
    border: none;
    border-radius: 8px;
    /* sätter en border här för propertyn background-color verkar inte längre funka vid transition */
    border: 1px solid #1e4b4b;
}

button:hover {
    background-color: #1e4b4b;
    transition: 0.25s;
}


@media only screen and (min-width: 600px) {

    article {
        width: 90%;
    }
}

@media only screen and (min-width: 1024px) {
    form {
        width: 300px;
    }
}
</style>