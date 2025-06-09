const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'patient',
    enum: ['patient', 'doctor', 'admin', 'manager'],
  },
  surname: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  patronymicName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  additionalPhone: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: Buffer,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);