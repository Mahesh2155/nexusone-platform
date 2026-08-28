const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const onboardingRoutes = require("./routes/onboardingRoutes");
const rbacTestRoutes = require("./routes/rbacTestRoutes");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
    "/api/auth",
    authRoutes
);

app.use("/api/tenants", tenantRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/rbac-test", rbacTestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "NexusOne API is running"
    });
});




module.exports = app;