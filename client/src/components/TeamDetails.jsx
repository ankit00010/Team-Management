import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import "../../public/styles/main.css";

const TeamDetails = () => {
    const { name } = useParams();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                // Fetch team details based on the team name
                const response = await fetch(`https://user-management-seven-murex.vercel.app/api/team/${name}`);
                const data = await response.json();
                // Set the team details in the state
                setTeam(data.team);
            } catch (error) {
                // Handle errors when fetching team details
                console.error('Error fetching team details:', error);
            }
        };

        fetchTeamDetails();
    }, [name]);

    // Display loading message until team details are available
    if (!team) {
        return <p>Loading...</p>;
    }

    // Render the team details using Card and ListGroup components
    return (
        <div className="team-details">
            <h1 className="teams-heading">Team Details</h1>
            <Card className="team-card">
                <ListGroup variant="flush">
                    {team.users.map((user) => (
                        <ListGroup.Item key={user._id} className="user-list-item">
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
                            </Card.Body>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </div>
    );
};

export default TeamDetails;
