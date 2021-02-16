import react from 'react';
import './NavBar.css';
import Button from 'react-bootstrap/Button';
import {ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';


export default function NavBav(){

    function logout(){
        console.log('loggin out');
        localStorage.setItem('user', null);
    }

    return(
        <div className="NavBar">
            <nav className="nav-element">
                <ButtonToolbar className="custom-btn-toolbar">

                    <ButtonGroup>
                        <Link to='/'>
                            <Button variant="dark">Home</Button>
                        </Link>
                    </ButtonGroup>

                    <ButtonGroup>
                        <Link to='/login'>
                            <Button variant="secondary">Login</Button>
                        </Link>
                        <Link to='/register'>
                            <Button variant="secondary">Register</Button>
                        </Link>
                        <Button varian="secondary" onClick={logout}>Log out</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </nav>
        </div>
    )
}