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
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            customEmit: function (data) {
                console.log(data)
                console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
            }
        },
        methods: {
            clickButton: function (data) {
                // $socket is socket.io-client instance
                this.$socket.emit('emit_method', data)
            }
        }
    }
</script>

<style scoped>

</style>