import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="hero">
        <article className="hero-text">
            <h1 id="hero-heading">Little Lemon</h1>
            <h2>Chicago</h2>
            <p>Taste the Mediterranean This Summer</p>
            <p>Fresh, seasonal dishes inspired by Italy, Greece & Turkey
            </p>
            <br></br>
            <p>Now serving our exclusive <b>Summer Menu</b> – 8 vibrant new dishes!</p>
            <div className="hero-buttons">
            <button onClick={() => navigate('/menu')}>Explore Menu</button>
            <button onClick={() => navigate('/reservation')}>Reservation</button>
            </div>
        </article>
        <div className="hero-image">
            <img src="https://alchemiq.com/wp-content/uploads/2022/11/Mediterranean-Food-1.jpg" alt="Mediterranean Food" aria-label="Meditranean Food" />
        </div>
    </section>
  );
};

export default Hero;