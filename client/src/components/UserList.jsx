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

    // Function to fetch data based on search results or filtered users
    const fetchData = async () => {
        try {
            // Check if search results are available and update the user list accordingly
            if (searchResults && searchResults.length > 0) {
                setUserList(searchResults);
            }
            // Check if filtered users are available and update the user list accordingly
            else if (filteredUsers && filteredUsers.length > 0) {
                setUserList(filteredUsers);
            }
            // Fetch all users if neither search results nor filtered users are available
            else {
                const response = await fetch('https://user-management-api-eight.vercel.app/api/users');
                const data = await response.json();
                setUserList(data);
            }
        } catch (error) {
            // Handle errors when fetching data
            console.error('Error fetching data:', error);
        }
    };

    // Render the list of users using UserCard component
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
