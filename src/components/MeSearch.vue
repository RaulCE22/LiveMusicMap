<template>
  <q-page-sticky position="bottom-left" :offset="[18, 28]">
    <q-fab
      class="my-search"
      @show="showTooltip()"
      @hide="hideTooltip()"
      direction="up"
      icon="search"
      active-icon="youtube_searched_for"
      color="deep-purple"
    >
      <q-fab-action color="deep-purple" @click="onClickButton({min: 0, max: 0})" icon="today">
        <q-tooltip anchor="center left" self="center right" :offset="[20, 0]" v-model="show">Today</q-tooltip>
      </q-fab-action>
      <q-fab-action color="deep-purple" @click="onClickButton({min: 1, max: 1})" icon="event">
        <q-tooltip
          anchor="center left"
          self="center right"
          :offset="[20, 0]"
          v-model="show"
        >Tomorrow</q-tooltip>
      </q-fab-action>
      <q-fab-action color="deep-purple" @click="onClickButton({min: 0, max: 7})" icon="date_range">
        <q-tooltip anchor="center left" self="center right" :offset="[20, 0]" v-model="show">Week</q-tooltip>
      </q-fab-action>
      <q-fab-action
        color="deep-purple"
        @click="onClickButton({min: 0, max: 31})"
        icon="calendar_today"
      >
        <q-tooltip anchor="center left" self="center right" :offset="[20, 0]" v-model="show">Month</q-tooltip>
      </q-fab-action>
      <q-fab-action color="deep-purple" @click="onClickMyConcerts()" icon="person">
        <q-tooltip
          anchor="center left"
          self="center right"
          :offset="[20, 0]"
          v-model="show"
        >MyConcerts</q-tooltip>
      </q-fab-action>
    </q-fab>
  </q-page-sticky>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "me-search",
  data() {
    return { show: false };
  },
  computed: {
    loading(): boolean {
      return this.$store.state.getItemsLoading;
    },
    isLogged(): boolean {
      return this.$store.state.logged;
    }
  },
  methods: {
    onClickButton(range: number) {
      this.$store.commit("setRange", range);
      this.$store.dispatch("getItems");
      this.show = false;
    },
    onClickMyConcerts() {
      if (this.$store.state.logged) {
        this.$store.dispatch("getMyItems");
      } else {
        this.$store.commit("clickLoginButton");
      }
    },
    showTooltip() {
      setTimeout(() => {
        this.show = true;
      }, 500);
    },
    hideTooltip() {
      setTimeout(() => {
        this.show = false;
      }, 10);
    }
  },
  watch: {
    show(value) {}
  }
});
</script>

<style>
.my-search .q-btn-fab {
  width: 42px;
  height: 42px;
}
.my-search .absolute-full {
  top: inherit;
  right: inherit;
  bottom: inherit;
  left: inherit;
}
</style>

