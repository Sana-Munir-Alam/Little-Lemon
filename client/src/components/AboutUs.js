import React from "react";
import "../styles/App.css";

const AboutUs = () => {
  return (
    <section id="about" className="about-us-section" aria-labelledby="about-heading">
      <article className="about-us-text">
        <h2 id="about-heading">Little Lemon</h2>
        <h3>Chicago</h3>
        <p>
          Little Lemon Chicago is a family owned Mediterranean restaurant located in the heart of the city. The restaurant is run by brothers Mario and Adrian, who have always had a passion for cooking and serving delicious food. Growing up in a Mediterranean household, the brothers were exposed to traditional recipes from an early age, and they decided to bring those recipes to the masses with a modern twist. At Little Lemon, you can expect to find a menu full of classic dishes with a creative twist that makes them stand out from the rest. Whether you're looking for a quick lunch or a leisurely dinner, Little Lemon Chicago is the perfect place to indulge in a delicious meal in a cozy and welcoming atmosphere.
        </p>
      </article>
      <div className="about-us-images">
        <img
          src="https://img.freepik.com/premium-photo/al-fresco-dining-mediterranean-restaurant-inviting-outdoor-dinner-setting-vertical-mobile-w_896558-43062.jpg" alt="Outdoor Dining"/>
        <img src="https://www.shutterstock.com/image-photo/chef-cooks-seafood-fry-shrimps-600nw-1584930799.jpg" alt="Chef preparing food"/>
      </div>
    </section>
  );
};

export default AboutUs;
