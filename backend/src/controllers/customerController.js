const {
    getTenantCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    removeCustomer
} = require("../services/customerService");

const getCustomers = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;

        const customers = await getTenantCustomers(tenantId);

        return res.status(200).json({
            success: true,
            customers
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCustomer = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { customerId } = req.params;

        const customer = await getCustomerById(
            customerId,
            tenantId
        );

        return res.status(200).json({
            success: true,
            customer
        });

    } catch (error) {
        const statusCode =
            error.message === "Customer not found"
                ? 404
                : 500;

        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;

        const {
            name,
            email,
            phone,
            company,
            address,
            status
        } = req.body;

        const customer = await createCustomer({
            name,
            email,
            phone,
            company,
            address,
            status,
            tenantId
        });

        return res.status(201).json({
            success: true,
            message: "Customer created successfully",
            customer
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { customerId } = req.params;

        const customer = await updateCustomer(
            customerId,
            tenantId,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            customer
        });

    } catch (error) {
        const statusCode =
            error.message === "Customer not found"
                ? 404
                : 500;

        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const remove = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { customerId } = req.params;

        const result = await removeCustomer(
            customerId,
            tenantId
        );

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        const statusCode =
            error.message === "Customer not found"
                ? 404
                : 500;

        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getCustomers,
    getCustomer,
    create,
    update,
    remove
};