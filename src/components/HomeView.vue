<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card booking-container">
          <div class="details">
            <h4 class="welcome">Welcome</h4>
            <p>Move anything, simply sendit</p>

            <div class="order">
              <button
                v-if="!showReOrder"
                @click="makeOrder"
                id="order_btn"
                class="btn btn-primary order_btn"
              >
                Place Order
              </button>

              <!-- reorder -->
              <button
                v-if="showReOrder"
                @click="reOrder"
                class="btn btn-primary"
              >
                Re-Order
              </button>
            </div>

            <hr class="bg-primary" />

            <div class="truck-details">
              <div class="header">
                <h5>Trucks</h5>
                <a href="">show all</a>
              </div>

              <div :class="{ selected: isSelected }" class="truck">
                <img src="../assets/truck.png" class="truck-img" alt="" />
                <p>{{ truckInfo.regNo }}</p>
                <p class="small text-muted">{{ truckInfo.driver }}</p>
              </div>
            </div>

            <div v-if="isSelected && !orderConfirmed" class="confirm-order">
              <button @click="confirmOrder" class="btn btn-sm btn-warning">
                Confirm Order
              </button>
            </div>

            <p
              v-if="orderConfirmed && !orderCancelled"
              class="small text-success success-order-msg"
            >
              Your order is on its way
            </p>

            <div v-if="orderCancelled" class="cancel-warn alert alert-danger">
              <p class="small text-danger">{{ cancelOrderMessage }}</p>
            </div>
            <hr />

            <div class="alert alert-info" v-if="errors?.message">
              <p>{{ errors.message }}</p>
            </div>

            <div v-if="orderConfirmed" class="cargo-deta">
              <TruckDetails :truckInfo="truckInfo" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="map">
          <div class="info-window">
            <div class="window-header">
              <h6>Truck</h6>
            </div>
            <div class="info-details">
              <div class="info-truck">
                <img src="../assets/truck.png" class="" alt="" />
                <p class="text-primary">{{ truckInfo.regNo }}</p>
              </div>
            </div>
          </div>

          <GMapMap class="map" :center="center" :zoom="zoom">
            <GMapMarker
              :position="center"
              :icon="'https://images.sendyit.com/web_platform/vendor_type/top/25_freight.png'"
            >
              <GMapInfoWindow>
                <div><TruckDetails :truckInfo="truckInfo" /></div>
              </GMapInfoWindow>
            </GMapMarker>
          </GMapMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TruckDetails from "./TruckDetails.vue";

// utils
import fetchLocations from "../utils/dataService";

// cordinates

const cordinates = {
  1: { lat: -1.2989826, lng: 36.776811 },
  2: { lat: -1.297459, lng: 36.776747 },
  3: { lat: -1.296193, lng: 36.776726 },
  4: { lat: -1.296097, lng: 36.779236 },
  5: { lat: -1.296151, lng: 36.777637 },
  6: { lat: -1.296215, lng: 36.776693 },
  7: { lat: -1.294252, lng: 36.776586 },
  8: { lat: -1.294048, lng: 36.77679 },
  9: { lat: -1.293973, lng: 36.779118 },
  10: { lat: -1.292622, lng: 36.779075 },
  11: { lat: -1.291844, lng: 36.779049 },
  12: { lat: -1.300355, lng: 36.77385 },
  13: { lat: -1.291879, lng: 36.778389 },
};

const defaultTruckInfo = {
  regNo: "KAY 747E",
  driver: "Driver A",
  size: 27,
  cargoType: "FlatBed",
  goodsType: "Rice",
  location: "Kenya",
  lastUpdated: 0,
};

export default {
  name: "HomeView",
  props: {},
  components: {
    TruckDetails,
  },

  mounted() {
    fetchLocations(cordinates, "google_map_api_key_here")
      .then((response) => {
        this.locationData = response;
        console.log(response);
        this.truckInfo.location =
          this.locationData["12"].name?.formatted_address;
      })
      .catch((error) => {
        this.errors.message = "An error occured please try again";
        console.log(error);
      });
  },
  data: function () {
    // zoom
    const zoom = 15;
    const markerOptions = {};
    const isSelected = false;
    const orderConfirmed = false;
    const orderCancelled = false;
    const showReOrder = false;
    const errors = {};
    let locationData;
    // initial driver's cordinates
    let center = { lat: -1.300355, lng: 36.77385 };

    // truck detials

    const truckInfo = {
      ...defaultTruckInfo,
    };

    const cancelOrderMessage = "";

    return {
      count: 0,
      markerOptions,
      isSelected,
      orderConfirmed,
      center,
      truckInfo,
      locationData,
      cancelOrderMessage,
      orderCancelled,
      errors,
      zoom,
      showReOrder,
    };
  },

  methods: {
    makeOrder(event) {
      if (event) {
        this.isSelected = true;
        this.showReOrder = true;
      }
    },

    reOrder(event) {
      if (event) {
        // refresh data
        location.reload();
      }
    },

    confirmOrder(event) {
      if (!event) {
        return;
      }
      this.orderConfirmed = true;
      let timer = setInterval(() => {
        this.count += 1;
        let key = "" + this.count;
        const newOptions = {
          position: {
            lat: cordinates[key].lat,
            lng: cordinates[key].lng,
          },
        };

        this.truckInfo.location = this.locationData[key].name.formatted_address;
        this.center = newOptions.position;

        this.truckInfo.lastUpdated = 5;
        if (this.count == 11) {
          clearInterval(timer);
          this.waitCustomerResponse();
        }
      }, 5000);
    },

    waitCustomerResponse() {
      console.log("Your order has arrived");
      // wait for 20sec
      let timeOut = setTimeout(() => {
        clearTimeout(timeOut);

        // cancel order
        this.cancelOrder();
      }, 20 * 1000);
    },

    cancelOrder() {
      // change status
      this.orderCancelled = true;
      const newDriverDetails = {
        regNo: "KDC 001E",
        driver: "Driver B",
        size: 15,
        cargoType: "FlatBed",
        goodsType: "Maize",
      };
      this.cancelOrderMessage =
        "Your order was cancelled finding you another driver...";

      // wait for ten seconds
      const nextDriverTimer = setTimeout(() => {
        clearTimeout(nextDriverTimer);
        this.truckInfo = { ...newDriverDetails };
        this.truckInfo.location =
          this.locationData["13"].name.formatted_address;
        this.center = { lat: -1.291879, lng: 36.778389 };
        this.cancelOrderMessage = "Your order is on its way";
        this.orderCancelled = false;
      }, 10 * 1000);
    },
  },

  beforeUnmount() {
    //
    this.errors = {};
    this.count = 0;
    this.isSelected = false;
    this.showReOrder = true;
  },
};
</script>

<style scoped>
.booking-container {
  margin: 1.5em;
  box-shadow: 5px 5px 5px 5px rgba(0.1, 0.1, 0.1, 0.4);
}

.details {
  margin: 0.5em;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 1.6em 0 1.6em;
}

.truck {
  padding: 0.2em;
  border-radius: 4px;
  background-color: rgb(155, 207, 240);
  color: rgba(74, 74, 250, 0.514);

  display: flex;
  flex-direction: row;
}

.truck-img {
  height: 30px;
  color: white;
  margin: 0.5em;
  vertical-align: middle;
}

.truck p {
  margin: 0.5em;
}

/* map */

.info-window {
  position: absolute;
  z-index: 99;
  padding: 0.5em;
  border-radius: 4px;
  margin-top: 4.5em;
  background-color: #fff;
}

.info-truck {
  padding: 0.5em;
  width: 100%;
  background-color: skyblue;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.info-truck img {
  height: 20px;
}

.info-truck > * {
  margin: 0.2em;
}

.map {
  height: 100vh;
  width: 100%;
}

/*other */
.selected {
  border: 3px solid #f57f20;
}

.confirm-order {
  margin-top: 0.2rem;
}

.confirm-order button {
  width: 100%;
}

.success-order-msg {
  margin: 0.1em;
}
</style>