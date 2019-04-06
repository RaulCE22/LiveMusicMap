import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myLocation: null,
    disabledAddButton: true,
    clickedAddButton: false,
    newItemLocation: null,
    markers: [] as any,
  },
  mutations: {
    updateMyLocation (state, location) {
      state.myLocation = location
      
    },
    enableAddButton (state) {
      state.disabledAddButton = false;
    },
    disableAddButton (state) {
      state.disabledAddButton = true;
    },
    clickAddButton (state) {
      state.clickedAddButton = true;
    },
    unClickAddButton (state) {
      state.clickedAddButton = false;
    },
    addNewItemLocation(state,payload) {
      state.newItemLocation = payload
      console.log(state.newItemLocation);
      
    },
    createNewItem(state, payload: any) {
      console.log(state);
      console.log(payload);
      state.markers.push({...payload, location: state.newItemLocation, id: Math.random()})
      state.newItemLocation = null;
    }
  },
  actions: {}
});
