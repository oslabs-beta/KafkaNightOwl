import { render, screen, cleanup } from '@testing-library/react';
import Login from '../client/components/Login';
import React from 'react';

afterEach(() => {
  cleanup();
})
 
describe('Login Component', () => {
  test('renders login form with email and password inputs', () => {
    render(<Login setLoggedIn={() => {}} openSignUp={() => {}} />);
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
  });
});
