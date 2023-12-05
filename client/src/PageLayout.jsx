import React, { useState, useEffect } from 'react';
import UserSearch from './components/Search';
import Filter from './components/Filter';
import Footer from './components/Footer';
import UserList from './components/UserList';
import CreateTeam from './components/CreateTeam';

const PageLayout = () => {
    // State to manage search results, filtered users, and selected user IDs
    const [searchResults, setSearchResults] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    // Function to handle user search and update search results
    const handleSearch = (userData) => {
        setSearchResults(userData);
    };

    // Function to handle filter change and update filtered users
    const handleFilterChange = async (filterOptions) => {
        try {
            const { domain, gender, available } = filterOptions;
            const url = `https://user-management-api-eight.vercel.app/api/users/filter?domain=${domain || ''}&gender=${gender || ''}&available=${available || ''}&page=1`;
            const response = await fetch(url);
            const data = await response.json();
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error fetching filtered users:', error);
            setFilteredUsers([]);
        }
    };

    // Function to handle user selection
    const handleToggleSelect = (userId) => {
        const isSelected = selectedUserIds.includes(userId);

        if (isSelected) {
            setSelectedUserIds((prevSelected) => prevSelected.filter((id) => id !== userId));
        } else {
            setSelectedUserIds((prevSelected) => [...prevSelected, userId]);
        }
    };

    // Effect to initialize filtered users on component mount
    useEffect(() => {
        handleFilterChange({});
    }, []);

    // Render the page layout with search, filter, team creation, user list, and footer components
    return (
        <div>
            <UserSearch onSearch={handleSearch} />
            <Filter onFilterChange={handleFilterChange} />
            <CreateTeam selectedUserIds={selectedUserIds} />
            <UserList
                searchResults={searchResults}
                filteredUsers={filteredUsers}
                onToggleSelect={handleToggleSelect}
            />
            <Footer />
        </div>
    );
};

export default PageLayout;
