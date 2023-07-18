import { ReactElement } from "react";

type ChartProps = {
  title?: string
};

const Chart: React.FC<ChartProps> = ({title}): ReactElement => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col items-end content-center">
          <h4 className="text-gray-400">{title ? title : '-- / --'}</h4>
        </div>
        <iframe className="bg-slate-100 h-72 w-96" src=""></iframe>
      </div>
    </>
  )
}

export default Chart;
