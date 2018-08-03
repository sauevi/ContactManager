import React, { Component } from 'react';
/**
 * clase para ver los componentes
 */
class Test extends Component {
  state = {
    title: ''
  };

  //en este se hacen los Http-calls para el API o del Back
  componentDidMount() {
    console.log('componentDidMount...');
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title
        })
      );
  }
  //este componente se carga de primero.
  componentWillMount() {
    console.log('componentWillMount...');
  }
  //este componente se carga despes de hacer un update
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  //este componente se carga antes de hacer un update
  componentWillUpdate() {
    console.log('componentWillUpdate...');
  }

  //cuando se reciven nuevas propiedades o state, este componente corre
  componentWillReceiveProps(nextProps, nextState) {
    console.log('componentWillReceiveProps...');
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h1>Test</h1>
        <h3>{title}</h3>
      </div>
    );
  }
}

export default Test;
