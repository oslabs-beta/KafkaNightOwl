import React, { ReactElement, useState } from 'react'
import SearchBar from './SearchBar'
import { Layout } from 'react-grid-layout'
import Chart from './Chart'

type CreateChartFormProps = {
  metric: string,
  setMetric: (metric: string) => void
  filteredMetrics: string[]
  addChart: (query: string, name: string, topic: string | undefined) => void
  server: string
  getMetricData: (metric: string) => void
  metricData: any
}

const CreateChartForm: React.FC<CreateChartFormProps> = ({ metric, setMetric, filteredMetrics, addChart, server, getMetricData, metricData }): ReactElement => {
  const [sampleChart, setSampleChart] = useState<any>(null)
  const [name, setName] = useState<string>('')
  const [topic, setTopic] = useState<string|undefined>(undefined)

  const tableBody = metricData.map(((e, i: number) => {
    return (
      <tr
        key={`${e.metric.__name__} ${i}`}
        onClick={() => makeSampleChart(e.metric.__name__, e.metric.name, e.metric.topic)}
        className='cursor-pointer'
      >
        <td className='text-xs text-ellipsis text-left text-gray-200'>{e.metric.__name__}</td>
        <td className='text-xs text-ellipsis text-left text-gray-200'>{e.metric.name}</td>
        <td className='text-xs text-ellipsis text-left text-gray-200'>{e.metric.topic}</td>
      </tr>
    )
  }))
  
  const makeSampleChart = (metric: string, name: string, topic: string | undefined) => {
    setName(name)
    setTopic(topic)
    setSampleChart(<Chart server={server} query={metric} name={name} topic={topic} />)
  }

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
            <SearchBar metric={metric} setMetric={setMetric} getMetricData={getMetricData} filteredMetrics={filteredMetrics} />
            <button onClick={() => addChart(metric, name, topic)} className="btn btn-primary text-4xl h-12 w-12"><i className="fa-solid fa-plus fa-2xs"></i></button>
          </div>
          <div className='bg-gray-700 rounded-lg overflow-hidden p-4 w-auto h-96 my-2'>
            {sampleChart}
          </div>
          <div className='bg-slate-600 rounded-lg overflow-scroll p-4 w-full h-96'>
            <table className='table table-xs w-full max-w-full'>
              <thead>
                <tr>
                  <th className='text-white'>metric</th>
                  <th className='text-white'>name</th>
                  <th className='text-white'>topic</th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CreateChartForm