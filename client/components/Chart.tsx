import { ReactElement, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';
import axios from 'axios';

type ChartProps = {
  server: string;
  query: string;
  name: string;
  topic: string | undefined;
};

const loading = {
  labels: [],
  datasets: [
    {
      label: 'Loading',
      data: [],
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(255,255,255,0.2)',
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(255,255,255,0.2)',
    },
  ],
};

const organizeData = (array) => {
  const time = [];
  const value = [];

  array.forEach((el) => {
    if (el[1].length > 5 && el[1].includes('.')) {
      el[1] = el[1].slice(0, 5);
    }
    time.push(new Date(el[0] * 1000).toLocaleTimeString());
    value.push(el[1]);
  });

  const newChartData = {
    labels: time,
    datasets: [
      {
        label: 'Sample Line Chart',
        data: value,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(255,255,255,0.2)',
      },
    ],
  };
  return newChartData;
  // setData(newChartData);
};

const Chart: React.FC<ChartProps> = ({
  server,
  query,
  name,
  topic,
}): ReactElement => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
  const [data, setData] = useState(loading);

  const url = topic
    ? `http://${server}/api/v1/query?query=${query}{name="${name}",topic="${topic}",}[1m]`
    : `http://${server}/api/v1/query?query=${query}{name="${name}",}[1m]`;

  useEffect(() => {
    if (!server || !data) return undefined;
    const fetchData = async () => {
      const response = await axios.get(url);
      if (response.data.data.result[0].values) {
        const array = response.data.data.result[0].values;
        setData(organizeData(array));
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [data]);

  //   const newblah = {
  //     labels: blah.time,
  //     datasets: [
  //       {
  //         label: 'Sample Line Chart',
  //         data: blah.value,
  //         backgroundColor: 'rgba(255,255,255,0.2)',
  //         borderColor: 'rgba(255,255,255,0.2)',
  //         borderWidth: 2,
  //         pointRadius: 4,
  //         pointBackgroundColor: 'rgba(255,255,255,0.2)',
  //       },
  //     ],
  //   };
  //   setData(newblah);
  // };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 0,
    },
    scales: {
      x: {
        display: false,
      },
    },
  };

  return (
    <>
      <span>chart</span>
      <Line data={data} options={options} />
    </>
  );
};

export default Chart;
export { organizeData };
