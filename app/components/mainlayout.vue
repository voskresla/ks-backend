<template>
  <div>  
  <!-- HEADER COMPONENT -->
    <header-component></header-component>
    
  <!-- MAIN COMPONENT -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
    handleGetUserInfo() {
      this.$store.dispatch('getUserInfo');
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