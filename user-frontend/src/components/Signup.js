import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import UserPool from "../UserPool";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                setSuccess(err.message);
                console.error(err);
            }
            else {
                setSuccess("You have created an account successfully!");
            }
            console.log(data);
        });
    };

    return (
        <Container>
            <div>Register</div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                        type="email" 
                        placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)} 
                        type="password" 
                        placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <div>{success}</div>
        </Container>
    );
};

export default Signup;