<template>
    <header>
        <div>
            <RouterLink to="/"><img src="../assets/pictures/logo.svg" alt=""></RouterLink>
        </div>
        <nav id="pc_nav">
            <ul>
                <li>
                    <RouterLink to="/">Start</RouterLink>
                </li>
                <li>
                    <RouterLink to="/böcker">Böcker</RouterLink>
                </li>
                <li>
                    <RouterLink to="/info">Vue</RouterLink>
                </li>
            </ul>
        </nav>
        <button type="button" aria-label="Öpnna navigeringsmeny" id="mobile_btn"><img
                src="../assets/pictures/bars-solid.svg" alt="Navigeringsmeny"></button>
        <div id="mobile_menu">
            <nav id="mobile_nav">
                <button type="button" aria-label="Stäng navigeringsmeny" id="mobile_btn_close"><img
                        src="../assets/pictures/xmark-solid.svg" alt="Navigeringsmeny"></button>
                <ul>
                    <li>
                        <RouterLink to="/" class="mobileRoute">Start</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/böcker" class="mobileRoute">Böcker</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/info" class="mobileRoute">Vue</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>





<script>
import { RouterLink } from 'vue-router';
export default {
    name: "Header"
}

// använde min template header och modifierade den så den funkar med SPA
let menuOpen = false;
let menuDiv;
let mobileRouters;
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    menuDiv = document.getElementById('mobile_menu');
    menuDiv.style.visibility = "hidden";
    mobileRouters = document.getElementsByClassName("mobileRoute");
    document.getElementById('mobile_btn').addEventListener('click', menu);
    document.getElementById('mobile_btn_close').addEventListener('click', menu);

    for (let index = 0; index < mobileRouters.length; index++) {
        mobileRouters[index].addEventListener('click', menu);
    }
    
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

function menu() {
    if (menuOpen == true) {
        menuDiv.style.visibility = "hidden";
        menuOpen = false;
    } else {
        menuDiv.style.visibility = "visible";
        menuOpen = true;
    }
}

</script>

<style scoped>
header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgb(50, 120, 120);
    height: 80px;
}

ul {
    display: flex;
}

li {
    list-style: none;
    margin: 0 10px;
}

a {
    color: white;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

#pc_nav {
    visibility: hidden;
    position: absolute;
}

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

#mobile_menu {
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 0;
}

#mobile_menu ul {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    list-style: none;

}

#mobile_menu li {
    margin: 20px auto;
    text-align: center;
    width: 120px;
    padding: 5px;
    font-size: 1.2rem;
    border: 1px solid black;
}

#mobile_menu a {
    width: 100%;
    height: 100%;
    display: block;
    color: black;
}

@media only screen and (min-width: 600px) {

    li {
        font-size: 1.5rem;
    }

    #pc_nav {
        visibility: visible;
        right: 10px;
        top: 50%;
        transform: translate(0,-50%);
    }

    #mobile_btn {
        visibility: hidden;
    }

    #mobile_menu {
        visibility: hidden;
    }
}
</style>