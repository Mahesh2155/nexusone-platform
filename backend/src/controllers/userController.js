const userService = require("../services/userService");

const getTenantUsers = async (req, res) => {
    try {
        const users = await userService.getTenantUsers(
            req.user.tenantId
        );

        return res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        const user = await userService.createUser({
            name,
            email,
            password,
            role,
            tenantId: req.user.tenantId
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        const user = await userService.updateUserRole(
            req.params.userId,
            req.user.tenantId,
            role
        );

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const removeUser = async (req, res) => {
    try {
        const result = await userService.removeUser(
            req.params.userId,
            req.user.tenantId
        );

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getTenantUsers,
    createUser,
    updateUserRole,
    removeUser
};