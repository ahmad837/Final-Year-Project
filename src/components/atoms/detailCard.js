import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ReactStars from "react-rating-stars-component";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSnackbar } from "notistack";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { typography } from "@mui/system";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

let moveToProduct = (id) => {
  console.log("clicked");
  window.location.href = `/products/${id}`;
};

export default function RecipeReviewCard(props) {
  const { enqueueSnackbar } = useSnackbar();
  let token = localStorage.getItem("token");
  let userId = token ? jwtDecode(token) : "";
  const [expanded, setExpanded] = React.useState(false);
  let [rate, setRate] = React.useState();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let wishList = () => {
    if (props?.specs?.includes(userId._id)) {
      let array = props?.specs;
      const index = array.indexOf(userId._id);
      if (index > -1) {
        array.splice(index, 1);
      }
      let obj = {
        specs: array,
      };
      console.log("loggg,ar", array);
      axios.patch(`http://localhost:5000/api/products/${props.id}`, obj, {
        headers: { Authorization: token },
      });
      enqueueSnackbar("Removed from Wishlist !", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      let obj = {
        specs: [userId._id],
      };

      axios.patch(`http://localhost:5000/api/products/${props.id}`, obj, {
        headers: { Authorization: token },
      });
      enqueueSnackbar("Added to Wishlist !", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
  };

  console.log(props, "this is props");

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 10 }}>
      <CardHeader
        avatar={
          <Avatar
            src={props.img}
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          ></Avatar>
        }
        title={
          <Typography variant="body2">
            <b>{props.type}</b>
          </Typography>
        }
      />
      <CardMedia
        onClick={() => moveToProduct(props.id)}
        component="img"
        height="194"
        image={props.image}
        alt="Paella dish"
      />
      <CardContent>
        <div style={{ wordBreak: "break-all", height: 40 }}>
          <Typography
            style={{
              overflow: "hidden",
              textOverflow: props?.desc?.length > 60 ? "ellipsis" : "clip",
              whiteSpace: "nowrap",
            }}
            variant="body2"
            color="text.secondary"
          >
            {props.desc}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <div style={{ width: "100%", marginTop: "-30px" }}>
          <ReactStars
            edit={false}
            key={Math.floor(Math.random() * 10)}
            value={Math.ceil(props.rate)}
            size={24}
            activeColor="#ffd700"
          />
        </div>
      </CardActions>
      <CardActions>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <Typography size='small' aria-label="share">Rs.{props.price}/-</Typography>
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <IconButton onClick={wishList} aria-label="add to favorites">
            <FavoriteIcon
              style={{
                color:
                  props?.specs?.includes(userId._id) == true ? "red" : "gray",
              }}
              
            />
            {console.log(
              props?.specs?.includes(userId._id),
              "asffasfasfasfasv venvenvend",
              props?.specs,
              userId._id,
              props.vendorId
            )}
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
    </Card>
  );
}
