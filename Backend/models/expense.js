const mongoose=require('mongoose')
const expenseschema=new mongoose.Schema({
    expense:String,
    date:String,
    userid:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    categoryid:{type:mongoose.Schema.Types.ObjectId,ref:'category'}
})
const expense=mongoose.model('expense',expenseschema)
module.exports=expense