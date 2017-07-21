<template>
  <div>
    <category-list v-if="orderLayoutState.init"></category-list>
    <new-order-form v-if="!orderLayoutState.init"></new-order-form>
    
  </div>  
</template>
  
<script>

let categoryList = require('./categoryList.vue');
let newOrderForm = require('./newOrderForm.vue');

export default {
  name: 'newOrderLayout',
  components: {
    'category-list': categoryList,
    'new-order-form': newOrderForm
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