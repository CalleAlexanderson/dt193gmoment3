<template>
  <h1>Böcker</h1>
  <section id="book_section">
    <Book @deleteBook="deleteBook(book.isbn)" v-for="book in books" :book="book" :key="book.isbn" />
  </section>
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
      axios.get('http://127.0.0.1:3000/books')
        .then(response => {
          // handle success
          console.log(response.data);
          this.books = response.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    async addBook() {
      // fick inte axios att fungera, testade i ett flertal timmar
      const url = "http://127.0.0.1:3000/books";
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            title: "calles bok",
            author: "calle",
            isbn: 123,
            series: "mina böcker",
            finished: true
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
      await this.fetchBooks();
    },

    async deleteBook(isbnID){
      const url = "http://127.0.0.1:3000/books";

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
      await this.fetchBooks();
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
  margin: 0 auto;
}

@media only screen and (min-width: 600px) {

  #book_section {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 1024px) {

  #book_section {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>