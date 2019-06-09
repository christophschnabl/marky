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
              <router-link to="/" class = "uk-margin-auto"><button class = "uk-button-primary uk-button uk-text-bold">Create document</button></router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Home"
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
