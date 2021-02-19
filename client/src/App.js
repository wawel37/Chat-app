import logo from './logo.svg';
import './App.css';
import {ChatWindow} from './components/chat-window/ChatWindow'
import NavBar from './components/nav-bar/NavBar';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

function App() {

  const [socket, setSocket] = useState(null);

  //Setting the axios up to append JWT token to each header
  axios.interceptors.request.use((request) =>{
    const token = JSON.parse(localStorage.getItem('jwt'));
    request.headers.jwt = token;
    console.log(request.headers.jwt);
    return request;
  }, (error) =>{
    return error;
  });

  function setUpSocket(){
    const token = JSON.parse(localStorage.getItem('jwt'));

    if(!socket){

      const tempSocket = io('/', {
        query: {
          token: token
        }
      });

      // tempSocket.on('disconnect', () => {
      //   setSocket(null);
      //   console.log('socket set to null, disconnected');
      // });

      tempSocket.on('connection', () =>{
        console.log('socket connected');
      });

      setSocket(tempSocket);

    }
  }

  useEffect(() => {
    setUpSocket();
  });


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
