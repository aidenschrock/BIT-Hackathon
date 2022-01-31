import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Avatar,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Header from "../components/header";
import { updateUserEmail } from "../firebase";

function Account() {
  const [editEmail, setEditEmail] = useState(false);
  const [userEmail, setUserEmail] = useState("exampleEmail@gmail.com");
  const [passwordDialogOpen, setpasswordDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [values, setValues] = useState({
    password_error_text: null,
    disabled: true,
    currentPassword: "",
    showCurrentPassword: false,
    newPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showConfirmNewPassword: false,
  });
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Password is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmNewPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Confirm Password does not match"),
  });
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const updateEmail = () => {
    updateUserEmail(userEmail);
    handleEditEmailClick();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    setpasswordDialogOpen((curr) => !curr);
    setSnackbarOpen(true);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (field) => () => {
    console.log(field);
    setValues({
      ...values,
      [field]: !values[field],
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const [email, setEmail] = useState("");
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 65,
        height: 65,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const handleEditEmailClick = () => {
    setEditEmail((curr) => !curr);
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  const handlePasswordDialog = () => {
    setpasswordDialogOpen((curr) => !curr);
    setValues({
      ...values,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleSaveEditPassword = () => {
    console.log("nice");
  };

  return (
    <div style={style.container}>
      <Header />
      <h1>Account Settings</h1>
      <div style={style.content}>
        <div style={style.contentColumns}>
          <Avatar {...stringAvatar("Aiden Schrock")} />
          <h3>Calendars</h3>
          <div>
            <p>Example cal name</p>
            <p>Example cal name</p>
          </div>
        </div>
        <div style={style.contentColumns}>
          <div>
            {editEmail ? (
              <div style={style.emailField}>
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  value={userEmail}
                  onChange={handleEmailChange}
                />
                <IconButton
                  aria-label="save email edit"
                  onClick={updateEmail}
                  sx={{ marginLeft: "15%" }}
                >
                  <CheckIcon color="primary" />
                </IconButton>
              </div>
            ) : (
              <div>
                <p>Email</p>
                <div style={style.emailField}>
                  <p>{userEmail}</p>
                  <IconButton
                    aria-label="edit email"
                    onClick={handleEditEmailClick}
                    sx={{ marginLeft: "15%" }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </div>
              </div>
            )}
          </div>

          <div>
            <p>Password</p>
            <Button onClick={handlePasswordDialog}>Change Password</Button>
          </div>
          <Dialog
            open={passwordDialogOpen}
            onClose={handlePasswordDialog}
            fullWidth={true}
            maxWidth="md"
          >
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent style={style.content}>
              <div style={style.contentColumns}>
                Password Must Contain
                <ul>
                  <li>at least 6 characters</li>
                  <li>at least one uppercase character</li>
                  <li>at least one number</li>
                  <li>at least one symbol</li>
                </ul>
              </div>
              <div style={style.contentColumns}>
                <form onSubmit={handleSaveEditPassword}>
                  <TextField
                    required
                    {...register("currentPassword")}
                    autoFocus
                    margin="dense"
                    label="Current Password"
                    fullWidth
                    variant="outlined"
                    type={values.showCurrentPassword ? "text" : "password"}
                    value={values.currentPassword}
                    onChange={handleChange("currentPassword")}
                    error={errors.currentPassword ? true : false}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword(
                              "showCurrentPassword"
                            )}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showCurrentPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.currentPassword?.message}
                  </Typography>
                  <TextField
                    required
                    {...register("newPassword")}
                    autoFocus
                    margin="dense"
                    label="New Password"
                    fullWidth
                    variant="outlined"
                    type={values.showNewPassword ? "text" : "password"}
                    value={values.newPassword}
                    onChange={handleChange("newPassword")}
                    error={errors.newPassword ? true : false}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword("showNewPassword")}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.newPassword?.message}
                  </Typography>
                  <TextField
                    required
                    {...register("confirmNewPassword")}
                    autoFocus
                    margin="dense"
                    label="Confirm New Password"
                    fullWidth
                    variant="outlined"
                    type={values.showConfirmNewPassword ? "text" : "password"}
                    value={values.confirmNewPassword}
                    onChange={handleChange("confirmNewPassword")}
                    error={errors.confirmNewPassword ? true : false}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword(
                              "showConfirmNewPassword"
                            )}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showConfirmNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.confirmNewPassword?.message}
                  </Typography>
                </form>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePasswordDialog}>Cancel</Button>
              <Button
                label="Submit"
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Change Password
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Password Succesfully Changed!
            </Alert>
          </Snackbar>
        </div>
      </div>
      <Button color="error">Delete Account</Button>
    </div>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: ".8",
  },
  contentColumns: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: "5%",
  },
  emailField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};

export default Account;
