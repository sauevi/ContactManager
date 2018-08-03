import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
/**
 * Esta es la clase creada para poder agregar contactos en forma de formulario
 */
class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  /**
   * se le pasa el parametro de evento "e", para poder coger los valores del input actual
   * por ello con el target, se puede acceder al nombre y al value.
   */
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  /**
   * funcion encargada de agregar un nuevo valor.
   */
  onSubmit = async (dispatch, e) => {
    //prevenir que no envie valores erroneos o malformados, segun el tipo del formulario
    e.preventDefault();
    //se cogen las constantes del state actual
    const { name, email, phone } = this.state;
    // verificacion de valores vacios.
    if (name === '') {
      this.setState({
        errors: {
          name: 'El nombre es requerido'
        }
      });
      return;
    }
    if (email === '') {
      this.setState({
        errors: {
          email: 'El email es requerido'
        }
      });
      return;
    }
    if (phone === '') {
      this.setState({
        errors: {
          phone: 'El numero de telefono es requerido'
        }
      });
      return;
    }
    //se crea un nuevo contacto con los state actuales
    const newContact = {
      name,
      email,
      phone
    };
    //se hace un post para crear un nuevo contacto.
    const res = await axios.post(
      'http://jsonplaceholder.typicode.com/users',
      newContact
    );
    dispatch({ type: 'ADD_CONTACT', payload: res.data });
    //limpiar los valores
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });
    //re-dirigirnos hacia otra pagina, pero todo en react.
    this.props.history.push('/');
  };
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Ingrese el nombre..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Ingrese el email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Ingrese el numero de telefono..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
