import { render, screen, cleanup, waitFor } from '@testing-library/react';
import Chart, { organizeData } from '../client/components/Chart';
import React, { useState } from 'react';

afterEach(() => {
  cleanup();
});

//Edit this test when charts have titles
describe('Chart Component is rendered', () => {
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
      labels: ['T-2:00', '', '', 'T-1:00', '', '', 'T-0:00'],
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
