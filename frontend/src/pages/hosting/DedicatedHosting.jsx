import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, Globe, Server, Award, ChevronDown, ChevronUp, AlertCircle, HardDrive, Cpu } from 'lucide-react';
import SEOMeta from '../../components/SEOMeta';
import Breadcrumbs from '../../components/Breadcrumbs';
import pricingHeroBg from '../../assets/hero_bg/pricing_hero_art.svg';

const DedicatedHosting = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbs = [
    { name: 'Services', path: '/services' },
    { name: 'Dedicated Servers', path: '/hosting/dedicated-server-hosting' }
  ];

  const pricingPlans = [
    {
      name: 'Xeon Single-D',
      price: '₹7,999',
      period: 'mo',
      desc: 'Ideal for database consolidation, minor virtualization, and security directories.',
      features: [
        'Intel Xeon 4 Cores / 8 Threads',
        '32 GB DDR4 ECC RAM',
        '2x 1 TB Enterprise SSDs',
        'RAID-1 Hardware Controller',
        '100 Mbps Unmetered Port',
        '5 Dedicated IPv4 Addresses',
        'IPMI 2.0 Out-of-band Access',
        '99.99% Network Uptime SLA'
      ],
      popular: false,
      cta: 'Deploy Server'
    },
    {
      name: 'Dual EPYC Pro',
      price: '₹14,999',
      period: 'mo',
      desc: 'Our standard configuration for massive transactional platforms, high concurrent APIs, and SaaS database systems.',
      features: [
        'AMD EPYC 24 Cores / 48 Threads',
        '128 GB DDR4 ECC RAM',
        '2x 1.92 TB NVMe Data Center SSDs',
        'Hardware RAID Controller ready',
        '1 Gbps Network Uplink (20TB Cap)',
        '13 Dedicated IPv4 Addresses',
        'Full Managed Operating Systems support',
        '24/7 Dedicated Support Hotline'
      ],
      popular: true,
      cta: 'Deploy Server'
    },
    {
      name: 'EPYC Titanium',
      price: '₹24,999',
      period: 'mo',
      desc: 'Maximum throughput configuration built for massive user databases, AI model runs, and massive e-commerce setups.',
      features: [
        'Dual AMD EPYC 64 Cores / 128 Threads',
        '256 GB DDR4 ECC RAM',
        '4x 3.84 TB Enterprise NVMe SSDs',
        'Hardware RAID-10 Controller',
        '10 Gbps Port Uplink (Redundant)',
        '29 Dedicated IPv4 Addresses',
        'Custom SAN/NAS storage arrays',
        '15-Minute Hardware Replacement SLA'
      ],
      popular: false,
      cta: 'Deploy Server'
    }
  ];

  const hostingFaqs = [
    {
      question: 'What is a Dedicated Server?',
      answer: 'A dedicated server is an entire physical server leased exclusively to your company. Unlike shared or VPS hosting, you do not share CPU cycles, memory buses, drive channels, or bandwidth uplinks with any other tenant. Every single hardware asset is dedicated 100% to your application code.'
    },
    {
      question: 'How long does physical server deployment take?',
      answer: 'Standard setups (such as our Xeon and EPYC Pro systems) are built and deployed within 4 to 12 hours of payment validation. Custom architectures involving proprietary RAID arrays, SAN storage links, or private networking setups may take 24 to 48 hours for rack assembly and cabling.'
    },
    {
      question: 'Do you offer a hardware replacement guarantee?',
      answer: 'Yes. Host2Unlimited guarantees enterprise-grade physical component replacement. We maintain spare CPU nodes, ECC RAM modules, NVMe drives, and power supply units directly on-site at our data center facilities, allowing us to swap out faulty components in less than 30 minutes under our SLA.'
    },
    {
      question: 'What is IPMI Out-of-band access?',
      answer: 'IPMI (Intelligent Platform Management Interface) provides hardware-level remote control over your server. Through IPMI, you can reboot the physical machine, monitor chassis temperatures, configure BIOS settings, and access the operating system console directly, even if the primary network configurations fail.'
    },
    {
      question: 'What level of network protection is included?',
      answer: 'Every server includes robust DDoS mitigation. Our network routes traffic through clean pipes configured with dynamic packet analysis systems, shielding your server from volumetric floods up to 10Gbps without impact on page load speeds.'
    }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <SEOMeta
        title="Bare Metal Dedicated Server Hosting | Host2Unlimited"
        description="Lease high-performance Bare Metal Dedicated Servers from Host2Unlimited. AMD EPYC and Intel Xeon processors, enterprise NVMe storage, IPMI console, and custom SLAs. Deploy yours today."
        keywords="dedicated server, dedicated hosting, bare metal server, enterprise hosting, Intel Xeon server, AMD EPYC dedicated, host2unlimited, bare metal hosting"
        canonical="https://host2unlimited.com/hosting/dedicated-server-hosting"
        schemaType="Product"
        faqList={hostingFaqs}
        breadcrumbPaths={breadcrumbs}
      />

      <div style={{ paddingTop: '100px' }}>
        <Breadcrumbs paths={breadcrumbs} />
      </div>

      {/* Hero Header */}
      <section className="section-padding" style={{ padding: '80px 0', position: 'relative', backgroundImage: `url(${pricingHeroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }} className="hero-grid">
            <div style={{ textAlign: 'left' }}>
              <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '13.5px', fontWeight: 700, display: 'inline-block', marginBottom: '16px' }}>
                🏢 Bare Metal Enterprise Hardware
              </span>
              <h1 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.2, marginBottom: '20px', textAlign: 'left' }}>
                Dedicated Physical Servers Built for Critical Enterprise Workloads
              </h1>
              <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '30px' }}>
                Eliminate neighbor resource saturation entirely. Host2Unlimited Bare Metal servers supply high-capacity multi-core computing nodes, enterprise ECC RAM, RAID-secured NVMe storage systems, and dedicated uplinks. Rent physical hardware backed by redundant power grids, cooling channels, and enterprise uptime guarantees.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#pricing" className="btn btn-primary">View Physical Servers</a>
                <Link to="/contact" className="btn btn-secondary">Build Custom Server</Link>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }} className="animate-float">
              <div className="card-glass" style={{ padding: '24px', maxWidth: '400px', borderLeft: '5px solid var(--accent)', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', textAlign: 'left' }}>Bare Metal Advantages:</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> 100% Dedicated Physical Resources</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> No Virtualization Overhead Loss</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Dual Hot-Swap Power Supplies</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Hardware RAID Controller Encryption</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Redundant Multi-GB Uplink Pipes</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> IPMI Console & Root Administration</li>
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
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Bare Metal Server Pricing Configurations</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              Select dedicated physical processor layouts. Need proprietary specs? Contact our hardware architects for custom quotes.
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
                  border: plan.popular ? '2px solid var(--accent)' : '1px solid var(--glass-border)'
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {plan.popular && (
                  <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--accent)', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                    HIGH DEMAND
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
            Maximize Computing Performance with Bare Metal Servers
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            For massive enterprise database queries, heavy transactional e-commerce stores, CRM directories, and continuous data pipelines, virtualized structures can sometimes struggle under peak resource demands. Host2Unlimited Bare Metal servers remove the hypervisor virtualization layer entirely. When your software executes on bare metal nodes, it communicates directly with the physical CPU chips, system memory channels, and enterprise NVMe controllers.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            EPYC and Xeon CPU Processing & ECC Memory Reliability
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            We assemble our dedicated hardware with the latest multithreaded architecture. AMD EPYC and Intel Xeon processors feature massive cache layouts and multiple parallel channels to handle high query loops cleanly. In addition, our physical server configurations utilize dedicated Error-Correcting Code (ECC) registered memory arrays.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Standard desktop memory can occasionally encounter silent data corruption errors due to natural electrical variations, leading to database crashes. ECC memory monitors the system data paths in real-time, automatically correcting single-bit errors. This ensures absolute stability for large database logs, banking gateways, student registration pipelines, and complex ERP systems.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Data Center Infrastructure & Multi-Uplink Redundancy
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Host2Unlimited bare metal hardware is securely racked inside Tier-III data center facilities. We maintain redundant power paths utilizing active Uninterruptible Power Supply (UPS) setups backed by on-site diesel generator networks. This ensures continuous electrical delivery during regional grid alerts.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Our network backbones connect through multiple global Tier-1 telecom providers, ensuring low-latency data routes. Redundant cooling racks preserve ideal temperature thresholds across processing boards, ensuring continuous hardware delivery at peak speeds without thermal throttling.
          </p>

          {/* Comparison Table */}
          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '40px', marginBottom: '20px', textAlign: 'left' }}>
            Enterprise Dedicated Server Parameters Comparison
          </h3>
          <div className="table-responsive" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
            <table>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Performance Parameter</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Bare Metal Dedicated</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Standard Virtual Server (VPS)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Virtualization Overhead Loss</td>
                  <td style={{ padding: '16px', color: 'var(--accent)', fontWeight: 700 }}>0% (Bare Metal direct execution)</td>
                  <td style={{ padding: '16px' }}>3% to 7% CPU resource allocation loss</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Memory System</td>
                  <td style={{ padding: '16px', color: 'var(--accent)', fontWeight: 700 }}>Dedicated Registered ECC RAM</td>
                  <td style={{ padding: '16px' }}>Virtual allocation from host memory</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Storage Access Controller</td>
                  <td style={{ padding: '16px', color: 'var(--accent)', fontWeight: 700 }}>Dedicated physical PCIe slot path</td>
                  <td style={{ padding: '16px' }}>Shared access on hypervisor array</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>IPMI Console Link</td>
                  <td style={{ padding: '16px', color: 'var(--accent)', fontWeight: 700 }}>Full access (Independent card)</td>
                  <td style={{ padding: '16px' }}>VNC web console link only</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Custom SAN/NAS Array Link</td>
                  <td style={{ padding: '16px', color: 'var(--accent)', fontWeight: 700 }}>Fully Supported (Fibre Channel/iSCSI)</td>
                  <td style={{ padding: '16px' }}>Restricted setups</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Synergistic Services and Resource Layouts
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Verify that your complex backend directories are optimally managed by integrating our <Link to="/services" style={{ color: 'var(--primary)', fontWeight: 600 }}>Custom Software Development</Link> models. Reviewing our <Link to="/case-studies" style={{ color: 'var(--primary)', fontWeight: 600 }}>Corporate Case Studies</Link> also provides insight into how we configure cluster databases and balance physical nodes for high-traffic environments.
          </p>

        </div>
      </section>

      {/* Trust Signals & Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left' }}>
            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--accent)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "We migrated our central ERP database to a Dual EPYC bare metal server at Host2Unlimited. Our administrative workload decreased by 80% because database processing bottlenecks disappeared. Excellent support SLA!"
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Marcus Vance</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tech Director, CloudScale SaaS</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--accent)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Host2Unlimited's physical hardware replacement SLA is real. We requested an upgrade to our Xeon server's RAM modules, and their technicians cabled and verified the 128GB expansion in under 20 minutes."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Sandeep Deshmukh</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Managing Director, AgriGlobal Exports</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--accent)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "The IPMI Out-of-band remote card is highly useful. It allows our internal sysadmins to manage BIOS configurations and custom ISO OS deployments independently."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Priya Nair</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Co-Founder, EduSphere Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Dedicated Server FAQ</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px' }}>
              Answers to technical questions about server deployment, hardware SLAs, and network routing options.
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
                Deploy Your Enterprise Bare Metal Node Today
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontSize: '15.5px', margin: 0 }}>
                Choose physical hardware backed by redundant network pipelines, active DDoS mitigation, and robust SLAs.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Link to="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                  Deploy Bare Metal
                </Link>
                <Link to="/contact" className="btn btn-glass" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                  Request Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DedicatedHosting;
