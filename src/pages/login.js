import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { auth, logInWithEmailAndPassword } from "../firebase.js";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const user = await logInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      navigate("/dashboard");
      console.log(user);
    } catch (err) {
      console.log(err);
      setAlertOpen(true);
    }
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((curr) => !curr);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
    forgotPassword: {
      textAlign: "right",
    },
  };

  return (
    <Grid style={style.container}>
      <Paper elevation={6} style={style.paperStyle}>
        <Grid align="center">
          <Typography style={style.headerStyle} variant="h4">
            Login
          </Typography>

          <Typography variant="caption" gutterBottom>
            Don't have an account?
            <Link
              style={{ marginLeft: "1%", textDecoration: "none" }}
              to="/signup"
            >
              Sign Up
            </Link>
          </Typography>
        </Grid>

        <Grid>
          <TextField
            style={style.input}
            variant="outlined"
            label="email"
            fullWidth
            value={values.email}
            onChange={handleChange("email")}
          />

          <TextField
            style={style.input}
            label="password"
            fullWidth
            autoFocus
            variant="outlined"
            color="primary"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onMouseDown={handleMouseDownPassword}
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Box style={style.forgotPassword}>
          <Link
            style={{ marginLeft: "1%", textDecoration: "none" }}
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
        </Box>
        <Box sx={{ marginTop: "2%" }}>
          <Button
            onClick={handleSubmit}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
        </Box>
      </Paper>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={closeAlert}>
        <Alert sx={{ width: "100%" }} severity="error">
          Invalid login.
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Login;
