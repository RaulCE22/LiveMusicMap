<template>
  <q-modal v-model="$store.state.clickedAddButton">
    <q-toolbar color="transparent" text-color="deep-purple">
      <q-btn color="deep-purple" flat round dense icon="arrow_back" @click="cancel()"/>
      <q-toolbar-title class="q-pr-xl text-center">Create new concert</q-toolbar-title>
    </q-toolbar>

    <div class="q-ma-md row justify-center content-center">
      <!-- use 'row' class to define a container / parent -->
      <div class="col-10">
        <form action>
          <q-input color="deep-purple" v-model="name" stack-label="Name"/>
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
    }
  },
  methods: {
    cancel() {
      this.$store.commit("unClickAddButton");
    },
    create() {
      this.$store.dispatch("createItem", {
        name: this.name,
        date: this.date.getTime(),
        description: this.description
      });
    }
  }
});
</script>
<style>
.modal-content {
  /* background: black !important; */
}
.q-datetime.text-black {
  color: #673ab7 !important;
}
</style>

