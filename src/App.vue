<template>
  <q-layout id="app">
    <me-map></me-map>
    <!-- <me-filter></me-filter> -->
    <me-search></me-search>
    <me-concert-info></me-concert-info>
    <me-loading-position></me-loading-position>
    <me-modal></me-modal>
  </q-layout>
</template>
<script lang="ts">
import Vue from 'vue'
import MeMap from './components/MeMap.vue';
import MeFilter from './components/MeFilter.vue';
import MeSearch from './components/MeSearch.vue';
import MeConcertInfo from './components/MeConcertInfo.vue';
import MeLoadingPosition from './components/MeLoadingPosition.vue';
import MeModal from './components/MeModal.vue';

export default Vue.extend({
  components: {MeMap, MeFilter, MeSearch, MeConcertInfo, MeLoadingPosition, MeModal} ,
})
</script>

<style>
</style>
