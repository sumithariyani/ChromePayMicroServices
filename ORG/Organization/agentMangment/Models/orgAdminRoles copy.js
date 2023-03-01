const mongoose = require('mongoose')
const Schema = mongoose.Schema;


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
   AdminID : {
      type: Schema.Types.ObjectId, ref: 'orgadmin'
  },
   
},{timestamps : true})

module.exports = mongoose.model('adminRoles', adminRoles)