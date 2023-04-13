import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import apigClientFactory from 'aws-sdk';

const New = () => {
    var sdk = apigClientFactory.newClient();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [file, setFile] = useState();
    const [uploadSuccess, setUploadSuccess] = useState("");

    const uploadPhoto = (event) => {
        event.preventDefault();

        console.log(file);
        if (file) {
            setUploadSuccess("You have uploaded file(s).");
        } else {
            setUploadSuccess("No file has been uploaded.");
        }

    };

    const onSubmit = (event) => {
        event.preventDefault();

        const submission = {
            "user": "test",
            "title": title,
            "location": location,
            "description": description,
            "num_images": "test",
        }

        // sdk.reportPost();
    }

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="issueTitle">
                        <Form.Label>Issue Title</Form.Label>
                        <Form.Control type="title" onChange={(event) => setTitle(event.target.value())} placeholder="Enter issue title" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Select defaultValue="Wien Hall" onChange={(event) => setLocation(event.target.value())}>
                            <option>Wien Hall</option>
                            <option>Broadway Hall</option>
                            <option>Mudd</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={(event) => setDescription(event.target.value())} as="textarea" rows={3} placeholder="Give a detailed description of what the issue is." />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}
                    controlId="imgs">
                        <Form.Label>Upload images</Form.Label><br/>
                        <input onChange={(event) => setFile(event.target.files[0])} type="file" name="file" multiple />
                        <Button onClick={uploadPhoto} variant="secondary" type="submit">
                            Upload
                        </Button>
                    </Form.Group>
                </Row>
                <div>{uploadSuccess}</div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default New;
