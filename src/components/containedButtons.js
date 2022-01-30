// import google from "../assets/images/google.svg";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

export default function ContainedButtons() {
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<img src={GoogleIcon} alt="google"></img>}
      >
        Login With Google
      </Button>
      <Button variant="contained" color="primary" startIcon={<GitHubIcon />}>
        Login with GitHub
      </Button>
      <Button variant="contained" color="primary" startIcon={<TwitterIcon />}>
        Login with
      </Button>
    </div>
  );
}
