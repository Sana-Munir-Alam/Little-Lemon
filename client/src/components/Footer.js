import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

import facebookIcon from "../assets/icons/facebook.png";
import instagramIcon from "../assets/icons/instagram.png";
import twitterIcon from "../assets/icons/twitter.png";
import linkedinIcon from "../assets/icons/linkedin.png";
import youtubeIcon from "../assets/icons/youtube.png";

function Footer() {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({ email: "", consent: "" });
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleFooterNavClick = (hash) => {
    navigate("/#" + hash);
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    let emailError = "";
    let consentError = "";

    if (!email.trim()) {
      emailError = "Email is required.";
    } else if (!validateEmail(email)) {
      emailError = "Please enter a valid email.";
    }

    if (!isChecked) {
      consentError = "You must agree to our policy to subscribe.";
    }

    if (emailError || consentError) {
      setErrors({ email: emailError, consent: consentError });
      setSuccess("");
    } else {
      setErrors({ email: "", consent: "" });
      setSuccess("Thanks for subscribing!");
      setEmail("");
      setIsChecked(false);
    }
  };

  return (
    <footer id="footers" className="footer">
      <div className="footer-container centered-footer">
        {/* Logo + Newsletter */}
        <section className="footer-newsletter" aria-labelledby="newsletter-heading">
          <img src="https://meta-capstone-project.netlify.app/static/media/llr-logo.370f832fad423c516d56.png" alt="Little Lemon Logo" className="footer-logo"/>

          <p className="newsletter-text">
            Join our newsletter to stay up to date on features and releases.
          </p>

          {/* FORM */}
          <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
            <label >Email: <input type="email" placeholder="yourname@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
            
            <button type="submit" className="submission">Subscribe</button>
          </form>

          {/* Email Error */}
          {errors.email && (
            <p className="error-text">{errors.email}</p>
          )}

          {/* Checkbox */}
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="consent"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="checkbox"
            />
            <label htmlFor="consent">
              By subscribing you agree to our <a href="#footers">Privacy Policy</a> and consent to receive updates.
            </label>
          </div>

          {/* Consent Error */}
          {errors.consent && (
            <p className="error-text">{errors.consent}</p>
          )}

          {/* Success Message */}
          {success && (
            <p className="success-text">{success}</p>
          )}
        </section>

        {/* Navigation, Contact, Socials remain unchanged */}
        <div className="footer-links">
          <div>
            <h4 id="navigation-heading">Navigation</h4>
            <ul>
              <li><button onClick={() => navigate("/")} aria-label="Go to home page">Home</button></li>
              <li><button onClick={() => handleFooterNavClick("about")} aria-label="Go to about section">About</button></li>
              <li><button onClick={() => navigate("/menu")} aria-label="View our Menu">Menu</button></li>
              <li><button onClick={() => handleFooterNavClick("testimonials")} aria-label="Read Customer Reviews">Review</button></li>
              <li><button onClick={() => handleFooterNavClick("special")} aria-label="View our special offers">Special</button></li>
              <li><button onClick={() => navigate("/reservation")} aria-label="Make a reservation">Reservation</button></li>
            </ul>
          </div>

          <div>
            <h4 id="contact-heading">Contact</h4>
            <p><b>Email:</b><br/>Littlelemon@example.com</p>
            <p><b>Address:</b><br/>Chicago, Illinois, USA</p>
            <p><b>Phone:</b><br/>+1 234-567-9032</p>
          </div>

          <div>
            <h4 id="social-heading">Follow Us</h4>
            <ul className="social-links">
              <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Visit our Facebook page"><img src={facebookIcon} alt="Facebook" /></a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Visit our Instagram page"><img src={instagramIcon} alt="Instagram" /> </a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Visit our Twitter page"><img src={twitterIcon} alt="Twitter" /> </a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="Visit our LinkedIn page"><img src={linkedinIcon} alt="LinkedIn" /> </a></li>
              <li><a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="Visit our Youtube page"><img src={youtubeIcon} alt="YouTube" /></a></li>
            </ul>
          </div>
        </div>
      </div>

      <hr />
      <div className="footer-bottom">
        <p>© 2025 Little Lemon. All rights reserved.<br/>Designed and developed by <b>Sana Munir Alam</b> for the Meta Front-End Developer Capstone Project.</p>
        <div className="legal-links">
          <a href="#footers">Privacy Policy</a>
          <a href="#footers">Terms of Service</a>
          <a href="#footers">Cookies Settings</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;