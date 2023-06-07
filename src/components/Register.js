import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "./Register.css";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_]{4,26}$/;
const PWD_REGEX =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setmatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = matchPwd === pwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 && !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    // try {
    //   const body = {user, pwd}
    //   const res = await axios.post('/register', body)
    //   console.log(res.data)
    //   console.log(res.accessToken)
    //   setUser('')
    //   setPwd('')
    //   setmatchPwd('')
        // setSuccess(true);

    // } catch (error) {
    //   if(!error?.response){
    //     setErrMsg("No server Response")
    //   } else if(error.response.status === 209){
    //     setErrMsg("username taken")
    //   } else{
    //     setErrMsg("Registration Failed!")
    //   }
    //   errRef.current.focus()
    // }
  };

  return (
    <div className="registercontainer">
      {success ? (
        <section>
          <h3>Success</h3>
          <Link to={"/login"}>Sign in</Link>
        </section>
      ) : (
        <section >
          <p ref={errRef} className={errMsg ? "errmessage" : "offscreen"}>
            {errMsg}
          </p>
          <h3 className=" text-center m-0 p-0">Register</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <label htmlFor="userName" className="d-flex">
              Username:
              <p className={validName ? "valid" : "hide"}>check</p>
              <p className={validName || !user ? "hide" : "invalid"}>
                cross(wrong)
              </p>
            </label>
            <input
              type="text"
              id="userName"
              ref={userRef}
              value={user}
              onChange={({ target }) => setUser(target.value)}
              required
              autoComplete="off"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              aria-invalid={!validName}
              aria-describedby="uidnote"
              className=" form-control mb-2"
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              4 to 26 characters. <br />
              Must beegin with a letter. <br />
              Letters, numbers, hypens, underscores allowed.
            </p>

            {/* password */}
            <label htmlFor="password" className="d-flex">
              Password:
              <p className={validPwd ? "valid" : "hide"}>check</p>
              <p className={validPwd || !pwd ? "hide" : "invalid"}>
                cross(wrong)
              </p>
            </label>
            <input
              type="password"
              id="password"
              value={pwd}
              onChange={({ target }) => setPwd(target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              aria-invalid={!validPwd}
              aria-describedby="pwdnote"
              className=" form-control mb-2"
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd ? "instructions" : "offscreen"
              }
            >
              4 to 26 characters. <br />
              Must included upper and lower Letters, a numbers and special
              characters. <br />
              Allowed special characters: !, #, $, %.
            </p>

            {/* match password */}
            <label htmlFor="cpassword" className="d-flex">
              Confirm Password:
              <p className={validMatchPwd && matchPwd ? "valid" : "hide"}>
                check
              </p>
              <p className={validMatchPwd || !matchPwd ? "hide" : "invalid"}>
                cross(wrong)
              </p>
            </label>
            <input
              type="password"
              id="cpassword"
              value={matchPwd}
              onChange={({ target }) => setmatchPwd(target.value)}
              required
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
              aria-invalid={!validMatchPwd}
              aria-describedby="matchpwdnote"
              className=" form-control mb-3"
              autoComplete="off"
            />
            <p
              id="matchpwdnote"
              className={
                (matchPwdFocus && !validMatchPwd)? "instructions" : "offscreen"
              }
            >
              must match the first password input field.
            </p>

            
              <button
                className=" form-control mt-4 mb-1"
                type="submit"
                disabled = {!(validName && validPwd && validMatchPwd) }
              >
                Sign Up
              </button>
          </form>
          <p>
            Already Registerd?
            <Link to={"/login"} className=" ms-1">
              Sign in
            </Link>
          </p>
        </section>
      )}
    </div>
  );
};

export default Register;
