const express = require("express");
const { getAllUser, createUser, getUser, deleteUser, updateUser, filterUser, searchUser } = require("../controller/userController");
const router = express.Router();


router.route("/").get(getAllUser).post(createUser);

router.get("/filter", filterUser);
router.get("/search/:name", searchUser);


router.route("/:id").put(updateUser).delete(deleteUser).get(getUser);



module.exports = router;