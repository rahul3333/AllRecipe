const mongoose=require('mongoose');


const favoritesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    recipe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recipe'
    },
    
},{
    timestamps:true
});

const Favorites=mongoose.model('Favorites',favoritesSchema);
module.exports=Favorites;