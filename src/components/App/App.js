import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Trades from '../Trades/Trades'
import Navigation from '../layout/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
          <Navigation />
      </header>
      <Route path="/" exact={true} component={Trades} />
    </div>
    </Router>
  );
}

export default App;
