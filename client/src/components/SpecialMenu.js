import { useNavigate } from "react-router-dom";
import "./../styles/App.css";

const SpecialMenu = () => {
  const navigate = useNavigate();

  const handleSeeMoreClick = (itemTitle) => {
    // Navigate to menu page with the item's category
    const categoryMap = {
      "Greek Salad": "Starters",
      "Bruschetta": "Starters",
      "Lemon Dessert": "Desserts"
    };
    const category = categoryMap[itemTitle] || "All";
    navigate(`/menu?category=${encodeURIComponent(category)}`);
  };

  return (
    <section id="special" className="special-menu">
      <h2>Our Special for Summer Season</h2>
      <div className="menu-items">
        {[
          {
            title: "Greek Salad",
            desc: "The famous Greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
            img: "https://www.pantsdownapronson.com/wp-content/uploads/Authentic-greek-salad-2-500x500.jpg"
          },
          {
            title: "Bruschetta",
            desc: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Toppings of tomato, veggies, beans, cured pork, or cheese are examples of variations. In Italy, a brustolina grill is frequently used to create bruschetta.",
            img: "https://cookingwithcassandra.com/wp-content/uploads/2022/02/a-close-up-of-toasted-bread-with-bruschetta-toppings.jpg"
          },
          {
            title: "Lemon Dessert",
            desc: "A zesty lemon mousse layered with crumbled shortbread. It tastes light tangy, and refreshing.",
            img: "https://images.squarespace-cdn.com/content/v1/64c6c6c1c0b0ff2129c7fa86/3c828da6-7a7b-463d-94f5-d16d2da8e1c3/Lemon-cream-cheese-bars-recipe-easy-dessert-chynabsweets.png"
          }
        ].map((item, idx) => (
          <div key={idx} className="menu-card">
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <button  onClick={() => handleSeeMoreClick(item.title)} className="order-popup-btn">See More =&gt;</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialMenu;