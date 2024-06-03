const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     // name: String,
//     email: String,
//     password: String
// });

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: true,
    },
    password: { type: String, minLength: 6, required: true },
    token: String,
  });

exports.userSchema = mongoose.model('user', userSchema);