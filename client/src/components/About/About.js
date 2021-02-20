import react, {useEffect, useState} from 'react';
import './About.css';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export function About(){

    const [user, setUser] = useState(null);

    useEffect(() =>{
        if(!user){
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);
    if(!user){
        return(
            <div className="About">
                <h1 className="title">Welcom to my chat</h1>
                <h2 className="discription">Start by loggin in or Signing up!</h2>
                <div className="button-panel">
                    <Button variant="primary">Log in</Button>
                    <Button variant="warning">Sign up</Button>
                </div>
            </div>
        );
    }else{
        return(
            <div className="About">
                
            </div>
        )
    }
}