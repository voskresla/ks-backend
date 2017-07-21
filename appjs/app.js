'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { mapState } from 'vuex';
import axios from 'axios';

import iView from 'iview';

// import '../app/asset/vendor/foundation6/css/foundation.css';
import '../app/asset/vendor/foundation6/css/app.css';
import '../app/asset/vendor/iview/iview.css';


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

// Register Components

let mainlayout = require('../app/components/mainlayout.vue');
let newOrderLayout = require('../app/components/newOrderLayout.vue');
// let categoryList = require('../app/components/categoryList.vue');
let user = require('../app/views/user.vue');
let ordersgrid = require('../app/views/store/ordersgrid.vue');
let makeorder = require('../app/views/store/makeorder.vue');
let claimlayout = require('../app/views/store/claimlayout.vue')

// Register PDF
let pdfMake = require('pdfmake/build/pdfmake.min.js');
let pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs; // иначе не подгрузяться шрифты.

// Routes
const routes = [
  { path: '/', component: mainlayout,
    children: [
      {
        name: 'allOrders',
        path: 'orders',
        component: ordersgrid
      },
      {
        name: 'newOrder',
        path: 'orders/new',
        component: newOrderLayout,
      }
    ]
  },
  { path: '/makeorder/', component: makeorder},
  { path: '/makeorder/:change/:id', name: 'makeorder', component: makeorder, props: true },
  { path: '/claim/:claimid', name: 'claim', component: claimlayout, props: true },
  // { path: '/orders', name: 'orders', component: ordersgrid },
  // { path: '/orders/id', component: makeorder }
]

const router = new VueRouter({
  routes: routes
})

// Store
const store = new Vuex.Store({
  state: {
    user: {
      usern: '',
      role: '',
      rights: ''
    },
    products: {},
    order: {},
    orderLayoutState: {
      init: true,
      key: false
    }
  },
  mutations: {
    fillUser (state, payload) {
      state.user = {...payload}
    },
    changeOrderLayoutState (state, payload) {
      state.orderLayoutState = {...payload}
    },
    fillProducts (state, payload) {
      console.log(payload)
      state.products = {...payload}
    }
  },
  getters: {
    getOrderLayoutState (state) {
      return state.orderLayoutState
    },
    getProductsForCategoryList(state) {
      
      let object = state.products;
      let arr = [];
      for (var key in object) {
        if (key !== '_id') {
          object[key].id = key;
          arr.push(object[key]);
        }
      }
      arr.sort((a,b) => {
        return a['KS OPERATION GROUP'] > b['KS OPERATION GROUP'] ? 1 : -1
      })

      return arr
    }
    
  },
  actions: {
    async getUserInfo ({commit, state}) {
      let payload = axios
        .get('/api/getuser')
        .then((r) => { return r.data })
        .catch((err) => console.log(err))
      commit('fillUser', await payload)
    },
    async getProducts ({commit,state}) {
      let payload = axios
        .get('/api/getproducts')
        .then((r) => { return r.data[0] })
        .catch((err) => console.log(err))
      commit('fillProducts', await payload)
    }
  }
})

let myVue = new Vue({
  el: '#myApp',
  router: router,
  store,
  components: {
    mainlayout: mainlayout,
    'new-order-layout': newOrderLayout,
    user: user,
    makeorder: makeorder,
    ordersgrid: ordersgrid,
    claimlayout: claimlayout,
  },
  beforeMount () {
    this.$store.dispatch('getProducts')    
  }

});
