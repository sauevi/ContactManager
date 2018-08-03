import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/**
 * clase para el header, la redireccion se hace con el tag "Link" en vez de "a" y se utiliza "to" para establecer
 * hacia donde se quiere hacer la redireccion
 * @param {branding} props
 */
const Header = props => {
  // las propiedades "props", se sacan del props y la propiedad se pone segun venga el nombre
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 py-0">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          {branding}
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#myNavbar"
          aria-controls="myNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact/add" className="nav-link">
                <i className="fas fa-plus" /> Add Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="fas fa-question" /> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

//agregando un valor por defecto, por si viene nulo
Header.defaultProps = {
  branding: 'My App'
};

//Escribiendo el tipo de propiedades que estamos esperando
Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
