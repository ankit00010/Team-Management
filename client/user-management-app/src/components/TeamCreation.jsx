// TeamCreation.js
import React, { useState } from 'react';
import TeamCreationSuccess from './TeamCreationSucess';

const TeamCreation = ({ onCreateTeam, onAddToTeam }) => {
    const [teamName, setTeamName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [teamCreated, setTeamCreated] = useState(false);

    const handleAddToTeam = (userId, isAdded) => {
        if (isAdded) {
            setSelectedUsers((prevUsers) => [...prevUsers, userId]);
        } else {
            setSelectedUsers((prevUsers) => prevUsers.filter((id) => id !== userId));
        }

        // Log the selected users array
        setSelectedUsers(updatedUsers => {
            console.log('Selected Users:', updatedUsers);
            return updatedUsers;
        });

        onAddToTeam(userId, isAdded);
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();

        try {
            // Basic validation
            if (!teamName.trim()) {
                console.error('Invalid input. Please provide a valid team name.');
                return;
            }

            const response = await fetch('http://localhost:5000/api/team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: teamName,
                    userIds: selectedUsers.map((user) => user._id),
                }),
            });

            if (response.ok) {
                // Team creation successful
                console.log('Team created successfully!');
                onCreateTeam();
                setTeamCreated(true);
            } else {
                // Team creation failed
                console.error('Team creation failed:', response.status);
            }
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    const handleGoBackToCreate = () => {
        setTeamCreated(false);
        setTeamName('');
    };

    return (
        <div>
            <h2>Selected Users:</h2>
            <ul>
                {selectedUsers.map((userId) => (
                    <li key={userId}>{userId}</li>
                ))}
            </ul>
            {teamCreated ? (
                <TeamCreationSuccess onGoBackToCreate={handleGoBackToCreate} />
            ) : (
                <div>
                    <h1>Create Team</h1>
                    <input
                        type="text"
                        placeholder="Enter Team Name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <button onClick={handleCreateTeam}>Create</button>
                </div>
            )}
        </div>
    );
};

export default TeamCreation;