import axios from "axios";
import { useDispatch } from "react-redux";
import { getUsers } from "../redux/reducer/bankReducer";
import { useEffect, useState } from "react";
export const useUsers = () => {
  const URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${URL}/users`);
      const data = response.data;
      dispatch(getUsers(data));
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return users;
};
