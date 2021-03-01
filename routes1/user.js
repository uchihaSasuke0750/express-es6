const router = require('express').Router();

const {check, validationResult} = require('express-validator');

let userController = require('../controllers/userController.js');

const authCheck = require('../middleware/check_auth');

/**
 * User routes
 */

// @route       GET api/v1/users/create
// @desc        Create User
// @access      Public
router.post(
  '/create',
  [
    check('name').isLength({min: 4}).withMessage('Please enter a valid name'),
    check('email').isEmail().withMessage('Please enter a valid Email'),
    check(
      'password',
      'Please enter a valid Password with 6 or more characters'
    ),
    check(
      'mobile',
      'Please enter a valid mobile number with 10 digits'
    ).isLength({min: 10}),
  ],
  userController.createUser
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Please enter a valid Email'),
    check(
      'password',
      'Please enter a valid Password with 6 or more characters'
    ).isLength({min: 6}),
  ],
  userController.login
);

router.get('/', authCheck, userController.me);

module.exports = router;

// @route       GET api/v1/users/sendOtp
// @desc        Send OTP
// @access      Public
router.post(
  '/sendOtp',
  [
    check(
      'mobile',
      'Please enter a valid mobile number with 10 digits'
    ).isLength({min: 10}),
  ],
  userController.sendOTP
);


// @route       GET api/v1/users/verifyOtp
// @desc        Send OTP
// @access      Public
router.post(
  '/verifyOtp',
  [
    check(
      'mobile',
      'Please enter a valid mobile number with 10 digits'
    ).isLength({min: 10 , max:10}),
    check(
      'otp',
      'Please enter a valid otp'
    ).isLength({min: 4 , max:4}),
  ],
  userController.verifyOTP
);
