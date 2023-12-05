import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TeamListItem = ({ teamId }) => {
    // State to manage team details
    const [team, setTeam] = useState(null);

    // Effect to fetch team details when the component mounts or the teamId changes
    useEffect(() => {
        const fetchTeamName = async () => {
            try {
                // Fetch team details based on the teamId
                const response = await fetch(`https://user-management-api-eight.vercel.app/api/team/${teamId}`);
                const data = await response.json();
                // Set the team details in the state
                setTeam(data.team);
            } catch (error) {
                // Handle errors when fetching team details
                console.error('Error fetching team name:', error);
            }
        };

        fetchTeamName();
    }, [teamId]);

    // Display loading message until team details are available
    if (!team) {
        return <p>Loading...</p>;
    }

    // Render a link to the team details page with the team name
    return (
        <Link to={`/team-details/${team.name}`} className="team-list-item-link">
            <div className="team-list-item">
                <h2>{team.name}</h2>
            </div>
        </Link>
    );
};

export default TeamListItem;
