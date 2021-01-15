import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import firebase from 'firebase';

import storeOptions from './stores/store';
import routerOptions from './router/router';
import App from './App.vue'


firebase.initializeApp({
  ////// DELETED
});


Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter(routerOptions)

const store = new Vuex.Store(storeOptions);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
