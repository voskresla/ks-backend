// // mongodb
import Vue from 'vue';
import VueRouter from 'vue-router'
import iView from 'iview';
//import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(iView);

let userComponent = require('../app/views/user.vue');
let ordersComponent = require('../app/views/hq/orders.vue');
let storeComponent = require('../app/views/store/store.vue');
let dataGridComponent = require('../app/views/store/dataTable.vue');

const routes = [
  { path: '/store', component: storeComponent },
  { path: '/data', component: dataGridComponent },
]

const router = new VueRouter({
  routes: routes
})

let myVue = new Vue({
  el: '#myApp',
  router: router,
  components: {
    user: userComponent,
    orders: ordersComponent,
    store: storeComponent,
    datatable: dataGridComponent
  }
});
