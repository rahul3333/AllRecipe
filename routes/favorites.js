const express=require('express');
const router=express.Router();
const passport=require('passport');

const favoritesController=require('../controllers/favorites_controller');

router.all('/:id',passport.checkAuthentication,favoritesController.fav);
router.all('/create/:name',passport.checkAuthentication,favoritesController.create);
router.get('/destroy/:id',passport.checkAuthentication,favoritesController.destroy);
module.exports=router;