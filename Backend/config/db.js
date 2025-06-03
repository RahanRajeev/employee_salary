const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const db=async()=>{
    const cn=await mongoose.connect(process.env.MONGODBURL)
    console.log('DBconnected');

}
module.exports=db