import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const CreateAddedCard = ({ userId, onRemoveFromWishlist }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldDisplay, setShouldDisplay] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://user-management-api-two.vercel.app/api/users/getUserByIds', {
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

    const handleRemoveFromWishlist = () => {
        onRemoveFromWishlist(user);
        setShouldDisplay(false); // Set shouldDisplay to false when removing from wishlist

        // Log the updated user array after removing a user
        console.log('Updated User Array:', user._id);
    };


    return (
        <div>
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
