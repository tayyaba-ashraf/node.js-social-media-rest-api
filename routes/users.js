const router =require("express").Router();
const bcrypt=require("bcrypt");
const User = require("../models/User");

/**update user */
router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id||req.body.idAdmin){
         if(req.body.userPassword){
            try{
                const salt=await bcrypt.genSalt(10);
                req.body.userPassword =await bcrypt.hash(req.body.userPassword,salt);
            }catch(err){
                return res.status(500).json(err);

            }

        }
       
        try{
            const user=await User.findByIdAndUpdate(req.params.id,
                { 
                    $set:req.body,
                }
            ) 
           res.status(200).json("Account has been updated")
        }catch(err){
            return res.status(500).json(err);
        }  

    }
    else{
        return res.status(404).json("you can  update only your account!")
    }
})
/**delete user */
router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id||req.body.idAdmin){
        
        try{
            const user=await User.findByIdAndDelete(req.params.id) 
           res.status(200).json("Account has been deleted")
        }catch(err){
            return res.status(500).json(err);
        }  

    }
    else{
        return res.status(404).json("you can  delete only your account!")
    }
})


/**get a user */
router.get("/:id", async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {userPassword,updatedAt,...other}=user._doc
        res.status(200).json(other);

    }catch(err){
        res.status(500).json(err);
    }
})

/**follow user*/
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user= await User.findById(req.params.id)
            const currentUser= await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                
                await user.updateOne({ $push : {followers:req.body.userId} })
                await currentUser.updateOne({ $push : {followings:req.params.id} })
                res.status(200).json("user has been followed")

            }else{
                res.status(200).json("You already follow this user")
            }

        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(403).json("you cannot follow yourself")
    }
})
/**unfollow user */
router.put("/:id/unfollow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user= await User.findById(req.params.id)
            const currentUser= await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                
                await user.updateOne({ $pull : {followers:req.body.userId} })
                await currentUser.updateOne({ $pull : {followings:req.params.id} })
                res.status(200).json("user has been unfollowed")

            }else{
                res.status(200).json("You don't follow this user")
            }

        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(403).json("you cannot unfollow yourself")
    }
})

module.exports=router;