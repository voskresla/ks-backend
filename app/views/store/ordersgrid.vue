<template>
  <div>
    
    <div class="row align-middle align-center">
      <div class="small-4 columns text-center">
        <input type="text" v-model="searchInput" placeholder="номер купона / фио" class='searchinput'>
      </div>
    </div>
    
    
    <Table stripe :columns="columns" :data="computedData"></Table>
  </div>
</template>

<script>


import comments from './comments.vue';
import axios from 'axios';

export default {
  
  name: 'ordersgrid',
  data: function () {
    return {
      
      ishq: false,
      searchInput: '',
      columns: [
        {
          title: '№',
          key: 'couponNumber',
          width: '100px'
        },
        {
          title: 'Услуга',
          key: 'actions',
          render: (h, params) => {
            return h('div',
              [
                h('p', {}, params.row.productFullName),
                h('p', {}, params.row.addOption1 ? '+' + params.row.addOption1 : ''),
                h('p', {}, params.row.addOption2 ? '+' + params.row.addOption2 : ''),
                h('p', {}, params.row.addOption3 ? '+' + params.row.addOption3 : ''),
              ])
          }
        },
        {
          title: 'Покупатель',
          key: 'actions',
          render: (h, params) => {
            return h('div',
              [
                h('p', {}, params.row.fullname),
                h('p', {}, params.row.phone),
                h('p', {}, params.row.address)
              ])
          }
        },
        {
          title: 'Цена',
          key: 'productPrice',
          width: '130px',
          className: 'priceformat'
          // TODO вставать свой classname для формата :after :before
        },
        {
          title: 'Состояние',
          key: 'action',
          
          render: (h,params) => {
            return h('div',
            [
              h('p', {}, params.row.payed ? 'оплачено' : 'не оплачено' ),
              // TODO сюда можно прилепить ссылку (назначить мастера) чтоб она была прям в интерфейсе общего грида
              // TODO + tooltip для мастера чтобы посомтреть кто он вобще сразу
              h('p', {}, params.row.artasian ? 'мастер назначен' : 'мастер НЕ назначен' )
            ])
          }
        },
        {
          title: '#',
          key: 'action',
          width: '120px',
          
          render: (h,params) => {        

            let claimsArr = Array.apply(null,this.claims).filter(function (item) {
                    return item.orderId === params.row._id;
                  })

            let myComments = (function () {
              return h('div',
                Array.apply(null, params.row.commentsArr).map(function (item) {
                  return h('p', item.id + ' | ' + item.text + ' | ' + item.user)
                  })
                )
            })();

            let myClaims = (function () {
              return h('div',
                Array.apply(null, claimsArr).map(function (item) {
                  return h('p', item.claimCategory + ' | ' + item.creationDate + ' | ' + item.creationUser)
                  })
                )
            })();

            return h('div',[
            
            
            h('Poptip', {
              props: {
                trigger: 'hover',
                
              }
            },
            [
              h('div',{
                slot: 'content'
                  
                
              },[
                myComments
              ]),
              h('Badge', {
                props: {
                  count: params.row.commentsArr.length
                },
                style: {
                  display: params.row.commentsArr.length > 0 ? '' : 'none'
                }
              }, [
                h('Icon', {
                  // 'class': {
                  //   'demo-badge': true
                  // },
                  // style: {
                  //   width: '30px',
                  //   height: '30px',
                  //   background: '#eee',
                  //   'border-radius': '6px',
                  //   display: 'inline-block'
                  // }
                  props: {
                    type: 'chatbox',
                    size: '32px'
                  }
                })
              ]),
              // TODO сюда можно прилепить ссылку (назначить мастера) чтоб она была прям в интерфейсе общего грида
              // TODO + tooltip для мастера чтобы посомтреть кто он вобще сразу
              
            ]),

            h('Poptip', {
              props: {
                trigger: 'hover',
                
              }
            },
            [
              h('div',{
                slot: 'content'
                  
                
              },[
                myClaims
              ]),
              h('Badge', {
                props: {
                  count: claimsArr.length
                },
                style: {
                  display: claimsArr.length > 0 ? '' : 'none'
                }
              }, [
                h('Icon', {
                  // 'class': {
                  //   'demo-badge': true
                  // },
                  // style: {
                  //   width: '30px',
                  //   height: '30px',
                  //   background: '#eee',
                  //   'border-radius': '6px',
                  //   display: 'inline-block'
                  // }
                  props: {
                    type: 'android-notifications',
                    
                  },
                  style: {
                    marginLeft: '20px'
                  }
                })
              ]),
              // TODO сюда можно прилепить ссылку (назначить мастера) чтоб она была прям в интерфейсе общего грида
              // TODO + tooltip для мастера чтобы посомтреть кто он вобще сразу
              
            ])

          ])}
        },
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
                  disabled: params.row.payed ? true : false,
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
                    this.printThis(params.row._id);
                  }
                }
              }),

              h('Button', {
                props: {
                  type: 'primary',
                  size: 'large',
                  disabled: params.row.artasian ? true : false,
                  icon: 'person-add'
                },
                style: {
                  marginRight: '5px',
                  display: this.ishq ? '' : 'none'
                  
                },
                on: {
                  click: () => {
                    this.artasianThis(params.row._id)
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'large',
                  disabled: params.row.payed ? true : false,
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
              })
            ])
          }
        }
      ],
      orders: [],
      claims: []
    }
  },
  methods: {
    changeThis: function (id) {
      // TODO  router.push /makeorder
      this.$router.push({name: 'makeorder', params: { change: true, id: id}})

    },
    printThis: function (id) {
      alert('TODO print this with pdf maker')
    },
    payThis: function (id) {
      axios
        .put('/api/payorder/'+id)
        .then(r => console.log(r.data))
        .then(() => {
          axios
      .get('/api/getallorders')
      .then(r => {this.orders = r.data})
      .catch(err => {console.log(err)})}
        )
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
    artasianThis: function (id) {
      alert('TODO выбор Мастера.')
    }
  },
  beforeMount: function beforeMount() {
    const getUserUrl = '/api/getuser';
    let _this = this;
      axios
        .get(getUserUrl)
        .then( function (response) {
            if (response.data.role === 'hq') {
            _this.ishq = true;
            }
            
        })
        .catch(function (err) {
          console.log(err);
        });

  },
  created: function () {
    axios
      .get('/api/getallorders')
      .then(r => { this.orders = r.data })
      .then(() => {
        axios
          .get('/api/getallclaims')
          .then(r => { 
            this.claims=r.data
          })
          .catch(err => {console.log(err)})
      })
      .catch(err => { console.log(err) });
    

  },
  computed: {
    computedData: function () {
      return this.orders.filter((order) => {
        let matchFullname = order.fullname.toLowerCase().includes(this.searchInput.toLowerCase()); 
        let matchCouponNUmber = order.couponNumber.toLowerCase().includes(this.searchInput.toLowerCase());
        return matchFullname || matchCouponNUmber;
      })
    },

  }

}
</script>

<style>

</style>
