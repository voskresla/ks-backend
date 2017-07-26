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
          component: require('../app/components/ordersGridLayout.vue')
        },
        {
          name: 'newOrder',
          path: 'orders/new',
          component: require('../app/components/OrderLayout.vue'),
        },
        {
          name: 'editshowOrder',
          path: 'orders/:id',
          component: require('../app/components/editshowOrderForm.vue'),
        }
      ]
    },
  ]
})