import { ReactElement } from "react";

type TabsProps = {}

const Tabs: React.FC<TabsProps> = (): ReactElement => {
  return (
    <>
      <div className="tabs justify-center mt-8">
				<a className="tab tab-md tab-bordered w-48 text-base">Topics</a>
				<a className="tab tab-md tab-bordered w-48 text-base tab-active">
					Brokers
				</a>
				<a className="tab tab-md tab-bordered w-48 text-base">Producers</a>
				<a className="tab tab-md tab-bordered w-48 text-base">Consumers</a>
			</div>
    </>
  )
}

export default Tabs