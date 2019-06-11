<template>
    <div>
        <button v-on:click="set" class="uk-margin-auto uk-margin-auto-vertical share" type="button" uk-toggle="target: #share-modal">Share Document</button>
        <div id="share-modal" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <h3 class="uk-modal-title">Share document</h3>
                <hr class = "divider">
                <input :value="shareUrl">
                <div>
                    <button class = "share uk-flex uk-margin-small-top" v-on:click="copyUrl">
                        <p class = "uk-margin-auto-vertical">Copy to clipboard</p>
                        <span uk-icon="copy" class = "uk-margin-small-left"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShareButton",
        data: function(){
            return {
                shareUrl: "",
                copied: false,
            }
        },
        methods: {
            set: function(){
                //adapted from https://stackoverflow.com/a/6042031/6267827
                const protocol = location.protocol;
                const slashes = protocol.concat("//");
                const host = slashes.concat(window.location.hostname);

                const clipboardText = host + ':' + location.port + this.$route.fullPath;
                this.shareUrl = clipboardText;
            },
            copyUrl: function(){
                //adapted from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
                const el = document.createElement('textarea');
                el.value = this.shareUrl;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';

                document.body.appendChild(el);
                el.select();

                document.execCommand("copy");
                this.copied=true;
            }
        }
    }
</script>

<style scoped>
    .share {
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

    .share:hover {
        background: #27ae60;
        transition: 0.35s ease;
        cursor: pointer;
    }

    #share-modal h3{
        margin-bottom: 0px;
        font-size: 20px;
    }

    #share-modal input{
        background: #f5f5f5;
        border: none;
        font-size: 14px;
        color: #7f8c8d;
        outline: none;
        height: 42px;
        width: calc(100% - 32px);
        padding: 2px 16px;
    }

    #overlay{
        position: absolute;
        height: 100%;
        background: white;
        left: 0;
        bottom: 0;
        width: 100%;
        transition: 1s;
    }

    #overlay span{
        color: black;
        font-size: 18px;
    }

    .divider{
        border-bottom: 0.5px solid #f5f5f5;
        margin: 4px 0 32px;
    }
</style>
