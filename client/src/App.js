import logo from './logo.svg';
import './App.css';
import {ChatWindow} from './components/chat-window/ChatWindow'
import NavBar from './components/nav-bar/NavBar';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  //Setting the axios up to append JWT token to each header
  axios.interceptors.request.use((request) =>{
    const token = JSON.parse(localStorage.getItem('jwt'));
    request.headers.jwt = token;
    console.log(request.headers.jwt);
    return request;
  }, (error) =>{
    return error;
  });

  // //Setting the axios up to clear the local jwt token and user when something goes wrong
  // axios.interceptors.response.use((response) =>{
  //   return response;
  // }, (error) =>{
  //   console.log('error interceptor');
  //   localStorage.setItem('user', null);
  //   localStorage.setItem('jwt', null);
  //   return error;
  // });


  return (
    <div className="App">  
      <Router>
        <NavBar/>
        <Switch>
          
          <Route path='/' exact={true} component={ChatWindow}/>
          <Route path='/login' exact={true} component={Login}/>
          <Route path='/register' exact={true} component={Register}/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
