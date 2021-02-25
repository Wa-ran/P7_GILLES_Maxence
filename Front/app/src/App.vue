<template>
  <div id="app" class="m-auto">
    <router-view name="MainNav"/>
    <router-view/>
  </div>
</template>

<style lang="scss">

$image-path: '~@/../mdb/mdbvue/img'; // image path variable update
@import '~@/../mdb/mdbvue/scss/mdb-free.scss'; // main mdb scss free file
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'); // font import

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
