const express = require("express");
const cards = require("./api/cards");
const auth = require("./api/auth");
const user = require("./api/user");
const dashboard = require("./api/dashboard");
const admin = require("./api/admin");
const quiz = require("./api/quiz");
const comment = require("./api/comments");

const router = express.Router();

router.use("/cards", cards);
router.use("/auth", auth);
router.use("/user", user);
router.use("/dashboard", dashboard);
router.use("/admin", admin);
router.use("/quiz", quiz);
router.use("/comment", comment);

module.exports = router;
