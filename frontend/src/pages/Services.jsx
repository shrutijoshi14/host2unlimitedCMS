import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, CheckCircle, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import Timeline from '../components/Timeline';
import servicesHeroBg from '../assets/hero_bg/services_hero_art.svg';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticServicesData = [
  {
    icon_name: 'Share2',
    title: 'Social Media Marketing',
    desc: 'Data-driven social media management, organic strategy, paid ads, and targeted engagement campaigns to grow your brand.',
    features: ['High-Converting Paid Ad Campaigns', 'Social Media Strategy & Content Calendars', 'Community Engagement & Monitoring', 'Custom Graphic & Video Reels Production', 'Performance Analytics & Monthly Audits'],
    slug: 'social-media-marketing'
  },
  {
    icon_name: 'Globe',
    title: 'Web Development',
    desc: 'Responsive, modern websites built for high performance, top-tier security, and optimized user conversions.',
    features: ['Custom React & WordPress Sites', 'Mobile Responsive Layouts', 'Speed Optimization & CDN Setup', 'Interactive Enquiry Forms', 'Secure Code & SSL Integrations'],
    slug: 'web-development'
  },
  {
    icon_name: 'Megaphone',
    title: 'Digital Marketing',
    desc: 'Digital marketing activities involve using online platforms and tools to promote a brand, product, or service.',
    features: ['Search Engine Optimization (SEO)', 'Social Media Management', 'Google Ads & Paid Campaigns', 'Email Marketing & Automation', 'Analytics, Strategy & Reporting'],
    slug: 'digital-marketing'
  },
  {
    icon_name: 'GraduationCap',
    title: 'Admissions Marketing',
    desc: 'Choosing the right institution sets the foundation for your child’s or your own future success. Our programs are designed to inspire curiosity, creativity, and confidence.',
    features: ['Quality Leads Generation Campaigns', 'Custom Demographics Targeting', 'Student Inquiry Conversion Trackers', 'Campaign ROI Audits', 'Multi-channel Ads Management'],
    slug: 'admissions-marketing'
  },
  {
    icon_name: 'ShieldCheck',
    title: 'Reputation Management',
    desc: 'Reputation management is the practice of shaping how your brand, business, or personal identity is perceived by the public in the digital era.',
    features: ['Online Reviews Monitoring', 'Social Media Listening', 'Crisis Management & Support', 'Brand Credibility Enhancements', 'Feedback Surveys & Analysis'],
    slug: 'reputation-management'
  },
  {
    icon_name: 'FileText',
    title: 'Content Marketing',
    desc: 'Content marketing is more than just creating posts — it’s about telling a story that connects with your audience and builds lasting trust.',
    features: ['Educational Blogs & Articles', 'Creative Visual Copywriting', 'Consistent Brand Messaging', 'Branded Graphic Assets', 'Audience Growth Strategies'],
    slug: 'content-marketing'
  },
  {
    icon_name: 'Users',
    title: 'Public Relations',
    desc: 'PR is the strategic communication process that organizations use to build and maintain a positive image with their audience, stakeholders, and the public.',
    features: ['Media Outlets Partnerships', 'Press Releases Drafting', 'Keynote & Event PR Coverage', 'Stakeholders Engagement Desk', 'Crisis Communications'],
    slug: 'public-relations'
  },
  {
    icon_name: 'UserCheck',
    title: 'Influencer Activities',
    desc: 'Influencer activities are powerful collaborations between brands and social media personalities to increase visibility, trust, and organic engagement.',
    features: ['Alumni Advocacy Networks', 'Social Personalities Sourcing', 'Authentic Campaign Narrative', 'Audience Trust Verification', 'Impact Analysis Reports'],
    slug: 'influencer-activities'
  },
  {
    icon_name: 'Search',
    title: 'Search Engine Optimization',
    desc: 'Search Engine Optimization (SEO) is the process of enhancing a website’s visibility on search engines like Google, Bing, and Yahoo.',
    features: ['Technical Site SEO Audits', 'Local SEO & Maps Rankings', 'Targeted Keyword Mapping', 'Link Building Campaigns', 'Core Web Vitals Optimizations'],
    slug: 'search-engine-optimization'
  },
  {
    icon_name: 'Video',
    title: 'Powerful Video Stories',
    desc: 'Capturing failure, learning, and growth through determination. Setbacks become stepping stones, captured with emotional details and inspiring narratives.',
    features: ['Seamless Event Video Coverage', 'Alumni Interview Stories', 'Professional Sound Design', 'Creative Visual Storyboarding', 'Multi-platform Video Reels'],
    slug: 'powerful-video-stories'
  },
  {
    icon_name: 'Calendar',
    title: 'Event Marketing',
    desc: 'Incorporate Brand Visibility, Interactive Session setups, and Lead Captures to showcase your brand to the right audience.',
    features: ['Brand Visibility & Display', 'Interactive Sessions Planning', 'Visitor Lead Captures', 'Post-Event Blog Narratives', 'Logistics Execution Management'],
    slug: 'event-marketing'
  }
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCMSActive, setIsCMSActive] = useState(false);
  const [banner, setBanner] = useState({
    title: 'Digital Marketing & Technology Solutions',
    subtitle: 'Our Capabilities',
    desc: 'We provide full-spectrum digital marketing and development services as a partner of educational institutes like international schools, colleges, and campuses, crafting customized ERP software, websites, and cloud configurations.'
  });

  useEffect(() => {
    const fetchServicesCatalog = async () => {
      try {
        setLoading(true);
        // 1. Check modules configuration
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        
        let cmsEnabled = false;
        let bannerActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const servicesMod = modules.find(m => m.id === 'services');
          if (servicesMod && servicesMod.enabled === 1) {
            cmsEnabled = true;
          }
          const targetBannerMod = modules.find(m => m.id === 'banner');
          if (targetBannerMod && targetBannerMod.enabled === 1) {
            bannerActive = true;
          }
        }

        setIsCMSActive(cmsEnabled);

        if (cmsEnabled) {
          // 2. Fetch services list from backend
          const servicesResponse = await fetch(`${CURRENT_API_BASE}/api/services`);
          if (servicesResponse.ok) {
            const data = await servicesResponse.json();
            setServices(data);
          } else {
            throw new Error('Failed to fetch services.');
          }
        } else {
          // 3. Fallback to static services
          setServices(staticServicesData);
        }

        if (bannerActive) {
          const bannerRes = await fetch(`${CURRENT_API_BASE}/api/pages/banner`);
          if (bannerRes.ok) {
            const bannerData = await bannerRes.json();
            if (bannerData.services) {
              setBanner(bannerData.services);
            }
          }
        }
      } catch (err) {
        console.warn('CMS connection failed, loading static services fallback.', err);
        setIsCMSActive(false);
        setServices(staticServicesData);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesCatalog();
  }, []);

  const breadcrumbs = [{ name: 'Services', path: '/services' }];

  return (
    <div style={{ paddingTop: '80px' }}>
      <SEOMeta
        title="Services"
        description="Explore our full range of professional services: E-commerce, customized business software, digital marketing campaigns, and technical SEO optimizations."
        keywords="web services, custom software development, digital marketing, SEO optimization, Host2Unlimited"
        canonical="https://host2unlimited.com/services"
        breadcrumbPaths={breadcrumbs}
      />
      
      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ position: 'relative', height: '280px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#0b0f19' }}
      >
        <img 
          src={servicesHeroBg} 
          alt="Services Hero Background" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center center',
            zIndex: 1, 
            pointerEvents: 'none' 
          }} 
        />
        <div className="container hero-content-wrapper" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <Breadcrumbs paths={breadcrumbs} />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {/* Subpage Header Content */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 45px auto' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>{banner.subtitle || 'Our Capabilities'}</span>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.5px', lineHeight: 1.25 }}>
            {banner.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7 }}>
            {banner.desc}
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Retrieving services catalog...
          </div>
        ) : (
          /* Services Grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>
            {services.map((service, idx) => {
              // Dynamically map icon names
              const Icon = Icons[service.icon_name] || Globe;
              
              return (
                <motion.div 
                  key={service.id || idx} 
                  className="card-glass"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    {/* Icon wrap */}
                    <div className="card-icon-container" style={{ width: '56px', height: '56px', borderRadius: '14px', margin: '0 auto 24px auto' }}>
                      <Icon size={26} />
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', textAlign: 'center' }}>{service.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6, textAlign: 'center' }}>{service.desc || service.description}</p>
                    
                    {/* Features list */}
                    {service.features && service.features.length > 0 && (
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px', padding: 0 }}>
                        {service.features.map((feat, fidx) => (
                          <li key={fidx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                            <CheckCircle size={16} className="text-gradient" style={{ flexShrink: 0 }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {isCMSActive ? (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link to={`/services/${service.slug}`} className="btn btn-secondary" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        View Details <ArrowRight size={15} />
                      </Link>
                      <Link to="/contact" className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', padding: '10px 16px' }}>
                        Brief Us
                      </Link>
                    </div>
                  ) : (
                    <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      Request Brief <ArrowRight size={15} />
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA Banner from Homepage */}
        <section style={{ padding: '60px 0 20px 0', position: 'relative' }}>
          <div className="card-glass" style={{ 
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #2563eb 100%)', 
            color: 'white', 
            padding: '65px 40px', 
            position: 'relative', 
            overflow: 'hidden', 
            borderRadius: '28px',
            boxShadow: '0 25px 60px rgba(37, 99, 235, 0.3)',
            border: '1px solid rgba(147, 197, 253, 0.25)'
          }}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}>
              <path d="M-100 200 C100 100, 300 300, 500 100 C700 200, 900 50, 1100 250" fill="none" stroke="#60a5fa" strokeWidth="8" />
              <path d="M-100 250 C100 150, 300 350, 500 150 C700 250, 900 100, 1100 300" fill="none" stroke="#93c5fd" strokeWidth="4" />
            </svg>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px', textAlign: 'center' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(96, 165, 250, 0.25)', color: '#93c5fd', border: '1px solid rgba(147, 197, 253, 0.4)', fontSize: '13px', padding: '6px 20px', fontWeight: 800, letterSpacing: '0.8px' }}>
                🚀 CORE SERVICES GROWTH PARTNER FOR CAMPUSES
              </span>

              <h2 style={{ color: 'white', fontSize: 'clamp(22px, 3.8vw, 34px)', fontWeight: 900, margin: 0, lineHeight: 1.3, maxWidth: '980px', letterSpacing: '-0.5px' }}>
                Strategic Digital Marketing Services for Educational Institutes with our Dedicated Person at Campus!
              </h2>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', margin: '4px 0' }}>
                {['MUMBAI', 'NASHIK', 'PUNE', 'SATARA', 'PAN MAHARASHTRA'].map((region, ridx) => (
                  <span key={ridx} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fef08a',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    border: '1px solid rgba(254, 240, 138, 0.3)'
                  }}>
                    📍 {region}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', margin: '6px 0' }}>
                <span style={{ fontSize: '14.5px', color: '#e2e8f0', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#4ade80', fontWeight: 900 }}>✓</span> Dedicated Person at Campus
                </span>
                <span style={{ fontSize: '14.5px', color: '#e2e8f0', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#4ade80', fontWeight: 900 }}>✓</span> Quality Leads Generation Ads Campaigns
                </span>
                <span style={{ fontSize: '14.5px', color: '#e2e8f0', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#4ade80', fontWeight: 900 }}>✓</span> Strategic Admission Boosting
                </span>
              </div>

              <p style={{ color: 'rgba(241, 245, 249, 0.95)', maxWidth: '850px', fontSize: '15.5px', margin: 0, lineHeight: 1.6, textAlign: 'center' }}>
                Strategic Digital Marketing Services for Educational Institutes with our Dedicated Person at Campus! Boost Your Institute Admissions with our Quality Leads Generation Ads Campaigns.
              </p>

              <div style={{ marginTop: '12px' }}>
                <Link 
                  to="/contact" 
                  className="btn" 
                  style={{ 
                    backgroundColor: '#ffffff', 
                    color: '#0284c7', 
                    fontWeight: 800, 
                    padding: '16px 36px', 
                    fontSize: '16px',
                    borderRadius: '30px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  Enquiry Form to Get Started <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Services;
