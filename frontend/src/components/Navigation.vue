<template>
    <div class = "navigation uk-flex">
        <button class = "uk-margin-auto-vertical" type="button">File</button>
        <div uk-dropdown="mode:click;" class = "uk-margin-remove">
            <ul class="uk-nav uk-dropdown-nav dropdown">
                <li><a v-on:click="createDocument">Neu</a></li>
                <li class="uk-nav-divider"></li>
                <li><a>Download</a></li>
                <li class="uk-nav-divider"></li>
                <li><a v-on:click="print">Print</a></li>
            </ul>
        </div>
        <button class = "uk-margin-auto-vertical" type="button">Help</button>
        <div uk-dropdown="mode:click;" class = "uk-margin-remove">
            <ul class="uk-nav uk-dropdown-nav dropdown">
                <li><a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">Markdown</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { uuid } from 'vue-uuid';

    export default {
        name: "Navigation",
        methods: {
            createDocument: function() {
                const id = uuid.v4();
                console.log(id);
                this.$router.push(`/documents/${id}`);
            },
            print: function(){
                this.$emit("print");
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