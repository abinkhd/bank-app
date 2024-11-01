import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  userFundTransfer: [],
};
const URL = process.env.REACT_APP_API_URL;

// export const fetchUsers = createAsyncThunk(
//   "fetchUsers",
//   async (a, { rejectWithValue }) => {

//     }
//   }
// );

const bankSlice = createSlice({
  name: "bankReducer",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    getUser: (state, action) => {
      return {
        ...state,
        currentUser: state.users.find(
          (u) =>
            u.username === action.payload.username &&
            u.password === action.payload.password
        ),
      };
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      return { ...state, currentUser: null };
    },
    updateUser: (state, action) => {
      const updateUser = async () => {
        try {
          axios.put(`${URL}/users/${action.payload.id}`, action.payload);
        } catch (error) {
          console.log(error);
        }
      };
      updateUser();
      return {
        ...state,
        currentUser: action.payload,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
    },
    transferFund: (state, action) => {
      const fromCurrBalance =
        state.currentUser?.balance - action.payload.amount;
      const fromData = { balance: fromCurrBalance };
      const toAcc = state.users?.find(
        (user) => user?.account === action.payload.toAcc
      );
      const toUserBalance = toAcc.balance + action.payload.amount;
      const toData = { balance: toUserBalance };

      axios.post(`${URL}/transactions`, {
        ...action.payload,
      });
      axios.patch(`${URL}/users/${action.payload.userId}`, fromData);
      axios.patch(`${URL}/users/${action.payload.toAcc}`, toData);
      return {
        ...state,
        userFundTransfer: [...state.userFundTransfer, action.payload],
        currentUser: {
          ...state.currentUser,
          balance: fromCurrBalance,
        },
      };
    },
    withdrawFund: (state, action) => {
      const fromCurrBalance = state.currentUser?.balance - action.payload;
      console.log(state.currentUser?.balance);
      const fromData = {
        balance: fromCurrBalance,
      };
      axios.patch(`${URL}/users/${state.currentUser.id}`, fromData);
      axios.post(`${URL}/transactions`, {
        userId: state.currentUser.id,
        fromAcc: state.currentUser.id,
        toAcc: "Withdraw",
        transaction_type: "Debit",
        amount: action.payload,
      });
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          balance: fromCurrBalance,
        },
      };
    },
    depositFund: (state, action) => {
      const fromCurrBalance =
        Number(state.currentUser?.balance) + Number(action.payload);

      console.log(action.payload);

      const fromData = {
        balance: fromCurrBalance,
      };
      axios.patch(`${URL}/users/${state.currentUser.id}`, fromData);
      axios.post(`${URL}/transactions`, {
        userId: state.currentUser.id,
        fromAcc: state.currentUser.id,
        toAcc: "Deposit",
        transaction_type: "Credit",
        amount: action.payload,
      });
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          balance: fromCurrBalance,
        },
      };
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchUsers.pending, (state) => {
  //       return { ...state, loading: false };
  //     });
  //     builder.addCase(fetchUsers.fulfilled, (state, action) => {
  //       return { ...state, users: action.payload.users, loading: false };
  //     });
  //   },
});
export const {
  getUsers,
  getUser,
  logout,
  updateUser,
  transferFund,
  withdrawFund,
  depositFund,
} = bankSlice.actions;
export default bankSlice.reducer;
