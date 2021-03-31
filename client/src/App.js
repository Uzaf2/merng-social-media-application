import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import MenuBar from './components/MenuBar';
import {AuthProvider} from './context/auth';
import AuthRoute from './util/AuthRoute';

function App() {
  return (
    <AuthProvider>
    <Router>
      <MenuBar/>
       <Route exact path="/" component={Home}/>
       <AuthRoute exact path="/login" component={Login}/>
       <AuthRoute exact path="/register" component={Register}/>
       <Route exact path="/posts/:postId" component={SinglePost} />
       </Router>
      </AuthProvider>
  );
}

export default App;
