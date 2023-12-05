import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TeamListItem = ({ teamId }) => {
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const fetchTeamName = async () => {
            try {
                const response = await fetch(`https://user-management-api-eight.vercel.app/api/team/${teamId}`);
                const data = await response.json();
                setTeam(data.team);
            } catch (error) {
                console.error('Error fetching team name:', error);
            }
        };

        fetchTeamName();
    }, [teamId]);

    if (!team) {
        return <p>Loading...</p>;
    }

    return (
        <Link to={`/team-details/${team.name}`} className="team-list-item-link">
            <div className="team-list-item">
                <h2>{team.name}</h2>
            </div>
        </Link>
    );
};

export default TeamListItem;
