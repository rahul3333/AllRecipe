const mongoose=require('mongoose');


const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    recipe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recipe'
    }
},{
    timestamps:true
});

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;