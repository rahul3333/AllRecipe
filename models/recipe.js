const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/recipe/photos');

const RecipeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    author:{
        type:String
    },
    ingredients:{
        type:String
    },
    directions:{
        type:String
    },
    photo:{
        type:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+'-'+Date.now())
    }
  });

//   static methods
RecipeSchema.statics.uploadedAvatar=multer({storage:storage}).single('photo');
RecipeSchema.statics.avatarPath=AVATAR_PATH;

const Recipe=mongoose.model('Recipe',RecipeSchema);
module.exports=Recipe;