import { render, screen, act } from '@testing-library/react';
import Dashboard from '../client/components/Dashboard';
import React from 'react';

describe('Dashboard Component', () => {
  test('renders application name', () => {
    render(<Dashboard />);

    const appName = screen.getByText(/kafka nightowl/i);
    expect(appName).toBeInTheDocument();
  });
});
