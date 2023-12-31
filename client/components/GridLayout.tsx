import React, { ReactElement, useState, useEffect } from "react";
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Chart from './Chart';

type ChartDataType = {
  layout: Layout;
  url: {
    query: string;
    name: string;
    topic?: string;
  };
};
type GridLayoutProps = {
  layout: Layout[]
  onLayoutChange: (newLayout: Layout[]) => void
  server: string
  chartData: ChartDataType[]
  topic?: string
  tab: number
};

const GridLayout: React.FC<GridLayoutProps> = ({ layout, onLayoutChange, server, chartData, topic, tab }): ReactElement => {
  const [charts, setCharts] = useState([])
  const ResponsiveGridLayout = WidthProvider(Responsive);
  
  useEffect(() => {
    setCharts(chartData.map((item) => (
      <div key={item.layout.i} className="bg-gray-700 p-2" data-grid={item.layout}>
        <Chart server={server} query={item.url.query} name={item.url.name} topic={topic} />
      </div>
    )))
  }, [chartData, tab])

  return (
    <div className='w-full h-full overflow-scroll'>
      <ResponsiveGridLayout
        className='layout'
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={100}
        measureBeforeMount={true}
        useCSSTransforms={false}
        layouts={{ lg: layout }}
        margin={[5,5]}
        onLayoutChange={onLayoutChange}
      >
        {charts}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GridLayout;
