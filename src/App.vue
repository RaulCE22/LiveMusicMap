<template>
  <q-layout id="app">
    <me-login></me-login>
    <me-map></me-map>
    <!-- <me-filter></me-filter> -->
    <me-search></me-search>
    <me-info></me-info>
    <me-concert-info></me-concert-info>
    <me-loading-position></me-loading-position>
    <me-modal></me-modal>
  </q-layout>
</template>
<script lang="ts">
import Vue from 'vue'
import MeLogin from './components/MeLogin.vue';
import MeMap from './components/MeMap.vue';
import MeFilter from './components/MeFilter.vue';
import MeSearch from './components/MeSearch.vue';
import MeInfo from './components/MeInfo.vue';
import MeConcertInfo from './components/MeConcertInfo.vue';
import MeLoadingPosition from './components/MeLoadingPosition.vue';
import MeModal from './components/MeModal.vue';

import axios from 'axios';

export default Vue.extend({
  components: {MeLogin, MeMap, MeFilter, MeSearch,MeInfo, MeConcertInfo, MeLoadingPosition, MeModal} ,
})
</script>

<style>
</style>
