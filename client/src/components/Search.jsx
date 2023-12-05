import React, { useState } from 'react';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import debounce from 'lodash/debounce';

import '../../public/styles/main.css';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearch = debounce(async (value) => {
        try {
            const response = await fetch(`https://user-management-seven-murex.vercel.app/api/users/search/${value}`);
            const userData = await response.json();
            onSearch(userData.data);
        } catch (error) {
            console.error('Error searching users:', error);
            onSearch([]);
        }
    }, 300);

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);

        // Check if the value is empty
        if (value.trim() === '') {
            // Reset the state or perform any other action
            setSearchTerm('');
            onSearch([]); // Assuming you want to clear the search results when the input is empty
            return;
        }

        debouncedSearch(value);
    };

    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">Team Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search by name"
                            className="me-2"
                            aria-label="Search"
                            onChange={handleChange}
                            value={searchTerm}
                        />
                        <Button variant="outline-light" disabled>
                            Search
                        </Button>
                    </Form>
                    <Nav className="ms-auto">
                        <Nav.Link href="/team-details">TeamDetails</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Search;
