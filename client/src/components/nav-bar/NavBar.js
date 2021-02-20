import react, {useState, useEffect} from 'react';
import './NavBar.css';
import Button from 'react-bootstrap/Button';
import {ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';



export default function NavBav(){

    const [redirect, setRedirect] = useState(null);
    const [user, setUser] = useState(null);

    function logout(){
        if(user) return;
        console.log('loggin out');
        localStorage.setItem('user', null);
        localStorage.setItem('jwt', null);

        alert('Successfully logged out!');
        window.location.reload();
        setRedirect('/login');
    }

    useEffect(() =>{
        setUser(!JSON.parse(localStorage.getItem('user')));
    }, []);

    if(redirect){
        return <Redirect sensitive from='/' to={redirect}/>
    }else{
        return(
            <div className="NavBar">
                <nav className="nav-element">
                    {/* <ButtonToolbar className="custom-btn-toolbar"> */}

                    <ButtonGroup>
                        <Link to='/'>
                            <Button variant="dark">Home</Button>
                        </Link>
                    </ButtonGroup>

                    <ButtonGroup className="right-panel">
                        {user && <Link to='/login'>
                            <Button variant="secondary">Login</Button>
                        </Link>}
                        {user && <Link to='/register'>
                            <Button variant="secondary">Register</Button>
                        </Link>}
                        
                        {!user && <Button varian="secondary" onClick={logout}>Log out</Button>}
                    </ButtonGroup>
                    {/* </ButtonToolbar> */}
                </nav>
            </div>
        )
    }
}