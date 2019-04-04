<template>
  <div>
    <l-map ref="map" :zoom="18" :min-zoom="3" :center="center" style="height: 100vh; z-index: 0">
      <v-geosearch :options="geosearchOptions"></v-geosearch>
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
import L from "leaflet";
import { Icon } from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch/Vue2LeafletGeosearch.vue";

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
        iconAnchor: [15, 30]
      }),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      geosearchOptions: {
        // Important part Here
        provider: new OpenStreetMapProvider({
          params: {
            viewbox: "50.88,-26.49,63.54,-16.33",
            bounded: "1"
          }
        }),
        style: "bar",
        animateZoom: true,
        keepResult: true,
        showPopup: false, // optional: true|false  - default false
        marker: {
          // optional: L.Marker    - default L.Icon.Default
          icon: L.icon({
            iconUrl: require("../assets/pinGreen.svg"),
            iconSize: [30, 30],
            iconAnchor: [15, 30]
          }),
          draggable: false
        },
        autoClose: true,
        searchLabel: "Search location"
      },
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
    (this.$refs.map as any).mapObject.on(
      "geosearch/showlocation",
      (data: any) => console.log(data)
    );
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch
  }
});
</script>

<style>
.leaflet-top{ 
  top: 40px;
}
.leaflet-control-geosearch.bar { 
  width: auto;
  margin-left: 10px;
  margin-right: 10px;
}
.leaflet-control-geosearch .results > * {
  border-bottom: 1px solid #ccc;
  white-space: normal;
}
</style>
