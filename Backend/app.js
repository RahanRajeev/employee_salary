const ex=require('express')
const app=ex()
const db=require('./config/db')
const dotenv=require('dotenv')
const cli=require('cli-color')
const session=require('express-session')
const cors=require('cors')
dotenv.config()
const port=process.env.PORT
db()



app.use(session({
    secret:'123',
    resave:true,
    saveUninitialized:true
}))

const admin=require('./router/admin')
const user=require('./router/user')


app.use(ex.static('uploads'))
app.use(ex.urlencoded({
    extended:true
}))

app.use(cors())
app.use(ex.json())

app.use('/user',user)
app.use('/admin',admin)



app.listen(port,()=>{
    console.log(cli.magenta(`http://localhost:${port}`));
})
