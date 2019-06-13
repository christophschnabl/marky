<template>
    <div class="document-info uk-flex">
        <div class="uk-flex uk-margin-auto-vertical">
            <div class = "logo uk-flex">
                <span class = "uk-margin-auto-vertical uk-margin-auto">✏️</span>
            </div>
            <div class = "uk-height-1-1 info-wrapper">
                <div class="documentname">
                    <input :value="documentName" v-on:input="updateDocumentName($event.target.value);">
                </div>
                <Navigation @save="save" @print="print" @download="download"></Navigation>
            </div>
        </div>
        <div class = "user-wrapper uk-flex uk-height-1-1 uk-position-absolute">
            <UserList :users="users"></UserList>
            <div class = "divider"></div>
            <div class = "uk-flex">
                <ShareButton class = "uk-margin-auto-vertical"></ShareButton>
            </div>
        </div>
    </div>
</template>

<script>
    import Navigation from "./Navigation";
    import UserList from "./UserList";
    import ShareButton from "../components/ShareButton";

    export default {
        name: "DocumentInfo",
        components: {
            Navigation,
            UserList,
            ShareButton
        },
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
            },
            save: function(){
                this.$emit("save");
            },
            updateDocumentName: function(name){
                console.log("document name has changed");
                this.$emit("documentNameChanged",name);
            }
        }
    }
</script>

<style scoped>
    .document-info{
        padding: 16px;
        height: 52px;
        position: relative;
        background: white;
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
        padding: 2px 4px 6px;
        width: 256px;
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
        font-size: 32px;
    }

    .users{
        position: absolute;
        right: 16px;
    }

    .user-wrapper{
        right: 16px;
        bottom: 0;
        top: 0;
    }


    .share{
        margin-left: 32px;
    }

    .divider{
        width: 1px;
        height: 50%;
        margin: auto 16px auto 0;
        background: lightgrey;
    }

</style>
