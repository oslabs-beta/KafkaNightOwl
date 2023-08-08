import React, { ReactElement } from 'react'

type SearchBarProps = {
  metric: string,
  setMetric: (metric: string) => void
	filteredMetrics: string[]
	getMetricData: (metric: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ metric, setMetric, filteredMetrics, getMetricData }): ReactElement => {

	const handleSubmit = (e, metric) => {
		e.preventDefault()
		getMetricData(metric)
	}
	
  return (
    <div className="w-full">
			<div className="flex dropdown gap-2">
				<form onSubmit={e => handleSubmit(e, metric)} className='w-full'>
					<input
						className="input input-bordered w-full"
						type="text"
						placeholder="Search metrics here"
						value={metric}
						onChange={(e) => setMetric(e.target.value)}
					/>
				</form>
				<div className="dropdown-content bg-slate-400 top-14 max-h-80 overflow-auto flex-col rounded-md z-10">
					<ul className="menu menu-compact">
						{filteredMetrics.map((metric, index) => {
							return (
								<li
									className="border-b border-b-base-content/10 w-3/4"
									key={index}
									tabIndex={index + 1}
									onClick={(e) => {
										setMetric(metric);
										handleSubmit(e, metric)
									}}
								>
									<button>{metric}</button>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
  )
}

export default SearchBar