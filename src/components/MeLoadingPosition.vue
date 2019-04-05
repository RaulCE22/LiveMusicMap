<template>
  <q-page-sticky position="bottom-left" :offset="[18, 28]">
    <q-btn v-if="!loading" round color="primary" @click="startMyLocation()" icon="location_searching">
      <q-tooltip >Me location</q-tooltip>
    </q-btn>
    <q-btn v-if="loading" round color="red" @click="cancelMyLocation()" icon="">
      <q-tooltip >Cancel searching</q-tooltip>
      <q-spinner />
    </q-btn>
  </q-page-sticky>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "me-loading-position",
  data() {
    return {
        loading: false,
        watchIDLocation: 0,
    };
  },
  computed: {
    disable():boolean {
      return this.$store.state.disabledAddButton
    }  
  },
  methods: {
    startMyLocation() {
      this.loading = true;
      this.watchIDLocation = navigator.geolocation.watchPosition(
        geo => { 
            this.$store.commit('updateMyLocation',[geo.coords.latitude, geo.coords.longitude])
            this.cancelMyLocation();
        },
        err => console.error(err)
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
