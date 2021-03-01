'use strict';

// Dependencies

const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const config = require('config');

const moment = require('moment');

var generator = require('generate-password');

const {validationResult} = require('express-validator');

// Models

const Category = require('../models/Category');
const ProductGroup = require('../models/ProductGroup');
const Product = require('../models/Product');

/**
 * Controller method to create product category
 *
 * @param String name
 * @param String description
 * @param String status
 * @param String subCategories
 *
 *
 */
exports.createCategory = async (req, res) => {
  let errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  let {name, description, status, SubCategory} = req.body;

  try {
    let category = new Category({
      name,
      description,
      status,
      SubCategory,
    });

    await category.save();

    return res.status(200).json({
      status: true,
      message: 'category created successfully',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
};

/**
 * Controller method to create product group
 *
 * @param String name
 * @param String description
 * @param String meta
 * @param String brands
 * @param String category
 * @param String out_of_stock
 *
 *
 *
 */
exports.createProductGroup = async (req, res) => {
  let errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  let {name, description, meta, brands, category, out_of_stock} = req.body;

  try {
    let product_group = new ProductGroup({
      name,
      description,
      meta,
      brands,
      category,
      out_of_stock,
    });

    await product_group.save();

    return res.status(200).json({
      status: true,
      message: 'product group created successfully',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
};

/**
 * Controller method to create Product
 *
 * @param String name
 * @param String description
 * @param String quantity
 * @param String size
 * @param String amount
 * @param String offer_value
 * @param String offer_type
 *
 *
 */
exports.createProduct = async (req, res) => {
  let errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  let {
    name,
    description,
    quantity,
    color,
    size,
    amount,
    offer_value,
    offer_type,
    product_group
  } = req.body;

  try {
    try {
      let product = new Product({
        name,
        description,
        quantity,
        color,
        size,
        amount,
        offer_value,
        offer_type,
        product_group
      });

      await product.save();

      return res.status(200).json({
        status: true,
        message: 'product created successfully',
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server Error');
    }
  } catch (error) {}
};
