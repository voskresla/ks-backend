// // mongodb
import Vue from 'vue';

let userComponent = require('../app/views/user.vue');
let ordersComponent = require('../app/views/hq/orders.vue');
let storeComponent = require('../app/views/store/store.vue');

let myVue = new Vue({
  el: '#myApp',
  components: {
    user: userComponent,
    orders: ordersComponent,
    store: storeComponent
  }
});
