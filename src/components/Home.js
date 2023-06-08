import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/linkpage', { replace: true });
  };
  return (
    <>
      <div className="m-3">
        <h4>You Are Logged In!</h4>

        <div className=" d-flex flex-column ">
          <Link className=" text-white my-1 p-2 bg-secondary" to={"editor"}>
            Go To the Editor Page
          </Link>
          <Link className=" text-white my-1 p-2 bg-secondary" to={"admin"}>
            Go To the Admin Page
          </Link>
          <Link className=" text-white my-1 p-2 bg-secondary" to={"lounge"}>
            Go To the Lounge Page
          </Link>
          <Link className=" text-white my-1 p-2 bg-secondary" to={"linkpage"}>
            Go To the Linkpage Page
          </Link>
        </div>

        <button className=" mt-3 px-3 bg-info-subtle" onClick={signOut}>Sign Out</button>
      </div>
    </>
  );
};

export default Home;
