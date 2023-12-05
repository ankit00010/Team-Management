import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeam = ({ selectedUserIds }) => {
    // State to manage team name, popup visibility, loading state, and navigation
    const [teamName, setTeamName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle team creation and user update
    const handleCreateTeam = async () => {
        try {
            setLoading(true);

            // Prepare team data for the API request
            const teamData = {
                name: teamName,
                userIds: selectedUserIds,
            };

            // Send a request to create a new team
            const response = await fetch('https://user-management-seven-murex.vercel.app/api/team/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });

            // Check the response status and show appropriate messages
            if (response.ok) {
                setTeamName('');
                alert('Team created successfully!');
            } else {
                const errorText = await response.text();
                console.error('Failed to create team:', errorText);
                alert('Failed to create team. Please try again.');
            }

            // Additional code related to user update is removed

            // Navigate to the team-details page
            navigate('/team-details');
        } catch (error) {
            console.error('Error creating team or updating users:', error);
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Team</h2>
            <label>Team Name:</label>
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />

            <div>
                Selected Users: {selectedUserIds.length}
            </div>

            <button onClick={handleCreateTeam} disabled={loading}>
                {loading ? 'Creating Team...' : 'Create'}
            </button>
        </div>
    );
};

export default CreateTeam;
