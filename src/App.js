import homescreenImage from "./homescreenImage.svg";
import { Button, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";


function App() {
  let navigate = useNavigate();

  const enterApp = () => {
    navigate("/login");
  };

  const style = {
    container: {
      display: "flex",
      minHeight: "100vh",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "60%",
      margin: "10%",
    },
    button: {
      marginTop: "10%",
      width: "15em",
    },
    image: {
      width: "40%",
      padding: "5%",
    },
    aboutLink: {
      textDecoration: "none",
      marginTop: "3%",
    },
  };
  return (
    <div style={style.container}>
      <div style={style.content}>
        <Typography variant="h1">Roommate</Typography>
        <Typography variant="h5">
          Meet your new Roommate: A shared calendar tool for chores and events.
        </Typography>

        <Button onClick={enterApp} style={style.button} variant="contained">
          Get Started
        </Button>
        <Typography style={style.aboutLink}>
          <Link
            style={{ textDecoration: "none", fontSize: "1.2em" }}
            to="/about"
          >
            About
          </Link>
        </Typography>
      </div>
      <img
        style={style.image}
        src={homescreenImage}
        alt="friends planning on a board"
      />
    </div>
  );
}

export default App;
