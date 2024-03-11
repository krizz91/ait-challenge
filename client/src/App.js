import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Componentes
import Login from './pages/login';
import List from './pages/list';
import Edit from './pages/edit';
import New from './pages/new';
import Import from './pages/import';
import Export from './pages/export';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/list" /> : <Login onLogin={() => setIsLoggedIn(true)} />}
        </Route>
        <Route path="/list">
          {isLoggedIn ? <List /> : <Redirect to="/" />}
        </Route>
        <Route path="/edit/:id">
          {isLoggedIn ? <Edit /> : <Redirect to="/" />}
        </Route>
        <Route path="/new">
          {isLoggedIn ? <New /> : <Redirect to="/" />}
        </Route>
        <Route path="/import">
          {isLoggedIn ? <Import /> : <Redirect to="/" />}
        </Route>
        <Route path="/export">
          {isLoggedIn ? <Export /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
