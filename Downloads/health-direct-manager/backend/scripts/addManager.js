const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

async function addManager() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    const email = 'manager@gmail.com'; // Change to desired email
    const password = 'Manager@123'; // Change to desired password

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('Manager already exists');
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new manager
    user = new User({
      email,
      password: hashedPassword,
      role: 'manager',
      profileCompleted: true, // Assuming manager doesn't need profile completion
    });

    await user.save();
    console.log('Manager added successfully:', email);

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error adding manager:', error.message, error.stack);
  }
}

addManager();