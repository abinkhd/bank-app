import { Card } from "@mui/material";
import React from "react";

const Form = () => {
  return (
    <Card className="login-div">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input placeholder="Name" />
        <input placeholder="Name" />
        <input />
        <button>Submit</button>
      </form>
    </Card>
  );
};

export default Form;
