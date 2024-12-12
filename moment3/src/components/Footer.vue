
<template>

    <footer>
        <ul>
            <li>
                <p>Sidskapare: Calle Alexanderson</p>
            </li>
            <li>
                <p>kontakt: <a href="mailto:caal2301@student.miun.se">caal2301@student.miun.se</a></p>
            </li>
        </ul>
    </footer>

</template>

<script>
    import { RouterLink } from 'vue-router';
    export default {
        name: "Footer"
    }
</script>

<style scoped>

    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: rgb(30, 75, 75);
        height: 70px;
    }

    ul {
        margin: 10px;
    }

    li {
        margin: 10px 0;
        color: white;
    } 

    a{
        color: white;
    }

</style>