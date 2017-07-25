<template>
  <div>  
  <!-- HEADER COMPONENT -->
    <header-component></header-component>
    
  <!-- MAIN COMPONENT -->
    <router-view></router-view>
  </div>
</template>

<script>


let headerComponent = require('./headerComponent.vue');


export default {
  name: 'mainLayout',
  components: {
    'header-component': headerComponent,
  },
  data: function () {
    return {
      
    }
  },
  computed: {

  },
  methods: {
  },
  watch: {
    
  }
}
</script>

<style scoped>

</style>