
<template>
    <div class="document">
        <DocumentInfo
                :users="document.users"
                :documentName="document.name"
                @save="save" @print="print"
                @download="download"
                @documentNameChanged="updateDocumentName"></DocumentInfo>
        <Toolbar @print="print"
                 @bold="insertBold"
                 @italic="insertItalic"
                 @strike="insertStrikethrough"
                 @list="insertList"
                 @table="insertTable"
                 @code="insertCode"
                 @render="renderMarkdown">
        </Toolbar>
        <div class="editor-wrapper uk-flex">
            <div class = "editor">
                <textarea id="editor" ref="text" :value="document.text"
                          @input="textChange($event.target.value)"></textarea>
            </div>
            <Markdown :value="document.markdown" id="print"></Markdown>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import jsPDF from 'jspdf'
    import RandomEmoji from 'node-emoji';
    import Sentencer from 'sentencer';
    import Markdown from '../components/Markdown';
    import Toolbar from '../components/Toolbar';
    import DocumentInfo from "../components/DocumentInfo";

    export default {
        name: "Document",
        props: {},
        components: {
            DocumentInfo,
            Markdown,
            Toolbar
        },
        data: () => {
            return {
                document: {
                    name: "Dokument 1",
                    text: "",
                    markdown: "",
                    users: [
                    ]
                },
                link: "empty-link"
            }
        },
        created: function () {
            this.link = this.$route.params.id;
        },
        sockets: {
            connect: function () {
                let adjective = Sentencer.make("{{ adjective }}");
                const emoji = RandomEmoji.random();

                while(!emoji.key.startsWith(adjective[0])) {
                    adjective = Sentencer.make("{{ adjective }}")
                }

                const clientUuid = adjective + " " + emoji.key;

                //const user = { "name" : clientUuid, "emoji" : emoji.emoji};

                //this.document.users.push(user);

                this.$socket.emit("recieveDocumentUuid", {"clientUuid": clientUuid, "documentUuid": this.link});
                console.log("recieveDocumentUuid called");
            },
            typing: function (data) {
                if(data.name !== undefined){
                    console.log("set document name");
                    this.document.name = data.name;
                }

                //set cursor position here @MR ->
                console.log(data.cursorPositions);

            },
            clientJoined: function(client) {
                const emoji = RandomEmoji.get(client.split(" ")[1]);

                const user = { "name" : client, "emoji" : emoji};

                this.document.users.push(user);
            },
            saveStatus: function(status) {
                if (status === true) {
                    alert("Document saved!");
                } else {
                    alert("RIP");
                }

            },
            documentNameChange: function(name){
                this.document.name = name;
            }
            /*clientLeft: function(client) {

                /*console.log(this.document.users);
                this.doucment.users.filter(user =>{
                    if (user.name === client) {
                        return false;
                    } else {
                        return true;
                    }
                })
            }*/
        },
        methods: {
            textChange: function (text) {
                const cursorPosition = this.$refs.text.selectionStart;


                const data = {
                    "text": text,
                    "cursorPosition": cursorPosition
                };
                console.log(data);

                this.$socket.emit("typing", data);
                console.log("typing called");
            },
            renderMarkdown: function () {
                const obj = {
                    text: this.document.text
                };
                const protocol = location.protocol;
                const slashes = protocol.concat("//");
                const host = slashes.concat(window.location.hostname);
                axios
                    .post(host + ':3000/render', obj)
                    .then(res => {
                        this.document.markdown = res.data;
                    })
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
                this.document.text = this.document.text.substring(0, startPos) +
                text + this.document.text.substring(endPos, this.document.text.length);

                //TODO: Move cursor
            },
            save() {
                this.$socket.emit("saveDocument", {"content": this.document.text, "name": this.document.name});
            },
            print() {
                this.$htmlToPaper('print', () => {
                    console.log('Printing done or got cancelled!');
                });
            },
            download: function(){
                const doc = new jsPDF();
                doc.fromHTML(this.document.markdown, 15, 15, {
                    width: 170
                }, () => doc.save(this.document.name + ".pdf"));

            },
            updateDocumentName: function(name){
                this.document.name = name;
                this.$socket.emit("documentNameChange", name);
            }

        }
    }
</script>

<style scoped>
    .document {
        height: 100vh;
    }

    .wrapper {
        padding: 8px 0;
    }

    .editor-wrapper{
        /* 100% - (toolbar height + documentinfo height + documentinfo padding + edtior padding)*/
        height: calc(100% - (42px + 52px + 16px + 16px));
    }

    .editor{
        border-right: 1px solid lightgrey;
    }

    .editor textarea {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
        padding: 16px;
        border: none;
        resize: none;
        outline: none;
        font-size: 18px;
        display: inline-block;
        width: 50vw;
        vertical-align: top;
        box-sizing: border-box;
        background: #f6f6f6;

    }
</style>
