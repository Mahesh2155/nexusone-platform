const express = require("express");

const router = express.Router();

const {
    onboard
} = require("../controllers/onboardingController");


// Organization onboarding
router.post(
    "/",
    onboard
);


module.exports = router;