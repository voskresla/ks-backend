<template>
  <div id="userinfo" class="row">
    <div class="large-6 columns">
      <Button><router-link to='/store'>Создать заявку</router-link></Button>
      <Button><router-link to='/data'>Все заявки</router-link></Button>

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


export default {
  name: 'userInfo',
  data: function data() {
    return {
      username: 'default username',
      role: 'default role'
    };
  },
  beforeMount: function beforeMount() {
    let _this = this;
      axios
        .get(getUserUrl)
        .then( function (response) {
            _this.username = response.data.user || 'Auth plz.';
            _this.role = response.data.role || 'Auth plz.';
        })
        .catch(function (err) {
          console.log(err);
        });

  },
  mounted: function mounted() {
    //do something after mounting vue instance

    this.$root.$on('pushThis', this.onPushThis);

    // this.$root.$on('pushThis', function(obj) {
    //
    //   //console.log(this.$options.components.user.data.username);
    //   //_this.username = obj.name;
    // });
  },
  methods: {
    onPushThis: function onPushThis(obj, obj2) {
      this.username = obj.name;
      this.role = obj2.name;
    }
  }
};
</script>

<style>
</style>
