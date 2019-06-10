<template>
    <div class="editor">
        <textarea id="editor" ref="text" :value="value" @input="textChange($event.target.value)"></textarea>
    </div>
</template>

<script>

    export default {
        name: "Editor",
        props: {
            value: String,
        },
        data: function(){
            return {

            }
        },
        methods:{
            textChange: function (text) {
                const cursorPosition = this.$refs.text.selectionStart;

                const data = {
                    "text": text,
                    "ClientsCursorPosition": cursorPosition
                };

                this.$socket.emit("typing", data);
            },
            insert: function (text) {
                const textarea = this.$refs.text;
                const startPos = textarea.selectionStart;
                const endPos = textarea.selectionEnd;

                //insert text
                this.document.text = this.document.text.substring(0, startPos) +
                    text + this.document.text.substring(endPos, this.value.length);

                //TODO: Move cursor
            },
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

    textarea, .markdown {
        display: inline-block;
        height: 100%;
        width: 50vw;
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
