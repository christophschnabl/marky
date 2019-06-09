<template>
    <div>
        {{link}}
    </div>
</template>

<script>
    export default {
        name: "Document",
        data: () => {
            return {
                link: "empty-link"
            }
        },
        created: function(){
            this.link = this.$route.params.id;
        }
    }
</script>

<style scoped>

</style>