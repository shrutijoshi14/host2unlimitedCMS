import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, Globe, Server, Award, ChevronDown, ChevronUp, AlertCircle, Users, Settings } from 'lucide-react';
import SEOMeta from '../../components/SEOMeta';
import Breadcrumbs from '../../components/Breadcrumbs';
import servicesHeroBg from '../../assets/hero_bg/services_hero_art.svg';

const ResellerHosting = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbs = [
    { name: 'Services', path: '/services' },
    { name: 'Reseller Hosting', path: '/hosting/reseller-hosting' }
  ];

  const pricingPlans = [
    {
      name: 'Reseller Silver',
      price: '₹999',
      period: 'mo',
      desc: 'Perfect for freelance web designers launching their own boutique hosting business.',
      features: [
        '25 cPanel Accounts',
        '80 GB NVMe SSD Storage Space',
        '800 GB Monthly Bandwidth',
        '100% White-Label (Custom Branding)',
        'Free WHM (WebHost Manager)',
        'Free Let Let’s Encrypt SSLs',
        'Private Nameservers (ns1.yourdomain.com)'
      ],
      popular: false,
      cta: 'Deploy Silver Plan'
    },
    {
      name: 'Reseller Gold',
      price: '₹1,899',
      period: 'mo',
      desc: 'Our recommended configuration for active web agencies and SaaS development groups.',
      features: [
        '50 cPanel Accounts',
        '150 GB NVMe SSD Storage Space',
        '1,500 GB Monthly Bandwidth',
        '100% White-Label Branding',
        'Free WHM Control Panel',
        'WHM Resource Overselling allowed',
        'Free WHMCS Billing System Starter',
        '24/7 Priority Partner Support'
      ],
      popular: true,
      cta: 'Deploy Gold Plan'
    },
    {
      name: 'Reseller Platinum',
      price: '₹2,999',
      period: 'mo',
      desc: 'Top-tier reseller configuration for established hosting companies and marketing hubs.',
      features: [
        '100 cPanel Accounts',
        '300 GB NVMe SSD Storage Space',
        '3,000 GB Monthly Bandwidth',
        '100% White-Label Branding',
        'WHM Control Panel Access',
        'Overselling Capabilities enabled',
        'Free WHMCS Professional License',
        'Dedicated Sysadmin Account Manager'
      ],
      popular: false,
      cta: 'Deploy Platinum Plan'
    }
  ];

  const hostingFaqs = [
    {
      question: 'What is Reseller Hosting and how do I make money?',
      answer: 'Reseller Hosting allows you to purchase a partition of Host2Unlimited server assets (cPanel allocations, NVMe storage, and network bandwidth) at wholesale prices. You can then split these assets into custom packages, brand the service under your own brand name, and sell them directly to your clients at your own price points.'
    },
    {
      question: 'What is WHM (WebHost Manager)?',
      answer: 'WHM (WebHost Manager) is an administrative panel that allows resellers to manage multiple individual cPanel accounts. Through WHM, you can create new hosting packages, modify disk space limits, suspend accounts, configure custom MX mail records, and manage server zones easily.'
    },
    {
      question: 'What is WHMCS and is it included?',
      answer: 'WHMCS is a billing and customer management tool designed for web hosting businesses. It automates client signups, domain registration requests, invoice processing, payment collection, and support ticketing. We include a free WHMCS license on our Gold and Platinum packages.'
    },
    {
      question: 'What does "100% White-Label" mean?',
      answer: 'It means your clients will never see the Host2Unlimited brand. You can configure custom DNS nameservers (e.g. ns1.yourbrand.com), customize cPanel dashboards with your own business logo, and use your own payment gateways (such as Razorpay or Stripe).'
    },
    {
      question: 'Who handles technical support for my clients?',
      answer: 'You are the primary support contact for your clients. However, if you encounter complex server issues or network configurations, you can open a support ticket with Host2Unlimited. Our 24/7 technical desk will resolve the issue behind the scenes.'
    }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <SEOMeta
        title="White-Label cPanel Reseller Hosting | Host2Unlimited"
        description="Launch your own hosting brand with Host2Unlimited's White-Label Reseller Hosting. Get WHM, WHMCS billing software, private nameservers, NVMe speeds, and priority support. Plans start at ₹999/mo."
        keywords="reseller hosting, white label hosting, cpanel reseller hosting, whm reseller, whmcs billing hosting, host2unlimited, start hosting company"
        canonical="https://host2unlimited.com/hosting/reseller-hosting"
        schemaType="Product"
        faqList={hostingFaqs}
        breadcrumbPaths={breadcrumbs}
      />

      <div style={{ paddingTop: '100px' }}>
        <Breadcrumbs paths={breadcrumbs} />
      </div>

      {/* Hero Header */}
      <section className="section-padding" style={{ padding: '80px 0', position: 'relative', backgroundImage: `url(${servicesHeroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }} className="hero-grid">
            <div style={{ textAlign: 'left' }}>
              <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '13.5px', fontWeight: 700, display: 'inline-block', marginBottom: '16px' }}>
                🤝 White-Label Hosting Partnership
              </span>
              <h1 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.2, marginBottom: '20px', textAlign: 'left' }}>
                Start Your Own Web Hosting Business Under Your Own Brand Name
              </h1>
              <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '30px' }}>
                Earn recurring revenue by bundling premium web hosting with your development services. Host2Unlimited Reseller packages provide WHM administration control panels, white-label customization setups, private nameservers, and automated WHMCS billing systems. Build packages, set prices, and manage clients under your own brand.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#pricing" className="btn btn-primary">View Reseller Plans</a>
                <Link to="/contact" className="btn btn-secondary">Request Partner Call</Link>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }} className="animate-float">
              <div className="card-glass" style={{ padding: '24px', maxWidth: '400px', borderLeft: '5px solid var(--primary)', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', textAlign: 'left' }}>Partner Reseller Advantages:</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> 100% White-Label Branding</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Free WHM (WebHost Manager)</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Free WHMCS Billing Automation</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Private Branded DNS Nameservers</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Blazing-Fast NVMe SSD Drives</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> 24/7 Partner Technical Support</li>
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
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Transparent Reseller Hosting Pricing</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              Launch your hosting company with clear resource allocations. Upgrade accounts and NVMe limits seamlessly as your business grows.
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
                    MOST VALUE
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
            Transform Web Design Projects Into Ongoing Residual Income
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            As a freelance web developer, graphic designer, or digital marketing agency, deploying websites is a standard part of your workflow. Once a project launches, clients require secure hosting, domain mappings, and mailbox configurations. Instead of referring clients to external hosting companies, reseller hosting allows you to keep that business in-house under your own brand.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            cPanel & WHM Control Panel and Resource Allocation
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            WebHost Manager (WHM) is a powerful administrative platform that allows you to manage multiple isolated client accounts. In WHM, you can create new custom cPanel profiles, set disk space limits, configure bandwidth allotments, and manage database permissions. Each client receives a separate cPanel panel to manage their files independently, preventing security issues from affecting adjacent sites.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            We support complete resource overselling configurations. Overselling allows you to allocate more virtual disk space or bandwidth than your absolute reseller plan cap. For example, if many client accounts are passive brochure sites that consume minimal storage, overselling allows you to manage resources dynamically to maximize profitability.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            WHMCS Automation, Private Nameservers & Branding Customization
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            To run a professional hosting brand, automation is essential. We include a free license for WHMCS, the industry-standard billing tool, on our Gold and Platinum tiers. WHMCS automates client registrations, compiles invoices, integrates with payment gateways, registers domains, and routes support tickets automatically.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Furthermore, our configurations are 100% white-labeled. You can custom brand cPanel interfaces with your company logo and configure private branded DNS nameservers (e.g. ns1.yourcompany.com). This ensures your hosting business runs independently, and your clients see you as the direct hosting provider.
          </p>

          {/* Comparison Table */}
          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '40px', marginBottom: '20px', textAlign: 'left' }}>
            Reseller Hosting Package Specifications Comparison
          </h3>
          <div className="table-responsive" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
            <table>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Package Metric</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Reseller Silver</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Reseller Gold</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Included cPanel Licenses</td>
                  <td style={{ padding: '16px' }}>Up to 25 Accounts</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>Up to 50 Accounts</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Overselling Capabilities</td>
                  <td style={{ padding: '16px' }}>Restricted allocations</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>Fully Supported in WHM</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>WHMCS Billing Module</td>
                  <td style={{ padding: '16px' }}>Optional Add-on</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>Free Starter License Included</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Nameserver Customization</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>Private Name Servers</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>Private Name Servers</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Uptime SLA Guarantee</td>
                  <td style={{ padding: '16px' }}>99.9% Uptime</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>99.99% Network Uptime</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Leverage Marketing and Client Coordination
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            To expand your portfolio and offer high-end solutions, suggest your clients use our managed <Link to="/services" style={{ color: 'var(--primary)', fontWeight: 600 }}>Cloud Hosting services</Link>. Reviewing our custom <Link to="/solutions" style={{ color: 'var(--primary)', fontWeight: 600 }}>Enterprise Digitalization models</Link> details how we structure developer APIs, database grids, and secure logins for client projects.
          </p>

        </div>
      </section>

      {/* Trust Signals & Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left' }}>
            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--primary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Host2Unlimited's reseller hosting packages helped us launch a new revenue stream. We host 40+ client sites and earn a steady monthly profit. WHMCS billing automation operates seamlessly."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Priya Nair</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Co-Founder, EduSphere Hub</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--primary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Branding nameservers and customizing the cPanel dashboard with our logo was straightforward. Our clients see us as the direct host, building brand trust."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Sandeep Deshmukh</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Managing Director, AgriGlobal Exports</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--primary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "WHM resource allocation is highly flexible. The overselling capability is a key benefit, allowing us to manage storage allocation across client sites efficiently."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Marcus Vance</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tech Director, CloudScale SaaS Co.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Reseller Hosting FAQ</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px' }}>
              Answers to common reseller questions about WHMCS licenses, overselling capabilities, and partner support.
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
                Launch Your Web Hosting Company Today
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontSize: '15.5px', margin: 0 }}>
                Get WHM control boards, white-label configurations, private nameservers, and automated client billing systems.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Link to="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                  Deploy Partner Account
                </Link>
                <Link to="/contact" className="btn btn-glass" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                  Consult Business Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResellerHosting;
