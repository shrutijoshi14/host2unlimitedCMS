import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, CheckCircle, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticServicesData = [
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
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title="Services"
        description="Explore our full range of professional services: E-commerce, customized business software, digital marketing campaigns, and technical SEO optimizations."
        keywords="web services, custom software development, digital marketing, SEO optimization, Host2Unlimited"
        canonical="https://host2unlimited.com/services"
        breadcrumbPaths={breadcrumbs}
      />
      <Breadcrumbs paths={breadcrumbs} />

      <div className="container" style={{ marginTop: '40px' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ 
            display: 'inline-block', 
            backgroundColor: 'var(--primary-light)', 
            color: 'var(--primary)', 
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontWeight: 600, 
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            {banner.subtitle} {isCMSActive && '• Live'}
          </span>
          <h1 style={{ fontSize: '44px', fontWeight: 800, marginBottom: '20px' }}>{banner.title}</h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.6 }}>
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
                  style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    {/* Icon wrap */}
                    <div className="card-icon-container" style={{ width: '56px', height: '56px', borderRadius: '14px', marginBottom: '24px' }}>
                      <Icon size={26} />
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>{service.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>{service.desc || service.description}</p>
                    
                    {/* Features list */}
                    {service.features && service.features.length > 0 && (
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                        {service.features.map((feat, fidx) => (
                          <li key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
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

      </div>
    </div>
  );
};

export default Services;
