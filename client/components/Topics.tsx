import React, { ReactElement, useEffect, useState } from "react";
import { Chart as ChartJS } from "react-chartjs-2";
import LineChart from "../Charts/LineChart";
import { Line } from "react-chartjs-2";
import axios from "axios";

type TopicsProps = {
  server: string;
};

const Topics: React.FC<TopicsProps> = ({ server }): ReactElement => {
  const [topicData, setTopicData] = useState(null);
  console.log(topicData);

  useEffect(() => {
    console.log("useEffect", server);
    if (!server) return undefined;
    const fetchData = async () => {
      const response = await axios.post(
        "http://localhost:5050/jmx/topicMetrics",
        {
          port: server,
          topic: "test", // change to your topic name that you want to see metrics for :)
        }
      );
      setTopicData(response.data);
      console.log(topicData);
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



  //  ------ chartjs react tutorial ------
  // const [userData, setUserData] = useState()
  if (topicData) {
    const totalMessageInData = {
      labels: organizeData(topicData.totalMessageIn).time,
      datasets: [
        {
          label: "Message counts",
          data: organizeData(topicData.totalMessageIn).value,
        }
      ],
    };

    const messageInRateData = {
      labels: organizeData(topicData.messageInRate).time,
      datasets: [
        {
          label: "Messages/sec",
          data: organizeData(topicData.messageInRate).value,
        }
      ],
    };

    const bytesInRateData = {
      labels: organizeData(topicData.bytesInRate).time,
      datasets: [
        {
          label: "Bytes/sec",
          data: organizeData(topicData.bytesInRate).value,
        }
      ],
    };

    const bytesOutRateData = {
      labels: organizeData(topicData.bytesOutRate).time,
      datasets: [
        {
          label: "Bytes/sec",
          data: organizeData(topicData.bytesOutRate).value,
        }
      ],
    };

    const produceRequestRateData = {
      labels: organizeData(topicData.produceRequestRate).time,
      datasets: [
        {
          label: "Request/sec",
          data: organizeData(topicData.produceRequestRate).value,
        }
      ],
    };

    return (
      <>
        {/* {topicData ? <div>Loading</div> : (<> */}
        <div className="h-60 w-60">
          BytesIn Rate:
          {topicData && <Line data={bytesInRateData} height={2} width={2} />}
        </div>
        <div className="h-60 w-60">
          BytesOut Rate:
          {topicData && <Line data={bytesOutRateData} height={2} width={2} />}
        </div>
        <div className="h-60 w-60">
          MessageIn Rate:
          {topicData && <Line data={messageInRateData} height={2} width={2} />}
        </div>
        <div className="h-60 w-60">
          Total MessageIn:
          {topicData && <Line data={totalMessageInData} height={2} width={2} />}
        </div>
        <div className="h-60 w-60">
          Produce Request Rate:
          {topicData && <Line data={produceRequestRateData} height={2} width={2} />}
        </div>
      </>
    );
    // </>
    // );
  } else {
    return (
      <>
        <div className="h-60 w-60">NULL AT FIRST RENDER</div>
      </>
    );
  }
};

export default Topics;
