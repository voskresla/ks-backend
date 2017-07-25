import VueRouter from 'vue-router';

module.exports = new VueRouter({
  // mode: 'history',
  //base: '/',
  routes: [
    {
      path: '/', component: require('../app/components/mainlayout.vue'),
      children: [
        {
          name: 'allOrders',
          path: 'orders',
          component: require('../app/views/store/ordersgrid.vue')
        },
        {
          name: 'newOrder',
          path: 'orders/new',
          component: require('../app/components/OrderLayout.vue'),
        },
        {
          name: 'editshowOrder',
          path: 'orders/edit',
          component: require('../app/components/OrderLayout.vue'),
        }
      ]
    },
  ]
})