import React from 'react';
import "../../public/styles/main.css";


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
