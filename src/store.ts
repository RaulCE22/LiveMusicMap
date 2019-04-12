import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase';
import axios from 'axios';
import { Notify, Loading } from "quasar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //user
    clickedLoginButton: false,
    logged: false,
    myEmail: '',
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
    clickLoginButton(state) {
      state.clickedLoginButton = true;
    },
    unClickLoginButton(state) {
      state.clickedLoginButton = false;
    },
    setUser(state, userEmail) {
      state.myEmail = userEmail;
      state.logged = true;
      console.log('setUser', state);
    },
    removeUser(state) {
      state.myEmail = '';
      state.logged = false;
    },
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
          userEmail: payload[item].userEmail,
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
    verifyUser({state, commit}){
      firebase.auth().onAuthStateChanged(function(user: any) {
        if (user) {
          commit('setUser', user.email);
        } else {
          commit('removeUser');
        }
      });
    },
    login({state, commit}, {email, pass, newUser}){
      if (newUser) {
        Loading.show({
          message: 'Creating new user',
          spinnerColor: 'white',
        })
        return firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((res: any) => {
          state.clickedLoginButton = false;
          state.logged = true;
          state.myEmail = email;
          Notify.create({
            color: 'deep-purple',
            icon: 'thumb_up',
            position: "top",
            message: "Logged"
          });
          Loading.hide();
        })
        .catch( (err: any) => {
          Loading.hide();
          Notify.create({
            color: 'deep-purple',
            icon: 'thumb_up',
            position: "top",
            message: "Incorrect user"
          });
        });
      }else {
        Loading.show({
          message: 'Logining',
          spinnerColor: 'white',
        })
        return firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then((res: any) => {
          state.clickedLoginButton = false;
          state.logged = true;
          state.myEmail = email;
          Notify.create({
            color: 'deep-purple',
            icon: 'thumb_up',
            position: "top",
            message: "Logged"
          });
          Loading.hide();
        })
        .catch( (err: any) => {
          Notify.create({
            color: 'deep-purple',
            icon: 'thumb_up',
            position: "top",
            message: "Incorrect user"
          });
          Loading.hide();
        });
      }
    },
    logout({state}) {
      Loading.show({
        message: 'Logout',
        spinnerColor: 'white',
      })
      firebase.auth().signOut()
      .then(function() {
        Loading.hide();
        state.myEmail = '',
        state.logged = false,
        Notify.create({
          color: 'deep-purple',
          icon: 'thumb_up',
          position: "top",
          message: "Sign out"
        });
      })
      .catch(function(error) {
        Loading.hide();
        Notify.create({
          color: 'deep-purple',
          icon: 'warning',
          position: "top",
          message: "Error. Try again"
        });
      });
    },
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
            message: "We can´t get point information"
          });
        })
    },
    getMyItems({state, commit}) {
      Loading.show({
        message: 'Getting my concerts',
        spinnerColor: 'white',
      });
      return firebase
              .database()
              .ref('concerts/')
              .orderByChild('userEmail')
              .equalTo(state.myEmail)
              .once('value', snapshot => {
                if (snapshot.val() === null) {
                  Loading.hide();
                  Notify.create({
                    color: 'deep-purple',
                    icon: 'warning',
                    position: "top",
                    message: "You don´t have any concerts created"
                  });
                  throw "no concert";
                } else {
                  Loading.hide();
                  Notify.create({
                    color: 'deep-purple',
                    position: "top",
                    icon: 'thumb_up',
                    message: "Finded " + Object.keys(snapshot.val()).length + " concerts!"
                  });
                  commit('setItems', snapshot.val());
                }
              });
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
        .then((response: any) => response.data.address ? response.data.address.county : null)
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
                    message: "No upcomming concerts near your location :("
                  });
                  throw "no concert with county";
                } else {
                  Loading.hide();
                  Notify.create({
                    color: 'deep-purple',
                    position: "top",
                    icon: 'thumb_up',
                    message: "Finded " + Object.keys(snapshot.val()).length + " concerts near your location!"
                  });
                  commit('setItems', snapshot.val());
                }
              });
          } else {
            Loading.hide();
            Notify.create({
              color: 'deep-purple',
              position: "top",
              icon: 'warning',
              message: "No upcomming concerts near your location"
            });
            throw "county null";
          }
        })
    },
    createItem({ state, commit }, payload) {
      if (payload.name === '' || payload.place === '' || payload.style === '') {
        Notify.create({
          color: 'deep-purple',
          position: "top",
          icon: 'warning',
          message: "Sorry, some fields are empty"
        });
      } else if (payload.link !== '' && /^(http|https):\/\//.exec(payload.link) === null) {
        Notify.create({
          color: 'deep-purple',
          position: "top",
          icon: 'warning',
          message: "Url invalid. (add http or https)"
        });
      } else {
        state.createItemLoading = true;
        var newItem = { ...payload, userEmail: state.myEmail, location: state.newItemLocation, county: state.newItemCounty, search: state.newItemCounty + '_' + payload.date };
        return firebase
          .database()
          .ref('concerts')
          .push(newItem)
          .then(res => {
            state.createItemLoading = false;
            commit("unClickAddButton");
            commit("removeNewItemLocation");
            Notify.create({
              color: 'deep-purple',
              position: "top",
              icon: 'thumb_up',
              message: "Concerts created :)"
            });
            state.markers.push(newItem);
            axios
              .post('https://api.telegram.org/bot668229806:AAGy_ph0kPQyX2HUtRGduTSxoERzG5vgLws/sendMessage', { chat_id: 802823958, text: JSON.stringify(newItem) })
              .then((res: any) => console.log(res))
              .catch((err: any) => console.error(err))
          })
          .catch(err => {
            state.createItemLoading = false;
            Notify.create({
              color: 'deep-purple',
              position: "top",
              icon: 'warning',
              message: "We cannot create your concert. Try again :("
            });
          })
      }
    },
    removeItem({state,commit} , id) {
      Loading.show({
        message: 'Remove concert',
        spinnerColor: 'white',
      })
      return firebase
          .database()
          .ref('concerts')
          .child(id)
          .remove()
          .then((res: any) => {
            Notify.create({
              color: 'deep-purple',
              position: "top",
              icon: 'thumb_up',
              message: "Concert removed :)"
            });
            commit('removeConcertInfo');
            var indexToRemove = state.markers.findIndex((item: any) => item.id === id);
            if (indexToRemove !== -1) {
              state.markers = state.markers.splice(indexToRemove, indexToRemove);
            }
            Loading.hide();
          })
          .catch((err: any) => {
            Notify.create({
              color: 'deep-purple',
              position: "top",
              icon: 'warning',
              message: "We can´t remove this concert :("
            });
            Loading.hide();
          })
    }
  }
});
