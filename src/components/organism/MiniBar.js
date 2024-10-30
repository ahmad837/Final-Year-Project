import { Grid, Typography } from "@mui/material";
import React from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const MiniBar = () => {
  const history = useHistory()
  let token = localStorage.getItem("token");
  let [name, setName] = React.useState();
  let userId = token ? jwtDecode(token) : "";

  var getUser = () => {
    axios
      .get(`http://localhost:5000/api/users/${userId._id}`, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        console.log("hel", response.data.data);
        setName(response.data.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.clear();
    history.push("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.clear();
    history.push("/register");
  };

  const handleLogout = (e) => {
    e.preventDefault()

    localStorage.clear();
    history.push('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ marginBottom: "3px", border: '1 px solid blue', backgroundColor: 'white' }} >
        <Toolbar variant="dense" style={{ minHeight: '15px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  style={{color: 'black'}}>
            {token ? <div>&nbsp; &nbsp; <small> Hi! &nbsp; &nbsp; {name}</small> </div> : null}
          </Typography>
         
          {token ? (
            <Button
            variant="outlined"
            style={{ marginLeft: "30px", color: "white", backgroundColor: 'blue', width: '10px', height: '25px' }}
            onClick={handleLogout}
            size='small'
          >
            Logout
          </Button>
          ) : (
            <Button
              variant="outlined"
              style={{ marginLeft: "30px", color: "white", backgroundColor: 'blue',  height: '25px' }}
              onClick={handleLogin}
              size='small'
            >
              Sign In
            </Button>
          )}
          {!token && (
            <Button
              variant="outlined"  
              style={{ marginLeft: "30px", color: "white", backgroundColor: 'blue',  height: '25px' }}
              onClick={handleRegister}
              size='small'

            >
              Sign Up
            </Button>
          )}
          {/* </Button> */}
        </Toolbar>
      </AppBar>
    </Box>

    //   <Grid container>
    //       <Grid item md={12}>
    //           <div style={{display:'flex'}}>
    //           <Typography style={{marginLeft:'30px'}}>
    //               Hi !
    //           </Typography>
    //           {
    //               token ? (
    //                   <div>&nbsp; &nbsp;  {name} </div>
    //               ) : (
    //                 <Link href="/login" style={{marginLeft:'30px'}}>
    //                 Sign In/ Sign Up
    //                 </Link>
    //               )
    //           }

    //           <div style={{position:'absolute',right:50}}>
    //           <Link
    // onClick={()=>{
    //     localStorage.clear();
    //     window.location.href="/login"
    // }}
    // style={{marginLeft:'30px'}}>
    // Logout
    //           </Link>

    //           </div>
    //           </div>
    //       </Grid>
    //   </Grid>
  );
};

export default MiniBar;
