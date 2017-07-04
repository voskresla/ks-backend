<template>
  <div>
    <input v-model="searchInput">
    <Table stripe :columns="columns" :data="computedData"></Table>
  </div>
</template>

<script>

import axios from 'axios';

export default {
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
          key: 'actionse',
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
          title: '',
          key: 'action',
          render: (h, params) => {
            return h('div',
            [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.payed ? true : false
                },
                style: {
                  marginRight: '5px',
                  
                },
                on: {
                  click: () => {
                    this.payThis(params.row._id)
                  }
                }
              }, 'оплатить'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.artasian ? true : false
                },
                style: {
                  marginRight: '5px',
                  display: this.ishq ? 'block' : 'none'
                  
                },
                on: {
                  click: () => {
                    this.artasianThis(params.row._id)
                  }
                }
              }, 'назначить'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.payed ? true : false
                },
                style: {
                  marginRight: '5px',
                  
                },
                on: {
                  click: () => {
                    this.deleteThis(params.row._id)
                  }
                }
              }, 'удалить'),
              h ('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  narginRight: '5px'
                },
                on: {
                  click: () => {
                    this.printThis(params.row._id);
                  }
                }
              }, 'напечатать')
            ])
          }
        }
      ],
      orders: []
    }
  },
  methods: {
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
      .catch(err => { console.log(err) });
  
  },
  computed: {
    computedData: function () {
      return this.orders.filter((order) => {
        let matchFullname = order.fullname.toLowerCase().includes(this.searchInput.toLowerCase()); 
        let matchCouponNUmber = order.couponNumber.toLowerCase().includes(this.searchInput.toLowerCase());
        return matchFullname || matchCouponNUmber;
      })
    }
  }

}
</script>

<style>

</style>
