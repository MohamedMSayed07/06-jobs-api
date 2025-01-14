const User = require('../models/User');
const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../errors/unauthenticated');


const auth = async (req, res, next) => {
  // chech Header
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('Invalid Authentication!');
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to job routes
    req.user = {userId:payload.userId, name:payload.name};
    next();
  } catch(err) {
    throw new UnauthenticatedError('Invalid Authentication!');
  }
};

module.exports = auth;