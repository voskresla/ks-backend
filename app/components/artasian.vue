<template>
  
</template>

<script>
export default {
  data() {
    return {

      data1: [
        { id: '001' },
        { id: '002' },
        { id: '003' }
      ],
      columns: [
        {
          title: '#',
          key: 'id'
        },
        {
          title: 'custom',
          key: 'action',
          render: (h, params) => {
            return h('div', 'sdsd')
          }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>