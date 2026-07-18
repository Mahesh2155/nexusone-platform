const express = require("express");

const router = express.Router();

const {
    create,
    getById,
    update
} = require("../controllers/tenantController");

router.post("/", create);

router.get("/:id", getById);

router.put("/:id", update);

module.exports = router;