module.exports = function (mongoose) {
  
  let modelsObject = {};


  let countersSchema = mongoose.Schema({
    counter: Number,
    newtrade: {
      counter: Number,
      prevdate: { type: Date },
      shopnumber: String
    },
  })

  countersSchema.methods.increment = function () {
    console.log('call handler increment for countersSchema')
  }

  
  modelsObject.counters = mongoose.model('counters', countersSchema);
  

  return modelsObject
}