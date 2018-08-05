import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink
} from 'mdbreact';
/**
 * clase para el header, la redireccion se hace con el tag "Link" en vez de "a" y se utiliza "to" para establecer
 * hacia donde se quiere hacer la redireccion
 * @param {branding} props
 */
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <Navbar className="navbar-dark bg-dark" expand="md" scrolling>
        <NavbarBrand href="/">Contact Manager</NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav right>
            <NavItem>
              <NavLink to="/contact/add">
                <i className="fas fa-plus" /> Add
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about">
                <i className="fas fa-question" /> About
              </NavLink>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
