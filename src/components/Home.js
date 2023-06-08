import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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

        <button className=" mt-3 px-3 bg-info-subtle ">Sign Out</button>
      </div>
    </>
  );
};

export default Home;
