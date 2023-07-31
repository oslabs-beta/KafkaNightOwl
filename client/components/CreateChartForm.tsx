import React, { ReactElement } from 'react'
import SearchBar from './SearchBar'
import { Layout } from 'react-grid-layout'

type CreateChartFormProps = {
  metric: string,
  setMetric: (metric: string) => void
  filteredMetrics: string[]
  addChart: (chart: Layout) => void
}
const makeFakeChart = () => {
  const random = Math.floor(Math.random() * 100)
  return  {i: `item ${random}`, x: 0, y:Infinity, w:2, h:2, static: false}
}

const CreateChartForm: React.FC<CreateChartFormProps> = ({metric, setMetric, filteredMetrics, addChart}): ReactElement => {
  return (
    <div className="drawer drawer-end z-50">
      <input id="ChartForm" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="ChartForm" className="drawer-button btn btn-primary m-3">Add Chart</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="ChartForm" className="drawer-overlay"></label>
        <div className="flex flex-col px-12 py-4 w-2/5 h-full bg-slate-800 text-base-content">
          <SearchBar metric={metric} setMetric={setMetric} filteredMetrics={filteredMetrics} />
          <div className='bg-gray-200 w-auto h-96 my-2'></div>
          <div className='bg-slate-600 w-auto h-96'></div>
          <div className="flex justify-end mt-2">
            <button className="btn btn-primary text-4xl h-12 w-12"><i className="fa-solid fa-plus fa-2xs" onClick={() => addChart(makeFakeChart())}></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CreateChartForm