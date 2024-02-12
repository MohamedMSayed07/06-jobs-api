const mongoose = require('mongoose');




const connectDB = (url) => {
  return mongoose.connect(url)
  .then(() => {
    console.log('CONNECTED TO DB...');
  })
  .catch(err => {
    console.log('Failed to connect to DB:', err);
    throw err;
  });
};

module.exports = connectDB;