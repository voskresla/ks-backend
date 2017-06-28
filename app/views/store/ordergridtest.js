
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
            let oldArr = this.orders;

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