import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const CreateAddedCard = ({ userId, onRemoveFromWishlist }) => {
    // State to manage user data, loading state, error, and display flag
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldDisplay, setShouldDisplay] = useState(true);

    // Effect to fetch user data when the component mounts or when userId changes
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://user-management-api-eight.vercel.app/api/users/getUserByIds', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _ids: [userId] }),
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData[0]);
                } else {
                    const errorMessage = await response.text();
                    setError(`Failed to fetch user details: ${errorMessage}`);
                }
            } catch (error) {
                setError(`Error fetching user details: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    // Handler to remove user from the wishlist and hide the card
    const handleRemoveFromWishlist = () => {
        onRemoveFromWishlist(user);
        setShouldDisplay(false);
    };

    return (
        <div>
            {/* Conditionally render the card based on loading, error, and shouldDisplay states */}
            {shouldDisplay && (
                <div>
                    {loading && <p>Loading user details...</p>}
                    {error && <p>{error}</p>}
                    {user && (
                        <Card className="user-card">
                            <Card.Body>
                                <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {user.email}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Domain:</strong> {user.domain}
                                </Card.Text>
                                <button onClick={handleRemoveFromWishlist}>Remove from Wishlist</button>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreateAddedCard;
