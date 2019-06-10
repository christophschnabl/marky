<template>
    <div class="toolbar-element uk-flex">
        <button :uk-icon="iconAttribute"
                class="uk-margin-auto uk-margin-auto-vertical"
                :uk-tooltip="iconTooltip" v-on:click="pressed" v-shortkey.once="shortcut" @shortkey="pressed()"></button>
    </div>
</template>

<script>
    export default {
        name: "ToolbarElement",
        props: {
            icon: String,
            descr: String,
            shortcut: Array
        },
        data: function(){
            return {
                iconAttribute: "",
                iconTooltip: "",
            }
        },
        methods: {
            pressed: function(){
                this.$emit("pressed");
            },
            test: () => {
                console.log("xx");
            }
        },
        created: function(){
            this.iconTooltip = `title:${this.descr};pos:bottom`;
            this.iconAttribute = `icon:${this.icon};ratio:1.1`;
        }
    }
</script>

<style scoped>
    .toolbar-element {
        height: 42px;
        width: 42px;
    }

    .toolbar-element > button:hover{
        background: #f6f6f6;
    }

    .toolbar-element > button {
        color: black;
        outline: none;
        padding: 4px;
    }
</style>