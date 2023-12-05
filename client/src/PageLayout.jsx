import React, { useState } from 'react';
import UserSearch from './components/Search';
import Filter from './components/Filter';
import Footer from './components/Footer';
import UserList from './components/UserList';
import CreateTeam from './components/CreateTeam';

const PageLayout = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // Add state for filtered users
    const [selectedUserIds, setSelectedUserIds] = useState([]); // Add state for selected user ids

    const handleSearch = (userData) => {
        setSearchResults(userData);
    };

    const handleFilterChange = (filteredData) => {
        setFilteredUsers(filteredData);
    };

    const handleToggleSelect = (userId) => {
        // Your existing code for toggling user selection
    };

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
