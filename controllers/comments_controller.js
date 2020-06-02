const Comment=require('../models/comments');
const Recipe=require('../models/recipe');

module.exports.create=async function(req,res){
    try {
    let recipe=await Recipe.findById(req.body.recipe);
    console.log(recipe);
    
        if(recipe){
           let comment=await Comment.create({
                content:req.body.content,
                recipe:req.body.recipe,
                user:req.user._id
            });
                recipe.comments.push(comment);
                recipe.save();
                if(req.xhr){
                    console.log('yooooo');
                    
                    comment=await comment.populate('user','name').execPopulate();
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Comment Posted"
                    });
                }
                console.log('Comments',recipe.comments[0]);
                console.log('right here');
                
                res.redirect('back')
            }
    } catch (err) {
        console.log('Error : ',err);
        return;
    }
}

module.exports.destroy= async function(req,res){
    try {   
    let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let recipe_id=comment.recipe;
            comment.remove();
            Recipe.findByIdAndUpdate(recipe_id,{$pull:{comments:req.params.id}});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
        
    } catch (error) {
     console.log('Error : ',err);
     return;
    }
}