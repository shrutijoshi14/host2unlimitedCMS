import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CURRENT_API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5050'
  : window.location.origin;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hostingDropdownOpen, setHostingDropdownOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [settings, setSettings] = useState({
    email: 'info@host2unlimited.com',
    phone: '+91 81046 12974'
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
        console.warn('Failed to load dynamic website settings in Header', err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const otherNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Contact', path: '/contact' }
  ];

  const hostingLinks = [
    { name: 'Shared NVMe Hosting', path: '/hosting/shared-hosting' },
    { name: 'WordPress Hosting', path: '/hosting/wordpress-hosting' },
    { name: 'KVM VPS Hosting', path: '/hosting/vps-hosting' },
    { name: 'Dedicated Servers', path: '/hosting/dedicated-server-hosting' },
    { name: 'Cloud Hosting', path: '/hosting/cloud-hosting' },
    { name: 'Reseller Hosting', path: '/hosting/reseller-hosting' }
  ];

  return (
    <>
      <header className={`sticky-nav ${isScrolled ? 'scrolled' : ''}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
        
        {/* Row 1: Top Bar (Desktop only) */}
        <div 
          className="header-top-bar" 
          style={{ 
            borderBottom: isScrolled ? 'none' : '1px solid var(--border-color)', 
            padding: isScrolled ? '0px' : '10px 0', 
            height: isScrolled ? '0px' : 'auto',
            overflow: 'hidden',
            opacity: isScrolled ? 0 : 1,
            backgroundColor: 'var(--bg-secondary)', 
            transition: 'all var(--transition-normal)' 
          }}
        >
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo Left */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="46" height="40" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
                {/* Left blue pillar */}
                <path d="M12,38 L26,30 L26,76 L12,70 Z" fill="#38bdf8" />
                {/* Right blue pillar */}
                <path d="M34,22 L48,14 L48,76 L34,76 Z" fill="#0ea5e9" />
                {/* Arrow slicing through */}
                <path d="M5,60 L62,32" stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round" />
                <path d="M46,24 L62,32 L48,46" stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
                <span style={{ fontFamily: '"Pacifico", cursive', fontSize: '22px', color: '#0ea5e9', fontWeight: 'normal' }}>
                  Host 2 Unlimited
                </span>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: '1px' }}>
                  Enterprise-Level Cloud Web Hosting Solutions
                </span>
              </div>
            </Link>

            {/* Contact details Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13.5px', color: 'var(--text-secondary)' }} className="top-bar-contacts">
              <a href={`tel:${settings.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }} className="nav-link">
                📞 {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }} className="nav-link">
                ✉ {settings.email}
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: Navbar (Nav links and CTA button) */}
        <div className="header-nav-bar" style={{ padding: isScrolled ? '10px 0' : '14px 0', transition: 'all var(--transition-normal)', backgroundColor: 'var(--glass-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Mobile-only Logo */}
            <div className="mobile-only-logo" style={{ display: 'none' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="34" height="30" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
                  <path d="M12,38 L26,30 L26,76 L12,70 Z" fill="#38bdf8" />
                  <path d="M34,22 L48,14 L48,76 L34,76 Z" fill="#0ea5e9" />
                  <path d="M5,60 L62,32" stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round" />
                  <path d="M46,24 L62,32 L48,46" stroke="var(--text-primary)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
                  <span style={{ fontFamily: '"Pacifico", cursive', fontSize: '18px', color: '#0ea5e9', fontWeight: 'normal' }}>
                    Host 2 Unlimited
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation links */}
            <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
              <Link to="/" style={{ fontWeight: 600, fontSize: '14.5px', color: location.pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)' }} className="nav-link">Home</Link>
              <Link to="/about" style={{ fontWeight: 600, fontSize: '14.5px', color: location.pathname === '/about' ? 'var(--primary)' : 'var(--text-secondary)' }} className="nav-link">About</Link>
              
              {/* Dropdown Menu for Hosting Services */}
              <div 
                style={{ position: 'relative' }}
                onMouseEnter={() => setHostingDropdownOpen(true)}
                onMouseLeave={() => setHostingDropdownOpen(false)}
              >
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '14.5px',
                    color: location.pathname.startsWith('/hosting/') ? 'var(--primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '6px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  className="nav-link"
                >
                  Hosting Services <span style={{ fontSize: '10px' }}>▼</span>
                </button>
                
                {hostingDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-lg)',
                      borderRadius: 'var(--radius-md)',
                      width: '230px',
                      padding: '12px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      zIndex: 10000
                    }}
                  >
                    {hostingLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        to={link.path} 
                        style={{ 
                          padding: '10px 20px', 
                          fontSize: '14px', 
                          textAlign: 'left', 
                          fontWeight: 500,
                          color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)' 
                        }} 
                        className="dropdown-link"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/services" style={{ fontWeight: 600, fontSize: '14.5px', color: location.pathname === '/services' ? 'var(--primary)' : 'var(--text-secondary)' }} className="nav-link">Other Services</Link>
              <Link to="/solutions" style={{ fontWeight: 600, fontSize: '14.5px', color: location.pathname === '/solutions' ? 'var(--primary)' : 'var(--text-secondary)' }} className="nav-link">Solutions</Link>
              <Link to="/pricing" style={{ fontWeight: 600, fontSize: '14.5px', color: location.pathname === '/pricing' ? 'var(--primary)' : 'var(--text-secondary)' }} className="nav-link">Pricing</Link>
              <Link to="/blog" style={{ fontWeight: 600, fontSize: '14.5px', color: location.pathname === '/blog' ? 'var(--primary)' : 'var(--text-secondary)' }} className="nav-link">Blog</Link>
              <Link to="/case-studies" style={{ fontWeight: 600, fontSize: '14.5px', color: location.pathname === '/case-studies' ? 'var(--primary)' : 'var(--text-secondary)' }} className="nav-link">Case Studies</Link>
              <Link to="/contact" style={{ fontWeight: 600, fontSize: '14.5px', color: location.pathname === '/contact' ? 'var(--primary)' : 'var(--text-secondary)' }} className="nav-link">Contact</Link>
            </nav>

            {/* Actions: Get Quote, Theme Toggle & Mobile Menu button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              
              {/* Theme toggle */}
              <button 
                onClick={toggleTheme} 
                aria-label="Toggle light and dark themes"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--bg-tertiary)',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Get Quote CTA */}
              <Link to="/contact" className="btn btn-primary cta-btn-header" style={{ padding: '10px 24px', fontSize: '14px' }}>
                Get Started
              </Link>

              {/* Mobile menu toggle button */}
              <button 
                className="mobile-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                style={{
                  display: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  padding: '8px'
                }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

            </div>

          </div>
        </div>

      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`mobile-drawer ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          width: '100%',
          height: 'calc(100vh - 60px)',
          backgroundColor: 'var(--bg-primary)',
          zIndex: 999,
          padding: '24px',
          borderTop: '1px solid var(--border-color)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform var(--transition-normal)',
          boxShadow: 'var(--shadow-xl)',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <Link to="/" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 600, color: location.pathname === '/' ? 'var(--primary)' : 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 600, color: location.pathname === '/about' ? 'var(--primary)' : 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>About Us</Link>
          
          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            <span>Hosting Services</span>
            <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '2px solid var(--border-color)' }}>
              {hostingLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  style={{ 
                    fontSize: '14.5px', 
                    fontWeight: 500, 
                    color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)' 
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <Link to="/services" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 600, color: location.pathname === '/services' ? 'var(--primary)' : 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Other Services</Link>
          <Link to="/solutions" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 600, color: location.pathname === '/solutions' ? 'var(--primary)' : 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Solutions</Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 600, color: location.pathname === '/pricing' ? 'var(--primary)' : 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Pricing</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 600, color: location.pathname === '/blog' ? 'var(--primary)' : 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Blog</Link>
          <Link to="/case-studies" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 600, color: location.pathname === '/case-studies' ? 'var(--primary)' : 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Case Studies</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} style={{ fontSize: '16px', fontWeight: 600, color: location.pathname === '/contact' ? 'var(--primary)' : 'var(--text-primary)', paddingBottom: '4px' }}>Contact Us</Link>
        </div>
      </div>

      {/* CSS overrides for responsive header styling */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .cta-btn-header {
            display: none !important;
          }
          .header-top-bar {
            display: none !important;
          }
          .mobile-only-logo {
            display: flex !important;
            align-items: center !important;
          }
          .mobile-admin-icon {
            display: block !important;
          }
        }
        @media (max-width: 480px) {
          .admin-btn-text {
            display: none !important;
          }
        }
        .nav-link:hover {
          color: var(--primary) !important;
        }
      `}</style>
    </>
  );
};

export default Header;
