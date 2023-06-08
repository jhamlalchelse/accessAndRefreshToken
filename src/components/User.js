import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const isMounte = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get("users", {
          signal: controller.signal,
        });
        console.log(res.data);
        isMounte && setUsers(res.data);
      } catch (err) {
        console.log("Error: ", err);
        navigate("/login", {state:{from: location}, replace: true})
      }
    };
    getUsers();

    return () => {
      isMounte = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      {users?.length ? (
        users.map((user, i) => {
          return <li key={i}>{user.username}</li>;
        })
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default User;
