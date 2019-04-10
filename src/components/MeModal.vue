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
          <q-input color="deep-purple" v-model="name" stack-label="Title *"/>
          <q-input color="deep-purple" v-model="place" stack-label="Place *"/>
          <q-input color="deep-purple" v-model="style" stack-label="Music style *"/>
          <q-input color="deep-purple" v-model="link" stack-label="Url"/>
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
            color="deep-purple"
            v-model="description"
            type="textarea"
            stack-label="Description"
            :max-height="100"
            rows="7"
          />
          <br>
        </form>
        <div class="row justify-around">
          <div class="col-10">
            <q-btn
              color="deep-purple"
              class="full-width"
              @click="create()"
              label="Create"
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
    loading(): any {
      return this.$store.state.createItemLoading;
    },
    clickedAddButton(): any {
      return this.$store.state.clickedAddButton;
    }
  },
  watch: {
    clickedAddButton(state): any {
      this.name = "",
      this.date = new Date(),
      this.description = "",
      this.link = "",
      this.place ="", 
      this.style= ""
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
    }
  }
});
</script>
<style>

.q-datetime.text-black {
  color: #673ab7 !important;
}
</style>

