import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import logoPng from '../assets/logo.png';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

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
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Educational Institutes', path: '/educational-institutes' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
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
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={logoPng} alt="Host2Unlimited Logo" style={{ height: '58px', width: 'auto', objectFit: 'contain' }} />
            </Link>

            {/* Contact details Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13.5px', color: 'var(--text-secondary)' }} className="top-bar-contacts">
              <a href="tel:+918104612974" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }} className="nav-link">
                📞 +91 81046 12974
              </a>
              <a href="mailto:info@host2unlimited.com" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }} className="nav-link">
                ✉ info@host2unlimited.com
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: Navbar (Nav links and CTA button) */}
        <div className="header-nav-bar" style={{ padding: isScrolled ? '10px 0' : '14px 0', transition: 'all var(--transition-normal)', backgroundColor: darkMode ? 'var(--glass-bg)' : 'rgba(241, 245, 249, 0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Mobile-only Logo */}
            <div className="mobile-only-logo" style={{ display: 'none' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logoPng} alt="Host2Unlimited Logo" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
              </Link>
            </div>

            {/* Desktop Navigation links */}
            <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
              {otherNavLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  style={{ 
                    fontWeight: 600, 
                    fontSize: '14px'
                  }} 
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
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
          {otherNavLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              style={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-primary)', 
                borderBottom: '1px solid var(--border-color)', 
                paddingBottom: '8px' 
              }}
            >
              {link.name}
            </Link>
          ))}
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
        .desktop-menu .nav-link {
          position: relative;
          padding: 6px 0;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .desktop-menu .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary);
          transition: width 0.3s ease;
        }
        .desktop-menu .nav-link:hover::after,
        .desktop-menu .nav-link.active::after {
          width: 100%;
        }
        .desktop-menu .nav-link.active {
          color: var(--primary) !important;
        }
        .top-bar-contacts .nav-link:hover {
          color: var(--primary) !important;
        }
      `}</style>
    </>
  );
};

export default Header;
