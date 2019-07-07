import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import StudentsView from './components/StudentsView';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/new' component={AddStudent} />
        <Route path='/home' component={StudentsView} />
        <Route component={StudentsView} />
      </Switch>
    </div>
  );
}

export default App;
