const express = require("express");

const router = express.Router();

const {
    createLead,
    getTenantLeads,
    getLeadById,
    updateLead,
    deleteLead,
    assignLead,
    convertLead
} = require("../controllers/leadController");

const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");


// Create Lead
router.post(
    "/",
    authMiddleware,
    permissionMiddleware("lead.create"),
    createLead
);


// Get All Leads
router.get(
    "/",
    authMiddleware,
    permissionMiddleware("lead.view"),
    getTenantLeads
);


// Get Lead By ID
router.get(
    "/:id",
    authMiddleware,
    permissionMiddleware("lead.view"),
    getLeadById
);


// Update Lead
router.patch(
    "/:id",
    authMiddleware,
    permissionMiddleware("lead.update"),
    updateLead
);


// Delete Lead
router.delete(
    "/:id",
    authMiddleware,
    permissionMiddleware("lead.delete"),
    deleteLead
);


// Assign Lead
router.patch(
    "/:id/assign",
    authMiddleware,
    permissionMiddleware("lead.assign"),
    assignLead
);


// Convert Lead
router.post(
    "/:id/convert",
    authMiddleware,
    permissionMiddleware("lead.convert"),
    convertLead
);


module.exports = router;