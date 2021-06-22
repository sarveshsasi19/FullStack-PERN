import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

function Header() {
    return (
        <Navbar color="info" light expand="md">
            <NavbarBrand href="/" style={{
                color: "#000"
            
            }}>List Movies</NavbarBrand>
        </Navbar>
    )
}

export default Header;
