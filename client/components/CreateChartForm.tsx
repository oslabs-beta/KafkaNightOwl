import React, { ReactElement } from 'react'
import SearchBar from './SearchBar'
import { Layout } from 'react-grid-layout'
import Chart from './Chart'

type CreateChartFormProps = {
  metric: string,
  setMetric: (metric: string) => void
  filteredMetrics: string[]
  addChart: (chart: Layout) => void
  server: string
}
const makeFakeChart = () => {
  const random = Math.floor(Math.random() * 100)
  return  {i: `item ${random}`, x: 0, y:Infinity, w:2, h:2, static: false}
}

const CreateChartForm: React.FC<CreateChartFormProps> = ({metric, setMetric, filteredMetrics, addChart, server}): ReactElement => {
  return (
    <div className="drawer drawer-end z-50">
      <input id="ChartForm" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="ChartForm" className="drawer-button btn btn-primary m-3">Add Chart</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="ChartForm" className="drawer-overlay"></label>
        <div className="flex flex-col px-12 py-4 w-[50rem] h-full bg-slate-800 text-base-content">
          <div className="flex gap-2 justify-end mt-2">
            <SearchBar metric={metric} setMetric={setMetric} filteredMetrics={filteredMetrics} />
            <button className="btn btn-primary text-4xl h-12 w-12"><i className="fa-solid fa-plus fa-2xs" onClick={() => addChart(makeFakeChart())}></i></button>
          </div>
          <div className='bg-gray-700 rounded-lg overflow-hidden p-4 w-auto h-96 my-2'></div>
          <div className='bg-slate-600 rounded-lg overflow-hidden w-auto h-96'></div>
        </div>
      </div>
    </div>
  )
}


export default CreateChartForm