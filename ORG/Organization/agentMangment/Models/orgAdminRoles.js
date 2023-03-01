const mongoose = require('mongoose')

const adminRoles = new mongoose.Schema({
   addCustomer : {
    type : Number,
    default  : 0
   },
   deletCustomer : {
    type : Number,
    default  : 0
   },
   blockCustomer : {
    type : Number,
    default  : 0
   },
   registerEmployee : {
    type : Number,
    default  : 0
   },
   
},{timestamps : true})

module.exports = mongoose.model('adminRoles', adminRoles)