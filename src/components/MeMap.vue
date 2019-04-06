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
      >
        <l-popup :options="{minWidth: 100}">
          Name: {{marker.name}}
          <br>
          Date: {{marker.date | formatDate}}
          <br>
          Description: {{marker.description}}
        </l-popup>
      </l-marker>
      <l-marker
        v-if="myLocation !== null"
        :key="0"
        :lat-lng="myLocation"
        :visible="true"
        :icon="iconMe"
      ></l-marker>
      <l-marker
        v-if="newItemLocation !== null"
        :key="1"
        :lat-lng="newItemLocation"
        :visible="true"
        :icon="iconMusicNew"
        @add="openPopup($event)"
        @move="openPopup($event)"
      >
        <l-popup :options="{closeButton: false, keepInView: true, closeOnEscapeKey: false}">
          <q-btn no-caps color="primary" label="Add concert" @click="onCreateNewItem()"/>
        </l-popup>
        <!-- <l-popup :content="'<div><button>Add concert</button></div>'" :options="{ keepInView: true, closeButton: false }"></l-popup> -->
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import L from "leaflet";
import { Icon } from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import VGeosearch from "vue2-leaflet-geosearch/Vue2LeafletGeosearch.vue";

import { LMap, LTileLayer, LPopup, LTooltip, LMarker } from "vue2-leaflet";
import { date } from "quasar";

export default Vue.extend({
  name: "me-map",
  components: {
    LMap,
    LTileLayer,
    LPopup,
    LTooltip,
    LMarker,
    VGeosearch
  },
  data: () => {
    return {
      map: null,
      center: [0, 0],
      iconMusic: L.icon({
        iconUrl: require("../assets/pinGreen.svg"),
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      }),
      iconMusicNew: L.icon({
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
        ref: "searchControl",
        provider: new OpenStreetMapProvider({
          // params: {
          //   viewbox: "50.88,-26.49,63.54,-16.33",
          //   bounded: "1"
          // }
        }),
        showMarker: false,
        style: "bar",
        animateZoom: true,
        keepResult: true,
        showPopup: false, // optional: true|false  - default false
        marker: {
          // optional: L.Marker    - default L.Icon.Default
          // icon: L.icon({
          //   iconUrl: require("../assets/pinGreen.svg"),
          //   iconSize: [30, 30],
          //   iconAnchor: [15, 30]
          // }),
          // draggable: true
        },
        autoClose: true,
        searchLabel: "Search location"
      }
    };
  },
  mounted() {
    // setTimeout(() => {
    //   (this.$refs.searchControl as any).getContainer().onclick = (e: any) => { e.stopPropagation(); };
    // }, 1000);
    (this.$refs.map as any).mapObject.on(
      "geosearch/showlocation",
      ({ location }: any) => {
        //this.$store.commit("addNewItemLocation", [location.y, location.x]);
        //this.$store.commit("enableAddButton");
      }
    );
    (this.$refs.map as any).mapObject.on("click", ({ latlng }: any) => {
      this.$store.commit("addNewItemLocation", [
        latlng.lat.toString(),
        latlng.lng.toString()
      ]);
      console.log(latlng);
      //this.$store.commit("enableAddButton");
    });
    (this.$refs.map as any).mapObject.on("moveend", (res: any) => {
      console.log(res);
      var bounds = res.target.getBounds();
      console.log(
        "Esquina NorOeste: ",
        bounds.getNorthWest(),
        "Esquina NorEste: ",
        bounds.getNorthEast(),
        "Esquina SurOeste: ",
        bounds.getSouthWest(),
        "Esquina SurEste: ",
        bounds.getSouthEast()
      );
    });
  },
  computed: {
    markers(): any {
      return this.$store.state.markers;
    },
    myLocation(): any {
      return this.$store.state.myLocation;
    },
    newItemLocation(): any {
      return this.$store.state.newItemLocation;
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
    },
    onCreateNewItem() {
      console.log("Create new item");
      this.$store.commit("clickAddButton");
    },
    openPopup(event: any) {
      setTimeout(() => {
        event.target.openPopup();
        console.log("Open");
      }, 100);
    }
  },
  filters: {
    formatDate(value: Date) {
      return date.formatDate(value, "DD-MM-YYYY (HH:mm)");
    }
  }
});
</script>

<style>
.leaflet-top {
  top: 40px !important;
}
.leaflet-control-zoom {
  margin-top: 20px !important;
  margin-left: 10px !important;
}
.leaflet-control-geosearch.bar {
  width: auto !important;
  margin-left: 10px !important;
  margin-right: 10px !important;
}
.leaflet-control-geosearch .results > * {
  border-bottom: 1px solid #ccc !important;
  white-space: normal !important;
}
</style>
