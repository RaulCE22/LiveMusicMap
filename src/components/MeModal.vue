<template>
  <q-modal v-model="clickedAddButton">
    <q-toolbar color="transparent" text-color="deep-purple">
      <q-btn color="deep-purple" flat round dense icon="arrow_back" @click="cancel()"/>
      <q-toolbar-title class="q-pr-xl text-center">Create new concert</q-toolbar-title>
    </q-toolbar>

    <div class="q-ma-md row justify-center content-center">
      <!-- use 'row' class to define a container / parent -->
      <div class="col-10">
        <form action>
          <div class="row justify-between">
            <q-input
              class="col-10"
              maxlength="60"
              color="deep-purple"
              :value="myEmail"
              stack-label="User email *"
              disable
            />
            <q-btn class="q-mt-md col-1" color="deep-purple" icon="person" @click="goToLogin()"/>
          </div>
          <q-input maxlength="60" color="deep-purple" v-model="name" stack-label="Title *"/>
          <q-input maxlength="60" color="deep-purple" v-model="place" stack-label="Place *"/>
          <q-input maxlength="60" color="deep-purple" v-model="style" stack-label="Music style *"/>
          <q-input maxlength="60" color="deep-purple" v-model="link" stack-label="Url"/>
          <q-datetime
            color="deep-purple"
            v-model="date"
            format="DD/MM/YYYY ( HH:mm )"
            type="datetime"
            stack-label="Date & Hour"
            :min="today"
            :max="maxDay"
          />
          <q-input
            maxlength="300"
            color="deep-purple"
            v-model="description"
            type="textarea"
            stack-label="Description"
            :max-height="100"
            rows="3"
          />
          <br>
        </form>
        <div class="row justify-around">
          <div class="col-10">
            <q-btn
              v-if="myEmail"
              color="deep-purple"
              class="full-width"
              @click="create()"
              label="Create"
              no-caps
              :loading="loading"
            />
            <q-btn
              v-if="!myEmail"
              disable
              color="deep-purple"
              class="full-width"
              label="Add user email"
              no-caps
              :loading="loading"
            />
          </div>
        </div>
      </div>
    </div>
  </q-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { Dialog } from "quasar";

export default Vue.extend({
  name: "me-modal",
  data() {
    return {
      name: "",
      place: "",
      style: "",
      link: "",
      today: new Date(),
      date: new Date(),
      maxDay: new Date(),
      description: ""
    };
  },
  mounted() {
    this.maxDay = new Date();
    this.maxDay.setDate(this.today.getDate() + 90);
  },
  computed: {
    myEmail(): any {
      return this.$store.state.myEmail;
    },
    loading(): any {
      return this.$store.state.createItemLoading;
    },
    clickedAddButton(): any {
      return this.$store.state.clickedAddButton;
    }
  },
  watch: {
    clickedAddButton(state): any {
      console.log(state);
      (this.name = ""),
        (this.date = new Date()),
        (this.description = ""),
        (this.link = ""),
        (this.place = ""),
        (this.style = "");
    }
  },
  methods: {
    cancel() {
      this.$store.commit("unClickAddButton");
    },
    create() {
      this.$store.dispatch("createItem", {
        name: this.name,
        style: this.style,
        link: this.link,
        place: this.place,
        date: this.date.getTime(),
        description: this.description
      });
    },
    goToLogin() {
      this.$store.commit("clickLoginButton");
    }
  }
});
</script>
<style>
.q-datetime.text-black {
  color: #673ab7 !important;
}
</style>

