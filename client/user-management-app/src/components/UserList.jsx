// components/UserList.js
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const UserList = ({ searchResults, filteredUsers, onAddToTeam }) => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetchData();
    }, [searchResults, filteredUsers]);

    const fetchData = async () => {
        try {
            if (searchResults && searchResults.length > 0) {
                setUserList(searchResults);
            } else if (filteredUsers && filteredUsers.length > 0) {
                setUserList(filteredUsers);
            } else {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
                setUserList(data);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="user-list">
            {userList.map((user) => (
                <UserCard key={user._id} user={user} onAddToTeam={onAddToTeam} />
            ))}
        </div>
    );
};

export default UserList;
