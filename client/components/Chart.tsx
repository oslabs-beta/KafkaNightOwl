import { ReactElement, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title
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
    labels: ['T-2:00', '', '', 'T-1:00', '', '', 'T-0:00'],
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
};

const Chart: React.FC<ChartProps> = ({ server, query, name, topic }): ReactElement => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);
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

const options = {
  maintainAspectRatio: false,
  responsive: true,
  animation: {
    duration: 0,
  },
  plugins: {
    title: {
      display: true,
      position: 'bottom' as const,
      text: topic ? `${query} | ${name} | ${topic}` : `${query} | ${name}`,
      color: '#ddd',
      align: 'start' as const,
      padding: {
        top: 0,
        bottom: 0
      },
    },
  }
};

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default Chart;
export { organizeData };
