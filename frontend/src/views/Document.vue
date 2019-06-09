<template>
    <div>
        {{link}}
        <div>
        <ul id="#userList">

        </ul>

        <textarea id="editor" cols="40" rows="5" ref="text" :value="value" @input="textChange($event.target.value)"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Document",
        data: () => {
            return {
                link: "empty-link",
                value: ""
            }
        },
        created: function(){
            this.link = this.$route.params.id;
        },
        sockets: {
            connect: function () {
                this.$socket.emit("recieveDocumentUuid",  {"clientUuid" : "hansi", "documentUuid": this.link});
                console.log('socket connected')
            },
            typing: function (data) {
                this.value = data.text;
            }
        },
        methods: {
            textChange: function(text){
                const cursorPosition = this.$refs.text.selectionStart;
                console.log(cursorPosition);

                const data = {
                    "text" : text,
                    "ClientsCursorPosition" : 0
                };


                this.$socket.emit("typing", data);

                return false;
            }
        }
    }
</script>

<style scoped>

</style>