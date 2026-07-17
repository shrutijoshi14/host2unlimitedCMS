import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Briefcase, GraduationCap, TrendingUp, Headphones, ArrowRight, Globe } from 'lucide-react';

import logoWebp from '../assets/logo.webp';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState({
    company_name: 'Host2Unlimited',
    email: 'info@host2unlimited.com',
    phone: '+91 70219 35273',
    whatsapp_number: '+91 81046 12974',
    address: '1207, Runwal R-Square, LBS Marg, Veena Nagar, Mulund West, Mumbai – 400080, Maharashtra, India.',
    social_links: {
      facebook: 'https://facebook.com/host2unlimited',
      twitter: 'https://twitter.com/host2unlimited',
      linkedin: 'https://linkedin.com/company/host2unlimited'
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${CURRENT_API_BASE}/api/pages/website_settings`);
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (err) {
        console.warn('Failed to load dynamic website settings in Footer', err);
      }
    };
    fetchSettings();

    const handleUpdate = (e) => {
      if (e.detail?.page === 'website_settings') {
        fetchSettings();
      }
    };
    window.addEventListener('cmsPageUpdate', handleUpdate);
    return () => {
      window.removeEventListener('cmsPageUpdate', handleUpdate);
    };
  }, []);

  return (
    <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '80px 0 30px 0', position: 'relative' }}>
      <div className="container">
        
        {/* ================= SECTION 1: IDENTITY, CONTACT & LOCATION (3 Columns) ================= */}
        <div className="footer-top-section">
          {/* Column 1: Brand Identity */}
          <div className="footer-identity-col">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img src={logoWebp} alt="Host2Unlimited Logo" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
              Host2Unlimited is Strategic Digital Partner for Educational Institutes in Maharashtra founded in 2010. We are Digital Partner for Educational Institutes like International Schools, Engineering/MBA Colleges, Educational Campus & Universities, etc.
            </p>
            
            <div>
              <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', fontWeight: 700 }}>
                Follow Our Journey
              </strong>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="https://facebook.com/host2unlimited" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com/host2unlimited" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="https://youtube.com/@host2unlimited" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://linkedin.com/company/host2unlimited" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Reach Us (Contact Cards) */}
          <div className="footer-reach-col">
            <h4 className="footer-header" style={{ marginBottom: '24px' }}>Reach Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="footer-contact-card">
                <span className="contact-icon"><Briefcase size={14} /></span>
                <div style={{ textAlign: 'left' }}>
                  <strong className="contact-card-title">Careers | Placements</strong>
                  <a href="mailto:hr@host2unlimited.com" className="contact-card-link">hr@host2unlimited.com</a>
                  <a href="tel:+917021935273" className="contact-card-link">+91 70219 35273</a>
                </div>
              </div>

              <div className="footer-contact-card">
                <span className="contact-icon"><GraduationCap size={14} /></span>
                <div style={{ textAlign: 'left' }}>
                  <strong className="contact-card-title">Marketing & Training</strong>
                  <a href="tel:+919082130971" className="contact-card-link">+91 90821 30971</a>
                </div>
              </div>

              <div className="footer-contact-card">
                <span className="contact-icon"><TrendingUp size={14} /></span>
                <div style={{ textAlign: 'left' }}>
                  <strong className="contact-card-title">New Enquiries | Sales</strong>
                  <a href="tel:+918104612974" className="contact-card-link">+91 81046 12974</a>
                </div>
              </div>

              <div className="footer-contact-card">
                <span className="contact-icon"><Headphones size={14} /></span>
                <div style={{ textAlign: 'left' }}>
                  <strong className="contact-card-title">Client Support Desk</strong>
                  <a href="tel:+918879750893" className="contact-card-link">+91 88797 50893</a>
                  <a href="mailto:info@host2unlimited.com" className="contact-card-link">info@host2unlimited.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Head Office & Presence */}
          <div className="footer-location-col">
            <h4 className="footer-header" style={{ marginBottom: '24px' }}>Location & Presence</h4>
            <div className="footer-contact-card" style={{ borderStyle: 'dashed', marginBottom: '20px' }}>
              <span className="contact-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><MapPin size={14} /></span>
              <div style={{ textAlign: 'left', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <strong className="contact-card-title">Head Office</strong>
                1207, Runwal R-Square, LBS Marg, Veena Nagar, Mulund West, Mumbai – 400080, Maharashtra, India.
              </div>
            </div>

            <div style={{ textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
              <strong style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '10px' }}>
                Our Regional Presence
              </strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {['Mumbai', 'Nashik', 'Pune', 'Chhatrapati Sambhajinagar', 'Jalgaon', 'Satara', 'Sangli', 'Kolhapur'].map((city) => (
                  <span key={city} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block' }} />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider between sections */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />

        {/* ================= SECTION 2: DIRECTORY INDEX (3 Columns) ================= */}
        <div className="footer-bottom-links-grid">
          {/* Quick Links Column */}
          <div className="footer-links-col">
            <h4 className="footer-header">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/services" className="footer-link">Admission Services</Link></li>
              <li><Link to="/solutions" className="footer-link">Educational Institutes we work with</Link></li>
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="/careers" className="footer-link">Digital Marketing Course in Mumbai</Link></li>
              <li style={{ marginTop: '12px', borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Enquiry for Your Institute?</span>
                <Link to="/contact" className="footer-link" style={{ fontWeight: 800, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'underline' }}>Click Here</Link>
              </li>
            </ul>
          </div>

          {/* Marketing Services Column */}
          <div className="footer-links-col">
            <h4 className="footer-header">Marketing Services</h4>
            <ul className="footer-links-list">
              <li><Link to="/services" className="footer-link">Digital Marketing for School</Link></li>
              <li><Link to="/services" className="footer-link">Digital Marketing for Educational Institutes</Link></li>
              <li><Link to="/services" className="footer-link">Website Development</Link></li>
              <li><Link to="/services" className="footer-link">Admissions Marketing</Link></li>
              <li><Link to="/services" className="footer-link">Reputation Management</Link></li>
              <li><Link to="/services" className="footer-link">Content Marketing, Branding</Link></li>
              <li><Link to="/services" className="footer-link">Public Relations</Link></li>
              <li><Link to="/services" className="footer-link">Influencer Activities</Link></li>
              <li><Link to="/services" className="footer-link">Search Engine Optimization</Link></li>
              <li><Link to="/services" className="footer-link">Powerful Video Stories</Link></li>
              <li><Link to="/services" className="footer-link">Maximizing Event Success</Link></li>
              <li><Link to="/services" className="footer-link">SEO for Schools</Link></li>
              <li><Link to="/services" className="footer-link">SEO for Higher Education</Link></li>
              <li><Link to="/services" className="footer-link">SEO For Educational Institutions</Link></li>
              <li><Link to="/services" className="footer-link">Social Media Marketing for Educational Institutions</Link></li>
            </ul>
          </div>

          {/* Institutes We Serve Column */}
          <div className="footer-links-col">
            <h4 className="footer-header">Institutes We Serve</h4>
            <ul className="footer-links-list">
              <li><Link to="/solutions" className="footer-link">Preschools & Daycare Centers</Link></li>
              <li><Link to="/solutions" className="footer-link">Primary & Secondary Schools</Link></li>
              <li><Link to="/solutions" className="footer-link">International Schools CBSE: ICSE: IB Board</Link></li>
              <li><Link to="/solutions" className="footer-link">Private Coaching Institutions</Link></li>
              <li><Link to="/solutions" className="footer-link">Junior and Degree Colleges</Link></li>
              <li><Link to="/solutions" className="footer-link">Institutes of Engineering & Technology</Link></li>
              <li><Link to="/solutions" className="footer-link">Private Educational Institutions</Link></li>
            </ul>
          </div>
        </div>

        {/* Lower row */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '30px', marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            © {currentYear} Host2Unlimited. All rights reserved. Made for growth.
          </p>
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms & Conditions</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-top-section {
          display: grid;
          grid-template-columns: 1.2fr 1.4fr 1.4fr;
          gap: 40px;
          margin-bottom: 20px;
        }
        .footer-identity-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .footer-reach-col {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .footer-location-col {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .footer-bottom-links-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr 1.4fr;
          gap: 40px;
          margin-top: 20px;
        }
        .footer-links-col {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13.5px;
          padding: 0;
          margin: 0;
        }
        .footer-header {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          position: relative;
          display: inline-block;
          padding-bottom: 6px;
          border-bottom: 2px solid var(--border-color);
          align-self: flex-start;
        }
        .footer-header::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 24px;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
        }
        .footer-link {
          transition: all var(--transition-fast);
          color: var(--text-secondary);
          display: inline-block;
        }
        .footer-link:hover {
          color: var(--primary) !important;
          transform: translateX(4px);
        }
        .social-icon {
          display: flex;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .social-icon:hover {
          background-color: var(--primary) !important;
          color: white !important;
          border-color: var(--primary) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }
        .footer-contact-card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 12px 14px;
          border-radius: 10px;
          transition: all var(--transition-fast);
        }
        .footer-contact-card:hover {
          border-color: var(--primary);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);
          transform: translateY(-1.5px);
        }
        .contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background-color: var(--primary-light);
          color: var(--primary);
          flex-shrink: 0;
        }
        .contact-card-title {
          color: var(--text-primary);
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .contact-card-link {
          display: block;
          font-size: 13px;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }
        .contact-card-link:hover {
          color: var(--primary);
        }
        
        @media (max-width: 992px) {
          .footer-top-section {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .footer-bottom-links-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 30px !important;
          }
        }
        @media (max-width: 576px) {
          .footer-bottom-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
