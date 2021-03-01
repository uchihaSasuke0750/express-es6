'use strict';

// Dependencies

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

import config from 'config'

import moment from 'moment'

import generator from 'generate-password'


// const bcrypt = require('bcryptjs');

// const jwt = require('jsonwebtoken');

// const config = require('config');

// const moment = require('moment');

// var generator = require('generate-password');

// const {validationResult} = require('express-validator');

// Models

import User from './user.model'

/**
 * Controller method to create user with email and password
 *
 * @param String email
 * @param String password
 * @param String name
 * @param String mobile
 *
 *
 * @returns Bearer Token
 */
export const createUser = async (req, res) => {
  //let errors = validationResult(req);
  //console.log(errors);
  

//   if (!errors.isEmpty()) {
//     return res.status(400).json({errors: errors.array()});
//   }

  let {name, email, password, mobile} = req.body;

  try {
    let user = await User.findOne({email});

    if (user) {
      res.status(400).json({errors: [{message: 'User Already Exists'}]});
    }

    user = new User({
      name,
      email,
      password,
      mobile,
      status: 1,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {expiresIn: 3600000},
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          status: true,
          message: 'success',
          access_token: token,
          token_type: 'Bearer',
          expiration: moment().add(300, 'days').unix(),
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
};



