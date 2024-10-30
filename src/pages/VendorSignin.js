import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link } from 'react-router-dom'

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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function VendorSignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let obj = {
      email: data.get("email"),
      password: data.get("password"),
    };

    axios
      .post("http://localhost:5000/api/vendors/login", obj)
      .then(function (response) {
        localStorage.setItem("vendorToken", `${response.data.data.token}`);
        window.location.href = "/vendor";
      })
      .catch(function (error) {
        console.log(error);
        enqueueSnackbar("Incorrect Email/Password!", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <CssBaseline />
        <Grid
          item
          md={12}
          xs={{
            backgroundImage: "url(https://source.unsplash.com/ZmgJiztRHXE)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container component="main" maxWidth="xs">
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
                Vendor Sign in
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    Don't have an account?
                    <Link
                      to="/vendorRegister"
                      variant="body2"
                      style={{ color: "blue", marginLeft: "3px" }}
                    >
                      {"Sign Up"}
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="/login"
                      variant="body2"
                      style={{ color: "blue", marginRight: "3px" }}
                    >
                      {"Sign In "}
                    </Link>
                    as User
                  </div>
                </div>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}