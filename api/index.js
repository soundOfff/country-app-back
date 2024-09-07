const express = require("express");
const router = express.Router();

const countryRouter = require("./country");

router.use("/api/countries", countryRouter);

module.exports = router;
