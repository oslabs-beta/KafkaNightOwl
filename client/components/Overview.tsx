import { ReactElement, useEffect, useState } from "react";
// import Chart from "./Chart";
// import { Chart as ChartJS } from "react-chartjs-2";
// import LineChart from "../Charts/LineChart";
// import data from "../../data.json";
import React from "react";
import { Chart as Chartjs } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import axios from "axios";
Chartjs.register(CategoryScale);

type OverviewProps = {
  server: string;
};

const Overview: React.FC<OverviewProps> = ({ server }): ReactElement => {
  const [overviewData, setOverviewData] = useState({
    activeControllers: [[null, null]],
    underRepPartitions: [[null, null]],
    activebrokers: [[null, null]],
    offlinePartitions: [[null, null]],
    totalTopics: [[null, null]],
    totalPartitions: [[null, null]],
  });
  console.log(overviewData)

  
  useEffect(() => {
    console.log('useEffect', server)
    if (!server) return undefined
    const fetchData = async () => {
      const response = await axios.post("http://localhost:5050/jmx/coreMetrics", {
        port: server,
      })
      setOverviewData(response.data);
      console.log(overviewData);
    }
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [])
  

  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center content-center mt-12">
        <div className="flex flex-col justify-content text-9xl w-48 h-60 rounded-xl border-2 border-black justify-center text-center">
          <div>{overviewData.activeControllers[0][1]}</div>
          <span className="text-base mb-4">active controllers</span>
        </div>
        <div className="flex flex-col justify-content text-9xl w-48 h-60 rounded-xl border-2 border-black justify-center text-center">
          <div>{overviewData.underRepPartitions[0][1]}</div>
          <span className="text-base mb-4">under rep partitions</span>
        </div>
        <div className="flex flex-col justify-content text-9xl w-48 h-60 rounded-xl border-2 border-black justify-center text-center">
          <div>{overviewData.activebrokers[0][1]}</div>
          <span className="text-base mb-4">active brokers</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 justify-center content-center mt-12">
        <div className="flex flex-col justify-content text-9xl w-48 h-60 rounded-xl border-2 border-black justify-center text-center">
          <div>{overviewData.offlinePartitions[0][1]}</div>
          <span className="text-base mb-4">offline partitions</span>
        </div>
        <div className="flex flex-col justify-content text-9xl w-48 h-60 rounded-xl border-2 border-black justify-center text-center">
          <div>{overviewData.totalTopics[0][1]}</div>
          <span className="text-base mb-4">total topics</span>
        </div>
        <div className="flex flex-col justify-content text-9xl w-48 h-60 rounded-xl border-2 border-black justify-center text-center">
          <div>{overviewData.totalPartitions[0][1]}</div>
          <span className="text-base mb-4">total partitions</span>
        </div>
      </div>
    </>
  );
};

export default Overview;
