<template>
    <div class="home uk-height-1-1 uk-width-1-1" uk-height-viewport>
        <Header :newDocument="newDocument"></Header>
        <div class = "uk-margin-auto-vertical get-started-wrapper">
        <div class = "get-started uk-flex">
            <div class = "uk-margin-auto">
                <h1>🐶 Marky</h1>
                <h3 class = "uk-margin-auto">Collaborative Markdown Editing</h3>
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
        <div class ="last-documents width-1-1 uk-padding uk-flex">
            <div class = "uk-flex uk-width-1-1">
                <LastDocuments class = "uk-margin-auto-vertical uk-width-1-1"></LastDocuments>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import {uuid} from 'vue-uuid';
    import Footer from '../components/Footer'
    import Header from "../components/Header";
    import LastDocuments from "./LastDocuments";

    export default {
        name: "Home",
        components: {
            LastDocuments,
            Header,
            Footer,
        },
        methods: {
            newDocument: function () {
                const id = uuid.v4();
                const ls = window.localStorage.getItem("documents");
                const date = new Date();
                const obj = {
                    id: id,
                    created: `${date.getDate()}/${date.getMonth()+1}`
                };

                if(ls !== null){
                    const items = JSON.parse(ls);
                    items.push(obj);
                    window.localStorage.setItem("documents", JSON.stringify(items));
                }else{
                    window.localStorage.setItem("documents", JSON.stringify([obj]));
                }
                window.location = `/documents/${id}`;
            }
        }
    }
</script>

<style scoped>
    .home {
        background: #f1f2f6;
    }

    .get-started-wrapper{
        height: 50vh;
    }

    .get-started{
        margin-top: 25%;
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

    .last-documents{
        margin-top: 128px;
        background: #dfe4ea;
        height: 50vh;
    }

</style>
