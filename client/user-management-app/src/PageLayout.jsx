// PageLayout.js
import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Filter from './components//Filter';
import Footer from './components//Footer';
import UserList from './components//UserList';
import TeamCreation from './components//TeamCreation';

const PageLayout = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleAddToTeam = (userId, isAdded) => {
        console.log('Adding/removing user from team (PageLayout):', userId, isAdded);
        // Implement the logic to add/remove users from the team
    };

    const handleSearch = async (searchTerm) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/search/${searchTerm}`);
            const userData = await response.json();
            setSearchResults(userData.data);
        } catch (error) {
            console.error('Error searching users:', error);
            setSearchResults([]);
        }
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

    useEffect(() => {
        handleFilterChange({});
    }, []); // Fetch all users initially

    return (
        <div>
            <Search onSearch={handleSearch} />
            <Filter onFilterChange={handleFilterChange} />
            <TeamCreation onCreateTeam={() => { }} onAddToTeam={handleAddToTeam} />
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
