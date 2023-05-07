import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import apigClient from "../ApigClient";

const Reports = () => {
  const { session } = useContext(AccountContext);

  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  const getReports = async () => {
    const queryParams = {
      userId: session["idToken"]["payload"]["sub"],
    };
    try {
      const response = await apigClient.invokeApi({}, "/reports", "GET", {
        headers: { Authorization: session["idToken"]["jwtToken"] },
        queryParams: queryParams,
      });
      console.log(response);
      setReports(
        response.data.reports.map((report) => ({
          ...report,
          id: report.reportId,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const columns = [
    { field: "groupId", headerName: "Group #", type: "number", width: 70 },
    { field: "title", headerName: "Report Title", width: 300 },
    { field: "description", headerName: "Description" },
    { field: "building", headerName: "Building", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "details",
      headerName: "Details",
      sortable: false,
      renderCell: (cellValues) => {
        return <Link to={`/reports/${cellValues.id}`}>Details</Link>;
      },
    },
    { field: "createdDate" },
  ];

  return loading ? (
    ""
  ) : (
    <Container maxWidth="lg">
      <div style={{ fontSize: "200%" }}>Reports</div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                description: false,
                createdDate: false,
                groupId: false,
              },
            },
          }}
          rows={reports}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Container>
  );
};

export default Reports;
