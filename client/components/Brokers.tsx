import React, { ReactElement, useEffect, useState } from "react";
import { Chart as ChartJS } from "react-chartjs-2";
import LineChart from "../Charts/LineChart";
import { Line } from "react-chartjs-2";
import axios from "axios";

type BrokersProps = {
  server: string
};

const Brokers: React.FC<BrokersProps> = ({server}): ReactElement => {
  const [brokerData, setBrokerData] = useState(null);
  useEffect(() => {
    console.log("useEffect", server);
    if (!server) return undefined;
    const fetchData = async () => {
      const response = await axios.post(
        "http://localhost:5050/jmx/brokerMetrics",
        {
          port: server,
        }
      );
      setBrokerData(response.data);
      console.log(brokerData);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const organizeData = (array) => {
    const data = {
      time: [],
      value: [],
    }
    array.forEach(el => {
      data.time.push(new Date(el[0]*1000).toLocaleTimeString());
      data.value.push(el[1]);
    })
    return data;
  }
  
  if (brokerData) {
    const totalTopicsData = {
      labels: organizeData(brokerData.totalTopics).time,
      datasets: [
        {
          label: "Topic counts",
          data: organizeData(brokerData.totalTopics).value,
        }
      ],
    };
    const messageInRateData = {
      labels: organizeData(brokerData.messageInRate).time,
      datasets: [
        {
          label: "Message/sec",
          data: organizeData(brokerData.messageInRate).value,
        }
      ],
    };
    const bytesInRateData = {
      labels: organizeData(brokerData.bytesInRate).time,
      datasets: [
        {
          label: "Bytes",
          data: organizeData(brokerData.bytesInRate).value,
        }
      ],
    };
    const bytesOutRateData = {
      labels: organizeData(brokerData.bytesOutRate).time,
      datasets: [
        {
          label: "Bytes",
          data: organizeData(brokerData.bytesOutRate).value,
        }
      ],
    };

    return (
      <div className="flex flex-wrap gap-8 justify-center content-center mt-12">
        {/* {topicData ? <div>Loading</div> : (<> */}
        <div className=" w-[500px] h-[300px]">
          Total Topics:
          {brokerData && <Line data={totalTopicsData}/>}
        </div>
        <div className=" w-[500px] h-[300px]">
          MessageIn Rate:
          {brokerData && <Line data={messageInRateData}/>}
        </div>
        <div className=" w-[500px] h-[300px]">
          BytesIn Rate:
          {brokerData && <Line data={bytesInRateData}/>}
        </div>
        <div className=" w-[500px] h-[300px]">
          BytesOut Rate:
          {brokerData && <Line data={bytesOutRateData}/>}
        </div>
      </div>
    );

    } else {
      return (
        <>
          <div className=""></div>
        </>
      )
    }
  };


export default Brokers;
