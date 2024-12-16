<script>
import { RouterLink } from 'vue-router';
import Hbutton from './HeaderButton.vue';
import HrouteLink from './HeaderRouteLink.vue';

export default {
    name: "Header",
    components: {
        Hbutton, HrouteLink
    },
    data() {
        return {
            menuOpen: false
        }
    },
    methods: {
        mobileMenu() {
            if (this.menuOpen == true) {
                document.getElementById('mobile_menu').style.visibility = "hidden";
                this.menuOpen = false;
            } else {
                document.getElementById('mobile_menu').style.visibility = "visible";
                this.menuOpen = true;
            }
        }
    }
}

</script>

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
        <Hbutton @mobileMenu="mobileMenu" descAria="Öpnna navigeringsmeny" btnId="mobile_btn" location="/src/assets/pictures/bars-solid.svg" />
        <div id="mobile_menu">
            <nav id="mobile_nav">
                <Hbutton @mobileMenu="mobileMenu" descAria="Stäng navigeringsmeny" btnId="mobile_btn_close" location="/src/assets/pictures/xmark-solid.svg" />
                <ul>
                    <li>
                        <HrouteLink @mobileMenu="mobileMenu" toLocation="/" text="Start" />
                    </li>
                    <li>
                        <HrouteLink @mobileMenu="mobileMenu" toLocation="/böcker" text="Böcker" />
                    </li>
                    <li>
                        <HrouteLink @mobileMenu="mobileMenu" toLocation="/info" text="Vue" />
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>


<style scoped>
/* sticky ville inte fungera */
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #327878;
    z-index: +1;
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
        right: 20px;
        top: 50%;
        transform: translate(0, -50%);
    }

    #mobile_btn {
        visibility: hidden;
    }

    #mobile_menu {
        visibility: hidden;
    }
}
</style>