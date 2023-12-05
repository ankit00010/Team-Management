import React from 'react';
import { Link } from 'react-router-dom';
import "../../public/styles/main.css";



const TeamCard = ({ team }) => {
    const { name, users } = team;

    return (
        <div className="team-card">
            <h3>{name}</h3>
            <p>Selected Users:</p>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{`${user.first_name} ${user.last_name}`}</li>
                ))}
            </ul>
            <Link to={`/team-details/${name}`}>View Details</Link>
        </div>
    );
};

export default TeamCard;
