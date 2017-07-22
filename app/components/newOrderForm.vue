<template>
<div>
  <Row type="flex" justify="center" align="top">
    <Col :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form">
      <Row>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          <h2>Новая заявка {{order.couponNumber}}</h2>
            <Input v-model="order.customerFullName" placeholder="Иванов Иван Иванович"></Input>
            <Input v-model="order.customerPhone" placeholder="+7 999 999 99 99"></Input>
            <Input v-model="order.customerAddress" placeholder="г Йошкар-Ола, Садовая 11-14"></Input>
            <Input v-model="order.customerComment" type="textarea" placeholder="г Йошкар-Ола, Садовая 11-14"></Input>

            <Button type="primary" @click="handleSendClick">Отправить заявку</Button>

        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          COUPON INFO
        </Col>
      </Row>
    </Col>
  </Row>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'newOrderForm',
  data: function() {	
    return {
       
    }
  },
  methods: {
    handleSendClick () {
      axios
        .post('/api/postorder/',this.order)
        .then((r) => console.log(r))
        .catch((err) => console.log(err))
    }
  },
  computed: {
    order () {
      return  this.$store.getters.getOrderFromStore;
    },
  },
  
  beforeMount () {
    this.$store.dispatch('getOrderInfoFromServer');
  }
}
</script>

<style scoped>

</style>