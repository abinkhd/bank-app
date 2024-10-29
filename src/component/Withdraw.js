import React, { memo, useState } from "react";
import AppBar from "./common/AppBar";
import Footer from "./common/Footer";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { withdrawFund, depositFund } from "./redux/reducer/bankReducer";
const Withdraw = memo(() => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const currBalance = useSelector((state) => state.currentUser?.balance);
  const dispatch = useDispatch();
  const handleWithdraw = (e) => {
    e.preventDefault();
    currBalance < withdrawAmount
      ? alert("Insufficient Balance")
      : dispatch(withdrawFund(withdrawAmount));
  };
  const handleDeposit = (e) => {
    e.preventDefault();
    dispatch(depositFund(depositAmount));
  };
  return (
    <>
      <AppBar />
      <div className="container">
        <form onSubmit={handleWithdraw} className=" withdraw-div form-div form">
          <Typography variant="h6">Withdraw Amount</Typography>
          <div className="withdraw-div">
            <input
              name="withdraw"
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Withdraw Amount"
              required
            />
            <button type="submit">Withdraw</button>
          </div>
        </form>
        <form onSubmit={handleDeposit} className=" withdraw-div form-div form">
          <Typography variant="h6">Deposit Amount</Typography>
          <div className="withdraw-div ">
            <input
              name="deposit"
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Deposit Amount"
              required
            />
            <button type="submit">Deposit</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
});

export default Withdraw;
