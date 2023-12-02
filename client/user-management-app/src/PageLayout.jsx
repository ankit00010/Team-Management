// PageLayout.js
import React, { useState, useEffect } from 'react';
import UserSearch from './components/Search';
import Filter from './components/Filter';
import Footer from './components/Footer';
import UserList from './components/UserList';
import TeamCreation from './components/TeamCreation';

const PageLayout = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearch = (userData) => {
        setSearchResults(userData);
    };

    const handleFilterChange = async (filterOptions) => {
        try {
            // ... (same as before)
        } catch (error) {
            console.error('Error fetching filtered users:', error);
            setFilteredUsers([]);
        }
    };

    const handleAddToTeam = (userId, isAdded) => {
        console.log('Adding/removing user from team (PageLayout):', userId, isAdded);
        // Implement the logic to add/remove users from the team
    };

    useEffect(() => {
        handleFilterChange({});
    }, []); // Fetch all users initially

    return (
        <div>
            <UserSearch onSearch={handleSearch} />
            <Filter onFilterChange={handleFilterChange} />
            <TeamCreation onCreateTeam={() => { }} />
            <UserList
                searchResults={searchResults}
                filteredUsers={filteredUsers}
                onAddToTeam={handleAddToTeam}
            />
            <Footer />
        </div>
    );
};

export default PageLayout;
