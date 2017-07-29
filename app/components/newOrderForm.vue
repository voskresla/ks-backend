<template>
  <div>
    <Row type="flex" justify="center" align="top">
      <Col v-if="loading" :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form"> Loading processing...
      </Col>
      <Col v-if="error" :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form"> Error: {{error}}
      </Col>
      <Col v-if="localOrder" :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form">
      <Row :gutter="16" >
        <Col :xs="24" :sm="24" :md="12" :lg="12">
        <h3>Новая заявка {{localOrder.couponNumber}}</h3>
        <h2>{{localOrder.productFullName}}</h2>
        <Input v-model="localOrder.customerFullName" placeholder="Иванов Иван Иванович"></Input>
        <Input v-model="localOrder.customerPhone" placeholder="+7 999 999 99 99"></Input>
        <Select placeholder="г Йошкар-Ола, Садовая 11-14"
                v-model="localOrder.customerAddress"
                filterable
                remote
                :remote-method="suggestionRemote">
                  <Option v-for="option in suggestionOptions" :value="option.value" :key="option.value">{{option.value}}</Option>
                </Select>
        <!-- <Input v-model="localOrder.customerAddress" placeholder="г Йошкар-Ола, Садовая 11-14"></Input> -->
        <Input v-model="localOrder.customerComment" type="textarea" :rows="5" placeholder="Комментарий"></Input>
  
        <Date-picker type="date" placeholder="Дата установки" style="width: 200px" @on-change="handleChangeDate"></Date-picker>

        <div v-if="localOrder.productAdditionals">
          <Checkbox-group v-model="localAditionalProductsChecked" class="my-checkbox">
          <Checkbox v-for="item in localOrder.productAdditionals" :label="item.key" :key="item.key">
              <span>{{item.name}} +{{item.price}}</span>
          </Checkbox>
          </Checkbox-group>
        </div>
        <Row justify="center">
        <Col class="send-button"><Button type="primary" @click="handleSendClick" :disabled="!formIsValid">Отправить заявку</Button></Col>
      </Row>
        </Col>
      
        <Col :xs="24" :sm="24" :md="12" :lg="12" class="coupon-view-pretty">
          <coupon-layout :localOrder="localOrder" :localAditionalProductsChecked="localAditionalProductsChecked"></coupon-layout>
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
  components: {
    'coupon-layout': require('./couponLayout.vue')
  },
  data: function () {
    return {
      loading: false,
      error: null,
      localOrder: null,
      localAditionalProductsChecked: [],

      // DADATA.RU
      suggestions: '',
      suggestionOptions: ''
    }
  },
  methods: {
    handleChangeDate (value) {
      this.localOrder.masterWorkDate = value;
    },
    suggestionRemote: function (value) {
      axios
        .post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {

          "query": value,
          "count": 5,
          "locations": [{
            "region": "Марий Эл"
          }],
          "restrict_value": true
            
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token daa7df9d3d75b308e28317375c6c0587d5c17c06',
          }
        })
        .then(r => {
          this.suggestionOptions = r.data.suggestions
        })
        .catch(err => console.log(err));
    },
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
      
      this.$store.commit('changeOrderLayoutState', { init: true, new:false, edit: false, key: false, name: false, all: false })
      this.$router.push({ name: 'newOrder' })
    },
    ...mapGetters([
      'getOrderFromStore',
    ])
  },
  computed: {
    formIsValid () {
      const isValid = 
        Boolean(this.localOrder.customerFullName)
        && Boolean(this.localOrder.customerPhone)
        && Boolean(this.localOrder.customerAddress)
        && Boolean(this.localOrder.masterWorkDate) 
      return isValid
    }
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