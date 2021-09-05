const mongoose = require('mongoose');

// Create Schema
const AdminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
});

// Export Model, the 3rd parameter is the collection name from MongoDB
const AdminUser = mongoose.model('AdminUser', AdminUserSchema, 'AdminUser');

module.exports = { AdminUser };
