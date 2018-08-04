import React, { Component } from 'react';
import Contacts from './components/contacts/Contacts';
import Header from './components/layout/Header';
import AddContact from './components/contacts/AddContact';
import EditContacts from './components/contacts/EditContacts';
import { Provider } from './context';
import About from './components/pages/About';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NotFound from './components/pages/NotFound';
import Test from './components/test/Test';

import 'bootstrap/dist/css/bootstrap.min.css';
/**
 * Root de nuestra App, el "Provider" se utiliza para proveer las variables globales a todo el sistema,
 * para poder navegar en la pagina se debe instalar el componente "react-router-dom", este se debe importar como esta en el ejemplo
 * y despues se cargan los router para asi navegar dependiendo de cual se llama, los switch son utilizados para saber en cual pagina vamos
 * dependiendo del path que se utilice y el componente que se cargue.
 * EL header se deja por fuera del switch debido a que se quiere en todos los componentes.
 *
 */
class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            {/* se envia una propiedad a una funcionalidad, con la propiedad personalizada */}
            <Header branding="Contact Manager" />
            {/* contenedor para los usuarios */}
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route
                  exact
                  path="/contact/edit/:id"
                  component={EditContacts}
                />
                <Route exact path="/test" component={Test} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
