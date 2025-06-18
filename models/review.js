const mongoose=require('mongoose')
const reviewschema=new mongoose.Schema({
    rating:String,
    review:String,
    date:String,
    userid:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
})
const review=mongoose.model('review',reviewschema)
module.exports=review