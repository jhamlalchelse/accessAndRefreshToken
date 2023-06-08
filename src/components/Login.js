import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./Register.css";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("dsadf");

  const [pwd, setPwd] = useState("sdfa435");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(from, { replace: true });
    return

    try {
      const body = { user, pwd };
      const res = await axios.post("/register", body);

      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      //   console.log(res.data)
      //   console.log(res.accessToken)
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server Response");
      } else if (error.response.status === 400) {
        setErrMsg("missing username and password");
      } else if (error.response.status === 401) {
        setErrMsg("unauthorized");
      } else {
        setErrMsg("Login Failed!");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="registercontainer">
      <section>
        <p ref={errRef} className={errMsg ? "errmessage" : "offscreen"}>
          {errMsg}
        </p>
        <h3 className=" text-center m-0 p-0">Sign In</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            ref={userRef}
            value={user}
            onChange={({ target }) => setUser(target.value)}
            required
            autoComplete="off"
            className=" form-control mb-2"
          />
          {/* password */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={({ target }) => setPwd(target.value)}
            required
            className=" form-control mb-2"
          />

          <button className=" form-control mt-4 mb-1" type="submit">
            Sign In
          </button>
        </form>
        <p>
          Need an Account?
          <Link to={"/register"} className=" ms-1">
            Sign Up
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
