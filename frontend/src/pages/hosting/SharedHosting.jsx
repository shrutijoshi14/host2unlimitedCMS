import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, Globe, Server, Award, ChevronDown, ChevronUp, AlertCircle, Users, HardDrive } from 'lucide-react';
import SEOMeta from '../../components/SEOMeta';
import Breadcrumbs from '../../components/Breadcrumbs';

const SharedHosting = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbs = [
    { name: 'Services', path: '/services' },
    { name: 'Shared Hosting', path: '/hosting/shared-hosting' }
  ];

  const pricingPlans = [
    {
      name: 'Starter Web',
      price: '₹149',
      period: 'mo',
      desc: 'Perfect for single websites and personal portfolios looking to launch quickly.',
      features: [
        '1 Website Hosting',
        '20 GB High-Speed NVMe Storage',
        'Unmetered Bandwidth',
        'Free SSL Certificate',
        '1-Click WordPress Install',
        'Daily Backups (Weekly retention)',
        '24/7 Live Support Desk'
      ],
      popular: false,
      cta: 'Buy Starter'
    },
    {
      name: 'Unlimited Plus',
      price: '₹299',
      period: 'mo',
      desc: 'The best option for growing businesses, startups, and active blog networks.',
      features: [
        'Unlimited Websites',
        '100 GB NVMe Storage Space',
        'Unmetered Bandwidth & CPU',
        'Free Unlimited SSLs',
        'Advanced Speed Boosters (LSCache)',
        'Daily Automated Backups',
        'Free Domain Registration (1 yr)',
        'Priority Phone Support'
      ],
      popular: true,
      cta: 'Buy Unlimited Plus'
    },
    {
      name: 'Business Pro',
      price: '₹499',
      period: 'mo',
      desc: 'Top-tier plan with maximum CPU resources, staging sites, and database power.',
      features: [
        'Unlimited Websites & Subdomains',
        'Uncapped NVMe Storage Space',
        'Free Professional Email ID',
        'Dedicated IP Address',
        'Imunify360 Malware Scanner',
        'WordPress Staging Environment',
        'Premium Cloudflare CDN integration',
        'Dedicated Account Manager'
      ],
      popular: false,
      cta: 'Buy Business Pro'
    }
  ];

  const hostingFaqs = [
    {
      question: 'What is Shared NVMe Hosting?',
      answer: 'Shared hosting is a secure, low-latency environment where multiple websites share resources on a single physical server. Host2Unlimited upgrades this standard by running all shared accounts on enterprise NVMe solid-state drives, guaranteeing up to 10x faster write and read speeds compared to traditional HDD hosting providers.'
    },
    {
      question: 'Will I get a free SSL certificate?',
      answer: 'Yes! Every active shared hosting package at Host2Unlimited includes automatic, free Let’s Encrypt SSL certificates for all your websites and domains to protect user inputs and satisfy search engine compliance.'
    },
    {
      question: 'Can I transfer my existing website for free?',
      answer: 'Absolutely. We offer complete migration assistance for zero cost. Our hosting migration experts will copy your databases, site files, and mailboxes from your previous host without any website downtime.'
    },
    {
      question: 'What control panel do you provide?',
      answer: 'We provide the industry-standard cPanel control panel interface. Through cPanel, you can quickly manage files, deploy MySQL databases, create custom email addresses, and configure backups with absolute ease.'
    },
    {
      question: 'Do you offer an uptime guarantee?',
      answer: 'Yes, Host2Unlimited guarantees a 99.9% uptime Service Level Agreement (SLA). We utilize redundant server architectures, failover routing systems, and real-time monitoring to keep websites active round-the-clock.'
    }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <SEOMeta
        title="High-Speed Shared NVMe Hosting | Host2Unlimited"
        description="Launch your website with Host2Unlimited's blazing-fast Shared NVMe Hosting. Get free SSL, cPanel, 99.9% uptime, 1-click installer, and 24/7 support. Plans start at just ₹149/mo!"
        keywords="shared hosting, nvme hosting, cheap web hosting, fast shared hosting, cpanel hosting, host2unlimited, website hosting"
        canonical="https://host2unlimited.com/hosting/shared-hosting"
        schemaType="Product"
        faqList={hostingFaqs}
        breadcrumbPaths={breadcrumbs}
      />

      <div style={{ paddingTop: '100px' }}>
        <Breadcrumbs paths={breadcrumbs} />
      </div>

      {/* Hero Header */}
      <section className="section-padding" style={{ padding: '80px 0', position: 'relative', background: 'var(--grad-hero)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }} className="hero-grid">
            <div style={{ textAlign: 'left' }}>
              <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '13.5px', fontWeight: 700, display: 'inline-block', marginBottom: '16px' }}>
                ⚡ Blazing-Fast & Reliable
              </span>
              <h1 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.2, marginBottom: '20px', textAlign: 'left' }}>
                Enterprise Shared NVMe Hosting Built for Maximum Page Speed
              </h1>
              <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '30px' }}>
                Experience lightning-fast load speeds, cPanel integration, and complete technical peace of mind. We deploy websites on state-of-the-art enterprise-grade solid-state NVMe drives with LiteSpeed web server technology, delivering unmatched speeds to satisfy visitors and boost Google rankings.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#pricing" className="btn btn-primary">View Pricing Plans</a>
                <Link to="/contact" className="btn btn-secondary">Request Free Consultation</Link>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }} className="animate-float">
              <div className="card-glass" style={{ padding: '24px', maxWidth: '400px', borderLeft: '5px solid var(--primary)', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', textAlign: 'left' }}>All Shared Plans Include:</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Free Auto-SSL Certificates</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Standard cPanel Control Board</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> 1-Click Softaculous Installer</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Uncapped NVMe Solid-State Drives</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Weekly Offline Automated Backups</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Zero-cost Website Migration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Transparent Shared Hosting Pricing</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              Choose a hosting plan tailored to your project requirements. Save more with annual subscriptions and lock in permanent discounts.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {pricingPlans.map((plan, idx) => (
              <motion.div 
                key={idx}
                className="card-glass"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-primary)',
                  position: 'relative',
                  border: plan.popular ? '2px solid var(--primary)' : '1px solid var(--glass-border)'
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {plan.popular && (
                  <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary)', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                    MOST POPULAR
                  </span>
                )}
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px', textAlign: 'left' }}>{plan.name}</h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '24px', textAlign: 'left', lineHeight: 1.4 }}>{plan.desc}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)' }}>{plan.price}</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/{plan.period}</span>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'left' }}>
                        <Check size={16} className="text-gradient" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/contact" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Content Section (Min 800 words goal) */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '960px', textAlign: 'left' }}>
          
          <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '24px', textAlign: 'left' }}>
            Why Choose Host2Unlimited for Web Hosting Services?
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Finding a reliable hosting partner represents a massive milestone in establishing a robust digital footprint. At Host2Unlimited, we understand that site load speed, continuous uptime, security protections, and support desks form the foundation of successful web ventures. Our shared NVMe web hosting setups combine next-generation technologies to guarantee speed optimization, safety compliance, and direct administration metrics.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            LiteSpeed Web Server & Enterprise NVMe Storage Advantage
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Traditional web hosts still construct hosting nodes on old-fashioned SATA HDDs or basic SSD configurations. Host2Unlimited replaces legacy filesystems with solid-state enterprise NVMe technology. NVMe drives are built to operate with dynamic read/write throughput rates exceeding standard storage setups by 10x. This speed injection ensures database-driven frameworks, like WordPress or custom databases, execute queries in fractions of a second.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            In addition to high-performance storage configurations, we run optimized LiteSpeed Web Servers instead of generic Apache frameworks. LiteSpeed uses modern event-driven architectures to process thousands of concurrent connection entries with minimal RAM usage. Integrated with LiteSpeed Cache (LSCache) plugins, dynamic components are converted into static templates instantly, maintaining speed under peak traffic thresholds.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Security Hardening with Imunify360 & Firewalls
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Cybersecurity threats are rising, making active protection crucial. We configure Imunify360 security modules across all shared hosting nodes. Imunify360 acts as a continuous scanning sentinel, checking website folders in real-time to detect malware payloads, PHP injection lines, Trojan viruses, and script modifications automatically.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Our hardware firewall configurations prevent DDoS vectors from saturating network pipelines. With continuous security monitoring, web assets are sandboxed in isolated folders, blocking adjacent server configurations from accessing administrative structures. This means database records, client details, and transaction histories remain fully private and compliant with data privacy frameworks.
          </p>

          {/* Comparison Table */}
          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '40px', marginBottom: '20px', textAlign: 'left' }}>
            Detailed Server Capabilities Comparison
          </h3>
          <div className="table-responsive" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
            <table>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Feature Metric</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Host2Unlimited Shared</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Standard Hosts (HDD/SATA)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Storage Drive Type</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>PCIe Gen4 NVMe</td>
                  <td style={{ padding: '16px' }}>SATA SSD / HDD Disk</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Web Server Framework</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>LiteSpeed Enterprise</td>
                  <td style={{ padding: '16px' }}>Apache / Nginx Standard</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Security Layer</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>Imunify360 + CSF Firewall</td>
                  <td style={{ padding: '16px' }}>Basic ModSecurity rules</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Cache Acceleration</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>LSCache + Redis support</td>
                  <td style={{ padding: '16px' }}>Static file caching only</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Customer Migrations</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>Free, full assistance</td>
                  <td style={{ padding: '16px' }}>Paid / manual instructions</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Optimized Internal Linking and Website Health
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            We recommend syncing your shared hosting accounts with our specialized <Link to="/services" style={{ color: 'var(--primary)', fontWeight: 600 }}>Web Development Services</Link> to ensure your React structures, CSS rules, and visual components load efficiently. Additionally, reviewing our <Link to="/pricing" style={{ color: 'var(--primary)', fontWeight: 600 }}>Development Pricing Packages</Link> helps you integrate database structures, user portals, and contact forms within a budget-friendly pipeline.
          </p>

        </div>
      </section>

      {/* Trust Signals & Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left' }}>
            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'gold', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Host2Unlimited moved our corporate portal from a slow SATA VPS to their Shared NVMe hosting node. Page load speeds went from 5.4 seconds to under 1.2 seconds, resulting in immediate organic traffic growth!"
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Sandeep Deshmukh</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>AgriGlobal Exports</span>
            </div>
            
            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'gold', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Our previous web host had constant database connection issues. Since migrating to Host2Unlimited cPanel shared nodes, our sites have remained active without a single minute of downtime. Free migrations saved us days of manual setup."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Priya Nair</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>EduSphere Hub</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'gold', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Setting up custom mailboxes and checking logs through cPanel is smooth. Their 24/7 technical desk solved our DNS configuration queries in under 15 minutes."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Marcus Vance</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>CloudScale SaaS Co.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Shared Hosting FAQ</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px' }}>
              Got questions? Read through our technical FAQ checklist for details on setup, pricing, and migrations.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            {hostingFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isOpen ? 'var(--primary-light)' : 'var(--bg-secondary)',
                    overflow: 'hidden',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '18px 24px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '15.5px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div style={{ padding: '0 24px 20px 24px', color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6, borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="card-glass" style={{ background: 'var(--grad-primary)', color: 'white', padding: '50px 30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, margin: 0 }}>
                Ready to Deploy Your Website on NVMe Speeds?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontSize: '15.5px', margin: 0 }}>
                Join hundreds of active websites scaling their databases and conversion rates. Our experts handle the setup, migrations, and firewalls.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Link to="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                  Get Started Now
                </Link>
                <Link to="/contact" className="btn btn-glass" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                  Request Custom Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SharedHosting;
