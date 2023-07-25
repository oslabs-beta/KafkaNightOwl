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
      data.time.push(el[0]);
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
          label: "TotalMessageIn",
          data: organizeData(topicData.totalMessageIn).value,
        }
      ],
    };

    const messageInRateData = {
      labels: organizeData(topicData.messageInRate).time,
      datasets: [
        {
          label: "MessageInRate",
          data: organizeData(topicData.messageInRate).value,
        }
      ],
    };

    const bytesInRateData = {
      labels: organizeData(topicData.bytesInRate).time,
      datasets: [
        {
          label: "bytesInRate",
          data: organizeData(topicData.bytesInRate).value,
        }
      ],
    };

    const bytesOutRateData = {
      labels: organizeData(topicData.bytesOutRate).time,
      datasets: [
        {
          label: "bytesOutRate",
          data: organizeData(topicData.bytesOutRate).value,
        }
      ],
    };

    const produceRequestRateData = {
      labels: organizeData(topicData.produceRequestRate).time,
      datasets: [
        {
          label: "producerRequestRate",
          data: organizeData(topicData.produceRequestRate).value,
        }
      ],
    };



    // const bytesInRateData = {
    //   labels: [
    //     topicData.bytesInRate[0][0],
    //     topicData.bytesInRate[1][0],
    //     topicData.bytesInRate[2][0],
    //     topicData.bytesInRate[3][0],
    //     topicData.bytesInRate[4][0],
    //     topicData.bytesInRate[5][0],
    //     topicData.bytesInRate[6][0],
    //     topicData.bytesInRate[7][0],
    //     topicData.bytesInRate[8][0],
    //     topicData.bytesInRate[9][0],
    //     topicData.bytesInRate[10][0],
    //     topicData.bytesInRate[11][0],
    //   ],
    //   datasets: [
    //     {
    //       label: "bytesIN",
    //       data: [
    //         topicData.bytesInRate[0][1],
    //         topicData.bytesInRate[1][1],
    //         topicData.bytesInRate[2][1],
    //         topicData.bytesInRate[3][1],
    //         topicData.bytesInRate[4][1],
    //         topicData.bytesInRate[5][1],
    //         topicData.bytesInRate[6][1],
    //         topicData.bytesInRate[7][1],
    //         topicData.bytesInRate[8][1],
    //         topicData.bytesInRate[9][1],
    //         topicData.bytesInRate[10][1],
    //         topicData.bytesInRate[11][1],
    //       ],
    //     },
    //   ],
    // };
    const sampleData = {
      labels: [1690038000, 1690038015, 1690038030],
      datasets: [
        {
          label: "HI",
          data: ["2", "1", "1"],
        },
      ],
    };
    return (
      <>
        {/* {topicData ? <div>Loading</div> : (<> */}
        <div className="h-60 w-60">
          Sample Data:
          {topicData && <Line data={sampleData} height={1} width={2} />}
        </div>
        <div className="h-60 w-60">
          BytesIn Rate:
          {topicData && <Line data={bytesInRateData} height={1} width={2} />}
        </div>
        <div className="h-60 w-60">
          BytesOut Rate:
          {topicData && <Line data={bytesOutRateData} height={2} width={2} />}
        </div>
        <div className="h-60 w-60">
          MessageIn Rate:
          {topicData && <Line data={messageInRateData} height={1} width={2} />}
        </div>
        <div className="h-60 w-60">
          Total MessageIn:
          {topicData && <Line data={totalMessageInData} height={1} width={2} />}
        </div>
        <div className="h-60 w-60">
          Produce Request Rate:
          {topicData && <Line data={produceRequestRateData} height={1} width={2} />}
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
