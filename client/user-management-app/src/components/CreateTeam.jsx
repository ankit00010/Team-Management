import React, { useState } from 'react';

const CreateTeam = ({ onCreateTeam, selectedUserIds }) => {
    const [teamName, setTeamName] = useState('');

    const handleCreateTeam = async () => {
        try {
            // Create a team object with teamName and selectedUserIds
            const teamData = {
                name: teamName,
                userIds: selectedUserIds,
            };
            console.log("This is the user id list" + selectedUserIds)
            // Perform the POST request to create a team
            const response = await fetch('http://localhost:5000/api/team/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });

            // Log the entire response for debugging
            console.log('Server Response (Create Team):', response);

            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                // Parse the response data if needed
                const data = await response.json();

                // Call the onCreateTeam function with the created team data
                onCreateTeam(data);

                // Reset team name
                setTeamName('');

                // Notify the user about the successful creation
                alert('Team created successfully!');
            } else {
                // Handle error cases
                console.error('Failed to create team:', response.statusText);

                // Notify the user about the failure
                alert('Failed to create team. Please try again.');
            }

            // Update users as false based on their IDs
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

            // Log the entire response for debugging
            console.log('Server Response (Update Users):', response2);

            // Check if the request to update users was successful
            if (response2.ok) {
                // Parse the response data if needed
                const updatedUserData = await response2.json();

                // Log the updated user data for debugging
                console.log('Updated User Data:', updatedUserData);

                // Handle the updated user data as needed (e.g., display it)
                // ...

            } else {
                // Handle error cases for updating users
                console.error('Failed to update users:', response2.statusText);

                // Notify the user about the failure to update users
                alert('Failed to update users. Please try again.');
            }
        } catch (error) {
            console.error('Error creating team or updating users:', error);

            // Notify the user about the error
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create Team</h2>
            <label>Team Name:</label>
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />

            {/* Display selected user IDs for testing purposes */}
            <div>
                Selected User IDs: {selectedUserIds.join(', ')}
            </div>

            <button onClick={handleCreateTeam}>Create</button>
        </div>
    );
};

export default CreateTeam;
