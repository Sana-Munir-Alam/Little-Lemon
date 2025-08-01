// import React, { useState, useEffect } from 'react';
// import "../styles/Reservation.css";
// import { useNavigate } from 'react-router-dom';

// const Reservation = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     date: '',
//     time: '',
//     ampm: 'AM',
//     diningArea: '',
//     numberOfSeats: '',
//     contactMethod: '',
//     phone: '',
//     email: '',
//     firstName: '',
//     lastName: '',
//     agreement: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const [bookingId, setBookingId] = useState(''); // New state for booking ID
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     document.title = "Reservation - Little Lemon";
//   }, []);
  
//   const images = [
//     "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1200,h_630/https://carrolldesign.co.uk/wp-content/uploads/2024/12/boutique-hotel-memorable-first-impressions.jpg",
//     "https://platform.chicago.eater.com/wp-content/uploads/sites/17/chorus/uploads/chorus_asset/file/23714498/NISOS_DSC3318_1.jpg?quality=90&strip=all&crop=17.19794344473,0,65.60411311054,100",
//     "https://s3-media0.fl.yelpcdn.com/bphoto/O9gVboBdKOQs5Jplit7rUA/1000s.jpg",
//     "https://www.upmenu.com/wp-content/uploads/2024/05/1-what-is-fine-dining-example1.png"
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handlePhoneChange = (e) => {
//     let rawValue = e.target.value.replace(/\D/g, '');
//     let formatted = '';

//     if (rawValue.length <= 3) {
//       formatted = rawValue;
//     } else if (rawValue.length <= 6) {
//       formatted = `${rawValue.slice(0, 3)} ${rawValue.slice(3)}`;
//     } else if (rawValue.length <= 10) {
//       formatted = `${rawValue.slice(0, 3)} ${rawValue.slice(3, 6)} ${rawValue.slice(6)}`;
//     } else {
//       formatted = `${rawValue.slice(0, 3)} ${rawValue.slice(3, 6)} ${rawValue.slice(6, 10)}`;
//     }

//     setFormData({ ...formData, phone: formatted });
//   };

//   const validateStep = () => {
//     let newErrors = {};
//     if (step === 1 && !formData.date) newErrors.date = '* Date is required';
//     if (step === 2 && !formData.time) newErrors.time = '* Time is required';
//     if (step === 3) {
//       if (!formData.diningArea) newErrors.diningArea = '* Dining area is required';
//       if (!formData.numberOfSeats) newErrors.numberOfSeats = '* Number of seats is required';
//       if (formData.numberOfSeats < 1 || formData.numberOfSeats > 12) {
//         newErrors.numberOfSeats = '* Please select between 1-12 seats';
//       }
//     }
//     if (step === 4) {
//       if (!formData.firstName) newErrors.firstName = '* First name is required';
//       if (!formData.lastName) newErrors.lastName = '* Last name is required';
//       if (!formData.contactMethod) newErrors.contactMethod = '* Contact method is required';
//       if (formData.contactMethod === 'email' && !formData.email) newErrors.email = '* Email is required';
//       if (formData.contactMethod === 'phone' && !formData.phone) newErrors.phone = '* Phone is required';
//       if (formData.contactMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//         newErrors.email = '* Please enter a valid email address';
//       }
//       if (formData.contactMethod === 'phone' && formData.phone.replace(/\D/g, '').length < 10) {
//         newErrors.phone = '* Please enter a valid 10-digit phone number';
//       }
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep()) {
//       setStep(step + 1);
//     }
//   };

//   const handleBack = () => {
//     setStep(step - 1);
//   };

//   const handleCancel = () => {
//     navigate('/');
//   };

//   const handleConfirm = async () => {
//     if (validateStep()) {
//       setIsLoading(true);
//       try {
//         const response = await fetch('http://localhost:3001/api/reservations', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             date: formData.date,
//             time: formData.time,
//             diningArea: formData.diningArea,
//             seats: formData.numberOfSeats,
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             email: formData.email,
//             phone: formData.phone.replace(/\D/g, '')
//           })
//         });

//         const data = await response.json();
//         setBookingId(data._id); // Store the booking ID from response
//         setConfirmed(true);
//         setShowPopup(true);
//       } catch (error) {
//         alert("Failed to submit reservation. Please try again.");
//       }
//     }
// };
//   return (
//     <section className="reservationSection">

//       <div className="reservation-heading">
//         <h2 className="reservation-title">Reservation</h2>
//         <button onClick={() => navigate('/check-reservation')} className="check-reservation-btn">
//           Check My Reservation
//         </button>
//       </div>

//       <div className="form-wrapper">
//         <div className="form-section">
          
//           <div className="progress-bar">
//             {[1, 2, 3, 4].map((num) => (
//               <span
//                 key={num}
//                 className={`circle 
//                   ${step > num || (num === 4 && confirmed) ? 'complete' : ''} 
//                   ${step === num && !confirmed ? 'active' : ''}`}
//               >
//                 {(step > num || (num === 4 && confirmed)) ? '✔' : num}
//               </span>
//             ))}
//           </div>

//           {step === 1 && (
//             <>
//               <h3>Step 1: Select Date</h3>
//               <label className="ReserveLabel">Date:</label>
//               <input type="date" name="date" value={formData.date} min={new Date().toISOString().split('T')[0]} onChange={handleChange} />
//               {errors.date && <p className="error">{errors.date}</p>}
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <h3>Step 2: Select Time</h3>
//               <label className="ReserveLabel">Time:</label>
//               <input type="time" name="time" value={formData.time} min="11:00" max="23:00" onChange={handleChange}/>
//               {errors.time && <p className="error">{errors.time}</p>}
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <h3>Step 3: Select Table and Dining Location</h3>
//               <label className="ReserveLabel">Dining Area:</label>
//               <select name="diningArea" value={formData.diningArea} onChange={handleChange}>
//                 <option value="">Select Dining Area</option>
//                 <option value="Patio">Patio</option>
//                 <option value="Balcony">Balcony</option>
//                 <option value="Indoor">Indoor</option>
//                 <option value="Rooftop">Rooftop</option>
//               </select>
//               {errors.diningArea && <p className="error">{errors.diningArea}</p>}
//               <label className="ReserveLabel">No. of Seats:</label>
//               <input
//                 type="number"
//                 name="numberOfSeats"
//                 placeholder="Number of Seats"
//                 value={formData.numberOfSeats}
//                 onChange={handleChange}
//               />
//               {errors.numberOfSeats && <p className="error">{errors.numberOfSeats}</p>}
//             </>
//           )}

//           {step === 4 && (
//             <>
//               <h3>Step 4: Guest Details</h3>
//               <label className="ReserveLabel">First Name:</label>
//               <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
//               {errors.firstName && <p className="error">{errors.firstName}</p>}
//               <label className="ReserveLabel">Last Name:</label>
//               <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
//               {errors.lastName && <p className="error">{errors.lastName}</p>}
//               <label className="ReserveLabel">Mode of Contact:</label>
//               <select name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
//                 <option value="">Preferred Contact</option>
//                 <option value="email">Email</option>
//                 <option value="phone">Phone</option>
//               </select>

//               {errors.contactMethod && <p className="error">{errors.contactMethod}</p>}
//               {formData.contactMethod === 'email' && (
//                 <>
//                   <label className="ReserveLabel">Email:</label>
//                   <input type="email" name="email" placeholder="yourname@example.com" value={formData.email} onChange={handleChange} />
//                   {errors.email && <p className="error">{errors.email}</p>}
//                 </>
//               )}
//               {formData.contactMethod === 'phone' && (
//                 <>
//                   <label className="ReserveLabel">Phone:</label>
//                   <input type="tel" name="phone" placeholder="123 456 7890" value={formData.phone} onChange={handlePhoneChange} maxLength={12} />
//                   {errors.phone && <p className="error">{errors.phone}</p>}
//                 </>
//               )}

//               <div className="Subscription">
//                 <br/><p><b>Stay updated on exclusive deals and offers!</b><br/><br/>
//                   Receive promotional offers, new menu items, and event updates from us:
//                 </p>
//               </div>

//               <div className="ReservationCheckbox">
//                 <label htmlFor="consent" className="checkbox-label">
//                   <input type="checkbox" id="consent" name="agreement" checked={formData.agreement} onChange={handleChange} />
//                   <p>
//                     By checking this box, you agree to receive promotional emails and updates from us. <br />
//                     You can unsubscribe at any time.
//                   </p>
//                 </label>
//               </div>

//             </>
//           )}

//           <div className="button-group">
//             <button onClick={handleCancel} className="cancel-btn">Cancel</button>
//             {step > 1 && <button onClick={handleBack} className="back-btn">Back</button>}
//             {step < 4 && <button onClick={handleNext} className="next-btn">Next</button>}
//             {step === 4 && <button onClick={handleConfirm} className="confirm-btn" disabled={isLoading}>Confirm</button>}
//           </div>
//         </div>

//         <div className="image-section">
//           <img src={images[step - 1]} alt="Reservation Step" className={`reservation-image step-${step}`}/>
//         </div>
//       </div>

//       {showPopup && (
//         <div className="popupRes">
//           <div className="popup-content">
//             <h3>Reservation Confirmed!</h3>
//             <p>Your booking ID: <strong>{bookingId}</strong></p>
//             <p>You can check your reservation here.</p>
//             <button onClick={() => navigate('/check-reservation')}>Check Reservation</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Reservation;

import React, { useState, useEffect } from 'react';
import "../styles/Reservation.css";
import { useNavigate } from 'react-router-dom';

const Reservation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    ampm: 'AM',
    diningArea: '',
    numberOfSeats: '',
    contactMethod: '',
    phone: '',
    email: '',
    firstName: '',
    lastName: '',
    agreement: false,
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Reservation - Little Lemon";
  }, []);
  
  const images = [
    "https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_1200,h_630/https://carrolldesign.co.uk/wp-content/uploads/2024/12/boutique-hotel-memorable-first-impressions.jpg",
    "https://platform.chicago.eater.com/wp-content/uploads/sites/17/chorus/uploads/chorus_asset/file/23714498/NISOS_DSC3318_1.jpg?quality=90&strip=all&crop=17.19794344473,0,65.60411311054,100",
    "https://s3-media0.fl.yelpcdn.com/bphoto/O9gVboBdKOQs5Jplit7rUA/1000s.jpg",
    "https://www.upmenu.com/wp-content/uploads/2024/05/1-what-is-fine-dining-example1.png"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handlePhoneChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, '');
    let formatted = '';

    if (rawValue.length <= 3) {
      formatted = rawValue;
    } else if (rawValue.length <= 6) {
      formatted = `${rawValue.slice(0, 3)} ${rawValue.slice(3)}`;
    } else if (rawValue.length <= 10) {
      formatted = `${rawValue.slice(0, 3)} ${rawValue.slice(3, 6)} ${rawValue.slice(6)}`;
    } else {
      formatted = `${rawValue.slice(0, 3)} ${rawValue.slice(3, 6)} ${rawValue.slice(6, 10)}`;
    }

    setFormData({ ...formData, phone: formatted });
  };

  const validateStep = () => {
    let newErrors = {};
    if (step === 1 && !formData.date) newErrors.date = '* Date is required';
    if (step === 2 && !formData.time) newErrors.time = '* Time is required';
    if (step === 3) {
      if (!formData.diningArea) newErrors.diningArea = '* Dining area is required';
      if (!formData.numberOfSeats) newErrors.numberOfSeats = '* Number of seats is required';
      if (formData.numberOfSeats < 1 || formData.numberOfSeats > 12) {
        newErrors.numberOfSeats = '* Please select between 1-12 seats';
      }
    }
    if (step === 4) {
      if (!formData.firstName) newErrors.firstName = '* First name is required';
      if (!formData.lastName) newErrors.lastName = '* Last name is required';
      if (!formData.contactMethod) newErrors.contactMethod = '* Contact method is required';
      if (formData.contactMethod === 'email' && !formData.email) newErrors.email = '* Email is required';
      if (formData.contactMethod === 'phone' && !formData.phone) newErrors.phone = '* Phone is required';
      if (formData.contactMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = '* Please enter a valid email address';
      }
      if (formData.contactMethod === 'phone' && formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = '* Please enter a valid 10-digit phone number';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3001/api/reservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: formData.date,
            time: formData.time,
            diningArea: formData.diningArea,
            seats: formData.numberOfSeats,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone.replace(/\D/g, '')
          })
        });

        const data = await response.json();
        setBookingId(data._id);
        setConfirmed(true);
        setShowPopup(true);
      } catch (error) {
        alert("Failed to submit reservation. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="reservationSection">
      <div className="reservation-heading">
        <h2 className="reservation-title">Reservation</h2>
        <button onClick={() => navigate('/check-reservation')} className="check-reservation-btn">
          Check My Reservation
        </button>
      </div>

      <div className="form-wrapper">
        <form className="form-section" onSubmit={handleSubmit}>
          <div className="progress-bar">
            {[1, 2, 3, 4].map((num) => (
              <span
                key={num}
                className={`circle 
                  ${step > num || (num === 4 && confirmed) ? 'complete' : ''} 
                  ${step === num && !confirmed ? 'active' : ''}`}
              >
                {(step > num || (num === 4 && confirmed)) ? '✔' : num}
              </span>
            ))}
          </div>

          {step === 1 && (
            <>
              <h3>Step 1: Select Date</h3>
              <label className="ReserveLabel">Date:</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                min={new Date().toISOString().split('T')[0]} 
                onChange={handleChange} 
                required
              />
              {errors.date && <p className="error">{errors.date}</p>}
            </>
          )}

          {step === 2 && (
            <>
              <h3>Step 2: Select Time</h3>
              <label className="ReserveLabel">Time:</label>
              <input 
                type="time" 
                name="time" 
                value={formData.time} 
                min="11:00" 
                max="23:00" 
                onChange={handleChange}
                required
              />
              {errors.time && <p className="error">{errors.time}</p>}
            </>
          )}

          {step === 3 && (
            <>
              <h3>Step 3: Select Table and Dining Location</h3>
              <label className="ReserveLabel">Dining Area:</label>
              <select 
                name="diningArea" 
                value={formData.diningArea} 
                onChange={handleChange}
                required
              >
                <option value="">Select Dining Area</option>
                <option value="Patio">Patio</option>
                <option value="Balcony">Balcony</option>
                <option value="Indoor">Indoor</option>
                <option value="Rooftop">Rooftop</option>
              </select>
              {errors.diningArea && <p className="error">{errors.diningArea}</p>}
              <label className="ReserveLabel">No. of Seats:</label>
              <input
                type="number"
                name="numberOfSeats"
                placeholder="Number of Seats"
                value={formData.numberOfSeats}
                onChange={handleChange}
                min="1"
                max="12"
                required
              />
              {errors.numberOfSeats && <p className="error">{errors.numberOfSeats}</p>}
            </>
          )}

          {step === 4 && (
            <>
              <h3>Step 4: Guest Details</h3>
              <label className="ReserveLabel">First Name:</label>
              <input 
                type="text" 
                name="firstName" 
                placeholder="First Name" 
                value={formData.firstName} 
                onChange={handleChange} 
                required
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
              <label className="ReserveLabel">Last Name:</label>
              <input 
                type="text" 
                name="lastName" 
                placeholder="Last Name" 
                value={formData.lastName} 
                onChange={handleChange} 
                required
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
              <label className="ReserveLabel">Mode of Contact:</label>
              <select 
                name="contactMethod" 
                value={formData.contactMethod} 
                onChange={handleChange}
                required
              >
                <option value="">Preferred Contact</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>

              {errors.contactMethod && <p className="error">{errors.contactMethod}</p>}
              {formData.contactMethod === 'email' && (
                <>
                  <label className="ReserveLabel">Email:</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="yourname@example.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </>
              )}
              {formData.contactMethod === 'phone' && (
                <>
                  <label className="ReserveLabel">Phone:</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="123 456 7890" 
                    value={formData.phone} 
                    onChange={handlePhoneChange} 
                    maxLength={12}
                    required
                  />
                  {errors.phone && <p className="error">{errors.phone}</p>}
                </>
              )}

              <div className="Subscription">
                <br/><p><b>Stay updated on exclusive deals and offers!</b><br/><br/>
                  Receive promotional offers, new menu items, and event updates from us:
                </p>
              </div>

              <div className="ReservationCheckbox">
                <label htmlFor="consent" className="checkbox-label">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    name="agreement" 
                    checked={formData.agreement} 
                    onChange={handleChange} 
                  />
                  <p>
                    By checking this box, you agree to receive promotional emails and updates from us. <br />
                    You can unsubscribe at any time.
                  </p>
                </label>
              </div>
            </>
          )}

          <div className="button-group">
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            {step > 1 && <button onClick={handleBack} className="back-btn">Back</button>}
            {step < 4 && <button onClick={handleNext} className="next-btn">Next</button>}
            {step === 4 && (
              <button type="submit" className="confirm-btn" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Confirm'}
              </button>
            )}
          </div>
        </form>

        <div className="image-section">
          <img src={images[step - 1]} alt="Reservation Step" className={`reservation-image step-${step}`}/>
        </div>
      </div>

      {showPopup && (
        <div className="popupRes">
          <div className="popup-content">
            <h3>Reservation Confirmed!</h3>
            <p>Your booking ID: <strong>{bookingId}</strong></p>
            <p>You can check your reservation here.</p>
            <button onClick={() => navigate('/check-reservation')}>Check Reservation</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reservation;