const Tenant = require("../models/Tenant");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// Create Organization + Owner
const createOrganization = async (data) => {

    const {
        companyName,
        ownerName,
        email,
        password
    } = data;


    // Generate tenant slug
    const slug = companyName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");


    // Check tenant already exists
    const existingTenant = await Tenant.findOne({
        slug
    });


    if (existingTenant) {
        throw new Error(
            "Organization already exists"
        );
    }


    // Create Tenant
    const tenant = await Tenant.create({
        name: companyName,
        slug
    });


    // Hash owner password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
        password,
        salt
    );


    // Create Owner User
    const user = await User.create({
        name: ownerName,
        email,
        password: hashedPassword,
        role: "owner",
        tenantId: tenant._id
    });


    return {
        tenant,
        user
    };

};


module.exports = {
    createOrganization
};