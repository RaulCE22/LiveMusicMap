<template>
  <div>
    <l-map ref="map" :zoom="zoom" :min-zoom="3" :center="center" style="height: 100vh; z-index: 0">
      <v-geosearch :options="geosearchOptions"></v-geosearch>
      <l-tile-layer :url="url" :attribution="attribution"/>
      <v-marker-cluster :options="clusterMarkerOptions">
        <l-marker
          v-for="marker in markers"
          :key="marker.id"
          :lat-lng="marker.location"
          :visible="true"
          :icon="iconMusic"
          @click="clickMarker(marker)"
        ></l-marker>
      </v-marker-cluster>
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
      >
        <l-popup
          :options="{offset: [-5,-15], closeButton: false, closeOnEscapeKey: false, autoClose: false, closeOnClick: false}"
        >
          <q-btn
            no-caps
            class="full-width"
            color="deep-purple"
            label="Add concert"
            @click="onCreateNewItem()"
          />
          <q-btn
            class="closeButtonPopup"
            color="deep-purple"
            round
            flat
            size="xs"
            icon="close"
            @click="onCloseCreateNewItem()"
          />
        </l-popup>
        <!-- <l-popup :content="'<div><button>Add concert</button></div>'" :options="{ keepInView: true, closeButton: false }"></l-popup> -->
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import L from "leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import axios from "axios";
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
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    VGeosearch
  },
  data: () => {
    return {
      map: null,
      iconMusic: L.icon({
        iconUrl: require("../assets/pinPurple.svg"),
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      }),
      iconMusicNew: L.icon({
        iconUrl: require("../assets/pinPurple.svg"),
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      }),
      iconMe: L.icon({
        iconUrl: require("../assets/me.svg"),
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        className: "blinking"
      }),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      clusterMarkerOptions: {
        iconCreateFunction: function(cluster: any) {
          var markers = cluster.getAllChildMarkers();
          var html = '<div class="clusterMarker">' + markers.length + "</div>";
          return L.divIcon({
            html: html,
            className: "mycluster",
            iconSize: L.point(32, 32)
          });
        },
        zoomToBoundsOnClick: true
      },
      geosearchOptions: {
        // Important part Here
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        style: "bar",
        animateZoom: true,
        keepResult: true,
        showPopup: false, // optional: true|false  - default false
        autoClose: true,
        searchLabel: "Search location"
      }
    };
  },
  mounted() {
    //CONTEXTMENU => press and hold mobile or button right on desktop
    (this.$refs.map as any).mapObject.on("contextmenu", ({ latlng }: any) => {
      this.$store.dispatch("getPointInformation", latlng);
    });
    // MOVEEND
    (this.$refs.map as any).mapObject.on("moveend", (res: any) => {
      this.$store.commit("setCenterMap", res.target.getCenter());
      this.$store.commit("setZoomMap", res.target.getZoom());
    });
  },
  computed: {
    center(): any {
      return this.$store.state.center;
    },
    zoom(): any {
      return this.$store.state.zoom;
    },
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
    onCreateNewItem() {
      this.$store.commit("clickAddButton");
    },
    onCloseCreateNewItem() {
      this.$store.commit("removeNewItemLocation");
    },
    getItems() {
      this.$store.dispatch("getItems");
    },
    openPopup(event: any) {
      setTimeout(() => {
        event.target.openPopup();
      }, 100);
    },
    clickMarker(marker: any) {
      this.$store.commit("setConcertInfo", marker);
      (this.$refs.map as any).mapObject.panTo(marker.location);
      console.log(marker);
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
.clusterMarker {
  background: rgba(108, 0, 115, 0.75);
  border: 4px solid rgba(108, 0, 115, 0.35);
  border-radius: 50%;
  height: 32px;
  line-height: 25px;
  text-align: center;
  color: white;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
}
.closeButtonPopup {
  position: absolute !important;
  bottom: 43px;
  right: -2px;
}
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
@keyframes fade {
  from {
    opacity: 0.5;
  }
}
.blinking {
  animation: fade 1s infinite alternate;
}
</style>
