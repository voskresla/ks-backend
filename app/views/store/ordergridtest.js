
let myapp = new Vue({
  el: "#myapp",
  data: {
    orders: [],
    a: 'ping'
  },
  methods: {
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