<template>
  <div id="app">
    <app-header class="app-header"></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-header {
  z-index: 9999;
}
</style>
