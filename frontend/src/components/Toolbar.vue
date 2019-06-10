<template>
    <div class="uk-width-1-1 uk-flex toolbar">
        <ToolbarElement icon="print" descr="Print (ctrl + p)" :shortcut="['ctrl', 'p']" @pressed="print"></ToolbarElement>
        <hr class="divider">
        <ToolbarElement icon="bold" descr="Bold (ctrl + b)" :shortcut="['ctrl', 'b']" @pressed="bold"></ToolbarElement>
        <ToolbarElement icon="italic" descr="Italic (ctrl + i)" :shortcut="['ctrl', 'i']" @pressed="italic"></ToolbarElement>
        <ToolbarElement icon="strikethrough" descr="Strikethrough (ctrl + -)"
                        :shortcut="['ctrl', '-']" @pressed="strike"></ToolbarElement>
        <hr class="divider">
        <ToolbarElement icon="list" descr="List (ctrl + l)" @pressed="list" :shortcut="['ctrl', 'l']" ></ToolbarElement>
        <ToolbarElement icon="table" descr="Table (ctrl + t)" @pressed="table" :shortcut="['ctrl', 't']" ></ToolbarElement>
        <hr class="divider">
        <ToolbarElement icon="code" descr="Code (ctrl + c)" :shortcut="['ctrl', 'c']" @pressed="code"></ToolbarElement>
        <div id = "render" class ="uk-flex">
            <hr class = "divider">
            <ToolbarElement icon="play" descr="Render (ctrl + s)" :shortcut="['ctrl', 's']" @pressed="render"></ToolbarElement>
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