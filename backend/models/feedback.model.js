const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const FeedbackSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: 1,
    maxlength: 100
    // validate: {
    //   validator: (v) => /^[\'a-zA-Z- ]+$/.test(v),
    //   message: (props) => `${props.value} is invalid!`
    // }
  },
  phone: {
    type: Object
    // validate: {
    //   validator: (v) =>
    //     /^(?:\+?61|0)4(?:[01]\d{3}|(?:2[1-9]|3[0-57-9]|4[7-9]|5[0-15-9]|6[679]|7[3-8]|8[1478]|9[07-9])\d{2}|(?:20[2-9]|444|52[0-6]|68[3-9]|70[0-7]|79[01]|820|890|91[0-4])\d|(?:200[0-3]|201[01]|8984))\d{4}$/.test(
    //       v
    //     ),
    //   message: (props) => `${props.value} is not a valid phone number!`
    // }
  },
  email: {
    type: Object,
    required: [true, 'Email is required.'],
    minlength: 1,
    maxlength: 100
    // validate: {
    //   validator: (v) => {
    //     const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //     validRegex.test(v);
    //   },
    //   message: (props) => `${props.value} is invalid!`
    // }
  },
  content: {
    type: String,
    minlength: 1,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema, 'Feedbacks');
