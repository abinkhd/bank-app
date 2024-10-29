import React, { useState } from "react";
import AppBar from "./common/AppBar";
import Footer from "./common/Footer";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { withdrawFund, depositFund } from "./redux/reducer/bankReducer";
const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const dispatch = useDispatch();
  const handleWithdraw = () => {
    dispatch(withdrawFund(withdrawAmount));
  };
  const handleDeposit = () => {
    dispatch(depositFund(depositAmount));
  };
  return (
    <>
      <AppBar />
      <div className="container">
        <div className="form-div form">
          <Typography variant="h6">Withdraw / Deposit Amount</Typography>
          <div className="withdraw-div">
            <input
              name="withdraw"
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Withdraw Amount"
            />
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>
          <div className="withdraw-div">
            <input
              name="deposit"
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Deposit Amount"
            />
            <button onClick={handleDeposit}>Deposit</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Withdraw;
