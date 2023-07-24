import { ReactElement, useEffect } from "react";
import Chart from "./Chart";

type OverviewProps = {};

const Overview: React.FC<OverviewProps> = (): ReactElement => {
  const DELAY_IN_MS = 15000;

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      // fetch goes here
    }, DELAY_IN_MS)
    return () => clearInterval(interval)
  })
  

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
