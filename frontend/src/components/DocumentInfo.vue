<template>
    <div class="document-info">
        <div class="uk-flex">
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
    }

    .documentname{
        margin-left: 16px;
    }

    .documentname input{
        font-size: 18px;
        color: black;
        margin-bottom: 0;
        outline: none;
        border: 1px solid transparent;
    }

    .documentname input:hover{
        border: 1px solid lightgrey;
    }

    .documentname input:focus{
        border: 1px solid deepskyblue;
    }

    .logo{
        width: 32px;
        font-size: 22px;
    }
</style>