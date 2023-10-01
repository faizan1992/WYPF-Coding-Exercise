import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const NavBar = () => {

  const navBarStyle = {
    backgroundColor: "rgb(25, 118, 210)", // Background color
    color: "white", // Text color
    padding: "10px", // Padding
    marginBottom: "50px",
  };

  const linkStyle = {
    textDecoration: "none", // Remove underline from links
    color: "inherit", // Inherit text color from parent (white)
    marginRight: "10px", // Spacing between links
    fontWeight: 700,
  };

  const logo = {
    width: '80%', // Adjust the logo size as needed
    marginRight: '10px', // Adjust the spacing between logo and title
  };

  return (
    <AppBar position="static" style={navBarStyle}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img src="https://www.wypf.org.uk/Media/2942/logo.png" alt="WYPF" style={logo} />
          </Typography>
        <Button color="inherit">
          <Link to="/" style={linkStyle}>
            Users
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/albums" style={linkStyle}>
            Albums
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
