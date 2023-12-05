// Import the express-async-handler middleware for handling asynchronous errors
const asyncHandler = require("express-async-handler");
// Import the Team and User models
const Team = require("../model/teamModels");
const User = require("../model/userModel");

// Controller function for creating a new team
const createTeam = asyncHandler(async (req, res) => {
    // Extract name and userIds from the request body
    const { name, userIds } = req.body;

    try {
        // Validation
        if (!name || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'Invalid input. Please provide a valid team name and an array of user IDs.' });
        }

        // Find the selected users based on their IDs
        const selectedUsers = await User.find({ _id: { $in: userIds } });

        // Check for duplicate user IDs in the provided array
        const uniqueUserIds = new Set(userIds);
        if (uniqueUserIds.size !== userIds.length) {
            return res.status(400).json({ message: 'Each user should be represented only once in the team.' });
        }

        // Check if all selected users are marked as available
        if (selectedUsers.some(user => !user.available)) {
            return res.status(400).json({ message: 'All selected users must be marked as available.' });
        }

        // Check if a team with the same name already exists
        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ message: 'A team with the same name already exists.' });
        }

        // Check if the team size exceeds the limit
        const teamSizeLimit = 10;
        if (userIds.length > teamSizeLimit) {
            return res.status(400).json({ message: `Cannot create a team with more than ${teamSizeLimit} users.` });
        }

        // Create a new team and save it to the database
        const team = new Team({ name, users: userIds });
        await team.save();

        // Return success message and the created team
        res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error creating team:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Controller function for retrieving a team by its name
const getTeam = asyncHandler(async (req, res) => {
    // Extract the team name from the request parameters
    const teamName = req.params.name;

    try {
        // Find the team by name and populate the 'users' field with full user details
        const team = await Team.findOne({ name: teamName }).populate('users');

        // If the team is not found, return a 404 status and message
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Return the team details
        res.status(200).json({ team });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: error.message });
    }
});

// Controller function for retrieving all teams
const getAllTeams = asyncHandler(async (req, res) => {
    const teamName = req.params.name;
    try {
        // Find all teams and return only their names
        const teams = await Team.find({}, 'name');
        res.status(200).json({ teams });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: error.message });
    }
});


const deleteUser = asyncHandler(async (req, res) => {
    const teamName = req.params.name;

    const team = await Team.findOne({ name: teamName });

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    try {
        const deletedTeam = await Team.findOneAndDelete({ name: teamName });

        if (!deletedTeam) {
            return res.status(404).json({ message: 'Team not found for deletion' });
        }

        res.json(deletedTeam);
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = { getTeam, createTeam, getAllTeams, deleteUser };
