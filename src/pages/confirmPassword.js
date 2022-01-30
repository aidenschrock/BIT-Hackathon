import React from "react";
import { Grid, Paper, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { grey } from "@mui/material/colors";

const Passwordconfirm = () => {
  const accent = grey.A700;
  const paperStyle = {
    padding: "30px 20px",
    width: 600,
    height: "50vh",
    margin: "20px auto",
  };
  const headerStyle = { margin: 1 };

  return (
    <Grid>
      <Paper elevation={6} style={paperStyle}>
        <Grid container direction="row" align="left" style={headerStyle}>
          <ArrowBackIcon />
          <Typography style={{ color: "accent" }}></Typography>
          <Link variant="subtitle2" href="./components/login">
            Back to login
          </Link>
          <Typography />
        </Grid>
        <div style={{ height: 50 }} />
        <Grid align="center" justify="center">
          {/* style={{ display: "block", justifyContent: "center"  ,alignItems:"center" }} */}

          <h2 style={headerStyle} variant="subtitle1">
            Successfully Sent!
          </h2>
          <div style={{ height: 5 }} />
          <Typography
            variant="caption"
            display="block"
            align="center"
            gutterBottom
          >
            Please check your email for instructions on resetting your password
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Passwordconfirm;
