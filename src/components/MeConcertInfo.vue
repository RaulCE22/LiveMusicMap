<template>
  <q-modal @hide="hide()" v-model="concertInfo.show" position="bottom">
    <q-toolbar color="transparent" text-color="deep-purple">
      <q-toolbar-title class="text-center">{{concertInfo.name}}
      <q-btn v-if="concertInfo.link" color="deep-purple" flat round dense icon="open_in_new" @click="openLink(concertInfo.link)"/>
      </q-toolbar-title>
    </q-toolbar>
    <div class="layout-padding text-center">
      <div class="q-mb-sm">
        <q-icon name="music_note"/>
        {{concertInfo.style}}
      </div>
      <div class="q-mb-sm">
        <q-icon name="location_on"/>
        {{concertInfo.place}}
      </div>
      <div class="q-mb-sm">
        <q-icon name="date_range"/>
        {{concertInfo.date | formatDateDay}}
      </div>
      <div class="q-mb-sm">
        <q-icon name="access_time"/>
        {{concertInfo.date | formatDateHour}}
      </div>
      <div class="q-mb-sm">
        <i>{{concertInfo.description}}</i>
      </div>
    </div>
  </q-modal>
</template>
<script lang="ts">
import { date } from "quasar";

export default {
  data() {
    return {};
  },
  computed: {
    concertInfo(this: any): any {
      return this.$store.state.concertInfo;
    }
  },
  filters: {
    formatDateDay(value: Date) {
      return date.formatDate(value, "ddd DD-MM-YYYY");
    },
    formatDateHour(value: Date) {
      return date.formatDate(value, "HH:mm");
    }
  },
  methods: {
    hide(this: any) {
      this.$store.commit("removeConcertInfo");
    },
    openLink(url: string) {
        window.open(url, '_blank');
    }
  }
};
</script>
<style>
</style>
