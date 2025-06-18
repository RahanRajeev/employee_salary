const ex=require('express')
const multer=require('multer')
const router=ex.Router()
const admin=require('../models/admin')
const complaint = require('../models/complaint')
const user=require('../models/user')
const category=require('../models/category')
const review= require('../models/review')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'.jpg')
    }
})
const upload=multer({storage:storage})


router.post('/adminchangepassword',async(req,res)=>{
    const uid=req.body.uid
    const currentpass=req.body.currentpass
    const newpass=req.body.newpass
    const confirmpass=req.body.confirmpass


    const data =await admin.findOne({_id:uid})
    console.log(data);

    if(data.password==currentpass){
        if(newpass==confirmpass){
            const edit=await admin.findOneAndUpdate({_id:uid},{$set:{password:newpass}},{new:true})
            res.json({'status':'change'})
        }else{
            res.json({'status':'fail'})
        }
    }else{
        res.json({'status':'wrong'})
    }
})


router.get('/viewcomplaint',async(req,res)=>{
    const data=await complaint.find().populate('userid')
    // console.log(data);

    res.json({data:data})
})


router.get('/reply',async(req,res)=>{
    const id=req.query.cid

    const data=await complaint.findOne({
        _id:id
    })
    res.json({data:data})
})

router.post('/reply_post',async(req,res)=>{
    const reply=req.body.reply
    const id=req.body.pid
    

    const item={
        reply:reply
    }
    console.log(id);

    const edit=await complaint.findOneAndUpdate({_id:id},{$set:item},{new:true})

    res.json({'status':'reply'})
})



router.get('/viewuser',async(req,res)=>{
    const data=await user.find()

    res.json({data:data})
})


router.get('/block/:id',async(req,res)=>{
    const id=req.params.id
    console.log(id);
    const item={
        status:'blocked'
    }
    const edit=await user.findOneAndUpdate({_id:id},{$set:item},{new:true})
    res.json({'status':'block'})
})


router.get('/unblock/:id',async(req,res)=>{
    const id=req.params.id
    console.log(id);
    const item={
        status:'unblocked'
    }
    const edit=await user.findOneAndUpdate({_id:id},{$set:item},{new:true})
    res.json({'status':'unblock'})
})


router.post('/addcategory',async(req,res)=>{
    const categ=req.body.category

    // console.log('ok');


    const item={
        category:categ
    }

    const cat=new category(item)
    await cat.save()

    res.json({'status':'ok'})
})


router.get('/viewcategory',async(req,res)=>{
    const data=await category.find({})

    res.json({data:data})
})


router.post('/editcategory', async (req, res) => {
    const cat = req.body.editname    
    const id = req.body.uid

    const item = {
        category: cat
    }

    const edit = await category.findOneAndUpdate(
        { _id: id }, 
        { $set: item }, 
        { new: true }
    )

    res.json({ 'status': 'edit' })
})

router.get('/deletecat/:id',async(req,res)=>{
    const id=req.params.id
    const data=await category.findOneAndDelete({
        _id:id
    })
    console.log(data);
    res.json({'status':'ok'})
})


router.get('/viewreviews', async (req, res) => {
    try {
        const data = await review.find().populate('userid');
        res.json({ data: data });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





    module.exports=router