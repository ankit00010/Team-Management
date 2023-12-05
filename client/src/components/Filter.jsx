import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import "../../public/styles/main.css";
import debounce from 'lodash/debounce';

const Filter = ({ onFilterChange }) => {
    const [filterOptions, setFilterOptions] = useState({
        domain: 'Business Development',
        available: 'Yes',
        gender: 'Male',
    });

    const domainOptions = [
        'Business Development',
        'Finance',
        'IT',
        'Management',
        'Marketing',
        'Sales',
        'UI Designing',
    ];

    const handleOptionClick = (option, value) => {
        setFilterOptions((prevOptions) => {
            const newValue = prevOptions[option] === value ? '' : value;
            return {
                ...prevOptions,
                [option]: newValue,
            };
        });
    };

    const fetchFilteredData = async () => {
        try {
            const { domain, gender, available } = filterOptions;
            const url = `https://user-management-seven-murex.vercel.app/api/users/filter?domain=${domain || ''}&gender=${gender || ''}&available=${available || ''}&page=1`;
            const response = await fetch(url);
            const data = await response.json();
            onFilterChange(data);
        } catch (error) {
            console.error('Error fetching filtered users:', error);
            onFilterChange([]);
        }
    };

    useEffect(() => {
        const debounceFilterChange = debounce(fetchFilteredData, 300);

        debounceFilterChange();

        return () => {
            debounceFilterChange.cancel();
        };
    }, [filterOptions, onFilterChange]);

    return (
        <div className="filter-container">
            <Form>
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
