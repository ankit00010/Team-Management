import React, { useState } from 'react';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import '../../public/styles/main.css';

const Search = ({ onSearch }) => {
    // State to manage the search term
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle the search operation
    const handleSearch = async (value) => {
        setSearchTerm(value);

        try {
            // Fetch user data based on the search term
            const response = await fetch(`https://user-management-api-eight.vercel.app/api/users/search/${value}`);
            const userData = await response.json();

            // Notify the parent component with the search results
            onSearch(userData.data);
        } catch (error) {
            // Handle errors by notifying the parent component with an empty array
            onSearch([]);
        }
    };

    // Function to handle input change and trigger search
    const handleChange = (e) => {
        const { value } = e.target;
        handleSearch(value);
    };

    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">Team Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {/* Search form */}
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search by name"
                            className="me-2"
                            aria-label="Search"
                            onChange={handleChange}
                            value={searchTerm}
                        />
                        {/* Search button (disabled for this example) */}
                        <Button variant="outline-light" disabled>
                            Search
                        </Button>
                    </Form>
                    {/* Navigation links */}
                    <Nav className="ms-auto">
                        <Nav.Link href="/team-details">TeamDetails</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Search;
