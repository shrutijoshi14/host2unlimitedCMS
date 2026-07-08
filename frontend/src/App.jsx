import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Portfolio from './pages/Portfolio';
import CaseStudies from './pages/CaseStudies';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import AdminDashboard from './pages/AdminDashboard';
import BlogPost from './pages/BlogPost';
import ServiceDetail from './pages/ServiceDetail';
import SharedHosting from './pages/hosting/SharedHosting';
import VPSHosting from './pages/hosting/VPSHosting';
import DedicatedHosting from './pages/hosting/DedicatedHosting';
import WordPressHosting from './pages/hosting/WordPressHosting';
import CloudHosting from './pages/hosting/CloudHosting';
import ResellerHosting from './pages/hosting/ResellerHosting';
import { ThemeProvider } from './context/ThemeContext';
import { LeadProvider } from './context/LeadContext';
import { Phone, Mail } from 'lucide-react';

// Scroll to top helper on route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Scroll Indicator Bar Component
function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <motion.div 
      style={{ 
        scaleX, 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '4px', 
        background: 'linear-gradient(90deg, #3b82f6, #0ea5e9, #10b981)', 
        transformOrigin: '0%', 
        zIndex: 999999 
      }} 
    />
  );
}

// Smooth Page Transition Wrapper
const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  // Dynamic SEO application
  useEffect(() => {
    const applySEO = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || window.location.origin}/api/pages/seo`);
        if (response.ok) {
          const seoData = await response.json();
          let key = 'homepage';
          if (location.pathname === '/about') key = 'about';
          else if (location.pathname === '/services') key = 'services';
          else if (location.pathname === '/careers') key = 'careers';
          else if (location.pathname === '/portfolio') key = 'portfolio';

          const pageSEO = seoData[key];
          if (pageSEO) {
            document.title = pageSEO.meta_title;
            
            // Meta description
            let metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.content = pageSEO.meta_desc;

            // Keywords
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) metaKeywords.content = pageSEO.keywords;

            // Canonical link element
            let canonical = document.getElementById('canonical-meta');
            if (canonical) canonical.href = pageSEO.canonical_url;

            // Open Graph Url, Title, Description, Image
            let ogUrl = document.getElementById('og-url-meta');
            if (ogUrl) ogUrl.content = pageSEO.canonical_url;

            let ogTitle = document.getElementById('og-title-meta');
            if (ogTitle) ogTitle.content = pageSEO.meta_title;

            let ogDesc = document.getElementById('og-desc-meta');
            if (ogDesc) ogDesc.content = pageSEO.meta_desc;

            let ogImage = document.getElementById('og-image-meta');
            if (ogImage && pageSEO.og_image) ogImage.content = pageSEO.og_image.startsWith('http') ? pageSEO.og_image : `https://host2unlimited.com${pageSEO.og_image}`;

            // Twitter Cards Url, Title, Description, Image
            let twitterUrl = document.getElementById('twitter-url-meta');
            if (twitterUrl) twitterUrl.content = pageSEO.canonical_url;

            let twitterTitle = document.getElementById('twitter-title-meta');
            if (twitterTitle) twitterTitle.content = pageSEO.meta_title;

            let twitterDesc = document.getElementById('twitter-desc-meta');
            if (twitterDesc) twitterDesc.content = pageSEO.meta_desc;

            let twitterImage = document.getElementById('twitter-image-meta');
            if (twitterImage && pageSEO.og_image) twitterImage.content = pageSEO.og_image.startsWith('http') ? pageSEO.og_image : `https://host2unlimited.com${pageSEO.og_image}`;
          }
        }
      } catch (err) {
        console.warn('SEO dynamic updates offline', err);
      }
    };
    applySEO();
  }, [location.pathname]);

  // Initial site loading screen progress
  useEffect(() => {
    if (loadProgress < 100) {
      const timer = setTimeout(() => {
        setLoadProgress(prev => Math.min(prev + Math.floor(Math.random() * 15) + 5, 100));
      }, 70);
      return () => clearTimeout(timer);
    } else {
      const doneTimer = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(doneTimer);
    }
  }, [loadProgress]);

  // Back to top visible scroll threshold
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTopAction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ScrollToTop />
      
      {/* Scroll Progress Bar at very top of viewport */}
      <ScrollIndicator />

      {/* Loader Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#070b19',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <svg width="70" height="60" viewBox="0 0 80 80">
                <path d="M12,38 L26,30 L26,76 L12,70 Z" fill="#38bdf8" />
                <path d="M34,22 L48,14 L48,76 L34,76 Z" fill="#0ea5e9" />
                <path d="M5,60 L62,32" stroke="white" strokeWidth="8" strokeLinecap="round" />
                <path d="M46,24 L62,32 L48,46" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <h2 style={{ fontFamily: '"Pacifico", cursive', fontSize: '26px', color: '#38bdf8', margin: 0 }}>
                Host 2 Unlimited
              </h2>
              <span style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', fontWeight: 700 }}>
                Initializing {loadProgress}%
              </span>
              <div style={{ width: '160px', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${loadProgress}%`, height: '100%', backgroundColor: '#0ea5e9', transition: 'width 0.1s ease-out' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Layout */}
      <div className="main-layout-wrap" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between', overflowX: 'hidden' }}>
        {location.pathname !== '/admin' && <Header />}
        
        <main style={{ flexGrow: 1 }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
              <Route path="/services" element={<AnimatedPage><Services /></AnimatedPage>} />
              <Route path="/services/:slug" element={<AnimatedPage><ServiceDetail /></AnimatedPage>} />
              <Route path="/hosting/shared-hosting" element={<AnimatedPage><SharedHosting /></AnimatedPage>} />
              <Route path="/hosting/vps-hosting" element={<AnimatedPage><VPSHosting /></AnimatedPage>} />
              <Route path="/hosting/dedicated-server-hosting" element={<AnimatedPage><DedicatedHosting /></AnimatedPage>} />
              <Route path="/hosting/wordpress-hosting" element={<AnimatedPage><WordPressHosting /></AnimatedPage>} />
              <Route path="/hosting/cloud-hosting" element={<AnimatedPage><CloudHosting /></AnimatedPage>} />
              <Route path="/hosting/reseller-hosting" element={<AnimatedPage><ResellerHosting /></AnimatedPage>} />
              <Route path="/solutions" element={<AnimatedPage><Solutions /></AnimatedPage>} />
              <Route path="/portfolio" element={<AnimatedPage><Portfolio /></AnimatedPage>} />
              <Route path="/case-studies" element={<AnimatedPage><CaseStudies /></AnimatedPage>} />
              <Route path="/pricing" element={<AnimatedPage><Pricing /></AnimatedPage>} />
              <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
              <Route path="/blog/:slug" element={<AnimatedPage><BlogPost /></AnimatedPage>} />
              <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
              <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
              <Route path="/careers" element={<AnimatedPage><Careers /></AnimatedPage>} />
              <Route path="/admin" element={<AnimatedPage><AdminDashboard /></AnimatedPage>} />
            </Routes>
          </AnimatePresence>
        </main>

        {location.pathname !== '/admin' && <Footer />}
      </div>

      {/* Floating Actions Panel */}
      {location.pathname !== '/admin' && (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          
          {/* Pulsing WhatsApp button */}
          <motion.a
            className="whatsapp-floating-btn"
            href="https://wa.me/918104612974?text=Hi%20Host2Unlimited%2C%20I'm%20interested%20in%20your%20digital%20marketing%20and%20web%20solutions."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#25d366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
              cursor: 'pointer',
              position: 'relative'
            }}
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.91 0c3.19.001 6.189 1.242 8.448 3.498 2.257 2.256 3.497 5.253 3.497 8.445-.002 6.586-5.327 11.912-11.91 11.912-2.005-.001-3.973-.504-5.714-1.464L0 24zm6.574-3.468c1.657.982 3.28 1.488 4.793 1.489 5.342 0 9.71-4.366 9.712-9.708 0-2.589-1.007-5.023-2.836-6.853C16.413 3.63 13.98 2.622 11.91 2.622c-5.34 0-9.709 4.366-9.711 9.709-.001 1.637.457 3.236 1.325 4.646L2.5 20.5l3.874-.897c.224-.051.455-.078.685-.078z" />
            </svg>
            {/* Ripple Ring */}
            <span className="whatsapp-pulse" />
          </motion.a>

          {/* Back to top scroll button */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                onClick={scrollToTopAction}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-lg)',
                  cursor: 'pointer'
                }}
                title="Scroll to Top"
                aria-label="Scroll to Top"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* Mobile Bottom Sticky Contact Bar */}
      <div className="mobile-sticky-bar">
        <a href="tel:+918104612974" className="sticky-btn sticky-btn-call">
          <Phone size={16} /> Call
        </a>
        <a href="mailto:info@host2unlimited.com" className="sticky-btn sticky-btn-email">
          <Mail size={16} /> Email
        </a>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LeadProvider>
        <Router>
          <AppContent />
        </Router>
      </LeadProvider>
    </ThemeProvider>
  );
}

export default App;
