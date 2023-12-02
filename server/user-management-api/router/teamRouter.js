const express = require("express");
const { getTeam, createTeam, getAllTeams } = require("../controller/teamController");

const router = express.Router();



router.get('/', getAllTeams);
router.post("/", createTeam);
router.get("/:name", getTeam);



module.exports = router;