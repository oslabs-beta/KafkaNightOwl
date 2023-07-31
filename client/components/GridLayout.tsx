import React, { ReactElement } from "react";
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Chart from "./Chart";

type ChartDataType = {
  layout: Layout,
  url: {
    query: string,
    name: string,
    topic?: string
  }
}
type GridLayoutProps = {
  items: Layout[]
  onLayoutChange: (newLayout: Layout[]) => void
  server: string
  chartData: ChartDataType[]
};

const GridLayout: React.FC<GridLayoutProps> = ({items, onLayoutChange, server, chartData}): ReactElement => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  return (
    <div className="w-full h-full overflow-scroll bg-slate-800">
      <ResponsiveGridLayout
        className='layout'
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={100}
        measureBeforeMount={true}
        useCSSTransforms={false}
        layouts={{ lg: items }}
        margin={[5,5]}
        onLayoutChange={onLayoutChange}
      >
        {chartData.map((item) => (
          <div key={item.layout.i} className="bg-gray-700 p-2" data-grid={item.layout}>
            <Chart server={server} query={item.url.query} name={item.url.name} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default GridLayout;
