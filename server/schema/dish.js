const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
   dishname:{type:String,required:true} ,
   dishcost:{type:Number,required:true},
})

module.exports = mongoose.model('Dish',dishSchema);