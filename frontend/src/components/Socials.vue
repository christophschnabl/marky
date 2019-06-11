<template>
    <div class = "socials">
        <div class = "uk-flex social-icons">
            <a uk-icon="icon:github;ratio:1.1" href = "https://github.com/christophschnabl/marky" target="_blank" uk-tooltip="title:GitHub Repository;pos:top"></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Socials"
    }
</script>

<style scoped>
.social-icons a{
    color: black;
    margin: 0 8px;
}
</style>