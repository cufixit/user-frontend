import React, { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";
import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const New = () => {
  const { session } = useContext(AccountContext);

  const axios = require("axios").default;

  const [title, setTitle] = useState("");
  const [building, setBuilding] = useState("ALT");
  const [description, setDescription] = useState("");

  const [files, setFiles] = useState();
  const [submitted, setSubmitted] = useState("");

  const buildings = [
    { ALT: "Altschul Hall" },
    { AVH: "Avery Hall" },
    { BAR: "Barnard Hall" },
    { BUT: "Butler Library" },
    { BWY: "Broadway Residence Hall" },
    { DIA: "Diana Center" },
    { DOD: "Dodge Building" },
    { FLS: "Fairchild Life Sciences Building" },
    { HAM: "Hamilton Hall" },
    { IAB: "International Affairs Building" },
    { JRN: "Journalism Building" },
    { KNT: "Kent Hall" },
    { KNX: "Knox Hall" },
    { LEH: "Lehman Hall" },
    { LER: "Alfred Lerner Hall" },
    { LEW: "Lewisohn Hall" },
    { MAT: "Mathematics Building" },
    { MCY: "Macy Hall" },
    { MIL: "Milbank Hall, Barnard" },
    { MLC: "Milstein Center, Barnard" },
    { MUD: "Seeley W. Mudd Building" },
    { NWC: "Northwest Corner" },
    { PHI: "Philosophy Hall" },
    { PRN: "Prentis Hall" },
    { PUP: "Pupin Laboratories" },
    { SCEP: "Schapiro Center" },
    { SCH: "Schermerhorn Hall" },
    { SCHP: "Schapiro Residence Hall" },
    { URI: "Uris Hall" },
    { UTS: "Union Theological Seminary" },
  ];

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
            <Paper sx={{ padding: "20px 30px 30px", marginBottom: "20px" }}>
              <Typography variant="h5" marginBottom="10px">
                New Report
              </Typography>
              <Divider sx={{ marginBottom: "25px" }} />
              <form onSubmit={onSubmit}>
                <FormControl fullWidth>
                  <Stack spacing={4}>
                    <div>
                      <TextField
                        label="Issue Title"
                        sx={{ width: "60%", marginRight: "10%" }}
                        required
                        onChange={(event) => setTitle(event.target.value)}
                      />
                      <TextField
                        select
                        label="Building"
                        defaultValue="Altschul Hall"
                        helperText="Select the location of the issue"
                      >
                        {buildings.map((option) => (
                          <MenuItem
                            key={Object.keys(option)[0]}
                            value={Object.values(option)[0]}
                            onClick={(event) =>
                              setBuilding(Object.keys(option)[0])
                            }
                          >
                            {Object.values(option)[0]}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <TextField
                      label="Description"
                      fullWidth
                      required
                      onChange={(event) => setDescription(event.target.value)}
                    />
                    <Button variant="outlined" component="label">
                      Upload Files
                      <input
                        type="file"
                        hidden
                        onChange={(event) => setFiles(event.target.files)}
                        multiple
                      />
                    </Button>
                    {files === undefined ? (
                      <></>
                    ) : (
                      <div>You have uploaded file(s).</div>
                    )}
                  </Stack>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ marginTop: "30px", fontWeight: "800", width: "20%" }}
                  >
                    Submit Report
                  </Button>
                </FormControl>
              </form>
              {submitted === "" ? <></> : <div>{submitted}</div>}
            </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default New;
