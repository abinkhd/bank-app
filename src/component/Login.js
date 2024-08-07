import React, { useContext, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { Typography } from "@mui/material";
import AppBar from "./common/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/reducer/bankReducer";
import Footer from "./common/Footer";
import { useNavigate } from "react-router-dom";
import usersContext from "./context/usersContext";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  // const [currentUser, setCurrentUser] = useState(undefined);
  // const { users } = useSelector((state) => state);
  const users = useContext(usersContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const value = e.target.value;
    setInput({ ...input, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(getUser(input));
    const user = users?.find(
      (u) => u.username === input.username && u.password == input.password
    );

    if (user) {
      console.log(user);
      localStorage.setItem("token", JSON.stringify(user));
      setError("");
      navigate("/userHome");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <AppBar />
      <div className="container">
        <div className="login-div">
          <form className="login-form" onSubmit={handleSubmit}>
            <LockIcon fontSize="large" sx={{ color: "#384454" }} />
            <Typography variant="h6" fontFamily={"initial"}>
              LOGIN
            </Typography>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <button type="submit">LOGIN</button>
            {error && <em>{error}</em>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
