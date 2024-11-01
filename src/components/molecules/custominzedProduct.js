import { Typography } from "@mui/material";
import React from "react";
import SimpleCard from "../atoms/simpleCard";
import PerfectScrollbar from 'react-perfect-scrollbar'
import axios from 'axios';

const CustomizedProduct = () => {

  let token = localStorage.getItem('token');
  const [products,setProducts] = React.useState([]);
  const [topRated,setTopRated] = React.useState([]);

 
  let getProducts = () =>{
    axios.get('http://localhost:5000/api/products', {headers:{'Authorization':token}})
    .then(function (response) {
        let arr = response.data.data.filter(t => t.category.name == `Consumer Electronics`);
        let brr = response.data.data.filter(t => t.category.name == `Machiner`);
        let crr = response.data.data.filter(t => t.category.name == `Clothing`);
        let drr = response.data.data.filter(t => t.category.name == `Home Appliances`);
      let err = response.data.data.filter(t=> t.category.name == `Machinery`);
      let frr = response.data.data.filter(t=> t.category.name == `De`);
      let final = [];
      final.push(arr[0]);
      final.push(brr[0]);
      final.push(crr[0]);
      final.push(drr[0]);
      final.push(err[0]);
      final.push(frr[0]);
      console.log(final)
      setProducts(final);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

 
  React.useEffect(()=>{
    getProducts();
 

  },[])

  let redirectToCategory = (name) => {
    window.location.href = `/category/${name}`
    console.log('clicked');
  }

 

  console.log('ogodgog',products[0]?.productCollection?.name)
 
  return (
    <div>
      
        <Typography variant="h6">
        Customized products
        </Typography>
        <Typography variant="subtitle2">
        Partner with one of 60,000 experienced manufacturers with design & production capabilities and on-time delivery.
        </Typography>
   
    <div style={{display:'flex', marginTop: "20px", marginBottom: "20px"}}>
      {products?.map(function (item, i) {
        if(item?.images[0] === undefined)
        {
          <div> </div>
        }
        else
        {
          return (
            <div  onClick={()=>redirectToCategory(item?.category?.name)}  style={{ marginLeft: i==1 ? '0px':'40px', marginTop: "10px"}}>
              <SimpleCard type={item?.category?.name || ''} image={`https://fyp3.blob.core.windows.net/fyp/${item?.images[0]}`} />
            </div>
          );
        }
       {console.log(i)}
      })}
    </div>

    </div>
  );
};

export default CustomizedProduct;
