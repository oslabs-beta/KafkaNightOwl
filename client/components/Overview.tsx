import { ReactElement, useEffect, useState } from "react";
import Chart from "./Chart";
import { Chart as ChartJS } from "react-chartjs-2";
import LineChart from "../Charts/LineChart";
import data from "../../data.json";
import React from "react";
import { Chart as Chartjs } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import axios from "axios";
Chartjs.register(CategoryScale);

type OverviewProps = {
  server: string;
};

const Overview: React.FC<OverviewProps> = ({ server }): ReactElement => {
  const [overviewData, setOverviewData] = useState(null);
  console.log(overviewData)

  
  useEffect(() => {
    console.log('useEffect', server)
    if (!server) return undefined
    const fetchData = async () => {
      const response = await axios.post("http://localhost:5050/jmx/coreMetrics", {
        port: server,
      })
      setOverviewData(response.data)
    }
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [])
  

  //  ------ chartjs react tutorial ------
  // const [userData, setUserData] = useState()
  const userData = {
    labels: [1, 2, 3],
    datasets: [
      {
        label: "HI",
        data: [100, 101, 102],
      },
    ],
  };

  return (
    <div className="flex flex-wrap gap-8 justify-center content-center mt-12">
      <LineChart userData={userData} />
    </div>
  );
};

export default Overview;
