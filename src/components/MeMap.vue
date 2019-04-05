<template>
  <div>
    <l-map ref="map" :zoom="3" :min-zoom="3" :center="center" style="height: 100vh; z-index: 0">
      <v-geosearch :options="geosearchOptions"></v-geosearch>
      <l-tile-layer :url="url" :attribution="attribution"/>
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="marker.location"
        :visible="true"
        :icon="iconMusic"
        @click="onMarkerClick(marker.date)"
      ></l-marker>
        <l-marker v-if="myLocation !== null" :key="0" :lat-lng="myLocation" :visible="true" :icon="iconMe"></l-marker>
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
  components: {
    LMap,
    LTileLayer,
    LMarker,
    VGeosearch
  },
  data: () => {
    return {
      map: null,
      center: [0, 0],
      iconMusic: L.icon({
        iconUrl: require("../assets/pin.svg"),
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      }),
      iconMe: L.icon({
        iconUrl: require("../assets/user.svg"),
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
      }
    };
  },
  mounted() {
    (this.$refs.map as any).mapObject.on(
      "geosearch/showlocation",
      ({ location }: any) => {
        this.$store.commit("addNewItemLocation", [location.y, location.x]);
        this.$store.commit("enableAddButton");
      }
    );
  },
  computed: {
    markers(): any {
      return this.$store.state.markers;
    },
    myLocation(): any {
      return this.$store.state.myLocation;
    }
  },
  watch: {
    myLocation(location) {
      (this.$refs.map as any).mapObject.setView(location, 16);
    }
  },
  methods: {
    onMarkerClick(id: string) {
      console.log("Marker clicked: ", id);
    }
  }
});
</script>

<style>
.leaflet-top {
  top: 40px;
}
.leaflet-control-zoom {
  margin-top: 50px;
  margin-left: 3px;
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
