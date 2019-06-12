<template>
    <div class="home uk-height-1-1 uk-width-1-1" uk-height-viewport>
        <Header :newDocument="newDocument"></Header>
        <div class = "uk-margin-auto-vertical">
        <div class = "get-started uk-flex">
            <div class = "uk-margin-auto">
                <h1>🐶 Marky</h1>
                <h3 class = "uk-margin-auto">dkdkdkdkdkdkdkdkdkdkdkdkddkkddkkdkdkdk</h3>
            </div>
        </div>
        <div class = "uk-flex uk-margin-top">
            <div class = "uk-margin-auto uk-flex">
                <button class = "uk-flex">
                    <span>🚀</span>
                    <p class = "uk-margin-auto-vertical">Get started</p>
                </button>
                <button class = "uk-flex">
                    <span>💡</span>
                    <p class = "uk-margin-auto-vertical">How to</p>
                </button>
            </div>
        </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import {uuid} from 'vue-uuid';
    import Footer from '../components/Footer'
    import Header from "../components/Header";

    export default {
        name: "Home",
        components: {
            Header,
            Footer,
        },
        methods: {
            newDocument: function () {
                const id = uuid.v4();
                window.location = `/documents/${id}`;
            }
        }
    }
</script>

<style scoped>
    .home {
        background: #f1f2f6;
    }

    .get-started{
        margin-top: 10%;
    }

    .get-started h1{
        text-align: center;
        font-weight: bold;
        margin-bottom: 16px;
    }

    .get-started h3{
        margin: auto 0px;
    }

    button{
        height: 42px;
        border: none;
        border-radius: 4px;
        background: #2ecc71;
        outline: none;
        color: white;
        font-size: 14px;
        font-weight: bold;
        padding: 4px 16px;
    }

    button span{
        font-size: 20px;
        margin-right: 8px;
    }

    button:hover,button:active{
        background: #27ae60;
        cursor: pointer;
    }

    button:nth-child(n+2){
        margin-left: 16px;
    }

</style>
