<template>
    <textarea id="editor" ref="text" :value="value" @input="textChange($event.target.value)"></textarea>
</template>

<script>
    export default {
        name: "Editor",
        props: {
            onInput: Function,
        },
        data: () => {
            return{
                value: "",
            }
        },sockets: {
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
    #editor {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }

    textarea, #editor div {
        display: inline-block;
        width: 49%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        padding: 0 20px;
    }

    textarea {
        border: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 18px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
    }

    code {
        color: #f66;
    }
</style>