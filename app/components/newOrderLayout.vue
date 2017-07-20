<template>
  <div>
    <category-list v-if="!routeParams"></category-list>
    <new-order-form v-if="routeParams"></new-order-form>
    
  </div>  
</template>
  
<script>

let categoryList = require('./categoryList.vue');
let newOrderForm = require('./newOrderForm.vue');

export default {
  name: 'newOrder',
  components: {
    'category-list': categoryList,
    'new-order-form': newOrderForm
  },
  props: [],
  data: function () {
    return {}
  },
  methods: {},
  computed: {
    routeParams () {
      return this.$route.params.state
    }
  },
  watch: {
    '$route': function () {
      console.log('ух ты')
    }
  }
}
</script>
  
  <style scoped>

</style>