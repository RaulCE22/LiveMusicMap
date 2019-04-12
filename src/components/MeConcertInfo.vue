<template>
  <q-modal @hide="hide()" v-model="concertInfo.show" position="bottom">
    <q-toolbar color="transparent" text-color="deep-purple">
      <q-toolbar-title class="text-center">
         <q-btn
          v-if="isMyConcert"
          color="deep-purple"
          flat
          round
          dense
          icon="delete"
          @click="removeConcert()"
        />
        <!-- <q-btn
          v-if="isMyConcert"
          color="deep-purple"
          flat
          round
          dense
          :icon="!edit ? 'create': 'done'"
          @click="editAndValidate()"
        /> -->
       
        {{concertInfo.name}}
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md text-center">
      <div class="q-mb-sm">
        <q-icon name="music_note"/>
        <q-input
          class="q-pa-none"
          v-if="edit"
          style="display: inline-flex;"
          align="center"
          v-model="concertInfo.style"
        ></q-input>
        <label v-if="!edit" for>{{concertInfo.style}}</label>
      </div>
      <div class="q-mb-sm">
        <q-icon name="location_on"/>
        <q-input
          class="q-pa-none"
          v-if="edit"
          style="display: inline-flex;"
          align="center"
          v-model="concertInfo.place"
        ></q-input>
        <label v-if="!edit" for>{{concertInfo.place}}</label>
      </div>
      <div class="q-mb-sm">
        <q-icon name="date_range"/>
        <q-datetime
          v-if="edit"
          style="display: inline-flex;"
          v-model="concertInfo.date"
          type="date"
        />
        <label v-if="!edit" for>{{concertInfo.date | formatDateDay}}</label>
      </div>
      <div class="q-mb-sm">
        <q-icon name="access_time"/>
        <q-datetime
          v-if="edit"
          style="display: inline-flex;"
          v-model="concertInfo.date"
          type="time"
        />
        <label v-if="!edit" for>{{concertInfo.date | formatDateHour}}</label>
      </div>
      <div v-if="!edit && concertInfo.link" class="q-mb-sm">
        <q-icon name="open_in_new"/>
        <a for href="#" @click="openLink(concertInfo.link)">{{concertInfo.link}}</a>
      </div>
      <div v-if="edit" class="q-mb-sm">
        <q-icon name="open_in_new"/>
        <q-input
          class="q-pa-none"
          v-if="edit"
          style="display: inline-flex;"
          align="center"
          v-model="concertInfo.link"
        ></q-input>
      </div>
      <div class="q-mb-sm meConcertInfoDescription">
        <q-input
          class="q-pa-none"
          v-if="edit"
          style="display: inline-flex;"
          align="center"
          v-model="concertInfo.description"
        ></q-input>
        <label v-if="!edit" for>{{concertInfo.description}}</label>
      </div>
    </div>
  </q-modal>
</template>
<script lang="ts">
import { date, Dialog } from "quasar";

export default {
  data() {
    return {
      edit: false
    };
  },
  computed: {
    concertInfo(this: any): any {
      return this.$store.state.concertInfo;
    },
    isMyConcert(): boolean {
      return (
        this.$store.state.myEmail === this.$store.state.concertInfo.userEmail
      );
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
      window.open(url, "_blank");
    },
    removeConcert() {
      Dialog.create({
        title: "Delete concert",
        message: "Do you want to delete this concert",
        ok: "Yes",
        cancel: "No"
      })
        .then(() => {
          this.$store.dispatch('removeItem', this.concertInfo.id);
        })
        .catch(() => {

        });
    },
    editAndValidate() {
      if (this.edit) {
        this.edit = false;
        console.log("Edit", this.concertInfo);
      } else {
        this.edit = true;
      }
    }
  }
};
</script>
<style>
.meConcertInfoDescription {
  max-width: 500px;
  margin: auto;
}
</style>
