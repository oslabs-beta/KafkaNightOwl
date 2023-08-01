import { ReactElement, useEffect, useState } from "react";
import { Chart as ChartJS, LineElement, LinearScale, CategoryScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";
import React from 'react';
import axios from "axios";

type ChartProps = {
  server: string,
  query: string,
  name: string,
  topic?: string
};

const dummyData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sample Line Chart',
      data: [10, 20, 30, 25, 15, 40],
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(255,255,255,0.2)',
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(255,255,255,0.2)',
    },
  ],
};

const Chart: React.FC<ChartProps> = ({ server, query, name, topic }): ReactElement => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)
  const [data, setData] = useState(dummyData)



  const url = topic
    ? `http://${server}/api/v1/query?query=${query}{name="${name}",topic="${topic}",}[1m]`
    : `http://${server}/api/v1/query?query=${query}{name="${name}",}[1m]`

  useEffect(() => {
    if (!server) return undefined;
    const fetchData = async () => {
      const response = await axios.get(url)
      if (response.data.data.result[0].values) {
        const array = response.data.data.result[0].values
        organizeData(array);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  },[])

  const organizeData = (array) => {
    const blah = {
      time: [],
      value: [],
    }
    array.forEach(el => {
      blah.time.push(new Date(el[0] * 1000).toLocaleTimeString());
      blah.value.push(el[1]);
    })
    
    const newblah = {
      labels: blah.time,
      datasets: [
        {
          label: 'Sample Line Chart',
          data: blah.value,
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderColor: 'rgba(255,255,255,0.2)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(255,255,255,0.2)',
        },
      ],
    }
    setData(newblah);
  }


  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 0,
    },
    scales: { x: { display: false } },
  }

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
}

export default Chart;
