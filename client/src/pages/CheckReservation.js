import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CheckReservation.css';

const CheckReservation = () => {
  const [contactMethod, setContactMethod] = useState('email');
  const [contactValue, setContactValue] = useState('');
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cancellation
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [cancelStatus, setCancelStatus] = useState({ success: null, message: '' });


  const navigate = useNavigate();

  const validateEmail = (email) => {
    // More strict email validation without spaces
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email.trim());
  };

  const validatePhone = (phone) => {
    // Remove all non-digit characters and check length
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  };

  const formatPhoneNumber = (phone) => {
    // Only allow digits and format as typing
    const digits = phone.replace(/\D/g, '').substring(0, 10); // Limit to 10 digits
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    
    let formatted = '';
    if (match[1]) formatted += match[1];
    if (match[2]) formatted += ' ' + match[2];
    if (match[3]) formatted += ' ' + match[3];
    
    return formatted.trim();
  };

  // ADD CANCELLATION Handler HERE
  const handleCancelReservation = async () => {
    if (!reservationToCancel) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/reservations/${reservationToCancel._id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCancelStatus({ success: true, message: 'Reservation cancelled successfully!' });
        // Remove the cancelled reservation from the list
        setReservations(reservations.filter(res => res._id !== reservationToCancel._id));
        // Close the confirmation modal after a delay
        setTimeout(() => {
          setShowCancelModal(false);
          setReservationToCancel(null);
        }, 1500);
      } else {
        setCancelStatus({ success: false, message: data.error || 'Failed to cancel reservation' });
      }
    } catch (err) {
      setCancelStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Trim whitespace from input
      const trimmedValue = contactValue.trim();
      
      // Validate input
      if (!trimmedValue) {
        setError('* Please enter your contact information');
        return;
      }

      if (contactMethod === 'email') {
        if (!validateEmail(trimmedValue)) {
          setError('* Please enter a valid email address');
          return;
        }
      } else {
        if (!validatePhone(trimmedValue)) {
          setError('* Please enter a valid 10-digit phone number (no letters allowed)');
          return;
        }
      }

      const query = contactMethod === 'email' 
        ? `email=${trimmedValue}` 
        : `phone=${trimmedValue.replace(/\D/g, '')}`;

      const response = await fetch(`/api/reservations?${query}`);
      const data = await response.json();

      if (data.length === 0) {
        setShowNotFoundModal(true);
        setReservations([]);
        setError('');
      } else {
        setReservations(data);
        setError('');
        setShowNotFoundModal(false);
      }
    } catch (err) {
      setError('Failed to fetch reservations. Please try again later.');
      setShowNotFoundModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Format phone number and prevent non-digit input
    setContactValue(formatPhoneNumber(input));
  };

  const handleEmailChange = (e) => {
    const input = e.target.value;
    // Prevent spaces in email
    if (!input.includes(' ')) {
      setContactValue(input);
    }
  };

  return (
    <div className="check-reservation-container">
      <h2>Check My Reservation</h2>
      
      <div className="contact-method-check">
        <label htmlFor="contactMethodCheck">Contact Method:</label>
        <select
          id="contactMethodCheck"
          value={contactMethod}
          onChange={(e) => {
            setContactMethod(e.target.value);
            setContactValue('');
            setError('');
          }}
          className="contact-method-check-select"
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <div className="contact-input-check">
        <label htmlFor="contactValueCheck">
          {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
        </label>
        <input
          id="contactValueCheck"
          type={contactMethod === 'email' ? 'email' : 'tel'}
          placeholder={contactMethod === 'email' ? 'your@email.com' : '123 456 7890'}
          value={contactValue}
          onChange={contactMethod === 'email' ? handleEmailChange : handlePhoneChange}
          className="contact-value-check-input"
          maxLength={contactMethod === 'phone' ? 12 : undefined} // 10 digits + 2 spaces
        />
      </div>

      <button onClick={handleSearch} className="search-check-button" disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</button>

      {error && <p className="error-message-check">{error}</p>}
          
      {!isLoading && reservations.length === 0 && !error && (
        <p className="empty-state">Enter your contact details to search</p>
      )}
      
      {reservations.length > 0 && (
        <div className="reservation-results-check">
          {reservations.map((res) => (
            <div key={res._id} className="reservation-card-check">
              <h3>Reservation #{res._id.slice(-6)}</h3>
              <p><strong>Name:</strong> {res.firstName} {res.lastName}</p>
              <p><strong>Date:</strong> {res.date}</p>
              <p><strong>Time:</strong> {res.time}</p>
              <p><strong>Seats:</strong> {res.seats}</p>
              <p><strong>Location:</strong> {res.diningArea}</p>
              <p><strong>Contact:</strong> {contactMethod === 'email' ? res.email : formatPhoneNumber(res.phone)}</p>
              {/* ADD CANCELLATION BUTTON HERE */}
              <button 
                onClick={() => {
                  setReservationToCancel(res);
                  setShowCancelModal(true);
                  setCancelStatus({ success: null, message: '' });}} 
                  className="cancel-button-check">
                Cancel Reservation
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="modal-overlay-check">
          <div className="modal-content-check">
            <h3>Confirm Cancellation</h3>
            {cancelStatus.success === null ? (
              <>
                <p>Are you sure you want to cancel this reservation?</p>
                <div className="modal-buttons-container">
                  <button onClick={handleCancelReservation} className="confirm-button-check" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Yes, Cancel'}
                  </button>
                  <button 
                    onClick={() => {
                      setShowCancelModal(false);
                      setReservationToCancel(null);
                    }} className="close-button-check" disabled={isLoading}>
                    No, Keep It
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className={cancelStatus.success ? 'success-message' : 'error-message'}>
                  {cancelStatus.message}
                </p>
                <button 
                  onClick={() => {
                    setShowCancelModal(false);
                    setReservationToCancel(null);
                  }} 
                  className="close-button-check">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showNotFoundModal && (
        <div className="modal-overlay-check">
          <div className="modal-content-check">
            <p>No reservation found for this {contactMethod}.</p>
            <button onClick={() => navigate('/reservation')} className="reservation-button-check">
              Make a Reservation
            </button>
            <button onClick={() => setShowNotFoundModal(false)} className="close-button-check">
              Close
            </button>
          </div>
        </div>
      )}

      <button onClick={() => navigate('/reservation')} className="new-reservation-button-check">
        Make a New Reservation
      </button>
    </div>
  );
};

export default CheckReservation;