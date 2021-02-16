import logo from './logo.svg';
import './App.css';
import {ChatWindow} from './components/chat-window/ChatWindow'
import NavBar from './components/nav-bar/NavBar';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import {Route, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Route path='/' exact component={ChatWindow}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
      </Router>
      
    </div>
  );
}

export default App;
