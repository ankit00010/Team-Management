import React, { useState } from 'react';
import UserSearch from './components/Search';
import Filter from './components/Filter';
import Footer from './components/Footer';
import UserList from './components/UserList';
import CreateTeam from './components/CreateTeam';

const PageLayout = () => {
    const [renderCount, setRenderCount] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const handleSearch = (userData) => {
        setSearchResults(userData);
    };

    const handleToggleSelect = (userId) => {
        const isSelected = selectedUserIds.includes(userId);

        if (isSelected) {
            setSelectedUserIds((prevSelected) => prevSelected.filter((id) => id !== userId));
        } else {
            setSelectedUserIds((prevSelected) => [...prevSelected, userId]);
        }
    };

    return (
        <div>
            <UserSearch onSearch={handleSearch} />
            <Filter onFilterChange={setFilteredUsers} />
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
