const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        industry: {
            type: String,
            default: ""
        },

        companySize: {
            type: String,
            enum: [
                "1-10",
                "11-50",
                "51-200",
                "201-500",
                "500+"
            ],
            default: "1-10"
        },

        country: {
            type: String,
            default: ""
        },

        timezone: {
            type: String,
            default: "UTC"
        },

        logo: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "active",
                "inactive",
                "suspended"
            ],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);