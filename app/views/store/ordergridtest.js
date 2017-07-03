
let myapp = new Vue({
  el: "#myapp",
  data: {    
    columns1: [
      {
        title: '_ID',
        key: '_id'
      },
      {
        title: 'ID',
        key: 'productId'
      },
      {
        title: 'Наименование',
        key: 'productFullName'
      },
      {
        title: 'Дата установки',
        key: 'couponDate'
      },
      {
        title: 'Оплата',
        key: 'payed'
      },
      {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                        
                                        
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.payThis(params.row._id)
                                        }
                                    }
                                }, 'pay'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        _this: this
                                    },
                                    on: {
                                        click: () => {
                                            _this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                        
                    }
    ],
    orders: [],
    a: 'ping',
    isEditing: false,
    orderToEdit: {}
  },
  methods: {
    show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
                })
            },
    editThis: function(id) {
      this.isEditing = true;
      this.orderToEdit = {
        test: 'asasas'
      }
    }, 
    closeEditing: function () {
      this.isEditing = false;
      this.orderToEdit = {};
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
    startGetData: function () {

      // кароче варианты
      // soket.io
      // или своя реализация commet -  тогда изменения отрабатывам на сервере и просто щлем чо надо
      // или постоянный гет и проверка всего вобще на клиенте
      setInterval(() => {
        console.log('axios');
        axios
          .get("/api/getallorders")
          .then(r => {

            let newArr = r.data;
            console.log(newArr);
            
            let oldArr = this.orders;
            console.log(oldArr);

            // проверчем есть ли новые если есть добаляем

            if (newArr.length > oldArr.length) {
              for (var i = 0; i < newArr.length; i++) {
                var _id = newArr[i]._id;
                let isPush = true;
                
                for (var j = 0; j < oldArr.length; j++) {
                  
                  if (_id === oldArr[j]._id) {
                    isPush = false;
                    j = oldArr.length;
                  }  

                }

                if (isPush) {
                  this.orders.push(newArr[i]);
                }
                
              }
            }

            // если старые были удалены

            if (newArr.length < oldArr.length) {
              for (var i = 0; i < oldArr.length; i++) {
                var _id = oldArr[i]._id;
                let isDelete = true;
                
                for (var j = 0; j < newArr.length; j++) {
                  
                  if (_id === newArr[j]._id) {
                    isDelete = false;
                    j = newArr.length;
                  }  

                }

                if (isDelete) {
                  this.orders.splice(i,1);
                }
                
              }
            }

            // проверяем все изменения позначениям 
            for (var i = 0; i < newArr.length; i++) {
              for (var j = 0; j < oldArr.length; j++) {
                if (newArr[i]._id === oldArr[j]._id) {
                  for (var key in newArr[i]) {
                    if (newArr[i][key] !== oldArr[j][key]) {
                      
                      oldArr[j][key] = newArr[i][key];
                      
                      console.log('in oldArr ' + oldArr[j]['_id'] + ' key: ' + key + ' oldvalue: ' + oldArr[j][key])
                      console.log('in newArr ' + newArr[i]['_id'] + ' key: ' + key + ' newvalue: ' + newArr[i][key])
                    }
                  }
                } else {
                  console.log('diff');
                }
              }
            }


          })
          .catch(err => console.log(err));

      }, 3000)
    }
  },
  mounted: function () {
    console.log(this.a);
    this.startGetData();
  },
  created: function () {
    axios
      .get('/api/getallorders')
      .then(r => {this.orders = r.data})
      .catch(err => {console.log(err)});
  }
})

let myapp2 = new Vue({
  data: {
    columns1: [
      {
        title: '_ID',
        key: '_id'
      },
      {
        title: 'buttons',
        key: 'action',
        render: (h, params) => {
          return h('div',
            [
              h('Button', 
              {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.payThis(params.row._id)
                  }
                }
              }, 'pay')
            ])
        }
      }
    ],
    data1: [
      {
        _id: '0001'
      },
      {
        _id: '0002'
      }
    ]
  }
})