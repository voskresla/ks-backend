<template>
  <div>
    <category-list v-if="orderLayoutState.init"></category-list>
    <new-order-form v-if="orderLayoutState.new"></new-order-form>
    <editshow-order-form v-if="orderLayoutState.edit"></editshow-order-form>
    <all-order-layout v-if="orderLayoutState.all"></all-order-layout>
    
  </div>  
</template>
  
<script>

export default {
  name: 'OrderLayout',
  components: {
    'category-list': require('./categoryList.vue'),
    'new-order-form': require('./newOrderForm.vue'),
    'editshow-order-form': require('./editshowOrderForm.vue'),
    'all-order-layout': require('../views/store/ordersgrid.vue'),
  },
  props: [],
  data: function () {
    return {
      // orderLayoutState: {
      //   init: true,
      //   key: false
      // }
    }
  },
  methods: {},
  computed: {
    orderLayoutState () {
      return this.$store.getters.getOrderLayoutState
    }
  },

  // HOOKS
  beforeMount () {
    this.orderLayoutState = this.$store.getters.getOrderLayoutState
  }
}
</script>
  
  <style scoped>

</style>