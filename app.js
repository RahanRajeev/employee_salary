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
const MongoStore = require('connect-mongo');



app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODBURL }),
    cookie: { secure: false } // set to true only if using HTTPS
  }));

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



app.listen(port, () => {
  const URL = process.env.NODE_ENV === 'production'
    ? `https://employee-salary-1.onrender.com`
    : `http://localhost:${port}`;
    
  console.log(cli.magenta(`Server running at ${URL}`));
});

