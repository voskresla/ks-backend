<template>
<div>
  <input v-model="searchInput">
  <Table :columns="columns" :data="computedData"></Table>
</div>  
</template>

<script>
export default {
  data: function () {
    return {
      searchInput: '',
      columns: [
        {
          title: '№',
          key: '_id'
        },
        {
          title: 'Покупатель',
          key: 'fullname'
        }
      ],
      orders: []
    }
  },
  created: function () {
    axios
      .get('/api/getallorders')
      .then(r => {this.orders = r.data})
      .catch(err => {console.log(err)});
  },
  computed: {
    computedData: function () {
      return this.orders.filter((order) => {
        return order.fullname.toLowerCase().includes(this.searchInput.toLowerCase());
      })
    }
  }

}
</script>

<style>
  
</style>
