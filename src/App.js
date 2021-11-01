import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/main.css';
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import NotFoundPage from './components/NotFoundPage'

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={NotesList} />
        <Route exact path="/edit/:id" component={CreateNote} />
        <Route exact path="/create" component={CreateNote} />
        <Route exact path="/user" component={CreateUser} />

        <Route exact path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
