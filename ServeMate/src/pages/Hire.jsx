import React, { useState, useEffect } from 'react';
import './Hire.css';

const Hire = ({ cartItems, setCartItems }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setServices(serviceData);
    setFilteredServices(serviceData);
  }, []);

  const filterServices = (category) => {
    setActiveCategory(category);
    setFilteredServices(
      category === 'all' 
        ? services 
        : services.filter(service => service.category === category)
    );
  };

  const toggleCartItem = (service) => {
    const isInCart = cartItems.some(item => item.id === service.id);

    const updatedCart = isInCart
      ? cartItems.filter(item => item.id !== service.id)
      : [...cartItems, { ...service, quantity: 1 }];

    setCartItems(updatedCart);
  };

  return (
    <div className="hire-services-page">
      <div className="container">
        <h1>Professional Home Services</h1>
        <p className="services-intro">
          Book trusted professionals for your home service needs. All services come with a satisfaction guarantee.
        </p>
        
        <div className="filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => filterServices(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="service-grid">
          {filteredServices.map(service => {
            const isInCart = cartItems.some(item => item.id === service.id);
            return (
              <div key={service.id} className="service-card">
                <div className="service-image-container">
                  <img src={service.image} alt={service.name} className="service-image" />
                </div>
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-details">
                    <p className="service-rate">{service.rate}</p>
                    <div className="service-rating">
                      <span className="stars">{'★'.repeat(Math.floor(service.rating))}</span>
                      <span>({service.rating})</span>
                    </div>
                  </div>
                  <button
                    className={`cart-btn ${isInCart ? 'remove' : 'add'}`}
                    onClick={() => toggleCartItem(service)}
                  >
                    {isInCart ? '− Remove from Cart' : '+ Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'repairs', name: 'Home Repairs' },
  { id: 'decorating', name: 'Decorating' },
  { id: 'plumbing', name: 'Plumbing' },
  { id: 'electrical', name: 'Electrical' },
  { id: 'carpentry', name: 'Carpentry' },
  { id: 'furniture', name: 'Furniture Assembly' }
];

const serviceData = [
  // Home Repairs (10 services)
  {
    id: 'repairs-1',
    name: "Drywall Repair",
    description: "Fixing holes and cracks in drywall",
    rate: "$65/hour",
    rating: 4.7,
    image: "/img/Home1.jpg",
    category: "repairs"
  },
  {
    id: 'repairs-2',
    name: "Door Installation",
    description: "Interior/exterior door installation",
    rate: "$80/hour",
    rating: 4.8,
    image: "/img/Home2.jpg",
    category: "repairs"
  },
  {
    id: 'repairs-3',
    name: "Window Repair",
    description: "Fixing broken windows and frames",
    rate: "$75/hour",
    rating: 4.6,
    image: "/img/Home3.jpg",
    category: "repairs"
  },
  {
    id: 'repairs-4',
    name: "Flooring Repair",
    description: "Hardwood, tile, and laminate repairs",
    rate: "$70/hour",
    rating: 4.7,
    image: "/img/Home4.jpg",
    category: "repairs"
  },
  {
    id: 'repairs-5',
    name: "Roof Patching",
    description: "Small roof repairs and leak fixes",
    rate: "$90/hour",
    rating: 4.8,
    image: "/img/Home5.jpg",
    category: "repairs"
  },
  {
    id: 'repairs-6',
    name: "Gutter Repair",
    description: "Fixing and replacing gutters",
    rate: "$60/hour",
    rating: 4.6,
    image: "/img/Home6.jpg",
    category: "repairs"
  },
  {
    id: 'repairs-7',
    name: "Deck Repair",
    description: "Wooden deck restoration",
    rate: "$75/hour",
    rating: 4.7,
    image: "/img/Home7.jpg",
    category: "repairs"
  },
  {
    id: 'repairs-8',
    name: "Fence Repair",
    description: "Wood and metal fence fixes",
    rate: "$65/hour",
    rating: 4.6,
    image: "/img/Home8.jpg",
    category: "repairs"
  },
  {
    id: 'repairs-9',
    name: "Staircase Repair",
    description: "Fixing loose or damaged stairs",
    rate: "$85/hour",
    rating: 4.8,
    image: "/img/Home9.jpg",
    category: "repairs"
  },
  
  // Decorating (10 services)
  {
    id: 'decorating-1',
    name: "Wall Painting",
    description: "Interior wall painting services",
    rate: "$3.50/sq.ft.",
    rating: 4.8,
    image: "/img/Deco1.jpg",
    category: "decorating"
  },
  {
    id: 'decorating-2',
    name: "Accent Walls",
    description: "Custom accent wall creation",
    rate: "$150/wall",
    rating: 4.9,
    image: "/img/Deco2.jpg",
    category: "decorating"
  },
  {
    id: 'decorating-3',
    name: "Wallpaper Installation",
    description: "Professional wallpaper hanging",
    rate: "$4.50/sq.ft.",
    rating: 4.7,
    image: "/img/Deco3.jpg",
    category: "decorating"
  },
  {
    id: 'decorating-4',
    name: "Crown Molding",
    description: "Installation of decorative molding",
    rate: "$8/linear foot",
    rating: 4.8,
    image: "/img/Deco4.jpg",
    category: "decorating"
  },
  {
    id: 'decorating-5',
    name: "Window Treatments",
    description: "Blinds and curtains installation",
    rate: "$50/window",
    rating: 4.7,
    image: "/img/Deco5.jpg",
    category: "decorating"
  },
  {
    id: 'decorating-6',
    name: "Interior Design",
    description: "Professional decor consultation",
    rate: "$100/hour",
    rating: 4.9,
    image: "/img/Deco6.jpg",
    category: "decorating"
  },
  {
    id: 'decorating-7',
    name: "Faux Finishes",
    description: "Special decorative paint effects",
    rate: "$6/sq.ft.",
    rating: 4.8,
    image: "/img/Deco7.jpg",
    category: "decorating"
  },
  {
    id: 'decorating-8',
    name: "Mural Painting",
    description: "Custom wall murals",
    rate: "$15/sq.ft.",
    rating: 4.9,
    image: "/img/Deco8.jpg",
    category: "decorating"
  },
  {
    id: 'decorating-9',
    name: "Color Consultation",
    description: "Expert color scheme advice",
    rate: "$75/session",
    rating: 4.7,
    image: "/img/Deco9.jpg",
    category: "decorating"
  },
  
  // Plumbing (10 services)
  {
    id: 'plumbing-1',
    name: "Leak Detection",
    description: "Finding and fixing water leaks",
    rate: "$85/hour",
    rating: 4.8,
    image: "/img/Plum1.jpg",
    category: "plumbing"
  },
  {
    id: 'plumbing-2',
    name: "Drain Cleaning",
    description: "Unclogging sinks and showers",
    rate: "$90/hour",
    rating: 4.7,
    image: "/img/Plum2.jpg",
    category: "plumbing"
  },
  {
    id: 'plumbing-3',
    name: "Pipe Repair",
    description: "Fixing broken water pipes",
    rate: "$95/hour",
    rating: 4.9,
    image: "/img/Plum3.jpg",
    category: "plumbing"
  },
  {
    id: 'plumbing-4',
    name: "Water Heater",
    description: "Installation and repair",
    rate: "$100/hour",
    rating: 4.8,
    image: "/img/Plum4.jpg",
    category: "plumbing"
  },
  {
    id: 'plumbing-5',
    name: "Toilet Repair",
    description: "Fixing flush mechanisms",
    rate: "$85/hour",
    rating: 4.6,
    image: "/img/Plum5.jpg",
    category: "plumbing"
  },
  {
    id: 'plumbing-6',
    name: "Faucet Installation",
    description: "New faucet setup",
    rate: "$80/hour",
    rating: 4.7,
    image: "/img/Plum6.jpg",
    category: "plumbing"
  },
  {
    id: 'plumbing-7',
    name: "Sewer Line",
    description: "Repairing main sewer lines",
    rate: "$120/hour",
    rating: 4.9,
    image: "/img/Plum7.jpg",
    category: "plumbing"
  },
  {
    id: 'plumbing-8',
    name: "Garbage Disposal",
    description: "Repair and replacement",
    rate: "$75/hour",
    rating: 4.5,
    image: "/img/Plum8.jpg",
    category: "plumbing"
  },
  {
    id: 'plumbing-9',
    name: "Sump Pump",
    description: "Installation and maintenance",
    rate: "$90/hour",
    rating: 4.7,
    image: "/img/Plum9.jpg",
    category: "plumbing"
  },

  // Electrical (10 services)
  {
    id: 'electrical-1',
    name: "Wiring Installation",
    description: "New home wiring",
    rate: "$95/hour",
    rating: 4.9,
    image: "/img2/Ele1.jpg",
    category: "electrical"
  },
  {
    id: 'electrical-2',
    name: "Light Fixtures",
    description: "Installation and repair",
    rate: "$85/hour",
    rating: 4.8,
    image: "/img2/Ele2.jpg",
    category: "electrical"
  },
  {
    id: 'electrical-3',
    name: "Outlet Installation",
    description: "New electrical outlets",
    rate: "$80/hour",
    rating: 4.7,
    image: "/img2/Ele3.jpg",
    category: "electrical"
  },
  {
    id: 'electrical-4',
    name: "Circuit Breaker",
    description: "Repair and replacement",
    rate: "$100/hour",
    rating: 4.8,
    image: "/img2/Ele4.jpg",
    category: "electrical"
  },
  {
    id: 'electrical-5',
    name: "Ceiling Fan",
    description: "Installation service",
    rate: "$90/hour",
    rating: 4.9,
    image: "/img2/Ele5.jpg",
    category: "electrical"
  },
  {
    id: 'electrical-6',
    name: "Generator Setup",
    description: "Backup power installation",
    rate: "$150/hour",
    rating: 4.9,
    image: "/img2/Ele6.jpg",
    category: "electrical"
  },
  {
    id: 'electrical-7',
    name: "Electrical Panel",
    description: "Upgrade and repair",
    rate: "$120/hour",
    rating: 4.8,
    image: "/img2/Ele7.jpg",
    category: "electrical"
  },
  {
    id: 'electrical-8',
    name: "Smart Home",
    description: "Device installation",
    rate: "$110/hour",
    rating: 4.7,
    image: "/img2/Ele8.jpg",
    category: "electrical"
  },
  {
    id: 'electrical-9',
    name: "EV Charger",
    description: "Electric vehicle setup",
    rate: "$130/hour",
    rating: 4.9,
    image: "/img2/Ele9.jpg",
    category: "electrical"
  },
  
  // Carpentry (10 services)
  {
    id: 'carpentry-1',
    name: "Custom Cabinets",
    description: "Built-to-order cabinetry",
    rate: "$100/hour",
    rating: 4.9,
    image: "/img2/Car1.jpg",
    category: "carpentry"
  },
  {
    id: 'carpentry-2',
    name: "Shelving Units",
    description: "Custom shelving installation",
    rate: "$75/hour",
    rating: 4.8,
    image: "/img2/Car2.jpg",
    category: "carpentry"
  },
  {
    id: 'carpentry-3',
    name: "Trim Work",
    description: "Baseboard and crown molding",
    rate: "$65/hour",
    rating: 4.7,
    image: "/img2/Car3.jpg",
    category: "carpentry"
  },
  {
    id: 'carpentry-4',
    name: "Door Framing",
    description: "New door frame construction",
    rate: "$85/hour",
    rating: 4.8,
    image: "/img2/Car4.jpg",
    category: "carpentry"
  },
  {
    id: 'carpentry-5',
    name: "Wood Flooring",
    description: "Installation and repair",
    rate: "$90/hour",
    rating: 4.9,
    image: "/img2/Car5.jpg",
    category: "carpentry"
  },
  {
    id: 'carpentry-6',
    name: "Deck Building",
    description: "Custom deck construction",
    rate: "$110/hour",
    rating: 4.9,
    image: "/img2/Car6.jpg",
    category: "carpentry"
  },
  {
    id: 'carpentry-7',
    name: "Furniture Repair",
    description: "Restoring wooden furniture",
    rate: "$75/hour",
    rating: 4.8,
    image: "/img2/Car7.jpg",
    category: "carpentry"
  },
  {
    id: 'carpentry-8',
    name: "Staircase",
    description: "Custom stair construction",
    rate: "$95/hour",
    rating: 4.9,
    image: "/img2/Car8.jpg",
    category: "carpentry"
  },
  {
    id: 'carpentry-9',
    name: "Built-ins",
    description: "Custom built-in furniture",
    rate: "$105/hour",
    rating: 4.9,
    image: "/img2/Car9.jpg",
    category: "carpentry"
  },
  
  // Furniture Assembly (10 services)
  {
    id: 'furniture-1',
    name: "Bed Assembly",
    description: "All types of bed frames",
    rate: "$50-150",
    rating: 4.7,
    image: "/img2/Ass1.jpg",
    category: "furniture"
  },
  {
    id: 'furniture-2',
    name: "Wardrobe Assembly",
    description: "Closet systems setup",
    rate: "$60-200",
    rating: 4.8,
    image: "/img2/Ass2.jpg",
    category: "furniture"
  },
  {
    id: 'furniture-3',
    name: "Desk Setup",
    description: "Office furniture assembly",
    rate: "$40-120",
    rating: 4.7,
    image: "/img2/Ass3.jpg",
    category: "furniture"
  },
  {
    id: 'furniture-4',
    name: "Bookshelf Assembly",
    description: "Shelving units setup",
    rate: "$30-100",
    rating: 4.6,
    image: "/img2/Ass4.jpg",
    category: "furniture"
  },
  {
    id: 'furniture-5',
    name: "Entertainment Center",
    description: "TV stand assembly",
    rate: "$50-150",
    rating: 4.7,
    image: "/img2/Ass5.jpg",
    category: "furniture"
  },
  {
    id: 'furniture-6',
    name: "Dining Set",
    description: "Table and chair assembly",
    rate: "$60-180",
    rating: 4.8,
    image: "/img2/Ass6.jpg",
    category: "furniture"
  },
  {
    id: 'furniture-7',
    name: "Outdoor Furniture",
    description: "Patio set assembly",
    rate: "$70-200",
    rating: 4.7,
    image: "/img2/Ass7.jpg",
    category: "furniture"
  },
  {
    id: 'furniture-8',
    name: "Nursery Furniture",
    description: "Cribs and changing tables",
    rate: "$50-150",
    rating: 4.9,
    image: "/img2/Ass8.jpg",
    category: "furniture"
  },
  {
    id: 'furniture-9',
    name: "Exercise Equipment",
    description: "Treadmills and home gyms",
    rate: "$80-250",
    rating: 4.7,
    image: "/img2/Ass9.jpg",
    category: "furniture"
  }
];

export default Hire;