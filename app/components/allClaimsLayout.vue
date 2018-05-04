<template>
<div>
  <claims-layout :claims="claims"></claims-layout>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'allClaimsLayout',
  components: {
    'claims-layout': require('./claimsLayout.vue')
  },
  data: function() {	
    return {
      claims: []
    }
  },
  methods: {},
  beforeMount () {
    axios
      .get('/api/getallclaims/')  
      .then(r => {
        this.claims = r.data
      })
  }
}
</script>

<style scoped>

</style>