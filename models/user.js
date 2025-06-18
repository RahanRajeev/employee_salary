const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    phone:String,
    password:String,
    googleId: String,
    image:String,
    status:String,
})
const user=mongoose.model('user',userschema)
module.exports=user