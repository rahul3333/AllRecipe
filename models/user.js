const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    name:{
        type:String,
    },
    phone:{
        type:Number,
        maxlength:10,
        minlength:10
    },
    avatar:{
        type:String
    },
},{
    timestamps:true
});

const User=mongoose.model('User',userSchema);
module.exports=User;