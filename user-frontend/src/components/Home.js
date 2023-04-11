import React from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";

const Home = () => {
    let navigate = useNavigate();
    const newReport = () => {
        navigate(`/new`);
    }
    const viewReports = () => {
        navigate(`/reports`);
    }

    return (
        <div className="d-grid gap-2">
          <Button onClick={newReport} variant="primary" size="lg">
            New Report
          </Button>
          <Button onClick={viewReports} variant="secondary" size="lg">
            Your Reports
          </Button>
        </div>
    ); 
}

export default Home;