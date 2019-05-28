import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Scanner from './components/scanner/Scanner';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/scan" component={Scanner} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
