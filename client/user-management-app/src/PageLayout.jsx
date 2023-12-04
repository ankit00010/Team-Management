import React, { useState, useEffect } from 'react';
import UserSearch from './components/Search';
import Filter from './components/Filter';
import Footer from './components/Footer';
import UserList from './components/UserList';
import CreateTeam from './components/CreateTeam';

const PageLayout = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const handleSearch = (userData) => {
        setSearchResults(userData);
    };

    const handleFilterChange = async (filterOptions) => {
        try {
            const { domain, gender, available } = filterOptions;
            const url = `http://localhost:5000/api/users/filter?domain=${domain || ''}&gender=${gender || ''}&available=${available || ''}&page=1`;
            const response = await fetch(url);
            const data = await response.json();
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error fetching filtered users:', error);
            setFilteredUsers([]);
        }
    };

    const handleToggleSelect = (userId) => {
        // Check if the user is already selected
        const isSelected = selectedUserIds.includes(userId);

        // Update the selectedUserIds array
        if (isSelected) {
            setSelectedUserIds((prevSelected) => prevSelected.filter((id) => id !== userId));
        } else {
            setSelectedUserIds((prevSelected) => [...prevSelected, userId]);
        }
    };

    const handleCreateTeam = (teamName, selectedUserIds) => {
        // Add logic to send team creation request with teamName and selectedUserIds
        console.log('Creating team:', teamName);
        console.log('Selected User IDs:', selectedUserIds);
    };

    useEffect(() => {
        handleFilterChange({});
    }, []); // Fetch all users initially

    return (
        <div>
            <UserSearch onSearch={handleSearch} />
            <Filter onFilterChange={handleFilterChange} />
            <CreateTeam
                selectedUserIds={selectedUserIds}
                onCreateTeam={handleCreateTeam}
            />
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
