import react ,{useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';



export default function Login(){

    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [redirect, setRedirect] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();

        const form = e.currentTarget;

        if(form.checkValidity() === false){
            alert('Enter valid values');
            return;
        }

        const toSend ={
            email: formEmail,
            password: formPassword
        };

        //Let the backed verify if the values are valid
        try{
            const response = await axios.post('/auth/login', toSend);

            setFormEmail('');
            setFormPassword('');

            console.log(response.data);

            alert('Logged successfully!');

            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('jwt', JSON.stringify(response.headers.jwt));

            setRedirect('/');
        }catch(err){
            alert(err.response.data.error);
            return;
        }

    }

    if(redirect){
        return <Redirect to={redirect}/>
    }else{
        return(
            <div className="Login">
                <Form className="myForm" onSubmit={handleSubmit}>

                        <Form.Group controlId="formEmail">
                            <Form.Label className="myLabel">Email</Form.Label>
                            <Form.Control type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label className="myLabel">Password</Form.Label>
                            <Form.Control type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} required/>
                        </Form.Group>

                        <Button className="submitButton" variant="primary" type="submit">
                            Log In
                        </Button>
                    </Form>
            </div>

        )
    }
}