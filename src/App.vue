<template>
  <q-layout id="app">
    <me-map></me-map>
    <me-filter></me-filter>
    <me-buttons></me-buttons>
  </q-layout>
</template>
<script lang="ts">
import Vue from 'vue'
import MeMap from './components/MeMap.vue';
import MeFilter from './components/MeFilter.vue';
import MeButtons from './components/MeButtons.vue';

export default Vue.extend({
  components: {MeMap, MeFilter, MeButtons}  
})
</script>

<style>
</style>
