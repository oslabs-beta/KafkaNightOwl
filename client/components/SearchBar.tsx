import React, { ReactElement } from 'react'

type SearchBarProps = {
  metric: string,
  setMetric: (metric: string) => void
  filteredMetrics: string[]
}

const SearchBar:React.FC<SearchBarProps> = ({metric, setMetric, filteredMetrics}):ReactElement => {

  return (
    <div className="w-full">
			<div className="flex dropdown gap-2">
				<input
					className="input input-bordered w-full"
					type="text"
					placeholder="Search metrics here"
					value={metric}
					onChange={(e) => setMetric(e.target.value)}
				/>
				<div className="dropdown-content bg-slate-400 top-14 max-h-80 overflow-auto flex-col rounded-md z-10">
					<ul className="menu menu-compact">
						{filteredMetrics.map((metric, index) => {
							return (
								<li
									className="border-b border-b-base-content/10 w-3/4"
									key={index}
									tabIndex={index + 1}
									onClick={() => {
										setMetric(metric);
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