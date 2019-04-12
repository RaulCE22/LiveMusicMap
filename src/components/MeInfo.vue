<template>
 <div>
    <q-page-sticky position="bottom-left" :offset="[68, 28]">
      <q-btn round color="deep-purple" @click="onClick()" icon="help"></q-btn>
    </q-page-sticky>
    <q-modal minimized v-model="opened">
      <div class="q-ma-md text-center">
        <h4>Add new concert</h4>
        <p v-if="$q.platform.is.mobile">Press and hold <q-icon name="touch_app"/> on the map</p>
        <p v-if="$q.platform.is.desktop">Click with the right mouse button <q-icon name="mouse"/> on the map</p>
      </div>
      <div class="q-ma-md text-center"  v-if="$q.platform.is.mobile">
        <h4>Install app</h4>
        <p v-if="$q.platform.is.android">Click on the icon <q-icon name="more_vert"/> in the top leaft and then 'add to home screen' to install app"</p>
        <p v-if="$q.platform.is.ios">Click on the icon similar to <q-icon name="screen_shared"/> and then 'add to home screen' to install app"</p>
      </div>
      <div class="q-ma-lg text-center">
        <q-btn color="deep-purple" @click="opened = false" label="Ok"/>
      </div>
    </q-modal>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Notify } from "quasar";

export default Vue.extend({
  name: "me-info",
  data() {
    return { opened: false };
  },

  methods: {
    onClick() {
      this.opened = true;
    }
  }
});
</script>