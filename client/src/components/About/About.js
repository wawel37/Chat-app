import react from 'react';
import './About.css';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export function About(){

    return(
        <div className="About">
            <h1 className="title">Welcom to my chat</h1>
            <h2 className="discription">Start by loggin in or Signing up!</h2>
            <div className="button-panel">
                <Button variant="primary">Login</Button>
                <Button variant="warning">Sign up</Button>
            </div>
        </div>
    )
}