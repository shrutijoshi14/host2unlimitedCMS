import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import EducationalInstitutes from './pages/EducationalInstitutes';
import EducationalInstituteDetail from './pages/EducationalInstituteDetail';
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
import logoWebp from './assets/logo.webp';

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
  const [settings, setSettings] = useState({ whatsapp_number: '+91 81046 12974' });
  const location = useLocation();

  useEffect(() => {
    const apiBase = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${apiBase}/api/pages/website_settings`);
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (err) {
        console.warn('Failed to load website settings in AppContent', err);
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

  // Dynamic SEO application
  useEffect(() => {
    const applySEO = async () => {
      try {
        const apiBase = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');
        const response = await fetch(`${apiBase}/api/pages/seo`);
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

  // Server-Sent Events subscriber for real-time updates
  useEffect(() => {
    const apiBase = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');
    const eventSource = new EventSource(`${apiBase}/api/events`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'page_update') {
          window.dispatchEvent(new CustomEvent('cmsPageUpdate', { detail: data }));
        } else if (data.type === 'module_update') {
          window.dispatchEvent(new CustomEvent('cmsModuleUpdate', { detail: data }));
        } else if (data.type === 'service_update') {
          window.dispatchEvent(new CustomEvent('cmsServiceUpdate', { detail: data }));
        } else if (data.type === 'blog_update') {
          window.dispatchEvent(new CustomEvent('cmsBlogUpdate', { detail: data }));
        }
      } catch (err) {
        console.warn('Real-time event parse error:', err);
      }
    };

    return () => {
      eventSource.close();
    };
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
              <img src={logoWebp} alt="Host2Unlimited Logo" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
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
              <Route path="/educational-institutes" element={<AnimatedPage><EducationalInstitutes /></AnimatedPage>} />
              <Route path="/educational-institutes/:id" element={<AnimatedPage><EducationalInstituteDetail /></AnimatedPage>} />
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
        <a href={`tel:${(settings.whatsapp_number || '+91 81046 12974').replace(/[^\d+]/g, '')}`} className="sticky-btn sticky-btn-call">
          <Phone size={16} /> Call
        </a>
        <a href={`https://wa.me/${(settings.whatsapp_number || '918104612974').replace(/\D/g, '')}`} className="sticky-btn sticky-btn-whatsapp" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '4px' }}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.501-5.727-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.116-2.905-6.993-1.876-1.878-4.36-2.91-7-2.912-5.445 0-9.87 4.417-9.873 9.861-.001 1.77.463 3.5 1.34 5.02L1.86 21.19l4.787-1.256zM17.65 14.5c-.307-.154-1.82-.9-2.1-.1s-.1.5-.1.5-.2.2-.4.1-.7-.3-1.3-.9c-.5-.4-.8-.9-.9-1.1-.1-.2-.1-.3 0-.4l.3-.3.2-.3c.1-.1.1-.2 0-.3s-.8-2.1-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4s-1.1 1.1-1.1 2.7.9 3.1 1.1 3.3c.2.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.7.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4s.2-1.3.1-1.4-.4-.2-.7-.3z"/></svg> WhatsApp
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
