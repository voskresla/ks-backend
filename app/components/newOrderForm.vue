<template>
  <div>
    <Row type="flex" justify="center" align="top">
      <Col v-if="loading" :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form"> Loading processing...
      </Col>
      <Col v-if="error" :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form"> Error: {{error}}
      </Col>
      <Col v-if="localOrder" :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form">
      <Row>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
        <h3>Новая заявка {{localOrder.couponNumber}}</h3>
        <h2>{{localOrder.productFullName}}</h2>
        <Input v-model="localOrder.customerFullName" placeholder="Иванов Иван Иванович"></Input>
        <Input v-model="localOrder.customerPhone" placeholder="+7 999 999 99 99"></Input>
        <Input v-model="localOrder.customerAddress" placeholder="г Йошкар-Ола, Садовая 11-14"></Input>
        <Input v-model="localOrder.customerComment" type="textarea" placeholder="г Йошкар-Ола, Садовая 11-14"></Input>
  
        <div v-if="localOrder.productAdditionals">
          <Checkbox-group v-model="localAditionalProductsChecked">
          <Checkbox v-for="item in localOrder.productAdditionals" :label="item.key" :key="item.key">
              <span>{{item.name}} +{{item.price}}</span>
          </Checkbox>
          </Checkbox-group>
        </div>

        <Button type="primary" @click="handleSendClick">Отправить заявку</Button>
  
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12"> COUPON INFO
        </Col>
      </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'newOrderForm',
  data: function () {
    return {
      loading: false,
      error: null,
      localOrder: null,
      localAditionalProductsChecked: []
    }
  },
  methods: {
    async handleSendClick() {
      if (this.localAditionalProductsChecked.length) {
        for (var i = 0; i < this.localAditionalProductsChecked.length; i++) {
          var element = this.localAditionalProductsChecked[i];
          let tmpAdditionalOrder = {...this.localOrder};
          
          tmpAdditionalOrder.productAdditionals = {};
          tmpAdditionalOrder.orderKsId = await axios.get('/api/getnewksid')
            .then((r) => { return r.data })
            .catch((err) => {
              console.log(err);
            });
          tmpAdditionalOrder.couponNumber = this.localOrder.couponNumber + '-' +i;
          tmpAdditionalOrder.couponPrice = this.localOrder.productAdditionals[element].price;
          tmpAdditionalOrder.productKey = [element];
          tmpAdditionalOrder.productFullName = this.localOrder.productAdditionals[element].name;
          tmpAdditionalOrder.productPrice = this.localOrder.productAdditionals[element].price;

          await axios.post('/api/postorder/', tmpAdditionalOrder)
          .then(() => console.log('post order N', i))
          .catch((err) => console.log(err))
        }
      }

      this.localOrder.productAdditionalsChecked = this.localAditionalProductsChecked;
      await axios.post('/api/postorder/', this.localOrder)
          .then(() => console.log('post general order'))
          .catch((err) => console.log(err))
      
      this.$store.commit('changeOrderLayoutState', { init: true, new:false, edit: false, key: false, name: false, additionals: false })
      this.$router.push({ name: 'newOrder' })
    },
    ...mapGetters([
      'getOrderFromStore',
    ])
  },
  computed: {
    
  },
  beforeMount() {
    this.loading = true;
    this.localOrder = this.error = null;
    this.$store.dispatch('getOrderInfoFromServer')
      .then((r) => {
        this.loading = false;
        let orderFromStore = this.getOrderFromStore();
        this.localOrder = {...orderFromStore};
      })
      .catch((err) => {
        console.log(err)
        this.loading = false;
        this.error = err;
      })
  }
}
</script>

<style scoped>

</style>