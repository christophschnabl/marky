<template>
    <div class="editor">
        <DocumentInfo></DocumentInfo>
        <Toolbar @print="print"
                 @bold="insertBold"
                 @italic="insertItalic"
                 @strike="insertStrikethrough"
                 @list="insertList"
                 @table="insertTable"
                 @code="insertCode">
        </Toolbar>
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
    import DocumentInfo from "./DocumentInfo";

    export default {
        name: "Editor",
        props: {},
        components: {
            DocumentInfo,
            Markdown,
            Toolbar
        },
        data: () => {
            return {
                value: "",
                markdown: ""
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

    .editor {
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

    .markdown, textarea {
        padding: 16px;
    }
</style>
