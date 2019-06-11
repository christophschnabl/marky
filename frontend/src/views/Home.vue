<template>
    <div class="home uk-height-1-1 uk-width-1-1" uk-height-viewport>
        <Header :newDocument="newDocument"></Header>
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
                this.$router.replace(`/documents/${id}`);
            }
        }
    }
</script>

<style scoped>
    .home {
        background: #f1f2f6;
    }

    .logo span {
        font-size: 84px;
    }

    .logo-text h1 {
        font-size: 42px;
    }


</style>
