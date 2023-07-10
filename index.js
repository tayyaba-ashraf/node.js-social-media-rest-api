const express=require("express");
const app=express();
const mongoose=require("mongoose");
const helmet=require("helmet");
const dotenv=require("dotenv")
const morgan=require("morgan");
const {mongoUrl} = require('./keys')
const userRoute=require("./routes/users")
const authRoute=require("./routes/auth")
const postRoute=require("./routes/posts")



dotenv.config();

// building coonection with database
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongooDB")
})
mongoose.connection.on('error',(err)=>{
    console.log('This is error',err)
})

/**middleware */
app.use(express.json())
app.use(helmet());
app.use(morgan("common"));


/**Creating user router*/
app.use("/api/users",userRoute);

/**Creating authtication router*/
app.use("/api/auth",authRoute);

/**Creating post router*/
app.use("/api/posts",postRoute);

/**this will run app on express */
app.listen(8800,()=>{
    console.log("Backend Server is running now");
})
