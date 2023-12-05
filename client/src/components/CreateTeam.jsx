import React, { useState } from 'react';
import CreatedTeamPop from './CreatedTeamPop';
import { useNavigate } from 'react-router-dom';

const CreateTeam = ({ selectedUserIds }) => {
    // State to manage team name, popup visibility, loading state, and navigation
    const [teamName, setTeamName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
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
            const response = await fetch('https://user-management-api-eight.vercel.app/api/team/', {
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

            const response2 = await fetch('https://user-management-api-eight.vercel.app/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: selectedUserIds,
                    available: false,
                }),
            });

            // Check the response status for user update
            if (!response2.ok) {
                console.error('Failed to update users:', response2.statusText);
                alert('Failed to update users. Please try again.');
            }

            // Navigate to the team-details page
            navigate('/team-details');
        } catch (error) {
            console.error('Error creating team or updating users:', error);
        } finally {
            // Reset loading state and show the user popup
            setLoading(false);
            setShowPopup(true);
        }
    };

    // Function to close the user popup
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    // Placeholder function to handle removed users from the wishlist
    const handleRemoveFromWishlist = (removedUser) => {
        // Log the removed user information
        console.log('Removed User:', removedUser);
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

            <button onClick={() => setShowPopup(true)}>See Users Added</button>

            {showPopup && (
                <CreatedTeamPop
                    userIDs={selectedUserIds}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default CreateTeam;
