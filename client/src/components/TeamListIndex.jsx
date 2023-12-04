import React, { useState, useEffect } from 'react';
import TeamListItem from './TeamListItem';

const TeamListIndex = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('https://user-management-api-eight.vercel.app/api/team');
                const data = await response.json();
                setTeams(data.teams);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

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
