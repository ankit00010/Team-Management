const asyncHandler = require("express-async-handler");
const Team = require("../model/teamModels");
const User = require("../model/userModel"); // Assuming User is the model for users

const createTeam = asyncHandler(async (req, res) => {
    const { name, userIds } = req.body;

    try {
        // Validation
        if (!name || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'Invalid input. Please provide a valid team name and an array of user IDs.' });
        }

        // Fetch selected users
        const selectedUsers = await User.find({ _id: { $in: userIds } });

        // Check for unique user IDs
        const uniqueUserIds = new Set(userIds);
        if (uniqueUserIds.size !== userIds.length) {
            return res.status(400).json({ message: 'Each user should be represented only once in the team.' });
        }

        // Check for availability
        if (selectedUsers.some(user => !user.available)) {
            return res.status(400).json({ message: 'All selected users must be marked as available.' });
        }


        // Create Team
        const team = new Team({ name, users: userIds });
        await team.save();

        // Response
        res.status(201).json({ team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const getTeam = asyncHandler(async (req, res) => {
    const teamName = req.params.name;

    try {
        // Find the team by name and populate the 'users' field with full user details
        const team = await Team.findOne({ name: teamName }).populate('users');

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.status(200).json({ team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// teamController.js
const getAllTeams = asyncHandler(async (req, res) => {
    try {
        const teams = await Team.find({}, 'name');
        res.status(200).json({ teams });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { getTeam, createTeam, getAllTeams };


module.exports = { getTeam, createTeam, getAllTeams };


module.exports = { getTeam, createTeam, getAllTeams };






