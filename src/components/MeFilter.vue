<template>
  <q-range
    :value="lazy"
    @change="val => onChangeValue(val)"
    :left-label-value="`${lazy.min} dia/s`"
    :right-label-value="`${lazy.max} dia/s`"
    :min="0"
    :max="20"
    :step="1"
    label-always
    snap
  />
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "me-filter",
  data() {
    return {
      rangeValues: {
        min: 0,
        max: 5
      },
      lazy: {
        min: 0,
        max: 5
      }
    };
  },
  methods: {
    onChangeValue(val: any) {
      this.lazy = val;
    }
  }
});
</script>
<style lang="scss" scoped>
.q-slider {
  position: fixed;
  bottom: 28px;
  padding-left: 70px !important;
  padding-right: 70px !important;
}
</style>

