const mongoose=require('mongoose')
const complaintschema=new mongoose.Schema({
    date:String,
    complaint:String,
    reply:String,
    userid:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})
const complaint=mongoose.model('complaint',complaintschema)
module.exports=complaint