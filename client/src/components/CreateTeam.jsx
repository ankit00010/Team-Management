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
                _id: selectedUserIds,
                available: false,
            };
            const updateUserData = {
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
                navigate('/team-details');

            } else {
                const errorText = await response.text();
                console.error('Failed to create team:', errorText);
                alert('Failed to create team. Please try again.');
            }

            // Update users as false based on their IDs
            const response2 = await fetch('https://user-management-seven-murex.vercel.app/api/users/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    updateUserData
                ),
            });
            console.log('Server Response:', response2);

            if (response2.ok) {
                const updatedUserData = await response2.json();

                // Log the updated user data for debugging
                console.log('Updated User Data:', updatedUserData);


            } else {
                console.log('Failed to update users:', response2.statusText);

            }

        } catch (error) {
            console.error('Error creating team or updating users:', error);
        } finally {
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
