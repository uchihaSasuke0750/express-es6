const router = require('express').Router();

const {check, validationResult} = require('express-validator');

let productController = require('../controllers/productController.js');

/**
 * Product routes
 */

// @route       GET api/v1/product/category/create
// @desc        Create Category
// @access      Admin
router.post(
  '/category/create',
  [
    check('name').isLength({min: 4}).withMessage('Please enter a valid name'),
    check('description')
      .isLength({min: 4, max: 100})
      .withMessage('Please enter a valid description'),
    check('status', 'Please enter a valid Status').isBoolean(),
  ],
  productController.createCategory
);

// @route       POST api/v1/product/group/create
// @desc        Create Group
// @access      Admin
router.post(
  '/group/create',
  [
    check('name').isLength({min: 4}).withMessage('Please enter a valid name'),
    check('description')
      .isLength({min: 4, max: 100})
      .withMessage('Please enter a valid description'),
  ],
  productController.createProductGroup
);

// @route       POST api/v1/product/create
// @desc        Create User
// @access      Public
router.post(
  '/create',
  [
    check('name').isLength({min: 4}).withMessage('Please enter a valid name'),

    check('description')
      .isLength({min: 4, max: 100})
      .withMessage('Please enter a valid description'),

    check('quantity').isNumeric().withMessage('Please enter a valid quantity'),

    check('color').isAlpha().withMessage('Please enter a valid color'),

    check('size').isNumeric().withMessage('Please enter a valid size'),

    check('amount').isNumeric().withMessage('Please enter a valid amount'),

    check('offer_value')
      .isNumeric()
      .withMessage('Please enter a valid offer_value'),

    check('offer_type')
      .isNumeric()
      .withMessage('Please enter a valid offer_type'),
  ],
  productController.createProduct
);

module.exports = router;
