const express = require("express");
const router = express.Router();
const { getAllCountries, getCountry } = require("../controller/country");

router.route("/").get(getAllCountries);
router.route("/:code").get(getCountry);

module.exports = router;
