<template>
        <button v-on:click="share" class="uk-margin-auto uk-margin-auto-vertical">Share Document</button>
</template>

<script>
    export default {
        name: "ShareButton",
        data: function(){
            return {

            }
        },
        methods: {
            share: function(){
                const clipboardText = "localhost:8081" + this.$route.fullPath;

                //from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
                const el = document.createElement('textarea');
                el.value = clipboardText;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';

                document.body.appendChild(el);
                el.select();

                document.execCommand("copy");

                alert("Link: " + clipboardText); //TODO alert box bauen=
            }
        }
    }
</script>

<style scoped>
    button {
        position: fixed;
        bottom: 32px;
        right: 16px;
        height: 40px;
        border: none;
        border-radius: 4px;
        background: #2ecc71;
        outline: none;
        color: white;
        font-size: 14px;
        font-weight: bold;
        padding: 4px 16px;
    }

    button:hover {
        background: gray;
        transition: 0.35s ease;
    }
</style>
