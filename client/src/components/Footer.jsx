import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import Logo from './Logo';
import { developers } from '../data/developers';

const Footer = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast('Thanks for subscribing! You are on the GuraNeza list.');
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Logo wide />
          <p>
            Your trusted neighbourhood shop for quality products at fair prices.
            From everyday essentials to something special — we bring good things closer to you.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shop">All Products</Link>
          <Link to="/shop?category=Electronics">Electronics</Link>
          <Link to="/shop?category=Fashion">Fashion</Link>
          <Link to="/shop?category=Home%20%26%20Living">Home & Living</Link>
          <Link to="/shop?category=Groceries">Groceries</Link>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <Link to="/track-order">Track Your Order</Link>
          <Link to="/my-orders">My Orders</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/register">Create an Account</Link>
          <Link to="/shop?featured=true">Featured Deals</Link>
        </div>

        <div className="footer-col footer-contact">
          <h4>Visit Us</h4>
          <p><MapPin size={16} /> Kigali, Rwanda</p>
          <p><Phone size={16} /> +250 788 000 000</p>
          <p><Mail size={16} /> hello@guraneza.rw</p>
          <p className="footer-hours">Mon–Sat: 8:00 AM – 7:00 PM</p>
        </div>

        <div className="footer-newsletter">
          <h4>Stay in the loop</h4>
          <p>Get fresh deals and new arrivals straight to your inbox.</p>
          <form onSubmit={subscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email for newsletter"
              required
            />
            <button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button>
          </form>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} GuraNeza. All rights reserved. Built by{' '}
          {developers.map((developer, index) => (
            <span key={developer.name}>
              {index > 0 && ' & '}
              <a className="footer-credit" href={developer.github} target="_blank" rel="noreferrer">
                {developer.name}
              </a>
            </span>
          ))}
        </span>
        <span>Made with care in Kigali, Rwanda 🇷🇼</span>
      </div>
    </footer>
  );
};

export default Footer;
