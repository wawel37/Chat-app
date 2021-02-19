import react, {useState} from 'react';
import './NavBar.css';
import Button from 'react-bootstrap/Button';
import {ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';



export default function NavBav(){

    const [redirect, setRedirect] = useState(null);

    function logout(){
        console.log('loggin out');
        localStorage.setItem('user', null);
        localStorage.setItem('jwt', null);

        
        window.location.reload();
        setRedirect('/login');
    }

    if(redirect){
        return <Redirect sensitive from='/' to={redirect}/>
    }else{
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
}