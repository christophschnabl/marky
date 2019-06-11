<template>
    <div class = "footer">
        <div class = "uk-flex">
            <Socials class = "uk-margin-auto"></Socials>
        </div>
        <hr>
        <p class = "uk-margin-remove uk-align-left">Made with <span style="color: #e25555;">&#9829;</span> by Hansi</p>
        <p class = "uk-margin-remove uk-align-right" id = "dsvgo">We do not use cookies or save data.</p>
    </div>
</template>

<script>
    import Socials from "./Socials";

    export default {
        name: "Footer",
        components: {Socials}
    }
</script>

<style scoped>
    .footer{
        position: absolute;
        bottom: 0;
        width: calc(100% - 64px); /* window - padding*2*/
        padding: 16px 32px;
        margin-top: 16px;
        background: #ffffff;
    }

    p {
        color: black;
        font-weight: 200;
        font-size: 14px;
    }

    #dsvgo{
        font-size: 14px;
        color: #7f8c8d;
    }
</style>