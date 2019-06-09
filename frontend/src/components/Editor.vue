<template>
    <div class = "editor">
        <button v-on:click="renderMarkdown()">Save</button>
        <div class = "uk-height-1-1 uk-flex">
            <textarea id="editor" ref="text" :value="value" @input="textChange($event.target.value)"></textarea>
            <div class = "markdown" v-html="markdown"></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Editor",
        props: {

        },
        data: () => {
            return{
                value: "",
                markdown: ""
            }
        },sockets: {
            typing: function (data) {
                this.value = data.text;
            }
        },
        methods: {
            textChange: function(text){
                const cursorPosition = this.$refs.text.selectionStart;

                const data = {
                    "text" : text,
                    "ClientsCursorPosition" : cursorPosition
                };


                this.$socket.emit("typing", data);

                this.renderMarkdown();
            },
            renderMarkdown: function(){
                const obj = {
                    text: this.value
                };
                axios
                    .post('http://localhost:3000/render',obj)
                    .then(res => this.markdown = res.data)
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    .editor{
        height: 100%;
    }
    #editor {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }

    textarea, .markdown {
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
    }

    .markdown, textarea{
        padding: 16px;
    }

    .markdown{
        position: relative;
    }
</style>
