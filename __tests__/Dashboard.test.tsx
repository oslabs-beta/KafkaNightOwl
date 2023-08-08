import { render, screen, cleanup } from '@testing-library/react';
import Dashboard from '../client/components/Dashboard';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('Dashboard Component', () => {
  test('renders application name', () => {
    render(<Dashboard handleLogout={() => {}} />);

    const appName = screen.getByText(/kafka nightowl/i);
    expect(appName).toBeInTheDocument();
  });
  test('renders "add server" button', () => {
    render(<Dashboard handleLogout={() => {}} />);

    const addServerButton = screen.getByText(/add server/i);
    expect(addServerButton).toBeInTheDocument();
  });
  test('renders "add chart" button', () => {
    render(<Dashboard handleLogout={() => {}} />);

    const addChartButton = screen.getByText(/add chart/i);
    expect(addChartButton).toBeInTheDocument();
  });
});
