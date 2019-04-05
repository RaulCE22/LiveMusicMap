import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    disabledAddButton: true,
    clickedAddButton: false,
    newItemLocation: [] as any,
    fromModal: {
      name: '',
      date: new Date(),
      description: new Date(),
      location: [] as any
    },
    markers: [] as any
  },
  mutations: {
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
    },
    createNewItem(state, payload: any) {
      console.log(state);
      console.log(payload);
      state.markers.push({...payload, location: state.newItemLocation, id: Math.random()})
    }
  },
  actions: {}
});
