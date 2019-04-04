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
//END_MAP

Vue.use(Quasar, {
  config: {},
  i18n: lang
});

//MAP
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
