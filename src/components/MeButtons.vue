<template>
  <q-page-sticky position="bottom-right" :offset="[18, 28]">
    <q-btn round color="primary" @click="onClickAddButton" icon="add"/>
  </q-page-sticky>
</template>
<script>
export default {
  name: "me-buttons",
  data() {
    return {};
  },
  methods: {
    onClickAddButton() {
      alert("Add button clicked");
    }
  }
};
</script>
<style lang="scss" scoped>

</style>

