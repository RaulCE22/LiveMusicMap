import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

import "./styles/quasar.styl";
import lang from "quasar-framework/i18n/es";
import "quasar-extras/animate";
import "quasar-extras/material-icons";
import Quasar from "quasar";

//MAP
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/assets/css/leaflet.css'
//END_MAP

//FIREBASE
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBzrkpnETop5EPIY-RduwYWTNRK-b-7RsE",
  authDomain: "musiclivemap-cd4cf.firebaseapp.com",
  databaseURL: "https://musiclivemap-cd4cf.firebaseio.com",
  projectId: "musiclivemap-cd4cf",
  storageBucket: "musiclivemap-cd4cf.appspot.com",
  messagingSenderId: "40396984387"
};
firebase.initializeApp(config);
Vue.use(Quasar, {
  config: {},
  i18n: lang
});
//END_FIREBASE

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
//END_MAP

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
