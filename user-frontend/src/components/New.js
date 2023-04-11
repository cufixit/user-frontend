import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const New = () => {
  return (
    <Container>
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="issueTitle">
                    <Form.Label>Issue Title</Form.Label>
                    <Form.Control type="title" placeholder="Enter issue title" />
                </Form.Group>

                <Form.Group as={Col} controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Select defaultValue="Wien Hall">
                        <option>Wien Hall</option>
                        <option>Broadway Hall</option>
                        <option>Mudd</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Give a detailed description of what the issue is." />
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Container>
  );
}

export default New;
