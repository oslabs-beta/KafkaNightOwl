import { ReactElement, useEffect, useState } from "react";
import Chart from "./Chart";
import { Chart as ChartJS } from "react-chartjs-2";
import LineChart from "../Charts/LineChart";
import data from "../../data.json";
import React from "react";
import { Chart as Chartjs } from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chartjs.register(CategoryScale);

type OverviewProps = {};

const Overview: React.FC<OverviewProps> = (): ReactElement => {
  const DELAY_IN_MS = 15000;
  console.log(data);

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      // fetch goes here
    }, DELAY_IN_MS);
    return () => clearInterval(interval);
  });
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
