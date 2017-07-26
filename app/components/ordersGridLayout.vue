<template>
  <div>
    <Table stripe :columns="columns" :data="computedData"></Table>
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
  </div>
</template>

<script>

import { getNewDefinition } from '../models/couponDocDefinition';
import artasian from './artasian.vue';
import axios from 'axios';

export default {
  
  name: 'orderGridLayout',
  components: {
    'artasian': artasian
  },
  data: function () {
    return {
      
      openPrintCouponComponent:false,
      relatedOrdersForModal: [],
      openNewArtasianModal: false,
      orderIdForArtasianModal: '',
      artasianModalProps: {},
      choosenArtasian: '',
      ishq: false,
      searchInput: '',
      columns: [
        // {
        //   title: 'ЗНУ',
        //   key: 'globalId',
        // },
        {
          title: '№',
          key: 'action',
          render: (h,params) => {
            return h('a', {
                on: {
                  click: () => {
                    this.changeThis(params.row._id);
                  }
                }
              }, params.row.couponNumber)
          }
        },
        {
          title: 'Услуга',
          key: 'actions',
          
          render: (h, params) => {
            return h('div',
              [
                h('p', {}, params.row.productFullName),
                // h('p', {}, params.row.addOption1 ? '+' + params.row.addOption1 : ''),
                // h('p', {}, params.row.addOption2 ? '+' + params.row.addOption2 : ''),
                // h('p', {}, params.row.addOption3 ? '+' + params.row.addOption3 : ''),
              ])
          }
        },
        {
          title: 'Покупатель',
          key: 'actions',
          
          render: (h, params) => {
            return h('div',
              [
                h('p', {}, params.row.customerFullName),
                h('p', {}, params.row.customerPhone),
                h('p', {}, params.row.customerAddress)
              ])
          }
        },
        {
          title: 'Дата установки',
          key: 'masterWorkDate',
          
          // className: 'priceformat'
          // TODO вставать свой classname для формата :after :before
        },
        {
          title: 'Состояние',
          key: 'action',
          
          render: (h,params) => {
            return h('div',
            [
              h('p', {}, params.row.payIsPayed ? 'оплачено' : 'не оплачено' ),
              // TODO сюда можно прилепить ссылку (назначить мастера) чтоб она была прям в интерфейсе общего грида
              // TODO + tooltip для мастера чтобы посомтреть кто он вобще сразу
              h('p', {}, params.row.masterKsId ? params.row.masterKsId.fullname : 'мастер НЕ назначен' )
            ])
          }
        },
        // {
        //   title: '#',
        //   key: 'action',
        //   width: '120px',
          
        //   render: (h,params) => {        

        //     let claimsArr = Array.apply(null,this.claims).filter(function (item) {
        //             return item.orderId === params.row._id && item.status === 'open';
        //           })

        //     let myComments = (function () {
        //       return h('div',
        //         Array.apply(null, params.row.commentsArr).map(function (item) {
        //           return h('p', item.id + ' | ' + item.text + ' | ' + item.user)
        //           })
        //         )
        //     })();

        //     let myClaims = (function () {
        //       return h('div',
        //         Array.apply(null, claimsArr).map(function (item) {
        //           return h('p', item.claimCategory + ' | ' + item.creationDate + ' | ' + item.creationUser)
        //           })
        //         )
        //     })();

        //     return h('div',[
            
            
        //     h('Poptip', {
        //       props: {
        //         trigger: 'hover',
                
        //       }
        //     },
        //     [
        //       h('div',{
        //         slot: 'content'
                  
                
        //       },[
        //         myComments
        //       ]),
        //       h('Badge', {
        //         props: {
        //           count: params.row.commentsArr.length
        //         },
        //         style: {
        //           display: params.row.commentsArr.length > 0 ? '' : 'none'
        //         }
        //       }, [
        //         h('Icon', {
        //           // 'class': {
        //           //   'demo-badge': true
        //           // },
        //           // style: {
        //           //   width: '30px',
        //           //   height: '30px',
        //           //   background: '#eee',
        //           //   'border-radius': '6px',
        //           //   display: 'inline-block'
        //           // }
        //           props: {
        //             type: 'chatbox',
        //             size: '32px'
        //           }
        //         })
        //       ]),
        //       // TODO сюда можно прилепить ссылку (назначить мастера) чтоб она была прям в интерфейсе общего грида
        //       // TODO + tooltip для мастера чтобы посомтреть кто он вобще сразу
              
        //     ]),

        //     h('Poptip', {
        //       props: {
        //         trigger: 'hover',
                
        //       }
        //     },
        //     [
        //       h('div',{
        //         slot: 'content'
                  
                
        //       },[
        //         myClaims
        //       ]),
        //       h('Badge', {
        //         props: {
        //           count: claimsArr.length
        //         },
        //         style: {
        //           display: claimsArr.length > 0 ? '' : 'none'
        //         }
        //       }, [
        //         h('Icon', {
                  
        //           props: {
        //             type: 'android-notifications',
                    
        //           },
        //           style: {
        //             marginLeft: '20px'
        //           }
        //         })
        //       ]),
        //       // TODO сюда можно прилепить ссылку (назначить мастера) чтоб она была прям в интерфейсе общего грида
        //       // TODO + tooltip для мастера чтобы посомтреть кто он вобще сразу
              
        //     ])

        //   ])}
        // },
        {
          title: '',
          key: 'action',
          width: '320px',
          render: (h, params) => {
            return h('div',
            [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'large',
                  disabled: params.row.payIsPayed ? true : false,
                  icon: 'social-usd'
                },
                style: {
                  marginRight: '5px',
                  
                },
                on: {
                  click: () => {
                    this.payThis(params.row._id)
                  }
                }
              }),
              h ('Button', {
                props: {
                  type: 'primary',
                  size: 'large',
                  icon: 'printer'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.printThis(params);
                  }
                }
              }),

              h('Button', {
                props: {
                  type: 'primary',
                  size: 'large',
                  disabled: params.row.masterKsId ? true : false,
                  icon: 'person-add'
                },
                style: {
                  marginRight: '5px',
                  display: this.ishq ? '' : 'none'
                  
                },
                on: {
                  click: () => {
                    this.artasianThis(params.row._id, params.row.customerAddress)
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'large',
                  disabled: params.row.payIsPayed ? true : false,
                  icon: 'trash-a'
                },
                style: {
                  marginRight: '5px',
                  
                },
                on: {
                  click: () => {
                    this.deleteThis(params.row._id)
                  }
                }
              }),
              
              h ('Button', {
                props: {
                  type: 'primary',
                  size: 'large',
                  icon: 'edit',
                  
                },
                style: {
                  marginRight: '5px',
                  display: this.ishq ? '' : 'none'
                },
                on: {
                  click: () => {
                    this.changeThis(params.row._id);
                  }
                }
              }),
              
            ])
          }
        }
      ],
      orders: [],
      claims: [],
      artasians: []
    }
  },
  methods: {
    sendNewArtasian: function(orderId, artasianId) {
      this.openNewArtasianModal = false;
      
      let artasianObject = this.artasians.filter(function (item) {
        return artasianId === item._id
      })

      axios 
        .put('/api/updateorder/'+orderId, { masterKsId: artasianObject[0] })
        .then(() => {
          axios
            .get('/api/getallorders')
            .then(r => { this.orders = r.data })
            
        }).
        then(() =>{
          this.orderIdForArtasianModal = '';
          this.choosenArtasian = '';
        })
        .catch(err => { console.log(err) })
    },
    changeThis: function (id) {
      // TODO  router.push /makeorder
      this.$store.commit('changeOrderLayoutState', { init: false, new:false, edit: false, key: false, name: false, all: false, id: id })
      this.$store.commit('updateFilterSearch', '');
      this.$router.push({ name: 'editshowOrder', params: {id: id} })

    },
    printThis: function (orderObject) {
      let couponDocDefinition = getNewDefinition(orderObject);
      pdfMake.createPdf(couponDocDefinition).open();
      // this.openPrintCouponComponent = true;
    },
    payThis: function (id) {
      axios
        .put('/api/payorder/' + id)
        .then(r => console.log(r.data))
        .then(() => {
          return axios.get('/api/getallorders')
        })
        .then(r => { this.orders = r.data })
        .catch(err => console.log(err));

    },
    deleteThis: function (id) {
      axios
        .delete("/api/deleteorder/"+id)
        .then(r => console.log ('delete order'))
        .then(() => {
          axios
      .get('/api/getallorders')
      .then(r => {this.orders = r.data})
      .catch(err => {console.log(err)})}
        )
        .catch(err => console.log(err))
    },
    artasianThis: function (id,address) {
      this.openNewArtasianModal = true;
      this.orderIdForArtasianModal = id;
        
      this.relatedOrdersForModal = this.orders.filter((item) => {
        return item.customerAddress === address && item._id !== id
      })

      console.log(this.relatedOrdersForModal)

    },
    closeModal: function () {
      this.orderIdForArtasianModal = '';
      this.choosenArtasian = '';
      this.openNewArtasianModal = false;
      this.relatedOrdersForModal = [];
    }
  },
  beforeMount: function beforeMount() {
    this.ishq = this.$store.state.user.role === 'hq' ? true : false ;
  },
  
  created: function () {
    console.log('created all orders')
    axios
      .get('/api/getallorders')
      .then(r => { this.orders = r.data })
      .then(() => {
        return axios.get('/api/getallclaims')             
      })
      .then(r => { 
            this.claims=r.data
      })
      .catch(err => { console.log(err) });
    
    axios
      .get('/api/getallartasians/')
      .then(r => {
        this.artasians = r.data
      })
      .catch(err => console.log(err))

  },
  computed: {
    computedData: function () {
      return this.orders.filter((order) => {
        let matchFullname = order.customerFullName.toLowerCase().includes(this.$store.state.filterSearch.toLowerCase()); 
        let matchCouponNumber = order.couponNumber.toLowerCase().includes(this.$store.state.filterSearch.toLowerCase());
        let matchAddress = order.customerAddress.toLowerCase().includes(this.$store.state.filterSearch.toLowerCase());
        return matchFullname || matchCouponNumber || matchAddress;
      })
    },
   
  }

}
</script>

<style scoped>

.ivu-icon {
  color:brown;
}

</style>
