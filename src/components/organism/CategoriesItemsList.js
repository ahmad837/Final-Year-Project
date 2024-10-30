import { Grid, Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import Select from "../atoms/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import DetailCard from "../atoms/detailCard";
import axios from "axios";
import { IndexKind } from "typescript";

const CategoriesItems = () => {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [productPrice, setProductsPrice] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  console.log("productPrice", productPrice);

  let token = localStorage.getItem("token");
  var url = window.location.pathname;
  var category = url.substring(url.lastIndexOf("/") + 1);
  var link = category.replace("%20", " ");
  console.log("link link", link);

  console.log(category);

  // productPrice?.map((cat) => {
  //   const array = cat?.price
  //   for (const a = 0; a < array?.length; a++) {
  //     if (array[a] >= num1 && array[a] <= num2) {
  //       total++;
  //     }
  //   }
  // })
 var loink;
  let getCategoryItems = () => {
    axios
      .get(`http://localhost:5000/api/products`, {
        headers: { Authorization: token },
      })
      .then(function (response) {
        console.log(response);
        setProductsPrice(response.data.data);
        setCatagory(response.data.data);
        
        if (link == "exclusive_products") {
          setProducts(
            response.data.data.filter(
              (t) => t.category.name === "Exclusive Products"
            )
          );
        } else if (link == "discount") {
          
          setProducts(
            response.data.data.filter((t) => t.category.name === "Discounts")
          );
        } else {
          console.log('new link',link);
          setProducts(
            response.data.data.filter((t) => t.category.name == link)
           
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let handleFilter = () => {
    // axios
    //   .get(
    //     "http://localhost:5000/api/products/search/advance?minPrice&maxPrice",
    //     { params: { minPrice, maxPrice } },
    //     { headers: { Authorization: token } }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //     setProducts(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  useEffect(() => {
    getCategoryItems();
  }, []);

  useEffect(() => {}, [products]);

  const handleChange = (value, selectOptionSetter) => {
    selectOptionSetter(value);
    if (value === "lower") {
      productPrice?.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else {
      productPrice?.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    }
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Typography variant="h4">{link}</Typography>
      </Grid>
      <Grid item md={12}>
        <br />
      </Grid>
      <Grid item md={12}>
        <Typography variant="subtitle1">
          Shop Today’s Deals, and best in town products.
        </Typography>
        <br />
        <Typography variant="h6">
          {products?.length > 0 ? <div> </div> : <div> No Product found! </div>}
        </Typography>
      </Grid>

      <Grid
        item
        md={7}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex" }}>
          <label style={{ marginRight: "20px", fontSize: '20px' }}>Sort by:</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <select
                value={selectedOption}
                onChange={(e) =>
                  handleChange(e.target.value, setSelectedOption)
                }
                label="Feature"
                style={{ padding: "10px", width: "200px" }}
              >
                <option value="lower">Price-Lowest price</option>
                <option value="higher">Price-Highest price</option>
              </select>
            </FormControl>
          </Box>

          {/* <TextField
            style={{ marginLeft: 100 }}
            label="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <TextField
            style={{ marginLeft: 20 }}
            label="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          /> */}

          {/* <Box sx={{ minWidth: 120, margin: "0 20px 0 20px" }}>
            <FormControl fullWidth>
              <select
                value={selectedOption}
                onChange={(e) =>
                  handleCatagorySelection(e.target.value, setSelectedOption)
                }
                label="Feature"
                style={{ padding: "18px", width: "200px" }}
              >
                <option value="Consumer Electronics">
                  Consumer Electronics
                </option>
                <option value="Machinery">Machinery</option>
                <option value="Clothing">Clothing</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Vehicle and Accessories">Vehicle and Accessories</option>
                <option value="Sports and Entertainment">
                  Sports and Entertainment
                </option>
                <option value="Exclusive Products">Exclusive Products</option>
                <option value="Deals">Deals</option>
              </select>
            </FormControl>
          </Box> */}
        </div>
        {/* <Button
          onClick={handleFilter}
          style={{
            backgroundColor: "blue",
            color: "white",
            marginLeft: "20px",
          }}
        >
          Apply
        </Button> */}
      </Grid>
      <Grid item md={5}></Grid>
      <Grid item md={12}>
        <br />
        <br />
      </Grid>
      <Grid item md={12}>
        <Grid container>
          {productPrice?.map(function (item, i) {
            return (
              <Grid
                item
                lg={4}
                md={6}
                sm={6}
                xs={12}
                style={{ marginTop: "20px" }}
              >
                <DetailCard
                  type={item.name}
                  image={`https://fyp3.blob.core.windows.net/fyp/${item.images[0]}`}
                  price={item.price}
                  desc={item.description}
                  id={item._id}
                  img={`https://fyp3.blob.core.windows.net/fyp/${item.vendor.appartment}`}
                  rate={item.ratings.value}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CategoriesItems;
