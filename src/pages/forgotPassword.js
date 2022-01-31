import React, { useState } from "react";
import { Grid, Paper, Box, Typography, TextField, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase.js";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ForgotPassword = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const onSubmit = async () => {
    try {
      await sendPasswordReset(auth, email);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const style = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    paperStyle: {
      padding: "30px 20px",
      width: 600,
      height: "70vh",
      margin: "20px auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    headerStyle: {
      margin: 0,
    },
    input: {
      marginTop: "2%",
      marginBottom: "2%",
    },
  };

  return (
    <Grid style={style.container}>
      <Paper elevation={6} style={style.paperStyle}>
        <Grid container direction="row" align="left" style={style.headerStyle}>
          <ArrowBackIcon />
          <Link to="/login">Back to login</Link>
        </Grid>

        <Grid align="center">
          <Typography style={style.headerStyle} variant="h4">
            Forgot Password
          </Typography>

          <Typography
            variant="caption"
            display="block"
            align="center"
            gutterBottom
          >
            Please enter your registered email address
          </Typography>

          <Typography
            variant="caption"
            display="block"
            align="center"
            gutterBottom
          >
            We'll send instructions to help reset your password
          </Typography>
        </Grid>

        <Grid>
          <TextField
            {...register("email")}
            error={errors.email ? true : false}
            label="email"
            variant="outlined"
            color="primary"
            name="email"
            id="email"
            fullWidth
            value={email}
            onChange={handleChange}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.email?.message}
          </Typography>
        </Grid>

        <Box sx={{ marginTop: "2%" }}>
          <Button
            onClick={handleSubmit(onSubmit)}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Send Reset Instructions
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
