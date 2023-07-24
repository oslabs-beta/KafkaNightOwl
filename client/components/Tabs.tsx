import { ReactElement } from "react";

type TabsProps = {
	tab: string,
	changeTab: (tab: string) => void,
}

const Tabs: React.FC<TabsProps> = ({changeTab, tab}): ReactElement => {
  return (
    <div className="w-auto">
      <div className="tabs justify-center mt-8">
				<a className={`tab tab-md tab-bordered w-48 text-base ${tab === 'overview' && 'tab-active'}`} onClick={() => changeTab('overview')}>Overview</a>
				<a className={`tab tab-md tab-bordered w-48 text-base ${tab === 'topics' && 'tab-active'}`} onClick={() => changeTab('topics')}>Topics</a>
				<a className={`tab tab-md tab-bordered w-48 text-base ${tab === 'brokers' && 'tab-active'}`} onClick={() => changeTab('brokers')}>
					Brokers
				</a>
				{/* <a className={`tab tab-md tab-bordered w-48 text-base ${tab === 'producers' && 'tab-active'}`} onClick={() => changeTab('producers')}>Producers</a>
				<a className={`tab tab-md tab-bordered w-48 text-base ${tab === 'consumers' && 'tab-active'}`} onClick={() => changeTab('consumers')}>Consumers</a> */}
			</div>
    </div>
  )
}

export default Tabs