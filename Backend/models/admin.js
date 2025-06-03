const mongoose=require('mongoose')
const adminschema=new mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    phone:String,
    password:String,
    image:String,
})
const admin=mongoose.model('admin',adminschema)
module.exports=admin