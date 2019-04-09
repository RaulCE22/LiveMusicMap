import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myLocation: null,
    disabledAddButton: true,
    clickedAddButton: false,
    newItemLocation: null,
    newItemCounty: null,
    markers: [] as any,
    getItemsLoading: false,
    createItemLoading: false
  },
  mutations: {
    updateMyLocation(state, location) {
      state.myLocation = location

    },
    enableAddButton(state) {
      state.disabledAddButton = false;
    },
    disableAddButton(state) {
      state.disabledAddButton = true;
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
    getItems({ state, commit }) {
      state.getItemsLoading = true;
      return firebase
        .database()
        .ref('concerts/')
        .once('value', snapshot => {
          commit('setItems', snapshot.val());
        });
    },
    createItem({ state }, payload) {
      //state.createItemLoading = true;
      console.log(payload, state.newItemLocation.toString());
      console.log({ ...payload, location: state.newItemLocation });

      return firebase
        .database()
        .ref('concerts')
        .push({ ...payload, location: state.newItemLocation, county: state.newItemCounty });
    }
  }
});
