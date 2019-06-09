<template>
    <div class = "document">
        {{link}}
        <div class = "editor-wrapper">
            <Editor></Editor>
        </div>
    </div>
</template>

<script>
    import Editor from '../components/Editor';

    export default {
        name: "Document",
        components: {
            Editor
        },
        data: () => {
            return {
                link: "empty-link",
            }
        },
        created: function () {
            this.link = this.$route.params.id;
        },
        sockets: {
            connect: function () {
                this.$socket.emit("recieveDocumentUuid", {"clientUuid": "hansi", "documentUuid": this.link});
                console.log('socket connected')
            }
        }
    }
</script>

<style scoped>
.editor-wrapper{
    height: 100vh;
}
</style>