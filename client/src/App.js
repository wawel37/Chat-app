import logo from './logo.svg';
import './App.css';
import {ChatWindow} from './components/chat-window/ChatWindow'
import NavBar from './components/nav-bar/NavBar';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import {About} from './components/About/About';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {SocketContext, getSocket } from './context/socket';

function App() {

  const [user, setUser] = useState(null);
  //Setting the axios up to append JWT token to each header
  axios.interceptors.request.use((request) =>{
    const token = JSON.parse(localStorage.getItem('jwt'));
    request.headers.jwt = token;
    console.log(request.headers.jwt);
    return request;
  }, (error) =>{
    return error;
  });

  useEffect(() =>{
    if(!user){
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  });
  
  return (
    <div className="App">
      <SocketContext.Provider value={getSocket()}>
        <Router>
          <NavBar/>
          <Switch>
            {user && <Route path='/' exact={true} component={ChatWindow}/>}
            {!user && <Route path='/' exact={true} component={About}/>}
            <Route path='/login' exact={true} component={Login}/>
            <Route path='/register' exact={true} component={Register}/>
          </Switch>
        </Router>
      </SocketContext.Provider>
      
    </div>
  );
}

export default App;
