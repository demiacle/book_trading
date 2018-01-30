import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './home/Home';
import Books from './books/Books';
import Profile from './profile/Profile';
import Nav from './nav/Nav'
import './App.css';

// Used in both client and server rendering
// Client will not utilize this data object as it exists only on the server
// Instead, the client will initilialize it's state from a JSON.stringify(object)
// generated by the server render which should be parsed to the same object
const App = (data) =>{
  return <div>
    <Nav {...data} />
    <Switch>
      <Route exact path="/" render={() => <Home {...data} />} />
      <Route exact path="/profile" render={() => <Profile {...data} />} />
      <Route path="/books-for-trade" render={() => <Books {...data} />} />
      <Route path="/google-books" render={(queryData) => <Books {...data} {...queryData}/>} />
    </Switch>
  </div>
};


export default App;
