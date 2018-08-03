import React, { Component } from 'react';
import axios from 'axios';
/**
 * Clase contexto para almacenar de forma global las variables
 * de esta forma se pueden acceder desde cualquier parte de nuesta App
 */
const Context = React.createContext();

/**
 * el reducer es para las acciones que se van a realizar.
 * @param {*} state
 * en la accion se va a pasar un objeto el cual va a tener un typo y un payload que sera el id del contacto a borrar
 * @param {object} action
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      //se devuelve el state que estaba, mas los contactos, filtrados por el id el cuale esta almacenado en la variable payload
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    //metodo para agregar un nuevo contacto, se llama el payload y se le agrega un contacto del state
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    //metodo para actualizar un contacto, con un mapa se recorre todo el objeto, se valida si el id es
    //igual al id del payload, de ser asi el contacto pasa a ser el del payload, de lo contrario se pone
    //el mismo contacto.
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  //se utiliza para llamar data de una API, en este ejemplo, se toma de jsonplaceholder
  //se utiliza axios para hacer el get, y con la respuesta llenamos la data
  // se hace de forma asyncrona.
  async componentDidMount() {
    //ya que el metodo es "async" se le debe poner el await para que la data se guarde en la variable
    const res = await axios.get('http://jsonplaceholder.typicode.com/users');

    this.setState({ contacts: res.data });
  }

  state = {
    contacts: [],
    //esta es la forma en la cual se va a realizar la eliminacion de valor en el objeto, la accion
    // sera la reformacion del state, el cual sera el mismo state pero con la respuesta del reducer.
    dispatch: action => this.setState(state => reducer(state, action))
  };
  //devolvemos en nuestro render el contexto con los valores del state y todas las propiedades hijas del mismoS
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
//se exporta el consumidor de esta forma para llamarlo solo con "consumer" y no "contaxt.consumer"
export const Consumer = Context.Consumer;
