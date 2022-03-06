require("dotenv").config()

const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const sequelize = require('./database')

const authRoutes = require("./route/auth")
const jobsRoutes = require("./route/jobs")
const purposalRoutes = require("./route/purposal")
const userRoutes = require("./route/user")


const app = express();



//database connection 
sequelize.sync()
.then(data => {})
.catch(er => console.log(er))

app.get("/",(req,res)=>{
    res.send("API is working")
})


//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

//routes
app.use('/api',authRoutes)
app.use('/api',jobsRoutes)
app.use('/api',purposalRoutes)
app.use('/api',userRoutes)






app.listen(8000,()=>{
    console.log("App is running")
})


