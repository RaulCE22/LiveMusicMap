<template>
  <q-modal v-model="$store.state.clickedAddButton">
    <div class="q-ma-md row justify-center content-center">
      <!-- use 'row' class to define a container / parent -->
      <div class="col-10">
        <form action>
          <q-input v-model="name" stack-label="Name"/>
          <q-datetime
            v-model="date"
            format="DD/MM/YYYY ( HH:mm )"
            type="datetime"
            stack-label="Date & Hour"
            :min="today"
            :max="maxDay"
          />
          <q-input
            v-model="description"
            type="textarea"
            stack-label="Description"
            :max-height="100"
            rows="7"
          />
          <br>
        </form>
        <div class="row justify-around">
          <div class="col-5">
            <q-btn color="deep-orange" class="full-width" @click="cancel()" label="Cancel"/>
          </div>
          <div class="col-5">
            <q-btn
              color="secondary"
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
