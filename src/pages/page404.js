import { Typography } from "@mui/material";
import page404Image from "../page404Image.svg";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div style={style.container}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h5">Uh Oh! There's nothing here!</Typography>
      <img
        style={style.image}
        src={page404Image}
        alt="man exiting portal spooks alien"
      />
      <Typography variant="h5">
        Go Back{" "}
        <Link style={style.link} to="/BIT-Hackathon">
          Home
        </Link>
      </Typography>
    </div>
  );
}

const style = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "400px",
    margin: "2%",
  },
  link: {
    textDecoration: "none",
  },
};

export default Page404;
