import React from "react";
import usersContext from "./usersContext";
import { useUsers } from "../hooks/useUsers";
const UsersProvider = ({ children }) => {
  const users = useUsers();
  return (
    <usersContext.Provider value={users}>{children}</usersContext.Provider>
  );
};

export default UsersProvider;
