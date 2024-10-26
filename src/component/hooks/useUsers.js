import axios from "axios";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/reducer/bankReducer";
import { useEffect, useState, useCallback } from "react";
export const useUsers = () => {
  const URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${URL}/users`);
      const data = response.data;
      dispatch(getUsers(data));
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }, [URL, dispatch]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return users;
};
