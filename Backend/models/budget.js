const mongoose=require('mongoose')
const budgetschema=new mongoose.Schema({
    budget:String,
    date:String,
    userid:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})
const budget=mongoose.model('budget',budgetschema)
module.exports=budget