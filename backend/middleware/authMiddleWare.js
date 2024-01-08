const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET_JWT);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('User not found!');
      }

      // next(); // Include next() here to pass control to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }

  next(); // Include next() here to pass control to the next middleware or route handler
});

module.exports = { protect };
