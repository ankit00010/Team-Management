const express = require("express");
const { getTeam, createTeam, getAllTeams, deleteUser } = require("../controller/teamController");

const router = express.Router();



router.get('/', getAllTeams);
router.post("/", createTeam);
router.get("/:name", getTeam);
router.delete("/:name", deleteUser)


module.exports = router;