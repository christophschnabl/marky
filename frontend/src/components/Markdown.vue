<template>
    <div class="markdown" v-html="value"></div>
</template>

<script>
    export default {
        name: "Markdown",
        props: {
            value: String,
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>