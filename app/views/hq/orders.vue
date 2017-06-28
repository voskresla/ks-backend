<template>
  <div id='orders'>
    <div v-for='order in orders' :key='order.key'>
      {{order}}
    </div>
    <button type="button" name="button" @click='myClick'>Click</button>
    <button type="button" name="button" @click='myEmit'>Emit</button>
  </div>
</template>

<script>
export default {
  name: 'orders',
  data: function data() {
    return {
      orders: [
        { key: 1, name: 'orderName1', value: 'value1', city: 'city1' },
        { key: 2, name: 'orderName2', value: 'value2', city: 'city2' },
        { key: 3, name: 'orderName3', value: 'value3', city: 'city3' },
        { key: 4, name: 'orderName4', value: 'value4', city: 'city4' },
        { key: 5, name: 'orderName5', value: 'value5', city: 'city5' }
      ]
    };
  },
  methods: {
    myClick: function myClick() {
      this.orders.push({key: 6, name: 'orderName1', value: 'value1', city: 'city1'});
    },
    myEmit: function myEmit() {
      this.$root.$emit('pushThis', { key: 7, name: 'emit', value: 'emit', city: 'emit' }, { key: 7, name: 'emit2', value: 'emit', city: 'emit' });
    }
  }
};

</script>

<style>
</style>
