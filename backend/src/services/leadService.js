const Lead = require("../models/Lead");
const User = require("../models/User");
const Customer = require("../models/Customer");


// Create Lead
const createLead = async (leadData) => {

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
        notes,
        tenantId
    } = leadData;


    // Validate assigned user
    if (assignedTo) {

        const user = await User.findOne({
            _id: assignedTo,
            tenantId
        });

        if (!user) {
            throw new Error(
                "Assigned user does not belong to tenant"
            );
        }
    }


    const lead = await Lead.create({
        name,
        email,
        phone,
        company,
        jobTitle,
        source,
        status,
        priority,
        assignedTo: assignedTo || null,
        notes,
        tenantId
    });


    return lead;
};


// Get All Leads For Tenant
const getTenantLeads = async (tenantId) => {

    const leads = await Lead.find({
        tenantId
    })
        .populate(
            "assignedTo",
            "name email role"
        )
        .populate(
            "convertedCustomerId",
            "name email company"
        )
        .sort({
            createdAt: -1
        });


    return leads;
};


// Get Lead By Id
const getLeadById = async (
    leadId,
    tenantId
) => {

    const lead = await Lead.findOne({
        _id: leadId,
        tenantId
    })
        .populate(
            "assignedTo",
            "name email role"
        )
        .populate(
            "convertedCustomerId",
            "name email company"
        );


    if (!lead) {
        throw new Error(
            "Lead not found"
        );
    }


    return lead;
};


// Update Lead
const updateLead = async (
    leadId,
    tenantId,
    updateData
) => {

    const lead = await Lead.findOne({
        _id: leadId,
        tenantId
    });


    if (!lead) {
        throw new Error(
            "Lead not found"
        );
    }


    // Validate assigned user if being updated
    if (
        updateData.assignedTo !== undefined &&
        updateData.assignedTo !== null
    ) {

        const user = await User.findOne({
            _id: updateData.assignedTo,
            tenantId
        });


        if (!user) {
            throw new Error(
                "Assigned user does not belong to tenant"
            );
        }
    }


    // Do not allow tenantId to be changed
    delete updateData.tenantId;


    // Do not allow convertedCustomerId to be changed manually
    delete updateData.convertedCustomerId;


    // Do not allow status to be changed manually after conversion
    if (
        lead.status === "converted" &&
        updateData.status &&
        updateData.status !== "converted"
    ) {
        throw new Error(
            "Converted lead cannot be changed"
        );
    }


    Object.assign(
        lead,
        updateData
    );


    await lead.save();


    return lead;
};


// Delete Lead
const deleteLead = async (
    leadId,
    tenantId
) => {

    const lead = await Lead.findOne({
        _id: leadId,
        tenantId
    });


    if (!lead) {
        throw new Error(
            "Lead not found"
        );
    }


    await Lead.deleteOne({
        _id: leadId,
        tenantId
    });


    return {
        message: "Lead removed successfully"
    };
};


// Assign Lead
const assignLead = async (
    leadId,
    tenantId,
    assignedTo
) => {

    const lead = await Lead.findOne({
        _id: leadId,
        tenantId
    });


    if (!lead) {
        throw new Error(
            "Lead not found"
        );
    }


    const user = await User.findOne({
        _id: assignedTo,
        tenantId
    });


    if (!user) {
        throw new Error(
            "Assigned user does not belong to tenant"
        );
    }


    lead.assignedTo = assignedTo;

    await lead.save();


    return lead;
};


// Convert Lead
const convertLead = async (
    leadId,
    tenantId
) => {

    const lead = await Lead.findOne({
        _id: leadId,
        tenantId
    });


    if (!lead) {
        throw new Error(
            "Lead not found"
        );
    }


    if (lead.status === "converted") {
        throw new Error(
            "Lead already converted"
        );
    }


    const customer = await Customer.create({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        address: "",
        status: "active",
        tenantId
    });


    lead.status = "converted";

    lead.convertedCustomerId =
        customer._id;


    await lead.save();


    return {
        lead,
        customer
    };
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