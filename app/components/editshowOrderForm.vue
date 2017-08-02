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

    <!-- CLAIM MODAL COMPONENT  -->
    

    <Row type="flex" justify="center" align="top" >
      <Col v-if="loading" :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form"> Loading processing...
      </Col>
      <Col v-if="error" :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form"> Error: {{error}}
      </Col>
      <Col v-if="localOrder" :xs="22" :sm="22" :md="18" :lg="18" class="new-order-form">
      <Row :gutter="16">
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
              <Date-picker format="dd.MM.yyyy" placement="right" v-model="localOrder.masterWorkDate" type="date" placeholder="Дата установки" :disabled="!isEdit"></Date-picker>  
            </Col>
          </Row>
        
        <Input v-model="localOrder.customerComment" type="textarea" :rows="5" placeholder="Комментарий" :disabled="!isEdit"></Input>
        
        <Row v-if="$store.getters.isHQ" class="new-order-form-master-button">
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
          
          <Card class="card-addtitionals-wrapper">
            <div v-if="relatedOrdersForAdditionalInfoByNumber.length">
              <h3>По номеру:</h3>
              <p v-for="item in relatedOrdersForAdditionalInfoByNumber" :key="item._id" class="card_additionals">
                {{item.couponNumber}} | {{item.productFullName}} | {{item.payIsPayed ? 'оплачено' : 'не оплачено'}} | {{item.masterKsId ? item.masterKsId.fullname : 'мастер НЕ назначен'}}
              </p>
            </div>

            <div v-if="relatedOrdersForAdditionalInfoByAddress.length">
            <h3>По адресу:</h3>
            <p v-for="item in relatedOrdersForAdditionalInfoByAddress" :key="item._id" class="card_additionals">
              {{item.couponNumber}} | {{item.productFullName}} | {{item.payIsPayed ? 'оплачено' : 'не оплачено'}} | {{item.masterKsId ? item.masterKsId.fullname : 'мастер НЕ назначен'}}
            </p>
            </div>

          </Card>
        </div>
        
        <claim-make-new-modal v-if="$store.getters.isHQ" @refreshClaims="refreshClaims" :orderId="localOrder._id" :username="this.$store.state.user.user"></claim-make-new-modal>
        <Button v-if="$store.getters.isHQ" type="primary" @click="handleChangeOrderClick()" :disabled="!isOrderEditable">{{!isEdit ? 'Изменить' : 'Принять'}}</Button>
        <Button v-if="$store.getters.isHQ" type="primary">Удалить</Button>
  
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12" v-if="$store.getters.isHQ">
          <Tabs v-model="tabValue" @on-click="handleTabsClick">
            <div slot="extra">
                <a @click="handleTabPlusClick">+</a>
              </div>
            <Tab-pane label="Претензии" name="claims">
              <component :is="claimCurrentView" @changeClaimCurrentView="changeClaimCurrentView" :claims="claims"></component>
            </Tab-pane>
            <Tab-pane label="Комментарии" name="comments">
              <component :is="commentCurrentView" @refreshLocalOrder="refreshLocalOrder" :localOrder="localOrder"></component>
            </Tab-pane>
            <Tab-pane label="История" name="history">
              
            </Tab-pane>
        </Tabs>
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
  components: {
    'claim-make-new-modal': require('./claimMakeNewModal.vue'),
    'claim-layout': require('./claimsLayout.vue'),
    'claim-form': require('./claimForm.vue'),
    'comments-layout': require('./commentsLayout.vue')
  },
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
      claims: [],

      // CLAIMS DATA
      claimCurrentView: 'claim-layout',

      // COMMENTS DATA
      commentCurrentView: 'comments-layout',

      // TABS DATA
      tabValue: 'claims'
    }
  },
  methods: {
    ...mapGetters([
      'getOrderFromStore',
    ]),
    sendNewArtasian: function(orderId, artasianId) {
      this.openNewArtasianModal = false;
      
      let artasianObject = this.artasians.filter(function (item) {
        return artasianId === item._id
      })

      this.localOrder.masterKsId = artasianObject[0]
    },
    handleTabsClick (name) {
      switch (name) {
        case 'claims':
          if (this.claimCurrentView === 'claim-form') {
            this.changeClaimCurrentView();
          }
          break;
      
        default:
          break;
      }
    },
    refreshLocalOrder() {
      this.$store.dispatch('getOrderInfoFromServer')
      .then((r) => {
        this.localOrder = {...r[0]};
      })
      .catch(err => comsole.log(err))
    },
    refreshClaims () {
      axios
        .get('api/getclaimsbyid/'+this.localOrder._id)
        .then((r) => {this.claims = r.data})
        .catch((err) => console.log(err)) 
    },
    changeClaimCurrentView () {
      // commit claim id to store
      this.claimCurrentView = this.claimCurrentView === 'claim-layout' ? 'claim-form' : 'claim-layout'
    },
    createNewClaim() {
      alert('handle CreateNewClaim')
    },
    createNewComment() {
      alert('handle CreateNewComment')
    },
    handleTabPlusClick() {
      switch (this.tabValue) {
        case 'claims':
          this.createNewClaim();
          break;
        case 'comments':
          this.createNewComment();
          break;
      
        default:
          this.$Message('сорян в Историю ничего добавить нельзя, потом сделаю неактивной кнопку.')
          break;
      }
    },
    artasianThis: function (id,address) {
      if (!this.isEdit) {
        this.$Message.info('нельзя менять мастера не нажав кнпоку ИЗМЕНИТЬ')
      } else {
        this.openNewArtasianModal = true;
      }
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
      
    },
    relatedOrdersForAdditionalInfoByAddress () {
      
        return this.orders.filter((item) => {
          return item.customerAddress === this.localOrder.customerAddress && item._id !== this.localOrder._id && item._id.substring(0,13) !== this.localOrder._id.substring(0,13)
        })
    },
    relatedOrdersForAdditionalInfoByNumber () {
      return this.orders.filter((item) => {
        return item._id.substring(0,13) === this.localOrder._id.substring(0,13) && item._id !== this.localOrder._id
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
        return axios.get('api/getclaimsbyid/'+this.localOrder._id)             
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