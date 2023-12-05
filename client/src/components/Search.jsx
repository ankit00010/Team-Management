import React, { useState } from 'react';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import debounce from 'lodash/debounce';  // Fix the typo here

import '../../public/styles/main.css';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearch = debounce(async (value) => {
        try {
            const response = await fetch(`https://user-management-api-eight.vercel.app/api/users/search/${value}`);
            const userData = await response.json();
            onSearch(userData.data);
        } catch (error) {
            console.error('Error searching users:', error);
            onSearch([]);
        }
    }, 300); // Adjust the debounce delay as needed

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
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
