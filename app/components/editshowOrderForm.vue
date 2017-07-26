<template>
  <div>
    <!--
      Мы ебашим сюда модалку только потому что не можем вставить компонент в h() внутри columns
      Не забудь написать вот сюда issue https://github.com/iview/iview/issues/775#issuecomment-314061077
      -->
    <Modal v-model="openNewArtasianModal" :closable="false" :mask-closable="false">
      <Card>
        <p slot="title">Доступные мастера</p>
        <p slot="extra"><Icon type="ios-loop-strong"></Icon></p>
        <p>
          <Radio-group v-model="choosenArtasian">
            <Radio v-for="(item,index) in artasians" :key="item._id" :label="item._id">
              {{item.fullname}} | {{item.orderGetToday}}/4 | <Icon type="ios-star" v-if="item.rating >= 1"></Icon><Icon type="ios-star" v-if="item.rating >= 2"></Icon><Icon type="ios-star" v-if="item.rating >= 3"></Icon><Icon type="ios-star" v-if="item.rating >= 4"></Icon><Icon type="ios-star" v-if="item.rating >= 5"></Icon>
            </Radio>
          </Radio-group>
        </p>
        <Alert show-icon v-if="relatedOrdersForModal.length">
          <template slot="desc">
            <p v-for="order in relatedOrdersForModal" :key="order._id">
              Заявка {{order.couponNumber}}. Мастер: {{order.actualArtasian ? order.actualArtasian.fullname : 'не назначен'}}
            </p>
          </template>
        </Alert>
      </Card>
      <p slot="footer">
        <Button type="primary" @click="closeModal">Закрыть</Button>
        <Button type="primary" @click="sendNewArtasian(orderIdForArtasianModal, choosenArtasian)">Назначить</Button>
      </p>
    </Modal>


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
          <Input v-model="localOrder.customerFullName" placeholder="Иванов Иван Иванович" :disabled="!isEdit"></Input>
            <Input v-model="localOrder.customerAddress" placeholder="г Йошкар-Ола, Садовая 11-14" :disabled="!isEdit"></Input>
          <Row :gutter="16">
            
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <Input v-model="localOrder.customerPhone" placeholder="+7 999 999 99 99" :disabled="!isEdit"></Input>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <Date-picker v-model="localOrder.masterWorkDate" type="date" placeholder="Дата установки" :disabled="!isEdit"></Date-picker>  
            </Col>
          </Row>
        
        <Input v-model="localOrder.customerComment" type="textarea" :rows="5" placeholder="Комментарий" :disabled="!isEdit"></Input>
        
        <Row class="new-order-form-master-button">
          <Col :xs="22" :sm="22" :md="23" :lg="23" >
            {{localOrder.masterKsId.fullname}}
          </Col>
          <Col>
            <Icon type="person-add" @click.native="artasianThis($route.params.id, localOrder.customerAddress)" class="master-icon"></Icon>
          </Col>
        </Row>
        
        <!-- <div v-if="localOrder.productAdditionals">
          <Checkbox-group v-model="localAditionalProductsChecked" class="my-checkbox">
          <Checkbox v-for="item in localOrder.productAdditionals" :label="item.key" :key="item.key">
              <span>{{item.name}} +{{item.price}}</span>
          </Checkbox>
          </Checkbox-group>
        </div> -->
        <div>
          
          <Card>
            <p slot="title">
              Связанные заявки
            </p>

          </Card>
        </div>
        
        <Button type="primary" @click="handleChangeOrderClick()" :disabled="!isOrderEditable">{{!isEdit ? 'Изменить' : 'Принять'}}</Button>
        <Button type="primary">Удалить</Button>
  
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          COMMENTS + CLAIMS + HISTORY
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
  name: 'editshowOrderForm',
  data: function() {	
    return {
      // DATA FOR ATASIAN MODAL
      artasians: [],
      // relatedOrdersForModal: [],
      openNewArtasianModal: false,
      // orderIdForArtasianModal: '',
      artasianModalProps: {},
      choosenArtasian: '',

      // GENERAL DATA
      loading: false,
      error: null,
      localOrder: null,
      orders: [],
      claims: []
    }
  },
  methods: {
    ...mapGetters([
      'getOrderFromStore',
    ]),
    artasianThis: function (id,address) {
      this.openNewArtasianModal = true;
      // this.orderIdForArtasianModal = id;
        
      // this.relatedOrdersForModal = this.orders.filter((item) => {
      //   return item.customerAddress === address && item._id !== id
      // })

      

    },
    closeModal: function () {
      this.orderIdForArtasianModal = '';
      this.choosenArtasian = '';
      this.openNewArtasianModal = false;
      this.relatedOrdersForModal = [];
    },
    handleMasterClick () {
      alert('handleMasterClick')
    },
    handleChangeOrderClick () {
      if (!this.isEdit) {
        this.$Message.info('Начинаем редактирование');
        axios
        .get('/api/checkeditable/'+this.$route.params.id)
        .then((r) => {
          if (r.data) {
            this.loading = true;
            this.localOrder = this.error = null;
            this.$store.dispatch('getOrderInfoFromServer')
            .then((r) => {
                this.loading = false;
                this.localOrder = {...r[0]};
                return axios
                  .put('/api/updateorder/'+this.$route.params.id, {isOrderEditable: false})
            })
            .then(() => {
              this.$store.commit('changeOrderLayoutState',  { init: false, new:false, edit: true, key: false, name: false, all: true, id: this.$route.params.id})
            })
            .catch((err) => {
                console.log(err)
                this.loading = false;
                this.error = err;
            })
          }
          else {
            this.$Message.info('Сорян, за это время уже кто-то его правит.');
          }
        })
        .catch((err) => console.log(err))
      } else {
        this.$Message.info('НАчинаем применять');
        this.localOrder.isOrderEditable = true;
        axios
          .put('/api/updateorder/'+this.$route.params.id, {...this.localOrder})
          .then((r) => {
            this.loading = true;
            this.localOrder = this.error = null;
            this.$store.dispatch('getOrderInfoFromServer')
            .then((r) => {
              this.loading = false;
              this.localOrder = {...r[0]};
              this.$store.commit('changeOrderLayoutState',  { init: false, new:false, edit: false, key: false, name: false, all: true, id: this.$route.params.id})
            })
            .catch((err) => {
              console.log(err)
              this.loading = false;
              this.error = err;
            })
            
          })
      }
    }
  },
  computed: {
    isEdit () {
      return Boolean(this.$store.state.orderLayoutState.edit)
    },
    isOrderEditable () {
      return Boolean(this.localOrder.isOrderEditable)
    },
    orderIdForArtasianModal () {
      return this.localOrder._id
    },
    relatedOrdersForModal () {
      return this.orders.filter((item) => {
        return item.customerAddress === this.localOrder.customerAddress && item._id !== this.localOrder._id
      })
    }
    
  },
  beforeMount() {
    this.loading = true;
    this.localOrder = this.error = null;
    this.$store.dispatch('getOrderInfoFromServer')
      .then((r) => {
        this.localOrder = {...r[0]};
        return axios.get('/api/getallartasians/')
      })
      .then((r) => {
        this.artasians = r.data;
        return axios
          .get('/api/getallorders')
      })
      .then(r => { this.orders = r.data })
      .then(() => {
        return axios.get('/api/getallclaims')             
      })
      .then(r => { 
            this.claims=r.data
            this.loading = false;
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