const express=require('express');
const router= express.Router();
const passport=require('passport')
const users_controller=require('../controllers/users_controller');

router.all('/signup',users_controller.signup);
router.all('/signin',users_controller.signin);
router.all('/create_entry',users_controller.create);
router.all('/add_recipe',passport.checkAuthentication,users_controller.add_recipe);
router.all('/user_recipe',passport.checkAuthentication,users_controller.user_recipe);
router.all('/show_recipe/:id',passport.checkAuthentication,users_controller.show_recipe);
// router.all('/show_recipe',passport.checkAuthentication,users_controller.show_recipe_comments);
router.all('/my_recipe/:id',passport.checkAuthentication,users_controller.my_recipe);
router.all('/updaterecipepic/:id',passport.checkAuthentication,users_controller.updaterecipepic);

router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),users_controller.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));  //Google will automatically determine this request
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signup'}),users_controller.createSession);
router.get('/signout',users_controller.destroySession);

module.exports=router