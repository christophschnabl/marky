<template>
    <div class="user-list uk-flex uk-margin-auto-vertical">
        <div v-for="user in users" v-bind:key="user.name">
            <div :uk-tooltip="get(user.name)" class = "user-list-element uk-margin-auto-vertical">{{ user.emoji }}</div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "UserList",
        components: {
        },
        props: {
            users: Array
        },
        data: () => {
            return {};
        },
        methods: {
            get: function(name){
                return `title:${name};pos:bottom;`
            }
        }
    }
</script>

<style scoped>
    .user-list{
        font-size: 24px;
    }

    .user-list > div{
        display: flex;
    }

    .user-list-element{
        padding: 0 4px;
        margin-left: 8px;
        margin-right: 8px;
    }

    .user-list-element:hover{
        background:  #eeeeee;
    }


</style>
