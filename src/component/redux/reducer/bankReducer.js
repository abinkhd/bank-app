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
      axios.post(`${URL}/transactions`, action.payload);
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
export const { getUsers, getUser, logout, updateUser, transferFund } =
  bankSlice.actions;
export default bankSlice.reducer;
