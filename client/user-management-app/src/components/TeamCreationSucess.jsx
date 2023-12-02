// components/TeamCreationSuccess.js
import React from 'react';
import PageLayout from '../PageLayout';

const TeamCreationSuccess = ({ onGoBackToCreate }) => {
    return (
        <PageLayout>
            <div>
                <h2>Team Created Successfully!</h2>
                <p>Your team has been created successfully.</p>
                <button onClick={onGoBackToCreate}>Go Back to Create</button>
            </div>
        </PageLayout>
    );
};

export default TeamCreationSuccess;
