const Customer = require("../models/Customer");

const getTenantCustomers = async (tenantId) => {
    return await Customer.find({
        tenantId
    }).sort({
        createdAt: -1
    });
};

const getCustomerById = async (customerId, tenantId) => {
    const customer = await Customer.findOne({
        _id: customerId,
        tenantId
    });

    if (!customer) {
        throw new Error("Customer not found");
    }

    return customer;
};

const createCustomer = async ({
    name,
    email,
    phone,
    company,
    address,
    status,
    tenantId
}) => {

    const customer = await Customer.create({
        name,
        email,
        phone,
        company,
        address,
        status,
        tenantId
    });

    return customer;
};

const updateCustomer = async (
    customerId,
    tenantId,
    updateData
) => {

    const customer = await Customer.findOne({
        _id: customerId,
        tenantId
    });

    if (!customer) {
        throw new Error("Customer not found");
    }

    const allowedFields = [
        "name",
        "email",
        "phone",
        "company",
        "address",
        "status"
    ];

    allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
            customer[field] = updateData[field];
        }
    });

    await customer.save();

    return customer;
};

const removeCustomer = async (
    customerId,
    tenantId
) => {

    const customer = await Customer.findOne({
        _id: customerId,
        tenantId
    });

    if (!customer) {
        throw new Error("Customer not found");
    }

    await Customer.deleteOne({
        _id: customerId,
        tenantId
    });

    return {
        message: "Customer removed successfully"
    };
};

module.exports = {
    getTenantCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    removeCustomer
};