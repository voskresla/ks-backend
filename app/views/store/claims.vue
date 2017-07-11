<template>
  <div>
    <Table stripe :columns="claimsColumns" :data="claims"></Table>
    <claimMakeNew @refresh="refresh" :orderId="orderId" :username="username"></claimMakeNew>
    
    
  </div>
</template>

<script>

let claimMakeNew = require ('./claimMakeNew.vue');
import axios from 'axios';

export default {
  name: 'claimsComponent',
  props: ['orderId','username'],
  components: {
    claimMakeNew:claimMakeNew
  },
  data: function () {
    return {
      
      claims: [],
      claimsColumns: [
        {
          title: '#',
          key: 'action',
          render: (h,params) => {
            return h('router-link',{
              attrs: {
                to: '/claim/'+params.row.orderId
              }
            }, params.row.orderId)
          }
        },
        {
          title: '#',
          key: 'status'
        },
        {
          title: '#',
          key: 'creationUser'
        },
        {
          title: '#',
          key: 'creationDate'
        },
        {
          title: '#',
          key: 'claimCategory'
        },
      ]
    }
  },
  methods: {
    refresh: function () {
      axios
      .get('/api/getclaimsbyid/'+this.orderId)
      .then(r => { this.claims = r.data })
      .catch((err) => console.log(err) )
    }
  },
  created: function () {
    this.refresh();
  }

}
</script>

<style>
  
</style>
