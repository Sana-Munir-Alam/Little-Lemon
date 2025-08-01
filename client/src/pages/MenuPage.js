import React, { useState, useEffect } from 'react';
import {useSearchParams } from 'react-router-dom';
import '../styles/Menu.css';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [popup, setPopup] = useState(false);
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    const fetchMenuData = async () => {
      try {
        const data = {
          categories: ['Starters', 'Mains', 'Desserts', 'Drinks'],
          items: [
            { id: 1, name: 'Greek Salad', price: 12.99, category: 'Starters', description: 'Fresh vegetables with feta cheese', image: 'https://www.pantsdownapronson.com/wp-content/uploads/Authentic-greek-salad-2-500x500.jpg' },
            { id: 2, name: 'Bruschetta', price: 8.99, category: 'Starters', description: 'Toasted bread with tomatoes and garlic', image: 'https://cookingwithcassandra.com/wp-content/uploads/2022/02/a-close-up-of-toasted-bread-with-bruschetta-toppings.jpg' },
            { id: 3, name: 'Lemon Cake', price: 6.99, category: 'Desserts', description: 'Tangy lemon flavor', image: 'https://images.squarespace-cdn.com/content/v1/64c6c6c1c0b0ff2129c7fa86/3c828da6-7a7b-463d-94f5-d16d2da8e1c3/Lemon-cream-cheese-bars-recipe-easy-dessert-chynabsweets.png' },
            { id: 4, name: 'Stuffed Mushrooms', price: 9.49, category: 'Starters', description: 'Mushrooms filled with herbs and cheese', image: 'https://thedizzycook.com/wp-content/uploads/2023/11/Boursin-Stuffed-Mushrooms-Main.jpg' }, 
            { id: 5, name: 'Caprese Skewers', price: 7.99, category: 'Starters', description: 'Skewered cherry tomatoes, mozzarella & basil', image: 'https://www.garnishwithlemon.com/wp-content/uploads/2016/07/Caprese-Skewers-featured-image.jpg' },
            { id: 6, name: 'Grilled Fish', price: 18.99, category: 'Mains', description: 'Freshly grilled fish with herbs', image: 'https://www.masalakorb.com/wp-content/uploads/2016/08/Grilled-Fish-Indian-Recipe-V5.jpg' },
            { id: 7, name: 'Pasta', price: 14.99, category: 'Mains', description: 'Homemade pasta with sauce', image: 'https://www.realfoodwithsarah.com/wp-content/uploads/2024/05/authentic-italian-pasta-sauce-3.jpg' },
            { id: 8, name: 'Lemon Herb Chicken',  price: 16.99,  category: 'Mains',  description: 'Tender chicken breasts marinated in lemon and herbs, grilled to perfection.',  image: 'https://i0.wp.com/www.paleonewbie.com/wp-content/uploads/2015/08/paleo-newbie-lemon-herb-roasted-chicken-recipe-1266x850.jpg?fit=1266%2C850&ssl=1' },
            { id: 9, name: 'Beef Stroganoff',  price: 19.99,  category: 'Mains',  description: 'Classic Russian-style dish with seared beef strips in a creamy mushroom sauce.', image: 'https://www.sipandfeast.com/wp-content/uploads/2023/10/beef-stroganoff-recipe-snippet-3.jpg'},
            { id: 10, name: 'Stuffed Bell Peppers',  price: 13.99,  category: 'Mains',  description: 'Colorful bell peppers filled with seasoned rice, vegetables, and cheese.',  image: 'https://www.allrecipes.com/thmb/eBsB2933MCuNVCim4O-AyCR97YE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/79805-StuffedPeppersWithturkeyAndVegtables-MFS-2x3-0048-444ecb49b0184daab29e5326e4330af3.jpg' },
            { id: 11, name: 'Iced Tea', price: 3.99, category: 'Drinks', description: 'Refreshing iced tea', image: 'https://www.lanascooking.com/wp-content/uploads/2021/04/southern-sweet-tea-1200-feature.jpg' },
            { id: 12, name: 'Lemonade',  price: 3.49,  category: 'Drinks',  description: 'Classic homemade lemonade with a zesty twist',  image: 'https://www.allrecipes.com/thmb/x6zdkHlYGSloSRUDYC4cR7Blk-8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/445156_Vintage-Lemonade-4x3-195c79927325479bb7848ece5cab897f.jpg' },
            { id: 13, name: 'Cold Brew Coffee', price: 4.49, category: 'Drinks', description: 'Smooth and bold cold brew served over ice', image: 'https://lifemadesweeter.com/wp-content/uploads/Easy-Cold-Brew-Coffee-Recipe-Vegan-Dairy-Free-Paleo-Healthy.jpg' },
            { id: 14, name: 'Strawberry Smoothie',  price: 5.25,  category: 'Drinks', description: 'Creamy smoothie blended with fresh strawberries', image: 'https://www.theflavorbender.com/wp-content/uploads/2018/01/Almond-Strawberry-Smoothie-The-Flavor-Bender-Featured-Image-SQ-6.jpg'},
            { id: 15, name: 'Chocolate Cake', price: 7.99, category: 'Desserts', description: 'Rich chocolate flavor', image: 'https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg' },
            { id: 16, name: 'Red Velvet', price: 7.49, category: 'Desserts', description: 'Classic red velvet', image: 'https://www.simplytrinicooking.com/wp-content/uploads/red-velvet-cake-500x500.jpg' },
            { id: 17, name: 'Cheesecake', price: 8.49, category: 'Desserts', description: 'Creamy cheesecake', image: 'https://sugarspunrun.com/wp-content/uploads/2019/01/Best-Cheesecake-Recipe-2-1-of-1-4.jpg' },
            { id: 18, name: 'Tiramisu', price: 6.99, category: 'Desserts', description: 'Italian classic dessert', image: 'https://www.kingarthurbaking.com/sites/default/files/2023-03/Tiramisu_1426.jpg' },
            { id: 19, name: 'Apple Pie', price: 7.99, category: 'Desserts', description: 'American classic pie', image: 'https://www.ifyougiveablondeakitchen.com/wp-content/uploads/2023/04/best-apple-pie-from-scratch.jpg' },
            { id: 20, name: 'Ice Cream', price: 5.99, category: 'Desserts', description: 'Vanilla ice cream', image: 'https://www.theroastedroot.net/wp-content/uploads/2023/06/dairy-free-vanilla-ice-cream-8-500x500.jpg' }
          ]
        };
        
        setCategories(['All', ...data.categories]);
        setMenuItems(data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [categoryParam]);

  const handleOrderClick = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 5000);
  };

  const filteredItems = activeCategory === 'All' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="menu-page-container">
      <section className="menu-page-hero">
        <div className="menu-page-hero-content">
          <h1>Our Menu</h1>
          <p>Discover our delicious selection of dishes prepared with the finest ingredients.</p><br/>
          <p>
            From signature entrées to timeless favorites, our menu reflects a balance of tradition and innovation—designed to satisfy every palate.
            <br/>Whether you're joining us for a light lunch or an indulgent evening meal, we invite you to discover flavors that are as inviting as they are memorable.
          </p>
        </div>
      </section>

      <section className="menu-page-categories">
        <div className="menu-page-category-buttons">
          {categories.map(category => (
            <button 
            key={category} className={`menu-page-category-btn ${activeCategory === category ? 'active' : ''}`} onClick={() => {setActiveCategory(category);}}>
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="menu-page-items">
        {loading ? (
          <div className="menu-page-loading">Loading menu items...</div>
        ) : (
          <div className="menu-page-items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-page-item">
                <div className="menu-page-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="menu-page-item-details">
                  <div className="menu-page-item-header">
                    <h3>{item.name}</h3>
                    <span className="menu-page-item-price">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="menu-page-item-description">{item.description}</p>
                  <button 
                    className="menu-page-order-btn"
                    onClick={() => handleOrderClick(item.name)}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {popup && (
        <div className="menu-page-popup">
          <span onClick={() => setPopup(false)} className="menu-page-popup-close">&times;</span>
          <p>Order feature coming soon!</p>
        </div>
      )}
    </div>
  );
};
export default MenuPage;