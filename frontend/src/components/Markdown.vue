<template>
    <div class="markdown markdown-body" v-html="value"></div>
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
.markdown{
    padding: 16px;
    width: 50vw;
}
</style>
<style src="../../node_modules/github-markdown-css/github-markdown.css"></style>