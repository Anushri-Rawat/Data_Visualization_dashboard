const express = require("express");
const router = express.Router();
const {stats,search} = require("../controllers/statsController");

router.get("/data/stats", stats);

router.get("/data/search", search);

module.exports = router;
