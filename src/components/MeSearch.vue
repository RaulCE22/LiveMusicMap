<template>
  <q-page-sticky position="bottom-left" :offset="[18, 28]">
    <q-btn round color="primary" @click="onClickButton()" icon="search" :loading="loading"></q-btn>
  </q-page-sticky>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "me-search",
  data() {
    return {};
  },
  computed: {
    loading(): boolean {
      return this.$store.state.getItemsLoading;
    }
  },
  methods: {
    onClickButton() {
      this.$store.dispatch("getItems");
    }
  }
});
</script>

<style lang="scss" scoped>
</style>

