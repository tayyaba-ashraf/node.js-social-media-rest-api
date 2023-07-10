
const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
    },
    userEmail:{
        type:String,
        required:true,
        max:50,
        unique:true,

    },
    userPassword:{
        type:String,
        required:true,
        min:8,
    },
    profilePicture:{
        type:String,
        default:"",
    },
    coverPicture:{
        type:String,
        default:"",
    },
    followers:{
        type:Array, /**user ids will be here */
        default:[],

    },
    followings:{
        type:Array, /**user ids will be here */
        default:[],

    },
    isAdmin:{
        type:Boolean,
        default:false,

    },
    description:{
        type:String,
        max:50,
    },
    city:{
        type:String,
        max:50, 
    },
    from:{
        type:String,
        max:50,
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }


},
{timestamps:true}
);

module.exports=mongoose.model("User",UserSchema)