import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const UserList = ({ searchResults, filteredUsers, onToggleSelect }) => {
    // State to manage the list of users
    const [userList, setUserList] = useState([]);

    // Effect to fetch data when the component mounts or searchResults/filteredUsers change
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = [];

                // Check if searchResults or filteredUsers is provided
                if (searchResults && searchResults.length > 0) {
                    data = searchResults;
                } else if (filteredUsers && filteredUsers.length > 0) {
                    data = filteredUsers;
                } else {
                    // If neither searchResults nor filteredUsers is provided, fetch all users
                    const response = await fetch('https://user-management-seven-murex.vercel.app/api/users');
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
