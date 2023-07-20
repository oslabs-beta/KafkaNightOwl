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
        <iframe src="http://localhost:3000/d-solo/ba969e29-7865-45e0-908e-24dd50317420/kafka-messagein?orgId=1&refresh=5s&panelId=1" width="450" height="200" frameBorder="0"></iframe>
        <iframe src="http://localhost:3000/d-solo/ba969e29-7865-45e0-908e-24dd50317420/kafka-messagein?orgId=1&refresh=5s&from=1689870391933&panelId=1" width="450" height="200" frameBorder="0"></iframe>
        <Chart />
        <Chart />
      </div>
    </>
  )
}

export default Overview;
