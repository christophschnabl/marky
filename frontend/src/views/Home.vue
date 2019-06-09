<template>
  <div class = "uk-height-1-1 uk-width-1-1 uk-flex background" uk-height-viewport>
    <div class = "uk-margin-auto uk-margin-auto-vertical">
      <div>
          <div class = "uk-flex">
              <h1 id = "logo" class = "uk-margin-auto">🐶</h1>
          </div>
          <p class = "uk-margin-auto uk-margin-top big">MARKY</p>
          <p class = "small">Collaborative Markdown Editing</p>
          <div class = "uk-margin-auto uk-flex uk-margin-top">
              <button class = "uk-button-primary uk-button uk-text-bold uk-margin-auto" v-on:click="createDocument">Create document</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { uuid } from 'vue-uuid';

    export default {
        name: "Home",
        methods: {
            createDocument: function() {
                const id = uuid.v4();
                console.log(id);
                this.$router.push(`/documents/${id}`);
            }
        }
    }
</script>

<style scoped>
    #logo{
        font-size: 156px;
        margin: 0;
    }
    .big, .small{
        text-align: center;
        margin: 0;
        color: black;
    }

    .big{
        font-size: 42px;
    }

    .small{
        font-size: 24px;
    }

    .background{
        background: #ffffff;
    }

</style>
