// Import the User model and express-async-handler middleware
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler")

// Controller function to retrieve all users with pagination support
const getAllUser = asyncHandler(async (req, res) => {
    // Extract page number from the query parameters, default to 1 if not provided
    const page = parseInt(req.query.p) || 1;
    const userPerPage = 20;
    const skip = (page - 1) * userPerPage;
    
    // Retrieve users with pagination
    const users = await User.find().skip(skip).limit(userPerPage);

    // If no users are found, return a server error
    if (!users) {
        res.status(500);
        throw new Error("Server Error");
    }

    // Return the retrieved users
    res.json(users);
});

// Controller function to create a new user
const createUser = asyncHandler(async (req, res) => {
    // Extract user data from the request body
    const { id, first_name, last_name, email, gender, avatar, domain, available } = req.body;

    // Validate required fields
    if (!id || !first_name || !last_name || !email || !avatar || !domain || !gender || available === undefined) {
        res.status(400);
        throw new Error("Please provide all required fields.");
    }

    // Create a new user instance and save it to the database
    const user = new User({ id, first_name, last_name, email, gender, avatar, domain, available });
    await user.save();

    // Return the created user
    res.status(201).json(user);
});

// Controller function to retrieve a specific user by ID
const getUser = asyncHandler(async (req, res) => {
    // Extract user ID from the request parameters
    const userId = req.params.id;
    
    // Find the user by ID
    const user = await User.findById(userId);

    // If the user is not found, return a 404 status and message
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Return the retrieved user
    res.json(user);
});

// Controller function to update existing users
const updateUser = asyncHandler(async (req, res) => {
    try {
        // Extract user IDs and updated data from the request body
        const userIds = req.body._id;
        const updatedData = { available: false };

        // Update users based on the array of user IDs
        const updatedUsers = await Promise.all(
            userIds.map(async (userId) => {
                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    updatedData,
                    { new: true }
                );
                return updatedUser;
            })
        );

        // Return the updated users
        res.status(200).json(updatedUsers);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
});

// Controller function to delete a user
const deleteUser = asyncHandler(async (req, res) => {
    // Extract user ID from the request parameters
    const userId = req.params.id;
    
    // Find the user by ID
    const user = await User.findById(userId);

    // If the user is not found, return a 400 status and message
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    // Delete the user
    const deleteUser = await User.findByIdAndDelete(user);

    // Return success message
    res.status(200).json(deleteUser);
});

// Controller function to filter users based on query parameters
const filterUser = asyncHandler(async (req, res) => {
    // Extract filter criteria and pagination parameters from the query parameters
    const { domain, gender, available, page } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;
    const filter = {};

    // Apply filters if provided
    if (domain) filter.domain = domain;
    if (gender) filter.gender = gender;
    if (available) filter.available = available;

    // Retrieve filtered users with pagination
    try {
        const users = await User.find(filter).skip(skip).limit(limit);
        res.json(users);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
});

// Controller function to search for users by name
const searchUser = asyncHandler(async (req, res) => {
    try {
        // Extract search query from the request parameters
        const search = req.params.name;

        // Search for users with matching names using a case-insensitive regex
        const userData = await User.find({ "first_name": { $regex: new RegExp(".*" + search + ".*", "i") } });

        // Return search results or a message if no users are found
        if (userData.length > 0) {
            res.status(200).json({ message: "User Name", data: userData });
        } else {
            res.status(200).json({ message: "User not found" });
        }
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
});

// Controller function to retrieve users by an array of IDs
const getUsersByIds = asyncHandler(async (req, res) => {
    // Extract user IDs from the request body
    const userIds = req.body._ids;

    // Retrieve users by the provided IDs
    try {
        const users = await User.find({ _id: { $in: userIds } });

        // If no users are found, return a 404 status and message
        if (!users || users.length === 0) {
            res.status(404);
            throw new Error("No users found for the provided IDs");
        }

        // Return the retrieved users
        res.json(users);
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
});

// Export the controller functions for use in routes
module.exports = { getAllUser, createUser, getUser, updateUser, deleteUser, filterUser, searchUser, getUsersByIds };
