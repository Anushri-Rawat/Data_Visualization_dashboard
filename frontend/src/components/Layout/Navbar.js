import React from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center py-3 mx-md-5 px-lg-5 m-4 mx-sm-5">
      <Link to="/" className="me-5">
      <div className="fw-bolder fs-3">HORIZON</div>
      </Link>
      <Link to="/" className="btn btn-outline-primary">
      <FaAngleDoubleLeft /> Go to Home
      </Link>
    </div>
  );
};

export default Navbar;
