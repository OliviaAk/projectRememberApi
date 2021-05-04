const express = require("express");
const cards = require("./api/cards");
const auth = require("./api/auth");
const user = require("./api/user");
const dashboard = require("./api/dashboard");
const admin = require("./api/admin");

const router = express.Router();

router.use("/cards", cards);
router.use("/auth", auth);
router.use("/user", user);
router.use("/dashboard", dashboard);
router.use("/admin", admin);

module.exports = router;
