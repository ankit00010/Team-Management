const express = require("express");
const { getAllUser, createUser, getUser, deleteUser, updateUser, filterUser, searchUser, getUsersByIds } = require("../controller/userController");
const router = express.Router();


router.route("/").get(getAllUser).post(createUser).put(updateUser);

router.get("/filter", filterUser);
router.get("/search/:name", searchUser);


router.route("/:id").delete(deleteUser).get(getUser);

router.route('/getUserByIds').post(getUsersByIds);

module.exports = router;