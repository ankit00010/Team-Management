import React, { useState } from 'react';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import "../../public/styles/main";


const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://user-management-api-eight.vercel.app/api/users/search/${searchTerm}`);
            const userData = await response.json();

            // Assuming userData is an array of users
            onSearch(userData.data);
        } catch (error) {
            console.error('Error searching users:', error);
            setSearchTerm([]);
            onSearch([]);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
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
                        />
                        <Button variant="outline-light" onClick={(e) => handleSearch(e)}>Search</Button>
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
