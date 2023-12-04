import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

const UserCard = ({ user, onToggleSelect }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleToggleSelect = () => {
        setIsSelected(!isSelected);
        onToggleSelect(user._id);
    };

    return (
        <Card className={`user-card ${isSelected ? 'selected' : ''}`}>
            <Card.Img variant="top" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="user-avatar" />
            <Card.Body>
                <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                <Card.Text>
                    <strong>Email:</strong> {user.email}
                </Card.Text>
                <Card.Text>
                    <strong>Gender:</strong> {user.gender}
                </Card.Text>
                <Card.Text>
                    <strong>Domain:</strong> {user.domain}
                </Card.Text>
                <Card.Text>
                    <strong>Available:</strong> {user.available ? 'Yes' : 'No'}
                </Card.Text>
                <button onClick={handleToggleSelect}>
                    {isSelected ? '✓ Selected' : '+ Add'}
                </button>
            </Card.Body>
        </Card>
    );
};

export default UserCard;
