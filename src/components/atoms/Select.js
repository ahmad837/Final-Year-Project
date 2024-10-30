// import React, {useState, useEffect} from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import NativeSelect from "@mui/material/NativeSelect";
// import axios from "axios";


// export default function Select() {
//   // let token = localStorage.getItem("token");

//   // let [prod, setProd] = React.useState([]);

//   // let getProducts = () => {
//   //   axios
//   //     .get("http://localhost:5000/api/products", {
//   //       headers: {
//   //         Authorization: token,
//   //       },
//   //     })
//   //     .then(function (response) {
//   //       setProd(response.data.data);
//   //     })
//   //     .catch(function (error) {
//   //       console.log(error);
//   //     });
//   // };

//   // useEffect(() => {
//   //   getProducts();
//   // }, []);

//   // console.log(prod, "this is product from catagories page");
//   // const prodPrice = prod.map((prod) => {
//   //   console.log(prod.price);
//   //   // setProductPrice(prod.price)
//   //   return prod.price
//   // });
//   // console.log(prodPrice, "prodPrice");
//   // if('Price- Low to High') {
//   //   const lth = prodPrice.sort((a, b) => a - b);
//   //   console.log(lth, "lth");

//   // }
//   // if('Price- High to Low') {
//   //   const htl = prodPrice.sort((a, b) => a - b).reverse();
//   //   console.log(htl, "htl");

//   // }

//   // return (
//   //   <Box sx={{ minWidth: 120 }}>
//   //     <FormControl fullWidth>
//   //       <InputLabel variant="standard" htmlFor="uncontrolled-native">
//   //         Featured
//   //       </InputLabel>
//   //       <NativeSelect
//   //         defaultValue={30}
//   //         inputProps={{
//   //           name: "Featured",
//   //           id: "uncontrolled-native",
//   //         }}
//   //       >
//   //         <option value={10}>Price- Low to High</option>
//   //         <option value={20}>Price- High to Low</option>
//   //         <option value={30}>Discount- Low to High </option>
//   //         <option value={40}>Discount- High to Low </option>
//   //       </NativeSelect>
//   //     </FormControl>
//   //   </Box>
//   // );
// }
