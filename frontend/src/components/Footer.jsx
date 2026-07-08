import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const CURRENT_API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

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
  }, []);

  return (
    <footer style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '80px 0 30px 0', position: 'relative' }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '40px', marginBottom: '60px' }}>
          {/* Column 1: Company Overview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="36" height="32" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
                {/* Left blue pillar */}
                <path d="M12,38 L26,30 L26,76 L12,70 Z" fill="#38bdf8" />
                {/* Right blue pillar */}
                <path d="M34,22 L48,14 L48,76 L34,76 Z" fill="#0ea5e9" />
                {/* Arrow slicing through */}
                <path d="M5,60 L62,32" stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round" />
                <path d="M46,24 L62,32 L48,46" stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
                <span style={{ fontFamily: '"Pacifico", cursive', fontSize: '18px', color: '#0ea5e9', fontWeight: 'normal' }}>
                  Host 2 Unlimited
                </span>
                <span style={{ fontSize: '7px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3px', marginTop: '1px' }}>
                  Digital Partner For Educational Institutes
                </span>
              </div>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Empowering businesses worldwide with premium digital solutions, customized software architectures, secure cloud hosting, and result-oriented digital marketing strategies.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={settings.social_links?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook" style={{ display: 'flex', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', alignItems: 'center', justifyContent: 'center', transition: 'all var(--transition-fast)' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={settings.social_links?.twitter || '#'} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter" style={{ display: 'flex', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', alignItems: 'center', justifyContent: 'center', transition: 'all var(--transition-fast)' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={settings.social_links?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn" style={{ display: 'flex', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', alignItems: 'center', justifyContent: 'center', transition: 'all var(--transition-fast)' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/portfolio" className="footer-link">Portfolio</Link></li>
              <li><Link to="/case-studies" className="footer-link">Case Studies</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/admin" className="footer-link" style={{ fontWeight: 600, color: 'var(--primary)' }}>Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 3: Hosting Services */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>Hosting Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
              <li><Link to="/hosting/shared-hosting" className="footer-link">Shared NVMe Hosting</Link></li>
              <li><Link to="/hosting/wordpress-hosting" className="footer-link">WordPress Hosting</Link></li>
              <li><Link to="/hosting/vps-hosting" className="footer-link">KVM VPS Hosting</Link></li>
              <li><Link to="/hosting/dedicated-server-hosting" className="footer-link">Dedicated Servers</Link></li>
              <li><Link to="/hosting/cloud-hosting" className="footer-link">Cloud Hosting</Link></li>
              <li><Link to="/hosting/reseller-hosting" className="footer-link">Reseller Hosting</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '5px', fontFamily: 'var(--font-heading)' }}>Contact Details</h4>
            <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
              <MapPin size={20} className="text-gradient" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                {settings.address}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Sales & Enquiries:</strong>
                <a href={`tel:${settings.phone}`} style={{ color: 'var(--text-secondary)', display: 'block', transition: 'color var(--transition-fast)' }} className="footer-link">
                  {settings.phone}
                </a>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>WhatsApp Desk:</strong>
                <a href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', display: 'block', transition: 'color var(--transition-fast)' }} className="footer-link">
                  {settings.whatsapp_number}
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px' }}>
              <Mail size={18} className="text-gradient" />
              <a href={`mailto:${settings.email}`} style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} className="footer-link">
                {settings.email}
              </a>
            </div>
          </div>
        </div>

        {/* Presence Section */}
        <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '24px 0', margin: '40px 0', textAlign: 'left' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>
            Our Regional Presence
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px', fontSize: '14.5px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {['Mumbai', 'Nashik', 'Pune', 'Chhatrapati Sambhajinagar', 'Jalgaon', 'Satara', 'Sangli', 'Kolhapur'].map((city) => (
              <span key={city} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'inline-block' }} />
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Lower row */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
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
        .footer-link {
          transition: color var(--transition-fast);
          color: var(--text-secondary);
        }
        .footer-link:hover {
          color: var(--primary) !important;
        }
        .social-icon:hover {
          background-color: var(--primary) !important;
          color: white !important;
          transform: translateY(-2px);
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
