<template>
  
  <div id="userinfo" class="row align-middle">
    <div class="large-6 columns">
      <Button><router-link to='/makeorder'>Создать заявку</router-link></Button>
      <Button @click="openAllOrders">Все заявки</Button>

    </div>
    <div class="large-6 columns text-right userinfo">
      <div>KINETIC SERVICE OPERATION</div>
      <div>Нью-Трейд. {{username}}. {{role}}.</div>
      <div><a href="">Выйти</a></div>
    </div>
  </div>
</template>

<script>
const getUserUrl = '/api/getuser';
import axios from 'axios';

export default {
  
  data: function data() {
    return {
      username: 'default username',
      role: 'default role'
    };
  },
  beforeMount: function beforeMount() {
    
      axios
        .get(getUserUrl)
        .then( (response) => {
            this.username = response.data.user || 'Auth plz.';
            this.role = response.data.role || 'Auth plz.';
        })
        .catch(function (err) {
          console.log(err);
        });

  },
  mounted: function mounted() {
    //do something after mounting vue instance

    // this.$root.$on('pushThis', this.onPushThis);

    // this.$root.$on('pushThis', function(obj) {
    //
    //   //console.log(this.$options.components.user.data.username);
    //   //_this.username = obj.name;
    // });
  },
  methods: {
    openAllOrders () {
      if (this.$route.path === '/orders') {
        this.$router.go(this.$router.currentRoute)
      } else {
        this.$router.push({ name: 'orders', params: { change: true, id: '2111' } })
      }

      
    }
  }
};
</script>

<style scoped>

</style>
