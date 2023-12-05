import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../public/styles/main.css'
const TeamListItem = ({ teamId }) => {
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const fetchTeamName = async () => {
            try {
                const response = await fetch(`https://user-management-seven-murex.vercel.app/api/team/${teamId}`);
                const data = await response.json();
                setTeam(data.team);
            } catch (error) {
                console.error('Error fetching team name:', error);
            }
        };

        fetchTeamName();
    }, [teamId]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://user-management-seven-murex.vercel.app/api/team/${teamId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Team deleted successfully!');
            } else {
                console.error('Failed to delete team');
            }
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    if (!team) {
        return <p>Loading...</p>;
    }

    return (
        <div className="team-list-item">
            {team.name && <h2>{team.name}</h2>}
            <Link to={`/team-details/${team.name}`} className="team-list-item-link">
                View Details
            </Link>
            <button
                onClick={handleDelete}
                className="delete-button"
                style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    display: flex,
                    justifyContent: 'flex-end',
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default TeamListItem;
