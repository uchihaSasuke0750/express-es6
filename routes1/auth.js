const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const config = require('config')

const auth = require('../../middleware/auth')

const User = require('../../models/User')

const {check , validationResult} = require('express-validator')

// @route       GET api/auth
// @desc        Test Route
// @access      Public  
router.get('/' , auth , async(req , res) => {
    try{

        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    }catch(e){
        res.status(500).send('Server Error');
    }
});


// @route       GET api/auth
// @desc        Authenticate User and get JWT Token
// @access      Public  
router.post('/' ,
[
    check('email').isEmail().withMessage('Please enter a valid Email'),
    check('password' , 'Password is required')
    .exists()
],
async(req , res) => {
   
});


module.exports = router