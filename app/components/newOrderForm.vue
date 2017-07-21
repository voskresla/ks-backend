<template>
<div>
  <Row type="flex" justify="center" align="top">
    <Col :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form">
      <Row>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          <h2>Новая заявка</h2>
          
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
        
        </Col>
      </Row>
    </Col>
  </Row>
</div>
</template>

<script>
export default {
  name: 'newOrderForm',
  data: function() {	
    return {
       
    }
  },
  methods: {
    fillLocalOrder () {
      // console.log(this.order);
      // console.log(this.order.productPrice);
      // console.log(this.order['productPrice']);
      
    },
    handleTest() {
      // this.$store.commit('changeOrderLayoutState', { init: false, new: true, edit: false, key: 'DW_VIP'});
      // this.$store.dispatch('getOrderInfoFromServer');
      this.fillLocalOrder();
    }
  },
  computed: {
    order () {
      return this.$store.getters.getOrderFromStore;
    }
  },
  
  beforeMount () {
    this.$store.dispatch('getOrderInfoFromServer');
  }
}
</script>

<style scoped>

</style>