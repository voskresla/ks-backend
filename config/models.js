module.exports = function (mongoose) {
  
  let modelsObject = {};

  let ordersSchema = mongoose.Schema({
    groupSelect: {
      text: String,
      value: String,
      counter: Number
    }
  })

  let countersSchema = mongoose.Schema({
    counter: Number
  })

  countersSchema.methods.increment = function () {
    console.log('call handler increment for countersSchema')
  }

  modelsObject.orders = mongoose.model('orders', ordersSchema);
  modelsObject.counters = mongoose.model('counters', countersSchema);
  

  return modelsObject
}