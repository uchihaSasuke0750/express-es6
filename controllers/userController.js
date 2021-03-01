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

const User = require('../models/User');

const OauthAccessToken = require('../models/oauthAccessToken');

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
exports.createUser = async (req, res) => {
  let errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

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

/**
 * Controller method to login user with email and password
 *
 * @param String email
 * @param String password
 *
 * @returns JSON response
 */
exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});

    if (!user) {
      res.status(400).json({errors: [{message: 'User Not Found'}]});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({errors: [{message: 'Invalid Credentials'}]});
    }

    // let uuid = uuidv4()

    let access_token = new OauthAccessToken({
      user_id: user.id,
      name: 'Express CMS',
      scopes: '[*]',
      revoked: 0,
      expires_at: moment().add(300, 'days'),
    });

    await access_token.save();

    let payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecretKey'),
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
    res.status(500).send('Server Error');
  }
};

/**
 * Controller method to retrieve currently authenticated user
 *
 * @returns JSON response
 */
exports.me = async (req, res) => {
  return res.status(200).json({
    user: req.userData,
  });
};

/**
 * Controller method to send OTP using mobile number
 *
 * @param String mobile
 *
 *
 */
exports.sendOTP = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  let {mobile} = req.body;

  try {
    let user = await User.findOne({mobile});

    if (!user) {
      res.status(400).json({errors: [{message: 'User does not exist'}]});
    }

    let otp = generator.generate({
      length: 4,
      numbers: true,
      symbols: false,
      lowercase: false,
      uppercase: false,
    });

    console.log('otp', otp);

    await User.findOneAndUpdate({mobile}, {$set: {otp}}, {}).catch((error) => {
      console.log(error);
    });

    return res.status(200).json({
      status: true,
      message: 'OTP sent successfully',
    });

    // user.update({otp:'1234'})
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
};

/**
 * Controller method to verify OTP using mobile number
 *
 * @param String mobile
 * @param String otp
 * 
 *
 */
exports.verifyOTP = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  let {mobile, otp} = req.body;

  try {
    let user = await User.findOne({mobile});

    if (!user) {
      res.status(400).json({errors: [{message: 'User does not exist'}]});
    }

    if (user.otp == otp) {
      return res.status(200).json({
        status: true,
        message: 'OTP verified',
      });
    } else {
      return res.status(400).json({
        status: true,
        message: 'OTP did not match',
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
};
