const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const allowPermissions = require("../middleware/permissionMiddleware");

const ROLES = require("../constants/roles");
const PERMISSIONS = require("../constants/permissions");


// Owner only test
router.get(
    "/owner",
    authMiddleware,
    allowRoles(ROLES.OWNER),
    (req, res) => {

        res.json({
            success: true,
            message: "Owner access granted",
            user: req.user
        });

    }
);


// User view permission test
router.get(
    "/users",
    authMiddleware,
    allowPermissions(PERMISSIONS.USER_VIEW),
    (req, res) => {

        res.json({
            success: true,
            message: "User view permission granted",
            user: req.user
        });

    }
);


module.exports = router;