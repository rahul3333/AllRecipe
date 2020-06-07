const Recipe=require('../models/recipe');
const Favorites=require('../models/favorites');

module.exports.fav=async function (req,res){
    let user=await Favorites.find({user:req.params.id});
        try {
            if(user.length>0){
            
                let i=0;
                let recipe=new Array(user.length);
                while(i<user.length){
                    recipe[i]=user[i].recipe;
                    i++;
                }
                
                i=0;
                let recipe_record=new Array(recipe.length);
                
                while(i<recipe.length){
                    recipe_record[i]=await Recipe.findById(recipe[i]);
                    i++;
                }
                    if(recipe_record){
                       res.render('favorites',{
                            title:'My Favorite Recipes',
                            recipe:recipe_record
                        })
                    }
                    else{
                        res.render('empty_favorites',{
                            title:'My Favorite Recipes'
                        })
                    }
        }
            else{
                res.render('empty_favorites',{
                    title:'My Favorite Recipes'
                })
            }
        } catch (error) {
            console.log('Error in finding user',error);
            return;
        }
        
        
}
module.exports.create=async function(req,res){
    try {
    let recipe=await Recipe.findOne({_id:req.params.id});
    
        if(recipe){
            
            let element=await Favorites.findOne({$and:[{user:req.user.id,recipe:req.params.id}]});
            if(element){
                return res.redirect('back');
            }
                console.log('In function');
               let fav=await Favorites.create({
                    recipe:recipe._id,
                    user:req.user._id
                    });
                    return res.redirect('back');   
        }
    } catch (err) {
        console.log('Error : ',err);
        return;
    }
}

module.exports.destroy= async function(req,res){
    try {   
    let logged_in_user=await Favorites.find({$and:[{user:req.user.id,recipe:req.params.id}]});

    let i=0;
    let record_id=new Array(logged_in_user.length);
    while(i<logged_in_user.length){
        record_id[i]=logged_in_user[i].id;
        i++;
    }

        if(logged_in_user.length>0){
            let fav=await Favorites.findById({_id:record_id});
            fav.remove();
            res.redirect(`/favorites/${req.user.id}`);
        }else{
            return res.redirect('back');
        }
    
        
    } catch (err) {
     console.log('Error : ',err);
     return;
    }
}