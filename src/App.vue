<template>
  <NavBar />
  <HomeView />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import HomeView from "./components/HomeView.vue";

export default {
  name: "App",
  components: {
    NavBar,
    HomeView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
