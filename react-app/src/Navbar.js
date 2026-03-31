import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default class AppNavBar extends Component {
    render() {
        return (
            <Navbar color="dark" dark>
                <NavbarBrand tag={Link} to="/">
                    Home
                </NavbarBrand>
            </Navbar>
        );
    }
}