<template>
  <q-range
    :value="lazy"
    color="deep-purple"
    @change="val => onChangeValue(val)"
    :left-label-value="`${lazy.min} dia/s`"
    :right-label-value="`${lazy.max} dia/s`"
    :min="-1"
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
    };
  },
  computed: {
    lazy(this: any): any {
      return this.$store.state.range;
    }
  },
  methods: {
    onChangeValue(val: any) {
      console.log(val);
      this.$store.commit('setRange',val);
    }
  },
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

