<template>
    <div class="document-info uk-flex">
        <div class="uk-flex uk-margin-auto-vertical">
            <div class = "logo uk-flex">
                <span class = "uk-margin-auto-vertical uk-margin-auto">✏️</span>
            </div>
            <div class = "uk-height-1-1 info-wrapper">
                <div class="documentname">
                    <input :value="documentName">
                </div>
                <Navigation @print="print" @download="download"></Navigation>
            </div>
        </div>
    </div>
</template>

<script>
    import Navigation from "./Navigation";
    export default {
        name: "DocumentInfo",
        components: {Navigation},
        props: {
            users: Array,
            documentName: String
        },
        data: () => {
            return {

            }
        },
        methods: {
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
    .document-info{
        padding: 16px;
        height: 52px;
    }

    .info-wrapper{
        margin-left: 16px;
    }

    .documentname input{
        font-weight: 200;
        font-size: 16px;
        color: black;
        margin-bottom: 0;
        outline: none;
        padding: 2px 4px;
        border: none;
        border-bottom: 1px solid lightgrey;
    }

    .documentname input:hover{
        border-bottom: 1px solid darkgrey;
    }

    .documentname input:focus{
        border-bottom: 1px solid deepskyblue;
    }

    .logo{
        width: 32px;
        font-size: 22px;
    }

    .users{
        position: absolute;
        right: 16px;
    }

</style>