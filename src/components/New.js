import React, { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  Stack,
  Select,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { BUILDINGS } from "../constants";

const New = () => {
  const { session } = useContext(AccountContext);

  const axios = require("axios").default;

  const [title, setTitle] = useState("");
  const [building, setBuilding] = useState(null);
  const [description, setDescription] = useState("");

  const [files, setFiles] = useState();
  const [submitted, setSubmitted] = useState("");

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

    const submission = {
      title: title.trim(),
      building: building,
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
      console.log(submission);
      event.target.reset();
      setSubmitted("You have successfully submitted a report!");
    } catch (error) {
      console.log(error);
      setSubmitted("There was an error submitting your report.");
    }
  };

  return (
    <Container fixed sx={{ marginTop: "100px" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={12}>
          {
            <Paper sx={{ padding: 5 }}>
              <Typography variant="h4" marginBottom={3}>
                New Report
              </Typography>
              <Box component="form" onSubmit={onSubmit}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <FormControl fullWidth>
                      <TextField
                        label="Issue Title"
                        required
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel required>Building</InputLabel>
                      <Select
                        value={building}
                        label="Building"
                        required
                        onChange={(event) => {
                          setBuilding(event.target.value);
                        }}
                      >
                        {Object.entries(BUILDINGS).map(([k, v]) => (
                          <MenuItem key={k} value={k}>
                            {v}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <FormControl fullWidth>
                    <TextField
                      label="Description"
                      fullWidth
                      required
                      multiline
                      rows={4}
                      type="text"
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </FormControl>
                  <Button variant="outlined" size="large" component="label">
                    Upload Photos
                    <input
                      type="file"
                      hidden
                      onChange={(event) => setFiles(event.target.files)}
                      multiple
                    />
                  </Button>
                  {files !== undefined &&
                    files.length >
                      0(
                        <div>{`You have uploaded ${files.length} photo(s).`}</div>
                      )}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ marginTop: "30px", fontWeight: "800" }}
                  >
                    Submit Report
                  </Button>
                </Stack>
              </Box>
              {/* {submitted === "" ? <></> : <div>{submitted}</div>} */}
            </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default New;
