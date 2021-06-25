<template>
  <div class="truck-info">
    <div class="header-name">
      <p>{{ truckInfo?.regNo }}</p>
    </div>

    <div class="details">
      <div class="weight">{{ truckInfo.size }} Tonnes</div>
      <div class="cargo">{{ truckInfo.cargoType }}</div>
      <div class="type">{{ truckInfo.goodsType }}</div>
    </div>

    <div class="location">Location : {{ truckInfo.location }}</div>

    <div class="last-local">
      <p class="small">last updated {{ truckInfo.lastUpdated }} seconds ago</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TruckDetails",
  props:{
    truckInfo:Object
  },
};
</script>

<style scoped>
.details {
  display: flex;
  flex-direction: row;
}

.cargo,
.type {
  border-left: 2px solid rgba(0.1, 0.1, 0.1, 0.2);
}

.details > * {
  padding: 0.2em 0.7em 0.2em 0.7em;
}
.truck-info {
  text-align: center;
}
</style>