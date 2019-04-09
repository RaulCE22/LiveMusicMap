import Vue from "vue";
import Vuex from "vuex";
import firebase, { storage } from 'firebase';
import axios from 'axios';
import { Notify } from "quasar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myLocation: null,
    //Use for search
    center: JSON.parse(localStorage.getItem('Center') || '[0,0]'),
    zoom: JSON.parse(localStorage.getItem('Zoom') || '3'),
    //Modal
    clickedAddButton: false,
    newItemLocation: null,
    newItemCounty: null,
    //All concerts
    markers: [] as any,
    getItemsLoading: false,
    createItemLoading: false
  },
  mutations: {
    updateMyLocation(state, location) {
      state.myLocation = location
    },
    setCenterMap(state, { lat, lng }) {
      state.center = [lat, lng];
      localStorage.setItem('Center', JSON.stringify(state.center))
    },
    setZoomMap(state, zoom) {
      state.zoom = zoom;
      localStorage.setItem('Zoom', JSON.stringify(state.zoom))
    },
    clickAddButton(state) {
      state.clickedAddButton = true;
    },
    unClickAddButton(state) {
      state.clickedAddButton = false;
    },
    addNewItemLocation(state, payload) {
      state.newItemLocation = payload.location
      state.newItemCounty = payload.county
      state.newItemCounty = payload.county
      console.log(state.newItemLocation);
    },
    removeNewItemLocation(state, payload) {
      state.newItemLocation = null
      state.newItemCounty = null
    },
    createNewItem(state, payload: any) {
      console.log(state);
      console.log(payload);
      state.markers.push({ ...payload, location: state.newItemLocation, id: Math.random() })
      state.newItemLocation = null;
      state.newItemCounty = null;
    },
    setItems(state, payload) {
      console.log(payload);
      state.getItemsLoading = false;
      state.markers =
        Object.keys(payload).map((item: any) => ({
          id: item,
          name: payload[item].name,
          description: payload[item].description,
          date: payload[item].date,
          location: payload[item].location
        }));
    }
  },
  actions: {
    getPointInformation({ state, commit }, latlng) {
      return axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${
          latlng.lat
          }&lon=${latlng.lng}&zoom=18&addressdetails=1`
        )
        .then((response: any) => {
          commit("addNewItemLocation", {
            location: [response.data.lat, response.data.lon],
            county: response.data.address.county
          });
        })
        .catch(err => {
          Notify.create({
            position: "top",
            message: "No podemos obtener informacion del punto"
          });
        })
    },
    getItems({ state, commit }) {
      state.getItemsLoading = true;
      return axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${
          state.center[0]
          }&lon=${state.center[1]}&zoom=18&addressdetails=1`
        )
        .then((response: any) => response.data.address.county)
        .then((county: string) => {
          if (county) {
            return firebase
              .database()
              .ref('concerts/')
              .orderByChild('county')
              .equalTo(county)
              .once('value', snapshot => {
                if (snapshot.val() === null) {
                  state.getItemsLoading = false;
                  Notify.create({
                    position: "top",
                    message: "No hay ningun concierto cerca :("
                  });
                  throw "no concert with county";
                } else {
                  commit('setItems', snapshot.val());
                }
              });
          } else {
            state.getItemsLoading = false;
            Notify.create({
              position: "top",
              message: "No hay ningun concierto cerca :("
            });
            throw "county null";
          }
        })
    },
    createItem({ state, commit }, payload) {
      state.createItemLoading = true;
      return firebase
        .database()
        .ref('concerts')
        .push({ ...payload, location: state.newItemLocation, county: state.newItemCounty })
        .then(res => {
          state.createItemLoading = false;
          commit("unClickAddButton");
          commit("removeNewItemLocation");
          Notify.create({
            position: "top",
            type: 'positive',
            message: "Concierto creado :) Acualiza para verlo"
          });
        })
        .catch(err => {
          state.createItemLoading = false;
          Notify.create({
            position: "top",
            message: "No se ha podido crear el concierto :("
          });
        })
    }
  }
});
