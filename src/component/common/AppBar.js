import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/reducer/bankReducer";
import PersonIcon from "@mui/icons-material/Person";
import { MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const AppBar = React.memo(() => {
  const [user, setUser] = React.useState(undefined);
  const currBalance = useSelector((state) => state.currentUser?.balance);
  const [balance, setBalance] = useState("xxxxx");
  const [isBalanceVisible, setBalanceVisible] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowBalance = () => {
    if (isBalanceVisible === false) {
      setBalance(currBalance);
      setBalanceVisible(true);
    } else {
      setBalanceVisible(false);
      setBalance("xxxxx");
    }
  };

  React.useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("token")));
  }, []);
  return (
    <nav className="navbar">
      <label
        onClick={() => {
          !user && !currentUser ? navigate("/") : navigate("/userHome");
        }}
      >
        <h3 className="logo">SMART SAVING BANK</h3>
      </label>
      {!user && !currentUser ? (
        <label
          className="authButton"
          onClick={() => {
            navigate("/login");
          }}
        >
          {location.pathname !== "/login" ? "LOGIN " : ""}
        </label>
      ) : (
        <div className="nav-user">
          {/* <InputLabel id="demo-simple-select-label">Menu</InputLabel> */}
          <Typography>
            Account Balance:{balance}
            <label onClick={handleShowBalance}>
              <RemoveRedEyeIcon style={{ marginBottom: "-9px" }} />
            </label>
          </Typography>
          <div>
            <PersonIcon sx={{ marginBottom: "-4px" }} />
            <label>{user?.name}</label>
          </div>
          <Select label="Menu" sx={{ height: "30px" }}>
            <MenuItem onClick={() => navigate("/fundTransfer")}>
              Fund Transfer
            </MenuItem>
            <MenuItem onClick={() => navigate("/transaction")}>
              Transaction
            </MenuItem>
            <MenuItem onClick={() => navigate("/withdraw")}>
              Withdraw/Deposit Fund
            </MenuItem>
            <MenuItem
              className="authButton"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
          </Select>
        </div>
      )}
    </nav>
  );
});
export default AppBar;
