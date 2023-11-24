import React from 'react'
import {
    Container,
    Nav,
    Navbar
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const NavigationBar = () => {
    return (
        <div>
            {/* bg="dark" data-bs-theme="dark" */}
            <Navbar className ='bg-dark' data-bs-theme='dark'>
                <Container className = 'ms-2'>
                    <Navbar.Brand href='/home' className='fs-4'>NBU Exchange Rate Viewer</Navbar.Brand>
                    <Nav className='me-auto'>
                        {/* <Nav.Link href = '/home'>Home</Nav.Link> */}
                        <Nav.Link href = '/search-rate'>Find Currency Rate</Nav.Link>
                        <Nav.Link href = '/custom-rate'>Alter Currency Rate</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar