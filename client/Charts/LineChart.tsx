import { ReactElement } from "react";
import { Line } from "react-chartjs-2";
import React from "react";

type LineChartProps = {
  userData: any;
};

const LineChart: React.FC<LineChartProps> = ({ userData }): ReactElement => {
  return (
    <div className="h-72 w-96 ">

      <Line data={userData} width={2} height={1} />
    </div>
  );
}

export default LineChart;
