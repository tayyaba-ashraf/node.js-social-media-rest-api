const router =require("express").Router();
const bcrypt=require("bcrypt");

/**Model */
const User=require("../models/User")

/**Register user */
router.post("/register",async (req,res)=>{
    
   
   try{
      /**create new password */
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.userPassword,salt);
    /**create new user */
      const newUser=new User({
      userName:req.body.userName,
      userEmail:req.body.userEmail,
      userPassword:hashedPassword,
     })
    /**savve user and return response */
    const user= await newUser.save();
    res.status(200).json(user);
   }catch(err){
    console.log(err)
   }

})

/**Login user */
router.post("/login",async (req,res)=>{
   try{

      const user=await User.findOne({userEmail:req.body.userEmail})
      !user && res.status(404).json("user not find")

      const validPassword=await bcrypt.compare(req.body.userPassword,user.userPassword);
      !validPassword && res.status(400).json("wrong password")

      res.status(200).json(user);
      
   }catch(err){
      res.status(500).json(err)

   }

})


module.exports=router;