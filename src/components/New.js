import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";

const New = () => {
  const { session } = useContext(AccountContext);

  const axios = require("axios").default;

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [files, setFiles] = useState();
  const [uploadSuccess, setUploadSuccess] = useState("");

  const uploadFile = async (file, imageUrl) => {
    const formData = new FormData();
    Object.keys(imageUrl.fields).forEach((key) => {
      formData.append(key, imageUrl.fields[key]);
    });
    formData.append("file", file);
    try {
      const response = await axios.post(imageUrl.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (files) {
      setUploadSuccess("You have uploaded file(s).");
    } else {
      setUploadSuccess("No file has been uploaded.");
    }

    const submission = {
      title: title.trim(),
      location: location,
      description: description.trim(),
      images: files ? Array.from(files).map((file) => file.name) : [],
    };

    try {
      const response = await apigClient.invokeApi(
        {},
        "/reports",
        "POST",
        { headers: { Authorization: session["idToken"]["jwtToken"] } },
        submission
      );
      console.log(response);
      response["data"]["imageUrls"].forEach((imageUrl, i) => {
        uploadFile(files[i], imageUrl);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>New Report</h1>
      <Form onSubmit={onSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="issueTitle">
            <Form.Label>Issue Title</Form.Label>
            <Form.Control
              type="title"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter issue title"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Select
              defaultValue="Wien Hall"
              onChange={(event) => setLocation(event.target.value)}
            >
              <option>Wien Hall</option>
              <option>Broadway Hall</option>
              <option>Mudd</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(event) => setDescription(event.target.value)}
              as="textarea"
              rows={3}
              placeholder="Give a detailed description of what the issue is."
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="imgs">
            <Form.Label>Upload images</Form.Label>
            <br />
            <input
              onChange={(event) => setFiles(event.target.files)}
              type="file"
              name="file"
              multiple
            />
          </Form.Group>
        </Row>
        <div>{uploadSuccess}</div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default New;
