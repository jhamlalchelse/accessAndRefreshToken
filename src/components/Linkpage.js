import React from 'react'
import { Link } from 'react-router-dom'

const Linkpage = () => {
  return (
    <div className="m-3">

        <div className=" d-flex flex-column ">
          <Link className=" text-white my-1 p-2 bg-secondary" to={"/register"}>
            Go To the Register Page
          </Link>
          <Link className=" text-white my-1 p-2 bg-secondary" to={"/login"}>
            Go To the Login Page
          </Link>
        </div>

      </div>
  )
}

export default Linkpage