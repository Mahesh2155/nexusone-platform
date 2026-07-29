const User = require("../models/User");

const getTenantUsers = async (tenantId) => {
    return await User.find({
        tenantId
    }).select("-password");
};

const createUser = async ({
    name,
    email,
    password,
    role,
    tenantId
}) => {

    const existingUser = await User.findOne({
        email
    });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
        tenantId
    });

    const userResponse = user.toObject();

    delete userResponse.password;

    return userResponse;
};
const updateUserRole = async (userId, tenantId, role) => {

    const user = await User.findOne({
        _id: userId,
        tenantId
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role === "owner") {
        throw new Error("Owner role cannot be changed");
    }

    user.role = role;

    await user.save();

    const userResponse = user.toObject();

    delete userResponse.password;

    return userResponse;
};
const removeUser = async (userId, tenantId) => {

    const user = await User.findOne({
        _id: userId,
        tenantId
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role === "owner") {
        throw new Error("Owner cannot be removed");
    }

    await User.deleteOne({
        _id: userId,
        tenantId
    });

    return {
        message: "User removed successfully"
    };
};
module.exports = {
    getTenantUsers,
    createUser,
    updateUserRole,
    removeUser
};