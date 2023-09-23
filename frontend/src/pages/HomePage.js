import React, { useEffect, useState } from "react";
import LineChart from "../components/Chart/Line";
import DoughnutChart from "../components/Chart/Doughnut";
import BarChart from "../components/Chart/Bar";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("statsData"))||null);
    const navigate=useNavigate();

  useEffect(() => {
    const fetchStats=async()=>{
      try{
        const res= await axios(`http://localhost:8000/api/v1/data/stats`);
        localStorage.setItem("statsData",JSON.stringify(res.data.data));
        setData(res.data.data);
      }catch(err){
        navigate('/pages/error/500')
      }
    }
   
    if(!data){fetchStats();}
  }, [navigate,data]);

  return (
    <>
      <h4 className="page-header">Main Dashboard
      </h4>
      <hr/>
      <div className="row g-0 justify-content-between mb-3">
        <div className="col-lg-8 col-md-9 col-12 border home-chart-a overflow-scroll p-2 mt-3 bg-white rounded-1">
          <div className="" style={{ minWidth: "400px" }}>
            <BarChart data={data.region} title="Region Chart" />
          </div>
        </div>
        <div className="d-flex align-items-center col-lg-4 col-md-3 col-12 border home-chart-b mt-3 bg-white rounded-1">
          <div className="pie mx-auto">
            <DoughnutChart data={data.relevance} title="Relevance Chart" />
          </div>
        </div>
      </div>
      <div className="col-12 border home-chart-a overflow-scroll p-2 bg-white rounded-1 w-100 mb-3">
        <div className="" style={{ minWidth: "600px" }}>
          <LineChart data={data.country} title="Country Chart" />
        </div>
      </div>
      <div className="row g-0 justify-content-between flex-column-reverse flex-md-row mb-3">
        <div className="d-flex align-items-center col-lg-4 col-md-3 col-12 border home-chart-b mt-3 bg-white rounded-1">
          <div className="pie mx-auto">
            <DoughnutChart data={data.likelihood} title="Likelihood Chart" />
          </div>
        </div>
        <div className="col-lg-8 col-md-9 col-12 border home-chart-a overflow-scroll p-2 mt-3 bg-white rounded-1">
          <div className="" style={{ minWidth: "400px" }}>
            <BarChart data={data.end_year} title="End year chart" />
          </div>
        </div>
      </div>
      <div className="row g-0 justify-content-between">
        <div className="col-lg-8 col-md-9 col-12 border home-chart-a overflow-scroll p-2 mt-3 bg-white rounded-1">
          <div className="" style={{ minWidth: "400px" }}>
            <BarChart data={data.intensity} title="Intensity Chart" />
          </div>
        </div>
        <div className="d-flex align-items-center col-lg-4 col-md-3 col-12 border home-chart-b mt-3 bg-white rounded-1">
          <div className="pie mx-auto">
            <DoughnutChart data={data.topic} title="Topics Chart" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
