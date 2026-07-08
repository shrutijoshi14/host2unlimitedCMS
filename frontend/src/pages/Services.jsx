import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, CheckCircle, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const CURRENT_API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5050'
  : window.location.origin;

const staticServicesData = [
  {
    icon_name: 'Globe',
    title: 'Website Development',
    desc: 'Responsive, modern websites built for speed, redundant security, and high user conversion rates.',
    features: ['Corporate Portals', 'SaaS Landing Pages', 'WordPress/Headless CMS Development', 'Website Redesign & Speed Optimization', 'Custom React & Vue Frameworks'],
    slug: 'website-development'
  },
  {
    icon_name: 'Cpu',
    title: 'Custom Software Development',
    desc: 'Business software solutions tailored to automate manual operations, remove pipeline errors, and improve team productivity.',
    features: ['Enterprise Resource Planning (ERP)', 'Custom Customer Relationship Managers (CRM)', 'Third-Party API Integrations', 'Client Portals & Booking Platforms', 'Automated Accounting & Billing Software'],
    slug: 'custom-software-development'
  },
  {
    icon_name: 'Cloud',
    title: 'Cloud Hosting Solutions',
    desc: 'Highly reliable cloud hosting architectures optimized for low latency, secure database backups, and guaranteed uptime.',
    features: ['Managed Amazon Web Services (AWS)', 'Google Cloud & Azure Deployments', 'Continuous Backup & Restore Systems', 'SSL/TLS & Security Policies Setup', 'Scalable Virtual Private Servers (VPS)'],
    slug: 'cloud-hosting-solutions'
  },
  {
    icon_name: 'LineChart',
    title: 'SEO Services',
    desc: 'Improve search visibility, rise to the top of Google page-rankings, and drive organic qualified traffic to your platforms.',
    features: ['Technical Website SEO Audits', 'Local SEO & Google Maps optimization', 'Content Strategy & Link Building', 'Keyword Rank & Analytics Reports', 'Page Speed & Core Web Vitals optimization'],
    slug: 'seo-services'
  },
  {
    icon_name: 'Megaphone',
    title: 'Digital Marketing',
    desc: 'Reach the right demographics through targeted campaigns that maximize advertising return-on-investment (ROI).',
    features: ['Pay-Per-Click Ads (Google & Socials)', 'Social Media Management (SMM)', 'High-Converting Sales Funnels', 'Email Marketing Campaigns', 'Brand Strategy & Identity Consulting'],
    slug: 'digital-marketing'
  },
  {
    icon_name: 'ShoppingCart',
    title: 'E-Commerce Development',
    desc: 'Scalable online stores with frictionless checkout screens, stock synchronizations, and customer administration.',
    features: ['Custom WooCommerce & Shopify Stores', 'Secure Payment Gateways Integration', 'Multi-currency & Multilingual support', 'Order, Inventory & Tax Tracking Modules', 'Customer Loyalty & Discounts setups'],
    slug: 'e-commerce-development'
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
                    <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
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
