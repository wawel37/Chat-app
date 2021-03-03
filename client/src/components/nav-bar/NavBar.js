import react, {useState, useEffect} from 'react';
import './NavBar.css';
import Button from 'react-bootstrap/Button';
import {ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom'
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';



export default function NavBav(){
    let history = useHistory();

    const [user, setUser] = useState(null);

    function logout(){
        if(!user) return;
        console.log('loggin out');
        localStorage.setItem('user', null);
        localStorage.setItem('jwt', null);

        alert('Successfully logged out!');
        
        history.push('/');
        window.location.reload();
    }

    useEffect(() =>{
        setUser(JSON.parse(localStorage.getItem('user')));
        console.log(user);
    }, []);

    
    return(
        <div className="NavBar">
            <nav className="nav-element">

                <ButtonGroup>
                    <Link to='/'>
                        <Button variant="dark">Home</Button>
                    </Link>
                </ButtonGroup>

                <ButtonGroup className="right-panel">
                    {!user && <Link to='/login'>
                        <Button variant="secondary">Login</Button>
                    </Link>}
                    {!user && <Link to='/register'>
                        <Button variant="secondary">Register</Button>
                    </Link>}

                    {user && <p className="logged-user">You are logged in as: {user.data.name}</p>}
                    
                    {user && <Button varian="secondary" onClick={logout}>Log out</Button>}
                </ButtonGroup>
            </nav>
        </div>
    )
    
}