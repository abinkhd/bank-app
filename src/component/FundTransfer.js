import { Typography } from "@mui/material";
import React, { memo, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "./common/AppBar";
import { transferFund } from "./redux/reducer/bankReducer";
import { useNavigate } from "react-router-dom";
import usersContext from "./context/usersContext";
import Footer from "./common/Footer";

const FundTransfer = memo(() => {
  const [currentUser, setCurrentUser] = useState({});
  const currBalance = useSelector((state) => state.currentUser?.balance);
  const users = useContext(usersContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toBankAccounts, setToBankAccounts] = useState([]);
  const [transfer, setTransfer] = useState({
    userId: "",
    fromAcc: "",
    toAcc: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransfer({
      ...transfer,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transfer.amount > currBalance) {
      alert("Insufficient Balance");
    } else {
      console.log(transfer);
      dispatch(transferFund(transfer));
      navigate("/transaction");
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setCurrentUser(token);
    setTransfer((prev) => ({
      ...prev,
      userId: token.id,
      fromAcc: token.account,
    }));
    const allAccount = users?.map((user) => user?.account);
    const filteredAccount = allAccount.filter(
      (account) => account !== currentUser.account
    );
    setToBankAccounts(filteredAccount);
  }, [currentUser.account, users]);
  return (
    <>
      <AppBar />
      <div className="container">
        <div className="form-div">
          <form className="form" onSubmit={handleSubmit}>
            <Typography variant="h6">Transfer Fund</Typography>
            <input
              placeholder="From Account"
              value={transfer.fromAcc}
              disabled
              name="fromAcc"
            />
            <select
              required
              name="toAcc"
              onChange={handleChange}
              value={transfer.toAcc}
            >
              <option value="" disabled>
                To Account
              </option>
              {toBankAccounts?.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>
            <input
              placeholder="Amount"
              name="amount"
              required
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
});

export default FundTransfer;
