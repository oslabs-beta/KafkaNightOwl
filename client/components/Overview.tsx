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
  const DELAY_IN_MS = 15000;
  // console.log(data);

  // USE EFFECT
  useEffect(() => {
    // SET INTERVAL
    const interval: NodeJS.Timer = setInterval(async () => {
      // fetch goes here
      console.log('server',server)
      const response = await axios.post("http://localhost:5050/jmx/coreMetrics", {
        port: server,
      });
      console.log("response", response);
    }, DELAY_IN_MS);
    return () => clearInterval(interval);
  }, [server]);

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
    <>
      <div className="flex flex-wrap gap-8 justify-center content-center mt-12">
        <LineChart userData={userData} />
        {/* <Chart title={'dummyChart'} /> */}
        {/* <Chart title={"partitions / sec"} data={userData} />
        <Chart title={"segments / sec"} />
        <Chart title={"consumer requests / sec"} /> */}
        {/* <iframe src="http://localhost:3000/d-solo/ba969e29-7865-45e0-908e-24dd50317420/kafka-messagein?orgId=1&refresh=5s&panelId=1" width="450" height="200" frameBorder="0"></iframe>
        <iframe src="http://localhost:3000/d-solo/ba969e29-7865-45e0-908e-24dd50317420/kafka-messagein?orgId=1&refresh=5s&from=1689870391933&panelId=1" width="450" height="200" frameBorder="0"></iframe> */}
      </div>
    </>
  );
};

export default Overview;

// scratch comments below
/*
		const x = activeControllers: activeControllers.data.data.result[0].values,
        underRepPartitions: underRepPartitions.data.data.result[0].values,
        activebrokers: activebrokers.data.data.result[0].values,
        offlinePartitions: offlinePartitions.data.data.result[0].values,
        totalTopics: totalTopics.data.data.result[0].values,
        totalPartitions: totalPartitions.data.data.result[0].values,

				
		*/
