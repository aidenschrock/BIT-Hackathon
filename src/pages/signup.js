import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Checkbox,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate, Link } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase.js";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState(true);

  let navigate = useNavigate();

  const handleCheckedChange = (event) => {
    setChecked(event.target.checked);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSubmit = async () => {
    try {
      await registerWithEmailAndPassword(auth, values.email, values.password);
      navigate("/login");
    } catch (err) {
      setAlertOpen(true);
      console.log(err);
    }
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
    tos: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
    },
  };

  return (
    <Grid style={style.container}>
      <Paper elevation={6} style={style.paperStyle}>
        <Grid align="center">
          <Typography style={style.headerStyle} variant="h4">
            Create an Account
          </Typography>
          <Typography variant="caption" gutterBottom>
            Already a member?
            <Link
              style={{ marginLeft: "1%", textDecoration: "none" }}
              to="/login"
            >
              Login
            </Link>
          </Typography>
        </Grid>

        <Grid>
          <TextField
            style={style.input}
            {...register("email")}
            label="email"
            variant="outlined"
            color="primary"
            name="email"
            id="email"
            error={errors.email ? true : false}
            fullWidth
            value={values.email}
            onChange={handleChange("email")}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.email?.message}
          </Typography>

          <TextField
            style={style.input}
            {...register("password")}
            fullWidth
            label="password"
            variant="outlined"
            color="primary"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange("password")}
            type={showPassword ? "text" : "password"}
            error={errors.password ? true : false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.password?.message}
          </Typography>
        </Grid>

        {/* <Box style={style.tos}>
          <Checkbox
            name="checked"
            checked={checked}
            onChange={handleCheckedChange}
            required
          />
          <div>
            <span>I agree to the </span>
            <Link to={"/terms"}>Terms of Service.</Link>
          </div>
        </Box> */}

        <Box sx={{ marginTop: "2%" }}>
          <Button
            onClick={handleSubmit(onSubmit)}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign up
          </Button>
        </Box>
      </Paper>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={closeAlert}>
        <Alert sx={{ width: "100%" }} severity="error">
          Error signing up
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Signup;
