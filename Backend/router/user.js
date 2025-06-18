const ex=require('express')
const multer=require('multer')
const router=ex.Router()
const user=require('../models/user')
const admin=require('../models/admin')
const complaint=require('../models/complaint')
const budget=require('../models/budget')
const expense=require('../models/expense')
const category = require('../models/category')
const review=require('../models/review')



const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'.jpg')
    }
})
const upload=multer({storage:storage})


router.post('/userreg',upload.single('userfile'),async(req,res)=>{
    const name=req.body.username
    const email=req.body.useremail
    const gender=req.body.usergender 
    const phone=req.body.userphone 
    const password=req.body.userpassword
    const image=req.file.filename
    const cpassword=req.body.usercpassword

    // console.log(req.body);
    const data=await user.findOne({email:email})

    if (!/^\d{10}$/.test(phone)) {
        return res.json({ status: 'error', message: 'Phone number must be exactly 10 digits!' });
    }

    const item={
        name:name,
        email:email,
        gender:gender,
        phone:phone,
        password:password,
        image:image,
        status:'pending'
    }

    
    console.log(data);
    if(data==null&&password==cpassword){
        const newuser=new user(item);
        await newuser.save()
        res.json({'status':'user'})
    }else{
        res.json({'status':'error'})
    }

    
})

router.get('/checkemail/:email', async (req, res) => {
    const email = req.params.email;
    const data = await user.findOne({ email:email});
  
    if (data) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
  


router.post('/login',async(req,res)=>{
    const name=req.body.logname
    const password=req.body.logpassword

    const data=await user.findOne({email:name,password:password,status:'unblocked'||'active'})
    const admindata=await admin.findOne({name:name})
    // console.log(data);

    if(data){
        res.json({'status':'ok','uid':data.id})
    }else if(admindata){
        res.json({'status':'admin','uid':admindata.id})
    }else{
        res.json({'status':'fail'})
    }
    
})


router.post('/googlelogin', async (req, res) => {
    const { name, email, googleId, picture } = req.body

    try {
        let existingUser = await user.findOne({ email })

        if (existingUser) {
            // If user already exists, just update googleId & image if missing or outdated
            existingUser.googleId = googleId
            existingUser.image = picture

            await existingUser.save()

            res.json({ status: 'ok', uid: existingUser._id })
        } else {
            // New user (first-time Google login)
            const newUser = new user({
                name,
                email,
                googleId,
                image: picture,
                status: 'active'   // Default status for new users
            })

            const savedUser = await newUser.save()

            res.json({ status: 'ok', uid: savedUser._id })
        }
    } catch (err) {
        console.error('Error in google login:', err)
        res.json({ status: 'error', error: err.message })
    }
})






router.post('/userchangepassword',async(req,res)=>{
    const uid=req.body.uid
    const currentpass=req.body.currentpass
    const newpass=req.body.newpass
    const confirmpass=req.body.confirmpass


    const data =await user.findOne({_id:uid})
    console.log(data);

    if(data.password==currentpass){
        if(newpass==confirmpass){
            const edit=await user.findOneAndUpdate({_id:uid},{$set:{password:newpass}},{new:true})
            res.json({'status':'change'})
        }else{
            res.json({'status':'fail'})
        }
    }else{
        res.json({'status':'wrong'})
    }





    

})



router.get('/viewprofile',async(req,res)=>{
    const uid=req.query.uid
    const data=await user.findOne({_id:uid})
    console.log(data);
    res.json({data:data})
})


router.post('/editprofile',upload.single('image'),async(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const gender=req.body.gender
    const phone=req.body.phone
    
    const id=req.body.uid

    console.log(req.body);


    
    const item={
            name:name,
            email:email,
            gender:gender,
            phone:phone,
            
    
        }

        if(req.file){
            const image=req.file.filename
            item.image=image
        }


    const edit=await user.findOneAndUpdate(
        {_id:id},{$set:item},{new:true}
    
    )

    res.json({'status':'edit'})
})


router.post('/complaint',async(req,res)=>{
    const date = new Date();
    const cd=`${date.getFullYear()}-${date.getDate()}-${date.getMonth()+1}`
    console.log(cd);
    const com=req.body.complaint
    const uid=req.body.uid
    
    const item={
        date:cd,
        complaint:com,
        reply:'pending',
        userid:uid
        
    }
    const comp=new complaint(item)
    await comp.save()

    res.json({'status':'ok'})
})


router.get('/viewreply',async(req,res)=>{
    const data=await complaint.find()

    res.json({data:data})
})


router.post('/addbudget',async(req,res)=>{
    const uid = req.body.uid;
    const bdgt = Number(req.body.budget); // Convert input to number
    if (isNaN(bdgt)) {
        return res.status(400).json({ status: 'error', message: 'Invalid budget value' });
    }

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1; // JavaScript months are 0-based, so add 1

    const formattedDate = `${currentYear}-${currentMonth}-01`; // Standardized format

    try {
        // Find if there is already a budget entry for the same year and month
        let existingBudget = await budget.findOne({
            date: { $regex: `^${currentYear}-${currentMonth}-` },userid: uid // Matches any date within the current month
        });

        if (existingBudget) {
            // If an entry exists in the same month, sum the budgets
            existingBudget.budget = Number(existingBudget.budget) + bdgt;
            await existingBudget.save();
        } else {
            // If it's a new month, create a separate new budget entry
            const newBudget = new budget({
                budget: bdgt,
                date: formattedDate,
                userid: uid
            });
            await newBudget.save();
        }

        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Error adding budget:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});


router.get('/expense',async(req,res)=>{
    const data=await category.find()

    res.json({data:data})
})



router.post('/addexpense',async(req,res)=>{
    try {
        const expnse = req.body.amount;
        const cid = req.body.category;
        const uid = req.body.uid;

        // Correct Date Formatting: YYYY-MM-DD
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1; // JavaScript months are 0-based, so add 1
    
        const formattedDate = `${currentYear}-${currentMonth}-01`; // Converts to YYYY-MM-DD

        const item = {
            expense: expnse,
            categoryid: cid,
            date: formattedDate, // Corrected format
            userid: uid
        };

        const exp = new expense(item);
        await exp.save();

        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});



router.get('/viewexpense',async(req,res)=>{
    const uid=req.query.uid
    const data=await expense.find({userid:uid}).populate('categoryid');
    const userBudgets = await budget.find({userid:uid});

    res.json({data:data,budgets: userBudgets})
})

router.get('/viewreply',async(req,res)=>{
    const uid=req.query.uid
    const data=await complaint.find({userid:uid}).populate('userid')
    console.log("Fetched Data:", userid);

    res.json({data:data})
})


router.post('/addreview',async(req,res)=>{
    try {
        const { rating, comment, uid } = req.body;
        const date = new Date();
        const cd=`${date.getFullYear()}-${date.getDate()}-${date.getMonth()+1}`
        if (!uid || !rating || !comment) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const item={
            rating:rating,
            review:comment,
            date:new Date(),
            userid:uid
            
        }

        const newReview = new review(item);
        await newReview.save();

        res.json({ status: "ok", message: "Review added successfully!" });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
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