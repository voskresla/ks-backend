'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import axios from 'axios';
import iView from 'iview';



// import '../app/asset/vendor/foundation6/css/foundation.css';
import '../app/asset/vendor/foundation6/css/app.css';
import '../app/asset/vendor/iview/iview.css';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

// Register PDF
let pdfMake = require('pdfmake/build/pdfmake.min.js');
let pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs; // иначе не подгрузяться шрифты.

// Store
const store = new Vuex.Store({
  strict: true,
  state: {
    user: {
      user: '',
      role: '',
      rights: ''
    },
    products: {},
    order: {
      orderKsId: '',
      orderCreateBy: '',
      orderCreateAt: '',
      orderUpdateAt: '',
      orderLastModify: '',

      couponNumber: '',
      couponSaleDate: '',
      couponPrice: '',
      couponExtraInfo: '',

      customerFullName: '',
      customerAddress: '',
      customerPhone: '',
      customerComment: '',

      productKey: [],
      productFullName: '',
      productPrice: '',
      productAdditionals: {},
      productAdditionalsChecked: [],

      payIsPayed: false,
      payPayDate: '',

      masterKsId: '',
      masterFullname: '',
      masterPhone: '',
      masterWorkDate: '',
      
      commentsArr: [],

      isOrderEditable: true
    },
    orderLayoutState: {
      init: true,
      new: false,
      edit: false,
      key: false,
      name: false,
      all: false,
      id: false
    },
    filterSearch: '',
    claimComponents: {
      claimId: ''
    }
  },
  mutations: {
    changeClaimIdInStore (state, payload) {
      state.claimComponents.claimId = payload.claimId
    },
    updateFilterSearch (state, payload) {
      state.filterSearch = payload
    },
    fillUser (state, payload) {
      state.user = {...payload}
    },
    changeOrderLayoutState (state, payload) {
      state.orderLayoutState = {...payload}
      if (payload.init) {
        store.commit('clearOrderObject');
      }
    },
    fillProducts (state, payload) {
      state.products = {...payload}
    },
    clearOrderObject (state) {
      for (var key in state.order) {
        switch (key) {
          case 'productKey': 
            state.order[key] = []
            break;
          case 'commentsArr': 
            state.order[key] = []
            break;
          case 'isOrderEditable': 
            state.order[key] = true
            break;
          default:
            state.order[key] = ''
            break;
        }
      }
    },
    fillOrder (state,payload) {
      console.log('in fillOrder: ', payload)
      for (var key in payload) {
        switch (key) {
          case 'productKey': 
            state.order[key].push(payload[key])
            break;
        
          default:
            state.order[key] = payload[key]
            break;
        }
        
      }
    },
    updateOrder (state, payload) {
      state.order[payload.key] = payload.value
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
      console.log(arr)
      arr.sort((a,b) => {
        return a['KS_OPERATION_GROUP'] > b['KS_OPERATION_GROUP'] ? 1 : -1
      })

      return arr
    },
    getOrderFromStore (state) {
      return state.order
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
    },
    async getOrderInfoFromServer ({commit,state}) {
      if (state.orderLayoutState.new) {
        let payload = {};
        let additionalsObj = {};
        let productPriceId = state.orderLayoutState.key;
        let additionalProductsId = state.products[state.orderLayoutState.key]['ADDITIONALS'];
        
        for (let i = 0; i < additionalProductsId.length; i++) {
          let element = additionalProductsId[i];
          let tmpObj = {
            key: element,
            name: state.products[element]['Наименование услуги'],
            price: await axios
              .get('/api/getproductprice/'+element)
              .then((r) => { return r.data })
              .catch((err) => {
                console.log(err);
                payload.error = true;
            }) 
          }
          additionalsObj[element] = tmpObj;
        }

        

        let productPrice = await axios
          .get('/api/getproductprice/'+productPriceId)
          .then((r) => { return r.data })
          .catch((err) => {
            console.log(err);
            payload.error = true;
          })
        
        let couponNumber = await axios
          .get('/api/getnewcouponnumber/')
          .then((r) => { return r.data })
          .catch((err) => {
            console.log(err);
            payload.error = true;
          })
        
        payload.orderKsId = couponNumber.orderKsId;
        payload.productKey = state.orderLayoutState.key;
        payload.productFullName = state.orderLayoutState.name;
        payload.productPrice = productPrice;
        payload.productAdditionals = additionalsObj;
        payload.couponNumber = couponNumber.number;
        payload.orderCreateBy = state.user.user;
        payload.couponSaleDate = new Date();
        
        return new Promise ((resolve,reject) => {
          if (payload.error) {
            reject(payload.error)
          } else {
            setTimeout(() => {
              console.log('in setTimeot')
              commit('fillOrder', payload);
              resolve()
            },1000)
          }
        })
      }

      if (!state.orderLayoutState.new) {
        
        let payload = await axios
          .get('/api/getorder/'+state.orderLayoutState.id)
          .then((r) => { return r.data })
          .catch((err) => {
            console.log(err);
            payload.error = true;
          })

        return new Promise ((resolve,reject) => {
          if (payload.error) {
            reject(payload.error)
          } else {
            setTimeout(() => {
              console.log('in setTimeot editshow') 
              resolve(payload)
            },1000)
          }
        })
      }   
    }
  }
})

let myVue = new Vue({
  el: '#myApp',
  router: require('./router'),
  store,
  components: {
    
  },
  beforeMount () {
    this.$store.dispatch('getProducts') ;
    this.$store.dispatch('getUserInfo');   
  }

});
