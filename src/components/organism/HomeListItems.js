import React,{useState,useEffect} from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import SimpleCard from "../atoms/simpleCard";
import DetailCard from "../atoms/detailCard";
import axios from "axios";

const HomeListItems = () => {

  let [prod,setProd] = React.useState([]);
  let token = localStorage.getItem('token');

  let getProducts = () => {
      axios
        .get("http://localhost:5000/api/products", {
          headers: {
            Authorization:
              token,
          },
        })
        .then(function (response) {
          setProd(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };


  
  useEffect(()=>{
    getProducts();
  },[])

  console.log(prod,'this is product')

  return (
    <Grid container>

    <Grid item md={12} xs={12} sm={12}>
      <Grid container>
      {prod.map(function (item, i) {
        return (
          <Grid item lg={4} md={6} sm={6} xs={12} style={{ marginTop: "20px" }}>
            <DetailCard
              type={item.name}
              image={`https://fyp3.blob.core.windows.net/fyp/${item.images[0]}`}
              price={item.price}
              desc={item.description}
              specs={item.specs}
              id={item._id}
              vendorId={item.vendor._id}
              img={`https://fyp3.blob.core.windows.net/fyp/${item.vendor.appartment}`}
              rate={item.ratings.value}
              wish={item.specs}
             

            />
          </Grid>
        );
      })}
      </Grid>

      </Grid>
      
    </Grid>
  );
};

export default HomeListItems;
