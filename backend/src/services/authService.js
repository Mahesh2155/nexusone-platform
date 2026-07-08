const bcrypt = require("bcryptjs");
const User = require("../models/User");


// Create new user
const registerUser = async (userData) => {
    const {
        name,
        email,
        password,
        role,
        tenantId
    } = userData;


    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }


    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
        password,
        salt
    );


    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        tenantId
    });


    return user;
};


// Find user by email
const findUserByEmail = async (email) => {

    return await User.findOne({
        email
    });

};


// Compare password
const comparePassword = async (
    enteredPassword,
    storedPassword
) => {

    return await bcrypt.compare(
        enteredPassword,
        storedPassword
    );

};


module.exports = {
    registerUser,
    findUserByEmail,
    comparePassword
};