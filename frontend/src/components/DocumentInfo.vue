<template>
    <div class="document-info uk-flex">
        <div class="uk-flex uk-margin-auto-vertical">
            <div class = "logo uk-flex">
                <span class = "uk-margin-auto-vertical uk-margin-auto">✏️</span>
            </div>

            <div class="uk-height-1-1 documentname uk-margin-auto-vertical">
                <input :value="name">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DocumentInfo",
        data: () => {
            return {
                name: "Document 1",
            }
        }
    }
</script>

<style scoped>
    .document-info{
        padding: 16px;
        height: 42px;
    }

    .documentname{
        margin-left: 16px;
    }

    .documentname input{
        font-size: 18px;
        color: black;
        margin-bottom: 0;
        outline: none;
        padding: 2px 4px;
        border: none;
        border-bottom: 1.5px solid lightgrey;
    }

    .documentname input:hover{
        border-bottom: 1.5px solid darkgrey;
    }

    .documentname input:focus{
        border-bottom: 1.5px solid deepskyblue;
    }

    .logo{
        width: 32px;
        font-size: 22px;
    }
</style>