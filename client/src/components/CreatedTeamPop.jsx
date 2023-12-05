import React, { useState } from 'react';
import CreateAddedCard from './CreateAddedCard';

const CreatedTeamPop = ({ userIDs, onRemoveFromWishlist, onClose }) => {
    const [users, setUsers] = useState(userIDs.map(userId => ({ id: userId, removed: false })));

    const handleRemoveFromWishlist = (removedUser) => {
        setUsers(prevUsers =>
            prevUsers.map(user => (user.id === removedUser._id ? { ...user, removed: true } : user))
        );
        onRemoveFromWishlist(removedUser._id);
    };

    return (
        <div>
            {users.map((user) => (
                !user.removed && (
                    <CreateAddedCard
                        key={user.id}
                        userId={user.id}
                        onRemoveFromWishlist={() => handleRemoveFromWishlist(user)}
                    />
                )
            ))}
            <button onClick={onClose}>Close Popup</button>
        </div>
    );
};

export default CreatedTeamPop;
