import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase';
import axios from 'axios';
import { Notify, Loading } from "quasar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myLocation: null,
    //Use for search
    center: JSON.parse(localStorage.getItem('Center') || '[0,0]'),
    zoom: JSON.parse(localStorage.getItem('Zoom') || '3'),
    range: { min: -1, max: 5 },
    //Modal
    clickedAddButton: false,
    newItemLocation: null,
    newItemCounty: null,
    //All concerts
    markers: [] as any,
    //One concert
    concertInfo: {
      show: false,
    },
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
    setRange(state, range) {
      state.range = range;
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
      state.markers =
        Object.keys(payload).map((item: any) => ({
          id: item,
          name: payload[item].name,
          description: payload[item].description,
          date: payload[item].date,
          place: payload[item].place,
          style: payload[item].style,
          link: payload[item].link,
          location: payload[item].location
        }));
    },
    setConcertInfo(state, payload) {
      state.concertInfo = { ...payload, show: true }
    },
    removeConcertInfo(state, payload) {
      state.concertInfo = { show: false };
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
            color: 'deep-purple',
            icon: 'warning',
            position: "top",
            message: "No podemos obtener informacion del punto"
          });
        })
    },
    getItems({ state, commit }) {
      Loading.show({
        message: 'Searching concerts',
        spinnerColor: 'white',
      })
      state.markers = [];
      return axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${
          state.center[0]
          }&lon=${state.center[1]}&zoom=18&addressdetails=1`
        )
        .then((response: any) => response.data.address.county)
        .then((county: string) => {
          if (county) {
            
            var searchMin = new Date();
            searchMin.setHours(0, 0, 0, 0);
            searchMin.setDate(searchMin.getDate() + state.range.min);
            var searchMax = new Date();
            searchMax.setHours(23, 59, 59, 999);
            searchMax.setDate(searchMax.getDate() + state.range.max);
            console.log(searchMin, searchMax);
            
            return firebase
              .database()
              .ref('concerts/')
              .orderByChild('search')
              .startAt(county + '_' + searchMin.getTime())
              .endAt(county + '_' + searchMax.getTime())
              .once('value', snapshot => {
                if (snapshot.val() === null) {
                  Loading.hide();
                  Notify.create({
                    color: 'deep-purple',
                    icon: 'warning',
                    position: "top",
                    message: "No hay ningun concierto cerca :("
                  });
                  throw "no concert with county";
                } else {
                  Loading.hide();
                  commit('setItems', snapshot.val());
                }
              });
          } else {
             Loading.hide();
            Notify.create({
              color: 'deep-purple',
              position: "top",
              icon: 'warning',
              message: "No hay ningun concierto cerca :("
            });
            throw "county null";
          }
        })
    },
    createItem({ state, commit }, payload) {
      if (payload.name === '' || payload.description === '' || payload.place === '' || payload.style === '') {
        Notify.create({
          color: 'deep-purple',
          position: "top",
          icon: 'warning',
          message: "Algunos campos están vacios"
        });
      } else if (payload.link !== '' && /^(http|https):\/\//.exec(payload.link) === null) {
        Notify.create({
          color: 'deep-purple',
          position: "top",
          icon: 'warning',
          message: "Url no valida"
        });
      } else {
        state.createItemLoading = true;
        return firebase
          .database()
          .ref('concerts')
          .push({ ...payload, location: state.newItemLocation, county: state.newItemCounty, search: state.newItemCounty + '_' + payload.date })
          .then(res => {
            state.createItemLoading = false;
            commit("unClickAddButton");
            commit("removeNewItemLocation");
            Notify.create({
              color: 'deep-purple',
              position: "top",
              icon: 'thumb_up',
              message: "Concierto creado :) Acualiza para verlo"
            });
          })
          .catch(err => {
            state.createItemLoading = false;
            Notify.create({
              color: 'deep-purple',
              position: "top",
              icon: 'warning',
              message: "No se ha podido crear el concierto :("
            });
          })
      }
    }
  }
});
