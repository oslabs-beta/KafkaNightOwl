import { ReactElement } from "react";
import Chart from "./Chart";

type OverviewProps = {};

const Overview: React.FC<OverviewProps> = (): ReactElement => {
  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center content-center mt-12">
        <Chart title={'messages / sec'} />
        <Chart title={'partitions / sec'} />
        <Chart title={'segments / sec'} />
        <Chart title={'consumer requests / sec'} />
        <Chart />
        <Chart />
      </div>
    </>
  )
}

export default Overview;
