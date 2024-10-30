import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider } from "@mui/material";

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

export default function Login() {
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
      .post("http://localhost:5000/api/users/login", obj)
      .then(function (response) {
        localStorage.setItem("token", `${response.data.data.token}`);
        window.location.href = "/";
      })
      .catch(function (error) {
        enqueueSnackbar("Incorrect Email/Password!", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/ZmgJiztRHXE)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
            <Divider />
            <br />

            <Typography
              component="h1"
              variant="h5"
              style={{ marginTop: "-40px" }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
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

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  Don't have an account?
                  <Link
                    to="/register"
                    variant="body2"
                    style={{ color: "blue", marginLeft: "3px" }}
                  >
                    {"Sign Up"}
                  </Link>
                </div>

                <div>
                  <Link
                    to="/vendorLogin"
                    variant="body2"
                    style={{ color: "blue", marginRight: "3px" }}
                  >
                    {"Sign In "}
                  </Link>
                  as a Vendor
                </div>
              </div>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}