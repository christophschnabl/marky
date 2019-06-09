<template>
    <div class = "editor">
        <div class = "uk-flex uk-width-1-1 toolbar">
            <div class = "toolbar-element uk-flex">
                <button uk-icon="icon:bold;ratio:1.1"
                        class = "uk-margin-auto uk-margin-auto-vertical"
                        uk-tooltip="title: Bold; pos: bottom" v-on:click="insertBold"></button>
            </div>
            <div class = "toolbar-element uk-flex">
                <button uk-icon="icon:italic;ratio:1.1"
                        class = "uk-margin-auto uk-margin-auto-vertical"
                        uk-tooltip="title: Italic; pos: bottom" v-on:click="insertItalic"></button>
            </div>
            <div class = "toolbar-element uk-flex">
                <button uk-icon="icon:strikethrough;ratio:1.1"
                        class = "uk-margin-auto uk-margin-auto-vertical"
                        uk-tooltip="title: Strikethrough; pos: bottom" v-on:click="insertStrikethrough"></button>
            </div>
            <hr class = "divider">
            <div class = "toolbar-element uk-flex">
                <button uk-icon="icon:list;ratio:1.1"
                        class = "uk-margin-auto uk-margin-auto-vertical"
                        uk-tooltip="title: List; pos: bottom" v-on:click="insertList"></button>
            </div>
            <div class = "toolbar-element uk-flex">
                <button uk-icon="icon:table;ratio:1.1"
                        class = "uk-margin-auto uk-margin-auto-vertical"
                        uk-tooltip="title: Table; pos: bottom" v-on:click="insertTable"></button>
            </div>
            <hr class = "divider">
            <div class = "toolbar-element uk-flex">
                <button uk-icon="icon:code;ratio:1.1"
                        class = "uk-margin-auto uk-margin-auto-vertical"
                        uk-tooltip="title: Code; pos: bottom" v-on:click="insertCode"></button>
            </div>
        </div>
        <div class = "editor-wrapper uk-height-1-1">
        <div class = "uk-height-1-1 uk-flex">
            <textarea id="editor" ref="text" :value="value" @input="textChange($event.target.value)"></textarea>
            <div class = "markdown" v-html="markdown"></div>
        </div>
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
            },
            insertBold: function(){
                this.insert(' **Bold** ');
            },
            insertItalic: function(){
                this.insert(' *Italic* ');
            },
            insertStrikethrough: function(){
                this.insert(' ~~Strikethrough~~ ');
            },
            insertList: function(){
                this.insert('* Item\r\n' +
                            '* Item\r\n' +
                            '* Item\r\n');
            },
            insertCode: function(){
              this.insert('```\r\npublic void ungarn(){\n' +
                  '    println(\'hansi\');\n' +
                  '}\r\n```');
            },
            insertTable: function(){
                this.insert("| Tables        | Are           | Cool  |\n" +
                    "| ------------- |:-------------:| -----:|\n" +
                    "| col 3 is      | right-aligned | $1600 |\n" +
                    "| col 2 is      | centered      |   $12 |\n" +
                    "| zebra stripes | are neat      |    $1 |\n")
            },
            insert: function(text){
                const textarea = this.$refs.text;
                const startPos = textarea.selectionStart;
                const endPos = textarea.selectionEnd;

                //insert text
                this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos, this.value.length);

                //TODO: Move cursor
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

    .toolbar{
        height: 42px;
        border-bottom: 1px solid lightgrey;
        border-top: 1px solid lightgrey;
    }

    .toolbar-element{
        height: 42px;
        width: 42px;
    }

    .toolbar-element > button:hover{
        background: #f6f6f6;
    }

    .toolbar-element > button{
        color: black;
        outline: none;
        padding: 4px;
    }

    .divider{
        height: 24px;
        margin: 9px 0;
        width: 1px;
        background: lightgrey;
    }
</style>
