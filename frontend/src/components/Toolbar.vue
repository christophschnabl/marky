<template>
    <div class="uk-width-1-1 uk-flex toolbar">
        <ToolbarElement icon="print" descr="Print" @pressed="print"></ToolbarElement>
        <hr class="divider">
        <ToolbarElement icon="bold" descr="Bold" @pressed="bold"></ToolbarElement>
        <ToolbarElement icon="italic" descr="Italic" @pressed="italic"></ToolbarElement>
        <ToolbarElement icon="strikethrough" descr="Strikethrough" @pressed="strike"></ToolbarElement>
        <hr class="divider">
        <ToolbarElement icon="list" descr="List" @pressed="list"></ToolbarElement>
        <ToolbarElement icon="table" descr="Table" @pressed="table"></ToolbarElement>
        <hr class="divider">
        <ToolbarElement icon="code" descr="Code" @pressed="code"></ToolbarElement>
        <div id = "render" class ="uk-flex">
            <hr class = "divider">
            <ToolbarElement icon="play" descr="Render" @pressed="render"></ToolbarElement>
        </div>
    </div>
</template>

<script>
    import ToolbarElement from './ToolbarElement'

    export default {
        name: "toolbar",
        components: {ToolbarElement},
        methods: {
            emit: function(e){
                this.$emit(e);
            },
            print: function(){this.emit("print")},
            bold: function(){this.emit("bold")},
            italic: function(){this.emit("italic")},
            strike: function(){this.emit("strike")},
            list: function(){this.emit("list")},
            table: function(){this.emit("table")},
            code: function(){this.emit("code")},
            render: function(){this.emit("render")}
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
        padding: 0 0 0 16px;
    }

    #render{
        position: absolute;
        right: calc(50% - 43px); /* 42px + 1px (divider)*/
    }
</style>