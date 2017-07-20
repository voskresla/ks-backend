<template>
  <div>
    <button @click="handleGetUserInfo">Get User Info</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'mainLayout',
  data: function() {	
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    handleGetUserInfo () {
      this.$store.dispatch('getUserInfo');
    }
  }
}
</script>

<style scoped>

</style>