import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/reducer/bankReducer";
import PersonIcon from "@mui/icons-material/Person";
import { MenuItem, Select } from "@mui/material";
export default function AppBar() {
  const [user, setUser] = React.useState(undefined);
  const { currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    setUser(localStorage.getItem("token"));
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

          <PersonIcon sx={{ marginBottom: "-4px" }} />
          <label>{currentUser?.name}</label>
          <Select label="Menu" sx={{ height: "30px" }}>
            <MenuItem onClick={() => navigate("/fundTransfer")}>
              Fund Transfer
            </MenuItem>
            <MenuItem onClick={() => navigate("/transaction")}>
              Transaction
            </MenuItem>
            <MenuItem
              className="authButton"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              LOGOUT
            </MenuItem>
          </Select>
        </div>
      )}
    </nav>
  );
}
