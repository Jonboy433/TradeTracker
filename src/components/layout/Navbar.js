import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation() {
    return (
        <div>
            <Navbar bg="light" expand="sm" className="my-2">
                <Navbar.Brand href="/">TradeTracker</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Navigation