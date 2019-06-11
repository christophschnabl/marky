<template>
    <div class = "header">
        <div class = "uk-align-left uk-flex uk-height-1-1 logo">
            <span class = "uk-margin-auto-vertical">🐶</span>
            <p class = "uk-margin-auto-vertical">Marky</p>
        </div>
        <div class = "uk-align-right uk-flex uk-height-1-1 new">
            <button class = "uk-margin-auto-vertical uk-flex" v-on:click="newDocument()"><p class ="uk-margin-auto-vertical">New document</p> <span uk-icon="icon:bolt;"></span></button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            newDocument: Function
        }
    }
</script>

<style scoped>
    .header{
        height: 64px;
        background: #ffffff;
        padding: 0 16px;
    }

    .logo span{
        font-size: 24px;
    }

    .logo p{
        font-size: 18px;
        color: black;
        font-weight: 400;
        margin: 0 0 0 8px;
    }

    .new button{
        height: 32px;
        border: none;
        border-radius: 4px;
        background: #2ecc71;
        outline: none;
        color: white;
        font-size: 14px;
        font-weight: bold;
        padding: 4px 16px;
    }

    .new button span{
        margin-left: 4px;
    }

    .new button:hover,.new button:active{
        background: #27ae60;
    }

</style>