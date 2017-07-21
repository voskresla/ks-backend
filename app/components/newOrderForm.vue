<template>
<div>
  {{productKey}}
</div>
</template>

<script>
export default {
  name: 'newOrderForm',
  data: function() {	
    return {
      productKey: this.$store.getters.getOrderLayoutState.key
    }
  },
  methods: {},
}
</script>

<style scoped>

</style>