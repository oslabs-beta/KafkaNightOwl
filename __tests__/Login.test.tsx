import { render, screen, act } from '@testing-library/react';
import Login from '../client/components/Login';
import React from 'react';

describe('Login Component', () => {
  test('renders login form with email and password inputs', () => {
    render(<Login setLoggedIn={() => {}} openSignUp={() => {}} />);
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
  });
});
