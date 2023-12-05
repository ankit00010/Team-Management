import React, { useState, useEffect } from 'react';
import TeamListItem from './TeamListItem';

const TeamListIndex = () => {
    // State to manage the list of teams
    const [teams, setTeams] = useState([]);

    // Effect to fetch teams when the component mounts
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                // Fetch the list of teams
                const response = await fetch('https://user-management-api-eight.vercel.app/api/team');
                const data = await response.json();
                // Set the list of teams in the state
                setTeams(data.teams);
            } catch (error) {
                // Handle errors when fetching teams
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    // Render the list of teams using TeamListItem component
    return (
        <div>
            <h1 className="teams-heading">Teams</h1>
            <div className="team-list">
                {teams.map((team) => (
                    <TeamListItem key={team._id} teamId={team.name} />
                ))}
            </div>
        </div>
    );
};

export default TeamListIndex;

