import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link } from 'react-router-dom'

const styles = {
  input: {
    "&:invalid": {
      border: "red solid 2px",
    },
  },
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Shopify
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function VendorSignUp({ classes }) {
  const [phone, setPhone] = React.useState("");
  const [phoneError, setPhoneError] = React.useState();
  const [vName, setVName] = React.useState("");
  let mobregex =
    /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

  const handleVName = (e) => {
    setVName(e.target.value.replace(/[0-9]/g, ""));
  };

  const handlePhone = (e) => {
    if (mobregex.test(e.target.value)) {
      console.log("your email is vaid");
      setPhoneError(true);
    } else {
      console.log("your email is invaid");
      setPhoneError(false);
    }
    setPhone(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let obj = {
      name: vName,
      username: data.get("userName"),
      email: data.get("email"),
      password: data.get("password"),
      phoneNumber: phone,
    };

    axios
      .post("http://localhost:5000/api/vendors", obj)
      .then(function (response) {
        console.log(response.data.data);
        window.location.href = "/vendorLogin";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://fyp3.blob.core.windows.net/fyp/logo.png"
            width={200}
            height={200}
          />
          <Typography component="h1" variant="h5">
            Vendor Sign up
          </Typography>
          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required={true}
                  fullWidth
                  id="name"
                  label="Name"
                  value={vName}
                  onChange={handleVName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required={true}
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={true}
                  fullWidth
                  name="Mobile"
                  id="phone"
                  label="phone"
                  type="number"
                  value={phone}
                  onChange={handlePhone}
                />

                {phoneError == false ? (
                  <div style={{ color: "red", marginTop: 10 }}>
                    Incorrect Mobile Number.
                  </div>
                ) : (
                  <div></div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                Already have an account?
                <Link to="/vendorLogin" variant="body2" style={{color: 'blue', marginLeft: '3px'}}>
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}