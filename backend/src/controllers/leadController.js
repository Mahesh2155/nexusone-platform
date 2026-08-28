const leadService = require("../services/leadService");


// Create Lead
const createLead = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            company,
            jobTitle,
            source,
            status,
            priority,
            assignedTo,
            notes
        } = req.body;


        const lead = await leadService.createLead({
            name,
            email,
            phone,
            company,
            jobTitle,
            source,
            status,
            priority,
            assignedTo,
            notes,

            // Always take tenantId from
            // authenticated user
            tenantId: req.user.tenantId
        });


        return res.status(201).json({

            success: true,

            message: "Lead created successfully",

            lead

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


// Get All Leads
const getTenantLeads = async (req, res) => {

    try {

        const leads =
            await leadService.getTenantLeads(
                req.user.tenantId
            );


        return res.status(200).json({

            success: true,

            leads

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }
};


// Get Lead By ID
const getLeadById = async (req, res) => {

    try {

        const lead =
            await leadService.getLeadById(
                req.params.id,
                req.user.tenantId
            );


        return res.status(200).json({

            success: true,

            lead

        });

    } catch (error) {

        return res.status(404).json({

            success: false,

            message: error.message

        });

    }
};


// Update Lead
const updateLead = async (req, res) => {

    try {

        const lead =
            await leadService.updateLead(
                req.params.id,
                req.user.tenantId,
                req.body
            );


        return res.status(200).json({

            success: true,

            message: "Lead updated successfully",

            lead

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


// Delete Lead
const deleteLead = async (req, res) => {

    try {

        const result =
            await leadService.deleteLead(
                req.params.id,
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


// Assign Lead
const assignLead = async (req, res) => {

    try {

        const {
            assignedTo
        } = req.body;


        const lead =
            await leadService.assignLead(
                req.params.id,
                req.user.tenantId,
                assignedTo
            );


        return res.status(200).json({

            success: true,

            message: "Lead assigned successfully",

            lead

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


// Convert Lead
const convertLead = async (req, res) => {

    try {

        const result =
            await leadService.convertLead(
                req.params.id,
                req.user.tenantId
            );


        return res.status(200).json({

            success: true,

            message: "Lead converted successfully",

            lead: result.lead,

            customer: result.customer

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }
};


module.exports = {
    createLead,
    getTenantLeads,
    getLeadById,
    updateLead,
    deleteLead,
    assignLead,
    convertLead
};