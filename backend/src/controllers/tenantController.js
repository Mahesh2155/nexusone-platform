const {
    createTenant,
    getTenantById,
    updateTenant
} = require("../services/tenantService");


// Create Tenant
const create = async (req, res) => {

    try {

        const tenant = await createTenant(req.body);

        res.status(201).json({
            success: true,
            message: "Tenant created successfully",
            tenant
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};


// Get Tenant
const getById = async (req, res) => {

    try {

        const tenant = await getTenantById(
            req.params.id
        );

        res.json({
            success: true,
            tenant
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

};


// Update Tenant
const update = async (req, res) => {

    try {

        const tenant = await updateTenant(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Tenant updated successfully",
            tenant
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    create,
    getById,
    update
};