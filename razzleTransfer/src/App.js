import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './home/Home';
import Books from './books/Books';
import Profile from './profile/Profile';
import './App.css';

const App = (serverData) =>{
return <Switch>
    <Route exact path="/" render={i=><Home {...serverData}/>} />
    <Route exact path="/profile" render={i=><Profile {...serverData}/>} />
    <Route exact path="/books" render={i=><Books {...serverData}/>} />
  </Switch>
};

export default App;
