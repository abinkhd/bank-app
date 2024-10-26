import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppBar from "./common/AppBar";
import { transferFund } from "./redux/reducer/bankReducer";
import { useNavigate } from "react-router-dom";
import usersContext from "./context/usersContext";

const FundTransfer = () => {
  const [currentUser, setCurrentUser] = useState({});
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
    setTransfer({
      ...transfer,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentUser.balance);
    dispatch(transferFund(transfer));
    navigate("/transaction");
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
        <div className="login-div">
          <form className="login-form" onSubmit={handleSubmit}>
            <Typography variant="h6">Transfer Fund</Typography>
            <input
              placeholder="From Account"
              value={transfer.fromAcc}
              disabled
              name="fromAcc"
            />
            <select required name="toAcc" onChange={handleChange}>
              <option value="" disabled selected>
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
    </>
  );
};

export default FundTransfer;
