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
  const [overviewData, setOverviewData] = useState({
    activeControllers: [[null, null]],
    underRepPartitions: [[null, null]],
    activebrokers: [[null, null]],
    offlinePartitions: [[null, null]],
    totalTopics: [[null, null]],
    totalPartitions: [[null, null]],
  });
  // const [activeControllers, setActiveControllers] = useState([[11111111, 'N/A']]);
  // const [activeControllers, setActiveControllers] = useState([[11111111, 'N/A']]);
  // const [activeControllers, setActiveControllers] = useState([[11111111, 'N/A']]);
  // const [activeControllers, setActiveControllers] = useState([[11111111, 'N/A']]);
  // const [activeControllers, setActiveControllers] = useState([[11111111, 'N/A']]);
  // const [activeControllers, setActiveControllers] = useState([[11111111, 'N/A']]);
  console.log('line 18: ', overviewData)
  
    useEffect(() => {
      if (server !== '') {
      const fetchData = async () => {
        const response = await axios.post("http://localhost:5050/jmx/coreMetrics", {
          port: server,
        })
        setOverviewData(response.data);
        console.log('fetchedData: ', response.data);
      }
      fetchData()
      console.log('server: ', server)
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    } 
    }, [server])
  //end of if statement

  //  ------ chartjs react tutorial ------
  // const [userData, setUserData] = useState()
  const userData = {
    labels:[1690038000,1690038015,1690038030],
    datasets: [
      {
        label: "HI",
        data: ["2","1","1"],
      },
    ],
  };


  // if(overviewData === null){
  //   return (
  //     <div>
  //       Give us your port number to see your data.
  //     </div>
  //   )
  // }else{
  return (
    <div className="flex flex-wrap gap-8 justify-center content-center mt-12">
      <div id="activeControllerMetricContainer"> {overviewData.activeControllers[0][1]}</div>
      <div id="underRepPartitionsMetricContainer">{overviewData.underRepPartitions[0][1]}</div>
      <div id="activebrokersMetricContainer">{overviewData.activebrokers[0][1]}</div>
      <div id="offlinePartitionsMetricContainer">{overviewData.offlinePartitions[0][1]}</div>
      <div id="totalTopicsMetricContainer">{overviewData.totalTopics[0][1]}</div>
      <div id="totalPartitionsMetricContainer">{overviewData.totalPartitions[0][1]}</div>
    </div>
  );
};

export default Overview;
