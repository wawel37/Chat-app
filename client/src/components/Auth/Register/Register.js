import react, {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import './Register.css';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';



export default function Register(){
    let history = useHistory();

    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const form = e.currentTarget;

        if(form.checkValidity() === false){
            alert('Enter valid values');
            return;
        }

        const toSend = {
            name: formName,
            email: formEmail,
            password: formPassword 
        };
        
        //Let the backend validate if the values are valid
        try{
            const response = await axios.post('/auth/register', toSend);
            setFormEmail('');
            setFormName('');
            setFormPassword('');

            alert('Registration successful, you can now log in!');

            // setRedirect('/login');
            history.push('/login');
        }catch(err){
            alert(err.response.data.error);
            return;
        };

        

    }

    
    
    return(
        <div className="Register">
            <Form className="myForm" onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label className="myLabel">Name</Form.Label>
                    <Form.Control type="text" value={formName} onChange={(e) => setFormName(e.target.value)}  required />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label className="myLabel">Email</Form.Label>
                    <Form.Control type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label className="myLabel">Password</Form.Label>
                    <Form.Control type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} required/>
                </Form.Group>
                <Button className="submitButton" variant="warning" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>
    )
    
}