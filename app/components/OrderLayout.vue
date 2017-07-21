<template>
  <div>
    <category-list v-if="orderLayoutState.init"></category-list>
    <new-order-form v-if="orderLayoutState.new"></new-order-form>
    <editshow-order-form v-if="orderLayoutState.edit"></editshow-order-form>
    
  </div>  
</template>
  
<script>

let categoryList = require('./categoryList.vue');
let newOrderForm = require('./newOrderForm.vue');
let editshowOrderForm = require('./editshowOrderForm.vue');

export default {
  name: 'OrderLayout',
  components: {
    'category-list': categoryList,
    'new-order-form': newOrderForm,
    'editshow-order-form': editshowOrderForm
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