import React, { ReactElement } from "react";
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

type GridLayoutProps = {
  items: Layout[]
  onLayoutChange: (newLayout: Layout[]) => void
};

const GridLayout: React.FC<GridLayoutProps> = ({items, onLayoutChange}): ReactElement => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  return (
    <div className="w-full h-full overflow-scroll bg-slate-800">
      <ResponsiveGridLayout
        className='layout'
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={100}
        measureBeforeMount={true}
        layouts={{ lg: items }}
        margin={[5,5]}
        onLayoutChange={onLayoutChange}
      >
        {items.map((item) => (
          <div key={item.i} className="bg-gray-200 border flex justify-center items-center" data-grid={item}>
            {item.i}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default GridLayout;
