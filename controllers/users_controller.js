const User= require("../models/user");
const Recipe=require('../models/recipe');
const Comment=require('../models/comments');

module.exports.signup=(req,res)=>{
    
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('signup',{
        title:'Sign-Up'
    });
};

module.exports.signin=(req,res)=>{
    
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('signin',{
        title:'Sign-In'
    });
};

module.exports.my_recipe=(req,res)=>{
    Recipe.find({user:req.params.id},function(err,recipe){
        console.log(recipe.user);
        console.log(req.params.id);
        
        if(err){
        }
        if(recipe.length){
            
            res.render('my_recipe',{
                title:'My Recipes',
                recipe:recipe
            })
        }
        else{
            res.render('empty_recipes',{
                title:'My Recipes'
            })
        }
    })
}


// Creating the user

module.exports.create=(req,res)=>{
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err,user){
        if(err){
            console.log('Error in creating the user while signing up!!!!');
            return;
        }

        if(!user){              //If user is not found in the database
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating the user while signing up!!!');
                    return;
                }
                console.log('User Created Successfully');

                // After sign up take user to sign in page
                return res.redirect('/users/signin');
            })
        }

        else{           //If user is found in the database
            console.log('User already exists ');
            return res.redirect('back');
        }
    })
}


module.exports.add_recipe=(req,res)=>{
    res.render('add_Recipe',{
        title:'Your Recipe'
    })
}

module.exports.user_recipe=(req,res)=>{
    Recipe.create({name:req.body.name,
                   description:req.body.description,
                   author:req.body.author,
                   ingredients:req.body.ingredients,
                   directions:req.body.directions,
                   user:req.user._id},function(err,recipe){
        if(err){
            console.log('Error in adding recipe..');
            return res.redirect('back');
        }
        console.log('Recipe Added Successfully');
        return res.redirect(`/users/show_recipe/${req.body.name}`);
    })
}

module.exports.show_recipe=async(req,res)=>{
    try {
        let recipe=await Recipe.findOne({name:req.params.name})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }); 
           
       return res.render('show_recipe',{
                title:'Show Recipe',
                recipe:recipe,
            });
    
    } catch (err) {
    console.log("Error : ",err);
            
    }




    // Recipe.findOne({name:req.params.name},function(err,recipe){
    //     if(err){
    //         console.log('Error in displaying recipe');
    //         return
    //     }
    //     console.log(recipe);
        
    //     res.render('show_recipe',{
    //         title:'Recipe',
    //         recipe:recipe
    //     })
    // })
}

module.exports.createSession= function(req,res){
    // req.flash('success','Logged in Successfully');
    console.log('Logged in Successfully');
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signUp');
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                console.log('here in comp pass');
            }
            res.cookie('user_id',user.id);
            res.redirect('/');
        }
        else{
             res.redirect('/')
        }
    })
}

module.exports.destroySession= function(req,res){
    req.logout();
    // req.flash('success','You have been Logged Out');
    console.log('You have been loggeg out');
    return res.redirect('/');
}

module.exports.updaterecipepic=async function(req,res){
    let user=await Recipe.findById(req.params.id);
    
    if(req.user.id==user.user){
        try {
            let recipe=await Recipe.findByIdAndUpdate(req.params.id);
            console.log('See Here',recipe);
            Recipe.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Multer Error : ',err);
                }
                if(req.file){
                    recipe.photo=Recipe.avatarPath+'/'+req.file.filename;
                }
                recipe.save();
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        console.log('Only Author of the recipe is allowed to change the picture...');
        res.redirect('back');
    }
}