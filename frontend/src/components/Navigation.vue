<template>
    <div class = "navigation uk-flex">
        <button class = "uk-margin-auto-vertical" type="button">File</button>
        <div uk-dropdown="mode:click;" class = "uk-margin-remove">
            <ul class="uk-nav uk-dropdown-nav dropdown">
                <li><a :href="newDocumentUrl" target="_blank" v-on:click="refreshUrl()">New Document</a></li>
                <li><a v-on:click="saveDocument">Save</a></li>
                <li class="uk-nav-divider"></li>
                <li><a v-on:click="download">Download</a></li>
                <li><a v-on:click="print">Print</a></li>
            </ul>
        </div>
        <button class = "uk-margin-auto-vertical" type="button">Help</button>
        <div uk-dropdown="mode:click;" class = "uk-margin-remove">
            <ul class="uk-nav uk-dropdown-nav dropdown">
                <li><a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Markdown</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { uuid } from 'vue-uuid';

    export default {
        name: "Navigation",
        data: () => {
            return {
                newDocumentUrl: ""
            }
        },
        created: function(){
          this.refreshUrl();
        },
        methods: {
            newDocument: function () {
                const id = uuid.v4();
                return `/documents/${id}`;
            },
            refreshUrl: function(){
                this.newDocumentUrl = this.newDocument();
            },
            saveDocument: function() {
                this.$emit("save");  
            },
            print: function(){
                this.$emit("print");
            },
            download: function(){
                this.$emit("download");
            }

        }
    }
</script>

<style scoped>
    .navigation{
        margin-top: 8px;
        margin-bottom: 8px;
    }

    .navigation button{
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        color: black;
        font-size: 14px;
        font-weight: 400;
        outline: none;
        background: white;
    }

    .navigation button:hover{
        background: #eeeeee;
    }

    .navigation button:nth-child(n+2){
        margin-left: 4px;
    }

    .dropdown li a{
        font-family: Helvetica, serif;
        font-size: 14px;
        color: black;
    }

    .uk-dropdown{
        padding: 8px 8px 8px 32px!important;
    }
</style>
