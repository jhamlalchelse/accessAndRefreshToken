import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorize = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Unauthorize</div>
      <p>You dont have a access to the requist page</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
};

export default Unauthorize;
