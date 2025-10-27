import React from 'react'
import './SearchBar.css';

import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa"; // أيقونة البحث

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    };
    return (
        <>
            <Form onSubmit={handleSubmit} className=" formm d-flex justify-content-between my-2 w-90">
                <InputGroup style={{ width: "300px" }}>
                    <Form.Control
                        type="text"
                        placeholder="Enter Your city! "
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                        <FaSearch /> {/* أيقونة البحث */}
                    </Button>
                </InputGroup>
            </Form>
        </>
    )
}
