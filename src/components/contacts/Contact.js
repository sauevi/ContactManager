import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';
/**
 * Clase la cual se encarga de manejar cada contacto
 */
class Contact extends Component {
  state = {
    showContactInfo: false
  };

  /*las funciones estan dentro del render, por ello no funciona el "this", se puede pasar poniendo en el onClick un bind "funcion.bind(this)",
   o creando un constructor con this.funcion = this.funcion.bind(this)
   se se trata de una funcion "arrow", funciona sin los bind.
   en este ejemplo, se envia al dispacher global, el tipo "DELETE_CONTACT", con el id del objeto a eliminar
   */
  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  render() {
    // en el contact que recibimos como propiedad lo separamos en sus componentes
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    //se crea todo bajo el consumer, para poder acceder a las variables globales.
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                {showContactInfo ? (
                  <i
                    onClick={() =>
                      this.setState({
                        showContactInfo: !this.state.showContactInfo
                      })
                    }
                    className="fas fa-angle-up"
                    style={{ cursor: 'pointer', paddingLeft: '5px' }}
                  />
                ) : (
                  <i
                    onClick={() =>
                      this.setState({
                        showContactInfo: !this.state.showContactInfo
                      })
                    }
                    className="fas fa-angle-down"
                    style={{ cursor: 'pointer', paddingLeft: '5px' }}
                  />
                )}
                <i
                  data-toggle="tooltip"
                  title="Delete User"
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    data-toggle="tooltip"
                    title="Edit User"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
// se pone para validar los tipos de las propiedades
Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
