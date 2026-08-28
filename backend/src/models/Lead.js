const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            default: "",
            trim: true
        },

        company: {
            type: String,
            default: "",
            trim: true
        },

        jobTitle: {
            type: String,
            default: "",
            trim: true
        },

        source: {
            type: String,
            enum: [
                "website",
                "referral",
                "social_media",
                "advertisement",
                "email",
                "cold_call",
                "event",
                "other"
            ],
            default: "other"
        },

        status: {
            type: String,
            enum: [
                "new",
                "contacted",
                "qualified",
                "proposal",
                "converted",
                "lost"
            ],
            default: "new"
        },

        priority: {
            type: String,
            enum: [
                "low",
                "medium",
                "high"
            ],
            default: "medium"
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        notes: {
            type: String,
            default: "",
            trim: true
        },

        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tenant",
            required: true
        },

        convertedCustomerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Lead ||
    mongoose.model("Lead", leadSchema);