<template>
  <q-layout id="app">
    <me-map></me-map>
    <!-- <me-filter></me-filter> -->
    <me-buttons></me-buttons>
    <me-loading-position></me-loading-position>
    <me-modal></me-modal>
  </q-layout>
</template>
<script lang="ts">
import Vue from 'vue'
import MeMap from './components/MeMap.vue';
import MeFilter from './components/MeFilter.vue';
import MeButtons from './components/MeButtons.vue';
import MeLoadingPosition from './components/MeLoadingPosition.vue';
import MeModal from './components/MeModal.vue';

export default Vue.extend({
  components: {MeMap, MeFilter, MeButtons, MeLoadingPosition, MeModal}  
})
</script>

<style>
</style>
