<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from "vue";

import VueLocalStorage from "vue-ls";
Vue.use(VueLocalStorage, {
  namespace: "cart__",
  name: "ls",
  storage: "local"
});
</script>

<style>
body {
  overflow-x: hidden;
  overflow-y: scroll;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>