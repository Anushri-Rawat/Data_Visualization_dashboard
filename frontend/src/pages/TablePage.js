import React,{useState,useEffect} from 'react';
import Table from "../components/Table";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const TablePage = () => {
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
    <div>
      <h4 className="page-header">
        Data Table
      </h4>
      <hr />
    <Table stats={data} />
    </div>
  )
}

export default TablePage