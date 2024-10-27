import AppBar from "./common/AppBar";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const URL = process.env.REACT_APP_API_URL;
  const fetchTransaction = React.useCallback(async () => {
    const response = await axios.get(`${URL}/transactions`);
    setTransactions(
      response.data.filter(
        (data) => data.userId === currentUser.id || data.toAcc == currentUser.id
      )
    );
  }, [URL, currentUser.id]);

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setCurrentUser(token);
    fetchTransaction();
  }, [transactions, fetchTransaction]);
  return (
    <>
      <AppBar />
      <div className="container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell align="right">From Account</TableCell>
                <TableCell align="right">To Account</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.fromAcc}</TableCell>
                  <TableCell align="right">{row.toAcc}</TableCell>
                  <TableCell align="right">
                    {row.amount}
                    {currentUser.account == row.toAcc ? (
                      <span style={{ color: "green" }}> Cr</span>
                    ) : (
                      <span style={{ color: "red" }}> Dr</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Transactions;
