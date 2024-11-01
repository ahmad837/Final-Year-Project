import {
  Avatar,
  Divider,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import jwtDecode from "jwt-decode";
import io from "socket.io-client";

const SOCKET_URL = "http://10.135.16.167:5000";

let Message = () => {
  const socket = io(SOCKET_URL);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });

  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf("/") + 1);
  let token = localStorage.getItem("token");
  let user = jwtDecode(token);
  let userId = user._id;
  let [chatId, setChatId] = useState(id);
  console.log(userId);
  let [message, setMessage] = useState("");
  let [chat, setChat] = useState([]);
  let [allChat, setAllChat] = useState([]);

  console.log(userId);
  let handleMessage = (e) => {
    setMessage(e.target.value);
  };

  /* const onMessageSubmit = (e) => {
    const {name,message} = message;
  }*/

  let allChats = () => {
    axios
      .get("http://localhost:5000/api/chats", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setAllChat(response.data.data.filter((t) => userId === t?.user?._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(allChat, "all");
  let getChat = (tid) => {
    if (tid != id) {
      window.location.href = `/message/${tid}`;
    }
    setChatId(tid);
    axios
      .get("http://localhost:5000/api/chats", {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(
          "chat recieved",
          response.data.data.filter((t) => t?.vendor?._id == userId)
        );
        let array = response.data.data.filter((t) => t?._id == id);
        setChat(array[0]?.messages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(chat);

  let getMessages = () => {
    axios
      .get("http://localhost:5000/api/messages/61d5fd6c8d90875ed0aa458e", {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log("mwoga ", response);
      });
  };

  let sendMessage = () => {
    let obj = {
      user: userId,
      chatId: chatId == "" ? id : chatId,
      text: message,
    };
    axios
      .post("http://localhost:5000/api/messages", obj, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log("message sent");
        socket.emit("sendMessage", response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    allChats();
    getChat(id);
  }, []);

  useEffect(async function () {
    socket.on("newMessage", function (data) {
      setMessage("");
      getChat(id);
      console.log("hohohohohohhoho");
    });
  }, []);

  console.log(allChat);
  let arr = [1, 2, 3, 4, 5, 6];


  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <NavBar />
      </Grid>
      <Grid item md={12}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Your Messages
        </Typography>
      </Grid>
      <Grid item md={2}>
        <div style={{ textAlign: "center" }}>Message List</div>
        <div style={{ marginLeft: 20 }}>
          {allChat.map((item) => {
            return (
              <div
                onClick={() => getChat(item._id)}
                style={{
                  marginTop: 20,
                  display: "flex",
                  borderBottom: "1px solid black",
                }}
              >
                <Avatar />
                <div
                  style={{ marginLeft: 20, marginTop: 10, marginBottom: 20, cursor: 'pointer' }}
                >
                  {item?.vendor?.name} & {item?.user?.name}
                </div>
                <Divider />
              </div>
            );
          })}
        </div>
      </Grid>
      <Grid item md={9}>
        <div
          id="123"
          style={{
            marginLeft: 20,
            border: "1px solid black",
            height: 500,
            overflow: "scroll",
          }}
        >
          <div
            style={{
              textAlign: "center",
              borderBotton: "1px solid grey",
              marginTop: 16,
              marginBottom: 15,
            }}
          >
            You are now connected with Seller.
          </div>
          <div style={{ marginTop: 50, marginLeft: 10, marginRight: 10 }}>
            {chat?.map((info, index) => (
              <div key={index}>
                <Typography
                  variant="h6"
                  style={{
                    marginTop: 10,
                    textAlign: `${info?.user?.name ? "start" : "right"}`,
                  }}
                >
                  {info?.user?._id == userId ? "You:" : ""}{" "}
                  <span
                    style={{
                      backgroundColor: `${
                        info?.user?.name ? "#91c775" : "#44adbd"
                      }`,
                      borderRadius: "33px",
                      padding: 5,
                    }}
                  >
                    {" "}
                    {info?.text}{" "}
                  </span>{" "}
                  {info?.vendor?._id == userId ? ":Seller" : ""}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginLeft: 20, display: "flex", marginTop: 10 }}>
          <TextField
            fullWidth
            label="Enter a message."
            value={message}
            onChange={handleMessage}
          />
          <Button
            disabled={message.length === 0 ? true : false}
            onClick={sendMessage}
            style={{ marginLeft: 20 }}
            variant="outlined"
          >
            Send
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Message;
