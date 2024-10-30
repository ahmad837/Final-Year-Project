import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import {
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
} from "@mui/material";
import { TextField } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FileUpload from "../components/organism/fileUpload";
import jwtDecode from "jwt-decode";
import { browserHistory } from "react-router";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

function OrderPage(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { jindow } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [img, setImg] = React.useState();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [listOrders, setListOrders] = React.useState();
  const [newsCover, setNewsCover] = React.useState("");
  let [btnBool, setBtnBool] = React.useState();

  let token = localStorage.getItem("token");
  let decode = jwtDecode(token);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const history = useHistory();

  let saveInfo = () => {
    let obj = {
      name: name,
      phoneNumber: phone,
    };
    axios
      .patch(`http://localhost:5000/api/users/${decode._id}`, obj, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        enqueueSnackbar("Information updated successfully!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setTimeout(function () {
          window.location.href = "/user";
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let getOrders = () => {
    axios
      .get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        console.log(decode._id, "===");
        let arr = response?.data?.data?.filter(
          (ar) => ar?.user?._id == decode?._id
        );
        console.log(arr);
        setListOrders(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let savePicture = () => {
    console.log("saving image");
    let obj = {
      appartment: newsCover[0],
    };
    axios
      .patch(`http://localhost:5000/api/users/${decode._id}`, obj, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        console.log("information updated");
        history.push("/user");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let getUser = () => {
    axios
      .get(`http://localhost:5000/api/users/${decode._id}`, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        setEmail(response.data.data.email);
        setName(response.data.data.name);
        setPhone(response.data.data.phoneNumber);
        setNewsCover(response.data.data.appartment);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let handleStatus = (e, id) => {
    let obj = {
      status: e.target.value,
    };
    axios
      .patch(`http://localhost:5000/api/orders/${id}`, obj, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        enqueueSnackbar("Order status updated successfully!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setTimeout(function () {
          window.location.href = "/user";
        }, 2000);
      });
  };

  React.useEffect(() => {
    getUser();
    getOrders();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log(newsCover);
  const container =
    jindow !== undefined ? () => jindow().document.body : undefined;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              style={{ backgroundColor: "#0288d1" }}
              sx={{
                width: "100%",
              }}
            >
              <Toolbar>
                {/*<IconButton*/}
                {/*  color="inherit"*/}
                {/*  aria-label="open drawer"*/}
                {/*  edge="start"*/}
                {/*  onClick={handleDrawerToggle}*/}

                {/*>*/}
                {/*  <MenuIcon />*/}
                {/*</IconButton>*/}
                <Typography
                  style={{ width: 400 }}
                  variant="h6"
                  noWrap
                  component="div"
                >
                  {name}'s Dashboard
                </Typography>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "end",
                  }}
                >
                  <HomeIcon
                    style={{ color: "white" }}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  />
                </div>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            </Box>
          </Box>
          <br />
          <br />
        </Grid>
        <Grid item md={2}></Grid>
        <Grid item md={8} xs={12}>
          <Typography
            style={{ marginTop: 20, textAlign: "center" }}
            variant="h5"
          >
            Order Details
          </Typography>
          <Divider />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: "100%",
            }}
          >
            {console.log(listOrders)}
            <Toolbar />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ backgroundColor: "#0288d1" }}>
                  <TableRow>
                    <TableCell
                      style={{ color: "white", fontWeight: "bold" }}
                      align="left"
                    >
                      UserID
                    </TableCell>
                    <TableCell
                      style={{ color: "white", fontWeight: "bold" }}
                      align="left"
                    >
                      User Name
                    </TableCell>
                    <TableCell
                      style={{ color: "white", fontWeight: "bold" }}
                      align="left"
                    >
                      OrderID
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "bold" }}>
                      Bill (PKR)
                    </TableCell>
                    <TableCell style={{ color: "white", fontWeight: "bold" }}>
                      Shipping Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listOrders?.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.user._id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.user.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.amount}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {/* <select onChange={(e) => handleStatus(e, row._id)}>
                          <option
                            disabled={row?.status == "Delivered"}
                            value={row?.status}
                          >
                            {row.status === "Unpaid"
                              ? "Dispatched"
                              : row.status || "Dispatched"}{" "}
                          </option>
                          <option
                            disabled={row?.status == "Delivered"}
                            value="Delivered"
                          >
                            Delivered
                          </option>
                        </select> */}
                        {row.status === "Unpaid" ? "Dispatched" : row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </>
  );
}

OrderPage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default OrderPage;
