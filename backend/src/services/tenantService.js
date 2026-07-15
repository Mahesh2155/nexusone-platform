const Tenant = require("../models/Tenant");


// Create Tenant
const createTenant = async (tenantData) => {

    const existingTenant = await Tenant.findOne({
        slug: tenantData.slug
    });

    if (existingTenant) {
        throw new Error("Tenant slug already exists");
    }

    const tenant = await Tenant.create(tenantData);
    console.log("Tenant created:", tenantData);
    return tenant;
};


// Get Tenant By Id
const getTenantById = async (tenantId) => {

    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
        throw new Error("Tenant not found");
    }

    return tenant;
};


// Update Tenant
const updateTenant = async (
    tenantId,
    updateData
) => {

    const tenant = await Tenant.findByIdAndUpdate(
        tenantId,
        updateData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!tenant) {
        throw new Error("Tenant not found");
    }

    return tenant;
};


module.exports = {
    createTenant,
    getTenantById,
    updateTenant
};