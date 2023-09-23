import React from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import notfound from "../assets/404.jpg";
import Navbar from "../components/Layout/Navbar";

const ErrorPage = () => {
  return (
    <div className="responsive-container">
      <Navbar />
      <section className="mx-md-5 px-lg-5 m-4 mx-sm-5 text-center">
        <div className="my-5">
          <img src={notfound} alt="404" className="img-404" />
        </div>
        <h1 className="text-danger">
          <strong>Server Error 500</strong>
        </h1>
        <p>Something went wrong.Try again later!</p>
        <Link to="/" className="btn btn-outline-primary">
          <FaAngleDoubleLeft /> Go Back
        </Link>
      </section>
    </div>
  );
};

export default ErrorPage;
