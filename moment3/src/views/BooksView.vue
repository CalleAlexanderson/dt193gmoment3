<template>
  <h1>Böcker</h1>
  <main>
    <div id="delete_confirm">
    </div>
    <div id="no_books_msg">
    </div>
    <div id="form_section">
      <BookForm @bookAdded="fetchBooks()" />
    </div>
    <div id="book_section">
      <Book @deleteBook="confirmDelete(book.isbn, book.title)" v-for="book in books" :book="book" :key="book.isbn" />
    </div>
  </main>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import Book from "../components/Book.vue";
import axios from 'axios';
export default {
  name: "Header",
  components: {
    Book, BookForm
  },
  data() {
    return {
      books: [],
      newBook: Object
    }
  },
  methods: {
    async fetchBooks() {
      let div = document.getElementById('no_books_msg');
      axios.get('http://127.0.0.1:3000/books')
        .then(response => {
          // handle success
          console.log(response.data);
          this.books = response.data;
          div.style.visibility = "hidden";
        })
        .catch(error => {
          // handle error
          console.log(error);
          if (error.response.data.message == "No documents found") {

            div.style.visibility = "visible";
            div.innerHTML = "Inga böcker hittades i databasen, lägg till några!"

            // kunde inte stylea knappen i css av någon anledning så fick göra det här, försökte att inte skapa den här för att stylea men funkade inte
            let btn = document.createElement('button')
            btn.innerHTML = "Okej"
            btn.style.border = "1px solid white";
            btn.style.borderRadius = "5px"
            btn.style.padding = "2px"
            btn.style.display = "block"
            btn.style.margin = "10px auto"
            btn.style.backgroundColor = "white";
            btn.style.fontSize = "1rem";
            btn.addEventListener('click', () => {
              div.style.visibility = "hidden";
            })
            div.appendChild(btn);
          }
        })
        .finally(function () {
          // always executed
        });
    },
    async addBook() {
      let warningField = document.getElementById('formWarningField')
      if (this.formTitle == "" || this.formAuthor == "" || this.formIsbn == "") {
        warningField.innerHTML = "Fyll i alla fält markerade med *";
        return;
      } else {
        warningField.innerHTML = "&nbsp;";
      }

      if (document.getElementById('finished').checked) {
        this.finished = true;
      } else {
        this.finished = false;
      }
      // skickar anrop till server
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
        // tar hand om svar
        if (json.message == "book already exist in database") {
          warningField.innerHTML = "Bok redan tillagd";
        } else {
          warningField.innerHTML = "&nbsp;";
        }
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }
      this.fetchBooks();
    },
    async confirmDelete(isbnID, title) {
      // skapar en ruta så användaren inte råkar ta bort en bok av misstag
      let div = document.getElementById('delete_confirm');
      div.style.visibility = "visible";
      div.innerHTML = "";
      let h3 = document.createElement('h3');
      h3.innerHTML = `Vill du verkligen ta bort "${title}"?`
      let p = document.createElement('p')
      p.innerHTML = 'om du trycker på knappen tas boken bort permanent';

      let btnDel = document.createElement('button');
      btnDel.innerHTML = "Radera";
      btnDel.style.border = "1px solid white";
      btnDel.style.borderRadius = "5px"
      btnDel.style.padding = "2px"
      btnDel.style.display = "block"
      btnDel.style.margin = "10px auto"
      btnDel.style.backgroundColor = "white";
      btnDel.style.fontSize = "1rem";
      btnDel.addEventListener('click', () => {
        this.deleteBook(isbnID);
      })

      let btnKeep = document.createElement('button');
      btnKeep.innerHTML = "Ångra";
      btnKeep.style.border = "1px solid white";
      btnKeep.style.borderRadius = "5px"
      btnKeep.style.padding = "2px"
      btnKeep.style.display = "block"
      btnKeep.style.margin = "10px auto"
      btnKeep.style.backgroundColor = "white";
      btnKeep.style.fontSize = "1rem";
      btnKeep.addEventListener('click', () => {
        div.style.visibility = "hidden";
      })
      div.appendChild(h3);
      div.appendChild(p);
      div.appendChild(btnDel);
      div.appendChild(btnKeep);
    },
    async deleteBook(isbnID) {
      const url = "http://127.0.0.1:3000/books";
      document.getElementById('delete_confirm').style.visibility = "hidden";
      try {
        const response = await fetch(url, {
          method: "DELETE",
          body: JSON.stringify({
            isbn: isbnID,
          }),
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }
      this.fetchBooks();
    }
  },
  mounted() {
    this.fetchBooks();
    // this.addBook();
  }
}
</script>

<style scoped>
#book_section {
  max-width: 1500px;
}

#delete_confirm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: darkred;
  color: white;
  width: 200px;
  visibility: hidden;
  padding: 8px;
  border-radius: 20px;
  text-align: center;
}

#no_books_msg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #327878;
  color: white;
  width: 180px;
  visibility: hidden;
  padding: 8px;
  border-radius: 20px;
  text-align: center;
  font-size: 1.2rem;
}

@media only screen and (min-width: 400px) {

  #book_section {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 600px) {

  #book_section {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media only screen and (min-width: 850px) {

  #book_section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media only screen and (min-width: 1024px) {

  main {
    display: grid;
    grid-template-columns: 350px auto;
    overflow-y: hidden;
  }

  #form_section {
    position: fixed;
    left: 25px;
  }

  #book_section {
    grid-template-columns: 1fr 1fr 1fr;
  }

  #book_section {
    grid-area: 2/2/2/3;
  }
}

@media only screen and (min-width: 1300px) {

  #book_section {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media only screen and (min-width: 1600px) {

  #book_section {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>