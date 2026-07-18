const {
    createOrganization
} = require("../services/onboardingService");


// Create Organization Onboarding
const onboard = async (req, res) => {

    try {

        const result = await createOrganization(
            req.body
        );


        res.status(201).json({

            success: true,

            message: "Organization created successfully",

            data: {
                tenant: {
                    id: result.tenant._id,
                    name: result.tenant.name,
                    slug: result.tenant.slug
                },

                user: {
                    id: result.user._id,
                    name: result.user.name,
                    email: result.user.email,
                    role: result.user.role
                }
            }

        });


    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    onboard
};