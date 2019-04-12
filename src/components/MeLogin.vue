<template>
  <q-modal v-model="clickedLoginButton" minimized>
    <q-toolbar color="transparent" text-color="deep-purple">
      <q-btn color="deep-purple" flat round dense icon="arrow_back" @click="cancel()"/>
      <q-toolbar-title class="q-pr-xl text-center">User</q-toolbar-title>
    </q-toolbar>

    <div class="q-ma-md row justify-center content-center" v-if="isLogged">
      <div class="col-10">
        <form action>
          <q-input
            disable
            maxlength="60"
            color="deep-purple"
            :value="myEmail"
            stack-label="Email *"
          />
        </form>
        <div class="q-mt-md row justify-around">
          <div class="col-5">
            <q-btn color="deep-purple" class="full-width" @click="logout()" label="Logout" no-caps/>
          </div>
        </div>
      </div>
    </div>
    <div class="q-ma-md row justify-center content-center" v-if="!isLogged">
      <!-- use 'row' class to define a container / parent -->
      <div class="col-10">
        <form action>
          <q-input maxlength="60" color="deep-purple" v-model="email" stack-label="Email *"/>
          <q-input
            maxlength="60"
            type="password"
            color="deep-purple"
            v-model="pass"
            stack-label="Password *"
          />
        </form>
        <div class="q-mt-md row justify-around">
          <div class="col-5">
            <q-btn color="deep-purple" class="full-width" @click="login()" label="Login" no-caps/>
          </div>
          <div class="col-5">
            <q-btn
              color="deep-purple"
              class="full-width"
              outline
              @click="create()"
              label="New User"
              no-caps
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
  data() {
    return {
      email: "",
      pass: ""
    };
  },
  mounted() {
    this.$store.dispatch("verifyUser");
  },
  computed: {
    myEmail(): string {
      return this.$store.state.myEmail;
    },
    isLogged(): boolean {
      return this.$store.state.logged;
    },
    clickedLoginButton(): any {
      return this.$store.state.clickedLoginButton;
    }
  },
  methods: {
    cancel() {
      this.$store.commit("unClickLoginButton");
    },
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        pass: this.pass,
        newUser: false
      });
    },
    logout() {
      this.$store.dispatch("logout");
    },
    create() {
      this.$store.dispatch("login", {
        email: this.email,
        pass: this.pass,
        newUser: true
      });
    }
  }
});
</script>

