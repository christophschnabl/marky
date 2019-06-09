<template>
    <div class="uk-width-1-1 uk-flex toolbar">
        <ToolbarElement icon="print" @pressed="print"></ToolbarElement>
        <hr class="divider">
        <ToolbarElement icon="bold" @pressed="bold"></ToolbarElement>
        <ToolbarElement icon="italic" @pressed="italic"></ToolbarElement>
        <ToolbarElement icon="strikethrough" @pressed="strike"></ToolbarElement>
        <hr class="divider">
        <ToolbarElement icon="list" @pressed="list"></ToolbarElement>
        <ToolbarElement icon="table" @pressed="table"></ToolbarElement>
        <hr class="divider">
        <ToolbarElement icon="code" @pressed="code"></ToolbarElement>
    </div>
</template>

<script>
    import ToolbarElement from './ToolbarElement'

    export default {
        name: "toolbar",
        components: {ToolbarElement},
        methods: {
            print: function () {
                this.$emit("print");
            },
            bold: function () {
                this.$emit("bold");
            },
            italic: function () {
                this.$emit("italic");
            },
            strike: function () {
                this.$emit("strike");
            },
            list: function () {
                this.$emit("list");
            },
            table: function () {
                this.$emit("table");
            },
            code: function () {
                this.$emit("code");
            },
        }
    }
</script>

<style scoped>
    .divider {
        height: 24px;
        margin: 9px 0;
        width: 1px;
        background: lightgrey;
    }

    .toolbar {
        height: 42px;
        border-bottom: 1px solid lightgrey;
        border-top: 1px solid lightgrey;
        background: white;
    }
</style>