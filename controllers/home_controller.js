const Recipe=require('../models/recipe');
module.exports.home=(req,res)=>{    
    Recipe.find({},function(err,recipe){
        if(err){
            console.log('Error in finding recipes');
            return;
        }
        
    res.render('new_home',{
        title:'All Recipes',
        recipe:recipe
    });
    })
}