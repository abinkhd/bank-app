import React, { useEffect, useState } from "react";
import AppBar from "./common/AppBar";
import Footer from "./common/Footer";
import { Card, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "reactjs-popup";
import { updateUser } from "./redux/reducer/bankReducer";

const UserHome = () => {
  const dispatch = useDispatch();
  const [personal, setPersonal] = useState({});
  const user = useSelector((state) => state.currentUser);

  const handlePersonalChange = (e) => {
    if (e.target.name in personal.address) {
      setPersonal((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [e.target.name]: e.target.value,
        },
      }));
    } else {
      setPersonal((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser(personal));
  };

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    setPersonal(token);
  }, []);
  return (
    <div>
      <AppBar />
      <div className="container">
        <Card className="account-details">
          <Typography variant="h6">Personal Details</Typography>
          <Popup
            trigger={<EditIcon className="edit-icon" />}
            position="right top"
            closeOnEscape
            arrow
          >
            <Card className="popup-form-div">
              <form className="form" onSubmit={handlePersonalSubmit}>
                <Typography variant="h6">Update Personal Details</Typography>
                <input
                  name="name"
                  value={personal?.name}
                  placeholder="Name"
                  onChange={handlePersonalChange}
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  value={personal?.phone}
                  onChange={handlePersonalChange}
                />
                <input
                  name="houseNo"
                  placeholder="House No."
                  value={personal?.address?.houseNo}
                  onChange={handlePersonalChange}
                />
                <textarea
                  name="streetAddress"
                  value={personal?.address?.streetAddress}
                  placeholder="Street Addresss"
                  style={{ height: "60px" }}
                  onChange={handlePersonalChange}
                />
                <button type="submit">Update</button>
              </form>
            </Card>
          </Popup>

          <Typography>Name:{user?.name}</Typography>
          <Typography>Phone:{user?.phone}</Typography>

          <Typography variant="h6">
            Address Details{" "}
            <Typography>House No:{user?.address?.houseNo}</Typography>
            <Typography>
              Street Address:{user?.address?.streetAddress}
            </Typography>
          </Typography>
        </Card>
        <Card className="account-details">
          <Typography variant="h6">Account Details</Typography>
          <Typography>Account Number:{user?.account}</Typography>
          <Typography>IFSC:{user?.IFSC}</Typography>
          <Typography>Branch:{user?.Branch}</Typography>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default UserHome;
