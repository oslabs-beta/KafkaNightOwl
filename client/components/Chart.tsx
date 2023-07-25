import { ReactElement } from "react";
import { Line } from "react-chartjs-2";
import React from 'react';

type ChartProps = {
  title?: string
  data?: any
};

const Chart: React.FC<ChartProps> = ({title, data}): ReactElement => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col items-end content-center">
          <h4 className="text-gray-400">{title ? title : "-- / --"}</h4>
        </div>
        <Line data={data} width={2} height={1} />
      </div>
    </>
  );
}

export default Chart;
