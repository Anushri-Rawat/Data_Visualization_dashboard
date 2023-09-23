const Data = require("../models/statsModel");
const setStatistics = require("../utils/statistics");

const stats = async (req, res) => {
  try{
    const stats=await Data.find({});
    const data = setStatistics(stats);
      res.status(200).json({ status: "success", data: data.stats });
  }catch(error){
    res.status(500).json({ status: "error", error: error.message });
  }
};

const search = (req, res) => {
  const {
    end_year,
    topic,
    sector,
    region,
    pestle,
    source,
    country,
    quantity,
    pagination,
  } = req.query;
  const requiredField = {
    end_year,
    topic,
    sector,
    region,
    pestle,
    source,
    country,
  };
  const obj = {};
  const query = (object) =>
    Object.keys(object).map((val) => object[val] && (obj[val] = object[val]));
  query(requiredField);
  Data.find(obj, (err, result) => {
    if (err) {
      res.json({ status: "error", error: err.message });
    } else {
      const stats = setStatistics(result);
      Data.find(obj, (err, data) => {
        if (err) {
          res.json({ status: "error", error: err.message });
        } else {
          res.json({ status: "success", data, ...stats });
        }
      })
        .limit(quantity || 50)
        .skip(quantity * pagination || 0)
        .select(Object.keys(requiredField));
    }
  });
};

module.exports = {
  stats,
  search,
};
