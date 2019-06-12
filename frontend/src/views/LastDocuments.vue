<template>
    <div class="documents">
        <div class="uk-padding">
            <h3>Last documents</h3>
            <table class="uk-table">
                <tbody>
                <tr v-for="document in documents" v-bind:key="document.id" v-on:click="redirect(document.id)">
                    <td>{{document.created}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LastDocuments",
        components: {},
        data: () => {
            return {
                documents: []
            }
        },
        mounted: function () {
            const documents = window.localStorage.getItem("documents");
            if (documents !== null) {
                this.documents = JSON.parse(documents);
            }
        },
        methods: {
            redirect: function (id) {
                this.$router.replace(`/documents/${id}`);
            }
        }
    }
</script>

<style scoped>
    .documents h3 {
        font-weight: bold;
        font-size: 22px;
        padding-left: 12px;
        color: black;
        margin-bottom: 8px;
    }

    .uk-table {
        background: white;
        margin: 0 4px;
    }

    .uk-table tr{
        margin: 8px;
    }

    .uk-table tr:hover{
        box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.1);
    }
</style>