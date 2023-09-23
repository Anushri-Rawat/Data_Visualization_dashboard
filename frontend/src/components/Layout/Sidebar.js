import React, { useEffect, useState } from "react";
import { FaRegWindowClose, FaTh} from "react-icons/fa";
import {IoStatsChart} from "react-icons/io5";
import {MdDashboard} from "react-icons/md";
import { Link, useLocation} from "react-router-dom";

const Sidebar = ({ sendToParent, toChild }) => {
  const url = useLocation().pathname;
  const [location, setLocation] = useState(url);
  const [navActive, setNavActive] = useState(toChild);
  useEffect(() => {
    setLocation(url);
  }, [url]);
  const handleClick = () => {
    setNavActive(!navActive);
    sendToParent(!navActive);
  };
  return (
    <div className="sidebar sidenav">
      <div
        className={`px-3  ${
          navActive
            ? "px-3 justify-content-between"
            : "justify-content-center justify-content-sm-start"
        } ps-sm-3 py-4 d-flex`}
      >
        <Link to="/">
        <div className="fw-bolder fs-3">HORIZON</div>
        </Link>
        <span
          className="text-dark d-sm-none"
          style={{ fontSize: "20px" }}
          onClick={handleClick}
        >
          {navActive ? <FaRegWindowClose /> : <FaTh />}
        </span>
      </div>

      <Link to="/">
        <div
          className={`text-dark ${
            navActive
              ? "ps-3"
              : "justify-content-center justify-content-sm-start"
          } ps-sm-3 py-3 d-flex align-items-center div-link ${
            location === "/" && "border-3 sidebar-border"
          }`}
        >
          <MdDashboard/>
          <span className={`ps-3 ${!navActive && "d-none d-sm-block"}`}>
            Main Dashboard
          </span>
        </div>
      </Link>
      <Link to="/data-table">
      <div
          className={`text-dark ${
            navActive
              ? "ps-3"
              : "justify-content-center justify-content-sm-start"
          } ps-sm-3 py-3 d-flex align-items-center div-link ${
            location === "/data-table" && "border-3 sidebar-border"
          }`}
        >
          <IoStatsChart />
          <span className={`ps-3 ${!navActive && "d-none d-sm-block"}`}>
            Data Tables
          </span>
        </div>
        </Link>
    </div>
  );
};

export default Sidebar;
