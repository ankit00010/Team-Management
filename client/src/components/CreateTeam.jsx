import React, { useState } from 'react';
import CreatedTeamPop from './CreatedTeamPop';
import { useNavigate } from 'react-router-dom';

const CreateTeam = ({ selectedUserIds }) => {
    const [teamName, setTeamName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateTeam = async () => {
        try {
            setLoading(true);

            const teamData = {
                name: teamName,
                userIds: selectedUserIds,
            };

            const response = await fetch('https://user-management-api-eight.vercel.app/api/team/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });

          
            
            if (response.ok) {
                setTeamName('');
                alert('Team created successfully!');
            } else {
                console.error('Failed to create team:', response.statusText);
                alert('Failed to create team. Please try again.');
            }

            const response2 = await fetch('http://localhost:5000/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: selectedUserIds,
                    available: false,
                }),
            });

            if (!response2.ok) {
                console.error('Failed to update users:', response2.statusText);
                alert('Failed to update users. Please try again.');
            }

            navigate('/team-details');
        } catch (error) {
            console.error('Error creating team or updating users:', error);
        } finally {
            setLoading(false);
            setShowPopup(true);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

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
