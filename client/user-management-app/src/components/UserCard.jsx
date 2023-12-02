import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

const UserCard = ({ user, onAddToTeam }) => {
    const { _id, first_name, last_name, email, gender, domain, available, avatar } = user;
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToTeamClick = () => {

        setIsAdded(!isAdded);
        onAddToTeam(_id, !isAdded);
    };

    return (
        <Card className="user-card">
            <Card.Img variant="top" src={avatar} alt={`${first_name}${last_name}`} className="user-avatar" />
            <Card.Body>
                <Card.Title>{`${first_name} ${last_name}`}</Card.Title>
                <Card.Text>
                    <strong>Email:</strong> {email}
                </Card.Text>
                <Card.Text>
                    <strong>Gender:</strong> {gender}
                </Card.Text>
                <Card.Text>
                    <strong>Domain:</strong> {domain}
                </Card.Text>
                <Card.Text>
                    <strong>Available:</strong> {available ? 'Yes' : 'No'}
                </Card.Text>
                <button onClick={handleAddToTeamClick}>
                    {isAdded ? 'Remove from Team' : 'Add to Team'}
                </button>
            </Card.Body>
        </Card>
    );
};

export default UserCard;