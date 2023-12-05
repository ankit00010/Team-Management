import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const UserList = ({ searchResults, filteredUsers, onToggleSelect }) => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = [];
                if (searchResults && searchResults.length > 0) {
                    data = searchResults;
                } else if (filteredUsers && filteredUsers.length > 0) {
                    data = filteredUsers;
                } else {
                    const response = await fetch('https://user-management-api-eight.vercel.app/api/users');
                    data = await response.json();
                }

                setUserList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchResults, filteredUsers]);

    return (
        <div className="user-list">
            {userList.map((user) => (
                <UserCard
                    key={user._id}
                    user={user}
                    onToggleSelect={onToggleSelect}
                />
            ))}
        </div>
    );
};

export default UserList;
