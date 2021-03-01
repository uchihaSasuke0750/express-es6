
import {Router } from 'express' 
import userValidator from './user.validator'
import {createUser} from './user.controller';

// const authCheck = require('../middleware/check_auth');
console.log('dd',userValidator.isAuthenticated)
// const { isAuthenticated } = userValidator
/**
 * User routes
 */

// @route       GET api/v1/users/create
// @desc        Create User
// @access      Public
const router =  new Router();
router.post(
  '/create',
 
  userValidator.isAuthenticated
  
  ,
  createUser
);

console.log(router,'rpit');

export default router;

