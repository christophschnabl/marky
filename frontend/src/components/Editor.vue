<template>
    <div class="editor">
        <div class="top">
            <div class="uk-flex wrapper">
                <div class = "logo uk-flex">
                    <span class = "uk-margin-auto-vertical uk-margin-auto">✏️</span>
                </div>
                <div class="uk-height-1-1">
                    <input id = "documentname" :value="documentname">
                    <div class="uk-width-1-1 bar uk-flex">
                        <div class="bar-element uk-flex">
                            <button class="uk-margin-auto-vertical">File</button>
                        </div>
                        <div class="bar-element uk-flex">
                            <button class="uk-margin-auto-vertical">Edit</button>
                        </div>
                        <div class="bar-element uk-flex">
                            <button class="uk-margin-auto-vertical">Help</button>
                        </div>
                    </div>
                </div>
            </div>
            <Toolbar @print="print"
                     @bold="insertBold"
                     @italic="insertItalic"
                     @strike="insertStrikethrough"
                     @list="insertList"
                     @table="insertTable"
                     @code="insertCode"></Toolbar>
            </div>
        <div class="editor-wrapper uk-height-1-1">
            <div class="uk-height-1-1 uk-flex">
                <textarea id="editor" ref="text" :value="value" @input="textChange($event.target.value)"></textarea>
                <Markdown :value="markdown" id = "print"></Markdown>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Markdown from './Markdown'
    import Toolbar from './Toolbar'

    export default {
        name: "Editor",
        props: {},
        components: {
            Markdown,
            Toolbar
        },
        data: () => {
            return {
                value: "",
                markdown: "",
                documentname: "Document 1",
            }
        }, sockets: {
            typing: function (data) {
                this.value = data.text;
            }
        },
        methods: {
            textChange: function (text) {
                const cursorPosition = this.$refs.text.selectionStart;

                const data = {
                    "text": text,
                    "ClientsCursorPosition": cursorPosition
                };

                this.$socket.emit("typing", data);

                this.renderMarkdown();
            },
            renderMarkdown: function () {
                const obj = {
                    text: this.value
                };
                axios
                    .post('http://localhost:3000/render', obj)
                    .then(res => this.markdown = res.data)
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            insertBold: function () {
                this.insert(' **Bold** ');
            },
            insertItalic: function () {
                this.insert(' *Italic* ');
            },
            insertStrikethrough: function () {
                this.insert(' ~~Strikethrough~~ ');
            },
            insertList: function () {
                this.insert('* Item\r\n' +
                    '* Item\r\n' +
                    '* Item\r\n');
            },
            insertCode: function () {
                this.insert('```\r\npublic void ungarn(){\n' +
                    '    println(\'hansi\');\n' +
                    '}\r\n```');
            },
            insertTable: function () {
                this.insert("| Tables        | Are           | Cool  |\n" +
                    "| ------------- |:-------------:| -----:|\n" +
                    "| col 3 is      | right-aligned | $1600 |\n" +
                    "| col 2 is      | centered      |   $12 |\n" +
                    "| zebra stripes | are neat      |    $1 |\n")
            },
            insert: function (text) {
                const textarea = this.$refs.text;
                const startPos = textarea.selectionStart;
                const endPos = textarea.selectionEnd;

                //insert text
                this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos, this.value.length);

                //TODO: Move cursor
            },
            print() {
                this.$htmlToPaper('print', () => {
                    console.log('Printing done or got cancelled!');
                });
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        padding: 8px 0;
    }

    #documentname{
        font-size: 18px;
        color: black;
        margin-left: 22px;
        margin-bottom: 0;
        outline: none;
        border: 1px solid transparent;
    }

    #documentname:hover{
        border: 1px solid lightgrey;
    }

    #documentname:focus{
        border: 1px solid deepskyblue;
    }

    .editor {
        height: 100%;
    }

    .logo{
        width: 64px;
        margin: 0 0 0 8px;
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

    .markdown, textarea {
        padding: 16px;
    }

    .bar, .toolbar{
        padding-left: 16px;
    }

    .top{
        background: white;
        width: 100%;
        box-shadow: 0 2px 16px 0px rgba(0,0,0,0.05);
    }

    .toolbar {
        height: 42px;
        border-bottom: 1px solid lightgrey;
        border-top: 1px solid lightgrey;
        background: white;
    }

    .bar {
        height: 32px;
    }

    .bar-element > button {
        background: white;
        width: 42px;
        height: 24px;
        font-size: 15px;
        color: black;
        border: none;
        outline: none;
        border-radius: 4px;
        text-align: left;
        margin: 0 4px;
        padding: 0 4px;
    }

    .bar-element > button:active {
        background: lightblue;
    }
</style>
