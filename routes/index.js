const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller.js');

router.get('/',home_controller.home);
router.use('/users',require('./users'));
router.use('/favorites',require('./favorites'));
router.use('/comments',require('./comments'));
router.use('/likes', require('./likes'));

module.exports=router;