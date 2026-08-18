const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

const customerController = require("../controllers/customerController");

const PERMISSIONS = require("../constants/permissions");


// Get all customers
router.get(
    "/",
    authMiddleware,
    permissionMiddleware(PERMISSIONS.CUSTOMER_VIEW),
    customerController.getCustomers
);


// Get customer by ID
router.get(
    "/:customerId",
    authMiddleware,
    permissionMiddleware(PERMISSIONS.CUSTOMER_VIEW),
    customerController.getCustomer
);


// Create customer
router.post(
    "/",
    authMiddleware,
    permissionMiddleware(PERMISSIONS.CUSTOMER_CREATE),
    customerController.create
);


// Update customer
router.patch(
    "/:customerId",
    authMiddleware,
    permissionMiddleware(PERMISSIONS.CUSTOMER_UPDATE),
    customerController.update
);


// Delete customer
router.delete(
    "/:customerId",
    authMiddleware,
    permissionMiddleware(PERMISSIONS.CUSTOMER_DELETE),
    customerController.remove
);


module.exports = router;