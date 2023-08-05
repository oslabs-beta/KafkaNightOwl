// import { render, screen, cleanup } from '@testing-library/react';
// import { organizeData, Chart, data } from '../client/components/Chart';
// import React, { useState } from 'react';

// afterEach(() => {
//   cleanup();
// });

import { render, screen, cleanup } from '@testing-library/react';
import Chart, { organizeData } from '../client/components/Chart';
import React, { useState } from 'react';

afterEach(() => {
  cleanup();
});

//Edit this test when charts have titles
describe('Chart Component', () => {
  test('A chart is rendered', () => {
    render(<Chart server='localhost:9090' query='' name='' topic='' />);
    // expect(getBy('Line')).toBeInTheDocument()
    expect(screen.getByText('chart')).toBeInTheDocument();
  });

  test('Data is organized ', () => {
    const dummyData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Sample Line Chart',
          data: [10, 20, 30, 25, 15, 40],
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderColor: 'rgba(255,255,255,0.2)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(255,255,255,0.2)',
        },
      ],
    };
    const testData = [
      [1691078487, 1],
      [1691078490, 2],
      [1691078510, 3],
    ];
    const expectedData = {
      labels: ['12:01:27 PM', '12:01:30 PM', '12:01:50 PM'],
      datasets: [
        {
          label: 'Sample Line Chart',
          data: [1, 2, 3],
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderColor: 'rgba(255,255,255,0.2)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(255,255,255,0.2)',
        },
      ],
    };
    expect(organizeData(testData)).toEqual(expectedData);
  });
});
