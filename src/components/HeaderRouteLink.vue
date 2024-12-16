<script>
export default {
    name: "MobileRouteLink",
    props: {
        toLocation: String,
        text: String
    }
}
</script>

<template>
    <RouterLink :to="toLocation" @click="$emit('mobileMenu')">{{text}}</RouterLink>
</template>