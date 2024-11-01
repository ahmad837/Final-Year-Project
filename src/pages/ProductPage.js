import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import MiniBar from "../components/organism/MiniBar";
import NavBar from "../components/organism/NavBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import EditIcon from "@mui/icons-material/Edit";
import AbcIcon from "@mui/icons-material/Abc";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Filter7Icon from "@mui/icons-material/Filter7";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogContentText from "@mui/material/DialogContentText";
import ReactStars from "react-rating-stars-component";
import DescriptionIcon from "@mui/icons-material/Description";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSnackbar } from "notistack";
import DemoCarousel from "../components/organism/Carousel";
import cover from "../assets/images/cover.jpg";
import Rating from "react-rating";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { flexbox } from "@mui/system";
import { Message, Money } from "@material-ui/icons";
import SimpleMap from "../components/organism/Map";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ProductPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const cartFromLocal = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [product, setProduct] = useState();
  const [itemNo, setItemNo] = useState(1);

  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf("/") + 1);

  let token = localStorage.getItem("token");
  let userId = jwtDecode(token);

  console.log(userId);
  console.log(userId._id);
  let adminToken = localStorage.getItem("adminToken");

  const plusItem = () => {
    if (product?.stock > itemNo) setItemNo(itemNo + 1);
  };

  const minusItem = () => {
    if (itemNo != 0) {
      setItemNo(itemNo - 1);
    }
  };

  let [array, setArray] = useState(cartFromLocal);
  let [cartItem, setCartItem] = useState(cartItems);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [vlat, setvLat] = useState(null);
const [vlng, setvLng] = useState(null);


  const [open, setOpen] = React.useState(false);
  let [allChat, setAllChat] = useState([]);
  const [openOrder, setOpenOrder] = React.useState(false);
  const [openShipping, setOpenShipping] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [province, setProvince] = React.useState("");
  let [cartBool,setCartBool] = React.useState(false);
  const [rate,setRate] = React.useState();
  const ratingChanged = (newRating) => {
    let obj = {
      rating: newRating,
    };

    (function () {
      axios
        .post(`http://localhost:5000/api/products/ratings/${id}`, obj, {
          headers: { Authorization: token },
        })
        .then(function (response) {
          console.log("rating success");
        })
        .catch(function (error) {
          console.log(error);
        });
    })();
    enqueueSnackbar("Rating placed!", {
      variant: "success",
      autoHideDuration: 2000,
    });
  };

  let handleAddress = (e) => {
    setAddress(e.target.value);
  };
  let handleCity = (e) => {
    setCity(e.target.value);
  };
  let handleProvince = (e) => {
    setProvince(e.target.value);
  };

  const handleClickOpen = (product) => {
    setCartBool(true);
    if (array.find((e) => e.name == product.name)) {
      console.log("Duplicate Item");
      window.location.href="/cart"
    } else {
      setArray([...array, product]);
      setCartItem([...cartItem, { productId: product._id, quantity: 1 }]);
      window.location.href="/cart"
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrder = () => {
    setOpen(false);
    setOpenShipping(true);
  };

  const handleCloseOrder = () => {
    setOpenOrder(false);
  };

  const handleCloseShipping = () => {
    setOpenShipping(false);
  };

  const handleSuccessOrder = () => {
    setOpenOrder(false);
  };

  /*   var newArray = array.filter(function (el) {
      return el._id &&
             el. &&
             el.num_of_beds >=2 &&
             el.num_of_baths >= 2.5;
    });
*/

  let handleShipping = () => {
    let arr = {
      houseNumber: address,
      city: city,
      country: province,
    };
    axios
      .patch(`http://localhost:5000/api/users/${userId._id}`, arr, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        console.log("shipping success");
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpenShipping(false);
    setOpenOrder(true);
  };

  let allChats = () => {
    axios
      .get("http://localhost:5000/api/chats", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setAllChat(response.data.data.filter((t) => userId._id == t?.user?._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let proceedPayment = () => {
    let arr = {
      items: [
        {
          productId: id,
          quantity: itemNo,
        },
      ],
    };
    axios
      .post(
        `http://localhost:5000/api/orders`,
        { items: cartItem },
        { headers: { Authorization: token } }
      )
      .then(function (response) {
        enqueueSnackbar("Order placed!", {
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
    handleCloseOrder();
  };
  let proceedCard = () => {
    let arr = {
      items: [
        {
          productId: id,
          quantity: itemNo,
        },
      ],
    };
    axios
      .post(
        `http://localhost:5000/api/orders`,
        { items: cartItem },
        { headers: { Authorization: token } }
      )
      .then(function (response) {
        window.location.href = "/zapp";
      })
      .catch(function (error) {
        console.log(error);
      });
    handleCloseOrder();
  };
  let rating;

  let getProduct = () => {
    axios
      .get(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        setProduct(response.data.data);
        setRate(Math.ceil( response.data.data.ratings.value ) );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(rate,'this is rating')
  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(array));
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
    getProduct();
    allChats();
  }, [array, cartItem]);

  React.useEffect(()=>{
    console.log('rerendered')
  },[rate])
  React.useLayoutEffect(()=>{

  },[rate])

console.log('this is new all chat',allChat.filter(
  (t) => product?.vendor?._id == t.vendor._id && userId._id == t.user._id
));
console.log('2nd all chat', allChat);
  let messageNow = () => {
    let obj = {
      user: userId._id,
      vendor: product?.vendor?._id,
    };
    console.log(userId._id);
    let arr = allChat.filter(
      (t) => product?.vendor?._id == t.vendor._id && userId._id == t.user._id
    );
    if (arr.length > 0) {
      window.location.href = `/message/${arr[0]._id}`;
    } else {
      axios
        .post("http://localhost:5000/api/chats", obj, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log(response.data);
          window.location.href = `/message/${response.data.data._id}`;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log("guys agaya", product?.vendor?._id);
  React.useEffect(()=>{
    axios.get(`http://localhost:5000/api/vendors/${product?.vendor?._id}`, {headers:{Authorization:token}})
    .then((resp)=>{
      console.log(resp,'asfasfasfasfsa');
    })
  },[product])
  console.log(allChat);
  return (
    <Grid container>
      <Grid item md={12}>
        <MiniBar />
        <NavBar />
      </Grid>
      <Grid item md={12}>
        <br />
        <Grid container spacing={3}>
          <Grid item md={1}></Grid>
          <Grid item md={10}>
            <Grid container spacing={3}>
              <br />
              <Grid item md={1}></Grid>
              <Grid item md={10}>
                <DemoCarousel image={product?.images} />
              </Grid>
              <Grid item md={1}></Grid>

              <Grid item md={1}></Grid>
              <Grid item md={12}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <AbcIcon style={{ color: "#3c568f", fontSize: "40px" }} />
                    <Typography variant="subtitle1">
                      &nbsp; &nbsp;
                      <span style={{ marginTop: -10 }}>
                        {" "}
                        Name: {product?.name}{" "}
                      </span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <CategoryIcon
                      style={{ color: "#3c568f", fontSize: "40px" }}
                    />
                    <Typography variant="subtitle1">
                      &nbsp; &nbsp; Category: {product?.category.name}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <DescriptionIcon
                      style={{ color: "#3c568f", fontSize: "40px" }}
                    />
                    <Typography variant="subtitle1">
                      &nbsp; &nbsp; Description: {product?.description}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <Money style={{ color: "#3c568f", fontSize: "40px" }} />
                    <Typography variant="subtitle1">
                      &nbsp; &nbsp; Price: {product?.price}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <Filter7Icon
                      style={{ color: "#3c568f", fontSize: "40px" }}
                    />
                    <Typography variant="subtitle1">
                      &nbsp; &nbsp; Stock: {product?.stock}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <Typography variant="subtitle2">
                      <ReactStars
                        key={Math.floor(Math.random() * 10)}
                        onChange={ratingChanged}
                        value={rate}
                        size={24}
                        activeColor="#ffd700"
                      />
                    </Typography>
                  </div>
                  <Button
                    disabled={product?.stock === 0 || product?.stock < 0}
                    onClick={() => handleClickOpen(product)}
                    variant="outlined"
                  >
                    {" "}
                    ADD TO CART{" "}
                  </Button>

                </div>
                  <hr style={{marginTop: '50px'}}/>
              </Grid>
              <Grid item md={12} container spacing={1}>
                <div style={{ marginLeft: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <PersonIcon
                      style={{ color: "#3c568f", fontSize: "40px" }}
                    />
                    <Typography variant="subtitle1">
                      &nbsp; &nbsp; Seller: {product?.vendor?.name}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <EmailIcon style={{ color: "#3c568f", fontSize: "40px" }} />
                    <Typography variant="subtitle1">
                      &nbsp; &nbsp; Email: {product?.vendor?.email}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                    }}
                  >
                    <LocalShippingIcon
                      style={{ color: "#3c568f", fontSize: "40px" }}
                    />
                    <Typography variant="subtitle1">
                      &nbsp; &nbsp; Delivery: {product?.vendor?.cardExpire}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 15,
                      marginBottom: '15px'
                    }}
                  >
                    <Message
                      onClick={messageNow}
                      style={{ color: "#3c568f", fontSize: "40px" }}
                    />
                    <Typography variant="subtitle1">&nbsp; &nbsp; Message</Typography>
                  </div>
             
                </div>
          
                <SimpleMap lat={product?.vendor?.location?.lat} lng={product?.vendor?.location?.lng}/>
                {console.log('product?.vendor?.location?.lng',product?.vendor?.location?.lng)}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item md={10}>
            <div style={{ marginLeft: "20px" }}>
              <br />
              <br />
              <Grid item md={2}></Grid>

              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Shopping Cart"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="center">Size</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {array.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                              <TableCell align="right">{row.stock}</TableCell>
                              <TableCell align="center">
                                <Button onClick={() => plusItem(row?.stock)}>
                                  +
                                </Button>{" "}
                                &nbsp; {itemNo} &nbsp;{" "}
                                <Button onClick={() => minusItem(row?.stock)}>
                                  {" "}
                                  -{" "}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={handleOrder}>Proceed</Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openShipping}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseShipping}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle
                  style={{ backgroundColor: "blueviolet", color: "white" }}
                >
                  {"Shipping Address"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <hr />
                    <br />
                    <TextField
                      fullWidth
                      label="Address"
                      value={address}
                      onChange={handleAddress}
                    />

                    <TextField
                      style={{ marginTop: 20 }}
                      fullWidth
                      label="City"
                      value={city}
                      onChange={handleCity}
                    />

                    <TextField
                      style={{ marginTop: 20 }}
                      fullWidth
                      label="Province"
                      value={province}
                      onChange={handleProvince}
                    />

                    <Divider />
                    <br />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" onClick={handleCloseShipping}>
                    Cancel
                  </Button>
                  <Button variant="outlined" onClick={handleShipping}>
                    Proceed
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={openOrder}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseOrder}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Payment Method"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <Button onClick={proceedPayment}>CASH</Button>
                    <br />
                    <Button onClick={proceedCard}>CARD</Button>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseOrder}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
          <Grid item md={1}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductPage;