<template>
  <nav class="nav custom-nav">
    <!-- <img src="../assets/sendy.png" class="nav-img"  height="50" alt="sendy" /> -->
    <h3 class="nav-img">Sendy</h3>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {},
};
</script>

<style>
.custom-nav {
  /* height: 0.2em !important; */
  background-color: #1b7fc3 !important;
}

.nav-img {
  color: white;
  font-weight: bolder;
  margin: 0.2em;

}
</style>