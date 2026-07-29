const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const allowPermissions = require("../middleware/permissionMiddleware");

const userController = require("../controllers/userController");
const PERMISSIONS = require("../constants/permissions");

const allowRoles = require("../middleware/roleMiddleware");
const ROLES = require("../constants/roles");

router.get(
    "/",
    authMiddleware,
    allowPermissions(PERMISSIONS.USER_VIEW),
    userController.getTenantUsers
);
router.post(
    "/",
    authMiddleware,
    allowPermissions(PERMISSIONS.USER_CREATE),
    userController.createUser
);
router.patch(
    "/:userId/role",
    authMiddleware,
    allowRoles(ROLES.OWNER),
    userController.updateUserRole
);

router.delete(
    "/:userId",
    authMiddleware,
    allowRoles(ROLES.OWNER),
    userController.removeUser
);

module.exports = router;