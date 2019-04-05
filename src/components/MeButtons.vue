<template>
  <q-page-sticky position="bottom-right" :offset="[18, 28]">
    <q-btn round color="primary" @click="onClickAddButton" :disable="disable" icon="done">
      <q-tooltip v-if="disable">Search place first</q-tooltip>
    </q-btn>
  </q-page-sticky>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "me-buttons",
  data() {
    return {
    };
  },
  computed: {
    disable():boolean {
      return this.$store.state.disabledAddButton
    }  
  },
  methods: {
    onClickAddButton() {
      this.$store.commit('clickAddButton');
    }
  }
});
</script>

<style lang="scss" scoped>
</style>

