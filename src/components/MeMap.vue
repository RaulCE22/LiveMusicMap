<template>
  <div>
    <l-map ref="map" :zoom="18" :center="center" style="height: 100vh; z-index: 0">
      <l-tile-layer :url="url" :attribution="attribution"/>
      <l-marker
        :key="1"
        :lat-lng="[-21.340082, 55.466607]"
        :visible="true"
        :icon="iconMusic"
        @click="onMarkerClick(1)"
      ></l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Icon } from "leaflet";

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default Vue.extend({
  name: "me-map",
  data: () => {
    return {
      map: null,
      center: [-21.340082, 55.466607],
      iconMusic: L.icon({
        iconUrl: require("../assets/pin.svg"),
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      }),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: []
    };
  },
  methods: {
    getGeolocation() {
      console.log("INIT");
      navigator.geolocation.getCurrentPosition(
        geo => (this.center = [geo.coords.latitude, geo.coords.longitude]),
        err => console.error(err)
      );
    },
    onMarkerClick(id: string) {
      console.log("Marker clicked: ", id);
    }
  },
  mounted() {
    //this.getGeolocation();
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
});
</script>

<style>

</style>
