<template>
  <q-page-sticky position="bottom-right" :offset="[18, 28]">
    <q-btn
      v-if="!loading"
      round
      color="deep-purple"
      @click="startMyLocation()"
      icon="location_searching"
    ></q-btn>
    <q-btn v-if="loading" round color="deep-purple-4" @click="cancelMyLocation()" icon>
      <q-spinner/>
    </q-btn>
  </q-page-sticky>
</template>
<script lang="ts">
import Vue from "vue";
import { Notify } from "quasar";

export default Vue.extend({
  name: "me-loading-position",
  data() {
    return {
      loading: false,
      watchIDLocation: 0
    };
  },
  computed: {
    disable(): boolean {
      return this.$store.state.disabledAddButton;
    }
  },
  methods: {
    startMyLocation() {
      this.loading = true;
      this.watchIDLocation = navigator.geolocation.watchPosition(
        geo => {
          this.$store.commit("updateMyLocation", [
            geo.coords.latitude,
            geo.coords.longitude
          ]);
          this.cancelMyLocation();
        },
        err => {
          Notify.create({
             color: 'deep-purple',
             icon: 'warning',
position: "top",
            message: "No podemos obtener tu posicion GPS :("
          });
          this.cancelMyLocation();
        }
      );
    },
    cancelMyLocation() {
      this.loading = false;
      navigator.geolocation.clearWatch(this.watchIDLocation);
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
