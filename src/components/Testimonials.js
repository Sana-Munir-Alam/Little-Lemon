import React from "react";
import "../styles/App.css";

const testimonials = [
  {
    stars: 5,
    text: "Absolutely divine! The moment I walked in, I was hit with the cozy, citrusy aroma of fresh herbs and lemon zest. The grilled octopus was the best I've had outside the Mediterranean, and the lemon tart? Pure heaven. The staff was so warm and welcoming—it genuinely felt like a little escape from the city. I’ll be back with friends next weekend!",
    name: "Elena Vasquez",
    position: "Elena V.",
    image: "https://hips.hearstapps.com/hmg-prod/images/single-women-happier-than-men-675ac891b545d.jpg?crop=0.670xw:1.00xh;0.247xw,0&resize=640:*"
  },
  {
    stars: 3,
    text: "The food was decent, nothing mind-blowing. I ordered the lamb kofta-it was flavorful but a little dry. The décor is charming, though, and our server was polite. Might give it another shot in case it was an off night. Not bad, but not amazing either.",
    name: "Michael Baker",
    position: "MikeB99",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBtYW58ZW58MHx8MHx8fDA%3D"
  },
  {
    stars: 4,
    text: "Really lovely experience! I loved how fresh everything tasted—especially the roasted beet salad and their signature lemon-basil drink. The service was prompt, and the ambiance is adorable. I’m only giving 4 stars because it was a little noisy during the dinner rush, but otherwise, top-notch.",
    name: "Katrina Hollins",
    position: "Trina H.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Woman_at_Lover%27s_Bridge_Tanjung_Sepat_%28cropped%29.jpg/960px-Woman_at_Lover%27s_Bridge_Tanjung_Sepat_%28cropped%29.jpg"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <h2>From Our Guests With Love</h2>
      <p className="testimonial-sub">
        From first bites to final sips—hear from those who’ve dined with us.
      </p>
      <div className="testimonial-cards">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <div className="stars">{"★".repeat(item.stars)}</div>
            <p className="testimonial-text">"{item.text}"</p>
            <div className="testimonial-user">
              <img src={item.image} alt={item.name} />
              <>
                <p className="user-name">{item.name}</p>
                <p className="user-position">{item.position}</p>
              </>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;