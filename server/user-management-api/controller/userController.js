
// Crud Logic
// GET /api/users: Retrieve all users with pagination support.
// GET /api/users/:id: Retrieve a specific user by ID.
// POST /api/users: Create a new user.
// PUT /api/users/:id: Update an existing user.
// DELETE /api/users/:id: Delete a user.

const User = require("../model/userModel");
const asyncHandler = require("express-async-handler")


const getAllUser = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.p) || 1;
    const userPerPage = 20;
    const skip = (page - 1) * userPerPage;
    const users = await User.find().skip(skip).limit(userPerPage);

    if (!users) {

        res.status(500);
        throw new Error("Server Error");
    }


    res.json(users);



}
)



const createUser = asyncHandler(async (req, res) => {

    const { id, first_name, last_name, email, gender, avatar, domain, available } = req.body;
    console.log(typeof (available))
    if (!id || !first_name || !last_name || !email || !avatar || !domain || !gender || available === undefined) {
        res.status(400);
        throw new Error("Please provide all required fields.");
    }

    // Create a new user instance
    const user = new User({
        id,
        first_name,
        last_name,
        email,
        gender,
        avatar,
        domain,
        available
    });

    // Save the user to the database
    await user.save();

    // Respond with the created user
    res.status(201).json(user);
})

const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.json(user);
}
)


const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }
    // Updating the user
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedUser);
}
)
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    const deleteUser = await User.findByIdAndDelete(user);

    res.status(200).json(deleteUser);
}
)





//filter the user

const filterUser = asyncHandler(async (req, res) => {
    const { domain, gender, available, page } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;
    const filter = {};

    if (domain) filter.domain = domain;
    if (gender) filter.gender = gender;
    if (available) filter.available = available;

    try {
        const users = await User.find(filter).skip(skip).limit(limit);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




const searchUser = asyncHandler(async (req, res) => {
    try {
        const search = req.params.name;

        const userData = await User.find({ "first_name": { $regex: new RegExp(".*" + search + ".*", "i") } });

        console.log('User Data:', userData);

        if (userData.length > 0) {
            res.status(200).json({ message: "User Name", data: userData });
        } else {
            res.status(200).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





module.exports = { getAllUser, createUser, getUser, updateUser, deleteUser, filterUser, searchUser };