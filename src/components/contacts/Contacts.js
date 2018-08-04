import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';
/**
 * Clase en la cual tenemos los contactos y su informacion.
 */
export class Contacts extends Component {
  /**
   * en este render estamos llamando el consumer que esta en nuestro contexto, el cual tiene el objeto de "contacts"
   * hacemos una desmaterializacion del objeto que se encuantra en el "value" del consumer y asi lo podemos utilizar despues en el codigo.
   */
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <div className="container-fluid">
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact</span> List
              </h1>
              {//se busca en todos los componentes con el mapa y enviamos el id con el objeto
              contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
