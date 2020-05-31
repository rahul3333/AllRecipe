const Recipe=require('../models/recipe');
const Favorites=require('../models/favorites');

module.exports.fav=async function (req,res){
    Favorites.find({user:req.params.id},async function(err,user){
        if(err){
            console.log('Error in finding User');
            return;
        }
        
        if(user){
            console.log(user.recipe);
            
            let recipe = await Recipe.find({recipe:user.recipe});
             console.log(recipe);
                if(err){
                    console.log('Error in finding Recipe');
                    return;
                }
                if(recipe){
                   res.render('favorites',{
                        title:'My Favorite Recipes',
                        recipe:recipe
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
    })
}
module.exports.create=async function(req,res){
    try {
    let recipe=await Recipe.findOne({name:req.params.name});
    
        if(recipe){
            let element=await Favorites.findOne({recipe:recipe.id});
            // if(element){
            //     return res.redirect('/');
            // }
                console.log('In function');
               let fav=await Favorites.create({
                    recipe:recipe._id,
                    user:req.user._id
                    });
                    fav.save();
                    return res.redirect('/');   
        }
    } catch (err) {
        console.log('Error : ',err);
        return;
    }
}

module.exports.destroy= async function(req,res){
    try {   
    let fav=await Favorites.findOne({recipe:req.params.id});
        if(fav.user==req.user.id){
            fav.remove();
            fav.save();
            res.redirect('/favorites/<%= req.user.id%>');
        }else{
            return res.redirect('back');
        }
        
    } catch (err) {
     console.log('Error : ',err);
     return;
    }
}