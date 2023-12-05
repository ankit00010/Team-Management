import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import "../../public/styles/main.css";

const Filter = ({ onFilterChange }) => {
    // State to manage filter options
    const [filterOptions, setFilterOptions] = useState({
        domain: '',
        available: '',
        gender: '',
    });

    // Options for the 'Domain' filter
    const domainOptions = [
        'Business Development',
        'Finance',
        'IT',
        'Management',
        'Marketing',
        'Sales',
        'UI Designing',
    ];

    // Function to handle option click for radio inputs
    const handleOptionClick = (option, value) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [option]: prevOptions[option] === value ? '' : value,
        }));
    };

    // Effect to notify the parent component of filter changes
    useEffect(() => {
        onFilterChange(filterOptions);
    }, [filterOptions, onFilterChange]);

    return (
        <div className="filter-container">
            <Form>
                {/* Domain filter */}
                <Form.Group className="mb-3">
                    <Form.Label>Domain:</Form.Label>
                    <div className="d-flex">
                        {domainOptions.map((domain) => (
                            <div key={domain} className="form-check-inline">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id={`domain-${domain}`}
                                    checked={filterOptions.domain === domain}
                                    onChange={() => handleOptionClick('domain', domain)}
                                />
                                <label className="form-check-label" htmlFor={`domain-${domain}`}>
                                    {domain}
                                </label>
                            </div>
                        ))}
                    </div>
                </Form.Group>

                {/* Available filter */}
                <Form.Group className="mb-3">
                    <Form.Label>Available:</Form.Label>
                    <div className="form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="available-true"
                            checked={filterOptions.available === 'true'}
                            onChange={() => handleOptionClick('available', 'true')}
                        />
                        <label className="form-check-label" htmlFor="available-true">
                            True
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="available-false"
                            checked={filterOptions.available === 'false'}
                            onChange={() => handleOptionClick('available', 'false')}
                        />
                        <label className="form-check-label" htmlFor="available-false">False</label>
                    </div>
                </Form.Group>

                {/* Gender filter */}
                <Form.Group className="mb-3">
                    <Form.Label>Gender:</Form.Label>
                    <div className="form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="gender-male"
                            checked={filterOptions.gender === 'Male'}
                            onChange={() => handleOptionClick('gender', 'Male')}
                        />
                        <label className="form-check-label" htmlFor="gender-male">Male</label>
                    </div>
                    <div className="form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="gender-female"
                            checked={filterOptions.gender === 'Female'}
                            onChange={() => handleOptionClick('gender', 'Female')}
                        />
                        <label className="form-check-label" htmlFor="gender-female">Female</label>
                    </div>
                </Form.Group>
            </Form>
        </div>
    );
};

export default Filter;
