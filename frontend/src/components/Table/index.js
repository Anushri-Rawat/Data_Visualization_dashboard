import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {AiOutlineClose,AiOutlineArrowDown,AiOutlineArrowUp} from "react-icons/ai";
import Select from "../Form/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const navigate=useNavigate();
  const [data, setData] = useState(JSON.parse(localStorage.getItem("statsData"))||null);
  const [count, setCount] = useState();
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState({
    end_year: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
    quantity: 50,
    pagination: 0,
  });
  const entryRef = useRef(filter.quantity);

  useEffect(() => {
    const url = `https://data-visualization-dashboard-6d4h.onrender.com/api/v1/data/search?end_year=${filter.end_year}&topic=${filter.topic}&sector=${filter.sector}&region=${filter.region}&pestle=${filter.pestle}&source=${filter.source}&country=${filter.country}&quantity=${filter.quantity}&pagination=${filter.pagination}`;
    const fetchData=async()=>{
      try{
        const res= await axios(url);
        setCount(res.data.count);
          setStats(res.data.stats);
          setData(res.data.data);
      }catch(error){
        navigate('/pages/error/500')
      }
    }
    fetchData();
  }, [filter]);

  const addFilter = ([name, value]) => {
    console.log(value);
    const obj = { ...filter };
    obj[name] = value;
    setFilter(obj);
  };

  const removeFilter = (key) => {
    const obj = { ...filter };
    obj[key] = "";
    setFilter(obj);
  };


  return (
    <>
      <div className="d-flex flex-row align-items-center my-3">
        Show{" "}
        <span>
          <select
            ref={entryRef}
            value={filter.quantity}
            onChange={() =>
              setFilter({ ...filter, quantity: +entryRef.current.value })
            }
            className="form-select form-select-sm mx-2"
            style={{ width: "unset" }}
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </span>{" "}
        entries.
      </div>
      <div className="pl-3 d-flex gap-3 align-items-center mb-3 flex-wrap">Filter by:
      {Object.entries(filter).map(([key, value]) => {
        if (value !== "" && key!=="pagination" && key!=="quantity") {
          return (
          <div className="border bg-white px-2 py-1 rounded d-flex gap-1 align-items-center text-secondary" key={key} style={{fontSize:"12px"}}>
            <span>{key}: {value}</span><AiOutlineClose style={{cursor:"pointer"}} onClick={()=>removeFilter(key)}/>
          </div>
        )}})}
      </div>
      <div className="d-flex flex-wrap flex-lg-nowrap flex-md-row gap-3">
        <Select
          returnFilter={addFilter}
          name={"end_year"}
          data={stats.end_year}
          filter={filter}
        />
        <Select returnFilter={addFilter} name={"topic"} data={stats.topic} filter={filter}/>
        <Select returnFilter={addFilter} name={"sector"} data={stats.sector} filter={filter}/>
        <Select returnFilter={addFilter} name={"region"} data={stats.region} filter={filter}/>
        <Select returnFilter={addFilter} name={"pestle"} data={stats.pestle} filter={filter}/>
        <Select returnFilter={addFilter} name={"source"} data={stats.source} filter={filter}/>
        <Select returnFilter={addFilter} name={"country"} data={stats.country} filter={filter}
        />
      </div>

      <div className="table-responsive mt-4" style={{ width: "100%" }}>
        <table className="table table-bordered table-hover bg-white">
          <thead>
            <tr>
              <th>End year</th>
              <th>Topics</th>
              <th>Sector</th>
              <th>Region</th>
              <th>Pest</th>
              <th>Source</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {data.length >= 1 ? (
              data.map((data) => (
                <tr key={data._id} style={{ verticalAlign: "middle" }}>
                  <td>{data.end_year}</td>
                  <td>{data.topic}</td>
                  <td>{data.sector}</td>
                  <td>{data.region}</td>
                  <td>{data.pestle}</td>
                  <td>{data.source}</td>
                  <td>{data.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  <div className="spinner-border spinner-border-sm"></div>
                </td>
              </tr>
            )}
          </tbody>
          {count && (
            <tfoot>
              <tr>
                <th colSpan="7">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                      <p className="m-0">
                        Showing {filter.pagination + 1} of{" "}
                        {Math.ceil(count / filter.quantity)} entries
                      </p>
                    </div>
                    <div>
                      <button className="btn btn-outline-dark btn-sm ms-2">
                        <FaArrowLeft />{" "}
                        <span
                          className=" d-none d-sm-inline-block"
                          onClick={() =>
                            setFilter({
                              ...filter,
                              pagination:
                                filter.pagination - 1 !== -1
                                  ? filter.pagination - 1
                                  : filter.pagination,
                            })
                          }
                        >
                          Prev
                        </span>
                      </button>
                      <button
                        className="btn btn-outline-dark btn-sm ms-2"
                        onClick={() =>
                          setFilter({
                            ...filter,
                            pagination:
                              filter.pagination + 1 !==
                              Math.ceil(count / filter.quantity)
                                ? filter.pagination + 1
                                : filter.pagination,
                          })
                        }
                      >
                        <span className=" d-none d-sm-inline-block">Next</span>{" "}
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default Table;
