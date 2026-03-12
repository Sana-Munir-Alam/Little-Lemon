import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Reservation from './pages/ReservationPage';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ _id: '12345' }),
  })
);

describe('Reservation Page', () => {
  beforeEach(() => {
    fetch.mockClear();
    render(<Reservation />);
  });

  test('renders initial form with step 1', () => {
    expect(screen.getByText('Reservation')).toBeInTheDocument();
    expect(screen.getByText('Step 1: Select Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Date:')).toBeInTheDocument();
  });

  test('progresses through all steps with valid data', async () => {
    // Step 1: Date
    fireEvent.change(screen.getByLabelText('Date:'), { 
      target: { value: '2023-12-31' } 
    });
    fireEvent.click(screen.getByText('Next'));
    
    // Verify step 2
    await waitFor(() => {
      expect(screen.getByText('Step 2: Select Time')).toBeInTheDocument();
    });
    
    // Step 2: Time
    fireEvent.change(screen.getByLabelText('Time:'), { 
      target: { value: '19:00' } 
    });
    fireEvent.click(screen.getByText('Next'));
    
    // Verify step 3
    await waitFor(() => {
      expect(screen.getByText('Step 3: Select Table and Dining Location')).toBeInTheDocument();
    });
    
    // Step 3: Dining details
    fireEvent.change(screen.getByLabelText('Dining Area:'), { 
      target: { value: 'Patio' } 
    });
    fireEvent.change(screen.getByLabelText('No. of Seats:'), { 
      target: { value: '4' } 
    });
    fireEvent.click(screen.getByText('Next'));
    
    // Verify step 4
    await waitFor(() => {
      expect(screen.getByText('Step 4: Guest Details')).toBeInTheDocument();
    });
  });

  test('validates required fields at each step', async () => {
    // Step 1 validation
    fireEvent.click(screen.getByText('Next'));
    expect(await screen.findByText('* Date is required')).toBeInTheDocument();
    
    // Fill step 1 and proceed
    fireEvent.change(screen.getByLabelText('Date:'), { 
      target: { value: '2023-12-31' } 
    });
    fireEvent.click(screen.getByText('Next'));
    
    // Step 2 validation
    fireEvent.click(screen.getByText('Next'));
    expect(await screen.findByText('* Time is required')).toBeInTheDocument();
  });

  test('formats phone number correctly', async () => {
    // Mock being on step 4 with phone contact method
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [4, jest.fn()]) // step
      .mockImplementationOnce(() => [{ 
        contactMethod: 'phone',
        phone: ''
      }, jest.fn()]); // formData
    
    render(<Reservation />);
    
    const phoneInput = screen.getByLabelText('Phone:');
    userEvent.type(phoneInput, '1234567890');
    expect(phoneInput.value).toBe('123 456 7890');
  });

  test('submits form successfully and shows confirmation', async () => {
    // Mock being on step 4 with all valid data
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [4, jest.fn()]) // step
      .mockImplementationOnce(() => [{ 
        date: '2023-12-31',
        time: '19:00',
        diningArea: 'Patio',
        numberOfSeats: '4',
        contactMethod: 'email',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        agreement: true
      }, jest.fn()]); // formData
    
    render(<Reservation />);
    
    fireEvent.click(screen.getByText('Confirm'));
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Reservation Confirmed!')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    // Mock a failed API call
    fetch.mockImplementationOnce(() => 
      Promise.reject(new Error('API is down'))
    );
    
    // Mock being on step 4 with valid data
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [4, jest.fn()])
      .mockImplementationOnce(() => [{ 
        date: '2023-12-31',
        time: '19:00',
        diningArea: 'Patio',
        numberOfSeats: '4',
        contactMethod: 'email',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        agreement: true
      }, jest.fn()]);
    
    render(<Reservation />);
    
    fireEvent.click(screen.getByText('Confirm'));
    
    await waitFor(() => {
      expect(screen.getByText('Failed to submit reservation. Please try again.')).toBeInTheDocument();
    });
  });
});