import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, Globe, Server, Award, ChevronDown, ChevronUp, AlertCircle, Cpu, Sliders } from 'lucide-react';
import SEOMeta from '../../components/SEOMeta';
import Breadcrumbs from '../../components/Breadcrumbs';
import servicesHeroBg from '../../assets/hero_bg/services_hero_art.svg';

const VPSHosting = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbs = [
    { name: 'Services', path: '/services' },
    { name: 'VPS Hosting', path: '/hosting/vps-hosting' }
  ];

  const pricingPlans = [
    {
      name: 'Cloud VPS-1',
      price: '₹799',
      period: 'mo',
      desc: 'Excellent start for staging platforms, test applications, and minor databases.',
      features: [
        '1 vCPU Core',
        '2 GB DDR4 RAM',
        '40 GB SSD NVMe Storage',
        '1 TB Data Bandwidth',
        '1 Dedicated IPv4 Address',
        'Full Root Access',
        '24/7 Monitoring Alerting'
      ],
      popular: false,
      cta: 'Configure VPS-1'
    },
    {
      name: 'Cloud VPS-3',
      price: '₹1,599',
      period: 'mo',
      desc: 'Our recommended configuration for active e-commerce platforms and database networks.',
      features: [
        '2 vCPU Cores',
        '8 GB DDR4 RAM',
        '120 GB SSD NVMe Storage',
        '3 TB Data Bandwidth',
        '2 Dedicated IPv4 Addresses',
        'KVM Hypervisor Technology',
        'Free DirectAdmin Panel',
        '24/7 Managed Server Support'
      ],
      popular: true,
      cta: 'Configure VPS-3'
    },
    {
      name: 'Cloud VPS-6',
      price: '₹3,499',
      period: 'mo',
      desc: 'High performance servers optimized for extreme loads, high concurrency, and APIs.',
      features: [
        '4 vCPU Cores',
        '16 GB DDR4 RAM',
        '250 GB SSD NVMe Storage',
        '6 TB Data Bandwidth',
        '4 Dedicated IPv4 Addresses',
        'Full KVM Virtualization',
        'cPanel/Webuzo licensing ready',
        'Custom OS deployment options'
      ],
      popular: false,
      cta: 'Configure VPS-6'
    }
  ];

  const hostingFaqs = [
    {
      question: 'What is VPS Hosting and how does it work?',
      answer: 'VPS (Virtual Private Server) hosting splits a single high-performance physical server node into virtual instances using software virtualization (KVM). Each instance receives dedicated CPU cores, RAM allocation, NVMe storage, and separate Operating System configurations. Unlike shared accounts, other instances on the node cannot impact your VPS performance.'
    },
    {
      question: 'What is the KVM Hypervisor advantage?',
      answer: 'KVM (Kernel-based Virtual Machine) virtualization ensures complete hardware isolation. Unlike other server systems (like OpenVZ), KVM prevents overselling. Your RAM and CPU resources are locked to your individual VPS and cannot be borrowed or saturated by other servers on the network.'
    },
    {
      question: 'Do you offer managed or unmanaged VPS services?',
      answer: 'We provide both options. Our standard setups are self-managed, granting you full SSH root access to customize your packages. However, you can choose our "Managed Add-on" at checkout. Our sysadmins will then coordinate backups, patch kernels, configure firewalls, and monitor logs 24/7.'
    },
    {
      question: 'Can I scale up my VPS resources without data loss?',
      answer: 'Yes! You can scale your CPU, RAM, and NVMe disk space upward seamlessly from your Host2Unlimited billing dashboard. The update takes less than 5 minutes and preserves all database records and software configurations.'
    },
    {
      question: 'What Operating Systems are available?',
      answer: 'We support all major Linux distributions, including Ubuntu 20.04/22.04 LTS, AlmaLinux 8/9, Rocky Linux, Debian, and CentOS. You can also upload custom ISO files to install proprietary server layouts.'
    }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <SEOMeta
        title="High-Performance Managed VPS Hosting | Host2Unlimited"
        description="Empower your systems with Host2Unlimited's VPS Hosting. Dedicated KVM resources, full root access, NVMe storage, and scalable configurations. Starting at just ₹799/mo."
        keywords="vps hosting, managed vps, kvm vps, private server hosting, dedicated virtual server, cloud vps, host2unlimited, nvme vps"
        canonical="https://host2unlimited.com/hosting/vps-hosting"
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
                🚀 Dedicated Virtual Resources
              </span>
              <h1 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.2, marginBottom: '20px', textAlign: 'left' }}>
                KVM Virtual Private Servers with Full Root Access & NVMe Power
              </h1>
              <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '30px' }}>
                Bridge the gap between shared resources and expensive physical servers. Host2Unlimited VPS clusters run on 100% KVM hardware-level virtualization with dedicated resources. Configure your software, run background services, scale server resources instantly, and manage your stack with full SSH credentials.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#pricing" className="btn btn-primary">View VPS Packages</a>
                <Link to="/contact" className="btn btn-secondary">Request Custom Specs</Link>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }} className="animate-float">
              <div className="card-glass" style={{ padding: '24px', maxWidth: '400px', borderLeft: '5px solid var(--secondary)', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', textAlign: 'left' }}>VPS Server Architectures:</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Dedicated KVM Virtualization</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Full Root SSH Access</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> NVMe RAID-10 Storage Arrays</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Instant OS Reinstallation</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Automated Weekly Backup Snapshots</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Dedicated IPv4 & IPv6 Addresses</li>
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
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Flexible VPS Hosting Specifications</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              Scale CPU cores, RAM capacities, and server assets dynamically. Zero setup fees, with billing calculated transparently.
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
                  border: plan.popular ? '2px solid var(--secondary)' : '1px solid var(--glass-border)'
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {plan.popular && (
                  <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--secondary)', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                    BEST BALANCED
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
            Unleash Hardware Independence with KVM VPS Architecture
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            When online operations expand, standard shared servers can become a performance bottleneck due to resource congestion. Upgrading to Host2Unlimited’s KVM Virtual Private Servers guarantees dedicated allocations for your code pipelines. Running virtualization through Linux KVM (Kernel-based Virtual Machine) allows our hypervisors to handle isolated guest environments with distinct memory pools, separate disks, and private network configs.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Enterprise Hardware & RAID-10 NVMe Protection
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            We build our physical host node servers using premium components. Every host system is powered by multi-core AMD EPYC or Intel Xeon processors, high-performance DDR4 ECC registered server memory, and enterprise-grade NVMe solid-state drives. To secure against data loss and drive failure, we run these NVMe structures in hardware RAID-10 configurations.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            RAID-10 arrays mirror your database tables and application files across multiple drives simultaneously, while striping data to maximize read speed. In the rare event of a hardware drive failure, the mirrored backup drive immediately services incoming requests without a millisecond of server interruption. This structure provides optimal physical hardware safety for scaling SaaS applications and online booking modules.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Full Root Access & Absolute Customizability
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Our Virtual Private Servers grant full root administrator access. Host custom Java programs, configure Node.js frameworks, compile Python APIs, deploy Docker containers, or run custom PHP systems. With SSH root credentials, you can fine-tune MySQL configuration tables, customize firewalls via IPTables/UFW, and apply kernel configurations directly.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Additionally, you can choose to deploy standard control panels like cPanel, Plesk, Webuzo, or DirectAdmin. These interfaces allow team developers to deploy sandboxed directories, manage subdomain pointers, monitor site statistics, and deploy cron tasks through visual dashboard menus, eliminating complex terminal commands.
          </p>

          {/* Comparison Table */}
          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '40px', marginBottom: '20px', textAlign: 'left' }}>
            Shared Hosting vs. VPS Hosting Technical Parameters
          </h3>
          <div className="table-responsive" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
            <table>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Technical Metric</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Host2Unlimited Shared Hosting</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Host2Unlimited KVM VPS</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>CPU Resource Allocation</td>
                  <td style={{ padding: '16px' }}>Shared among adjacent users</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>100% Dedicated Cores</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Dedicated RAM Pool</td>
                  <td style={{ padding: '16px' }}>Dynamic constraints</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>Locked hardware pool (ECC)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Root SSH Administration</td>
                  <td style={{ padding: '16px' }}>Restricted access</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>Complete Root credentials</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Dedicated IPv4</td>
                  <td style={{ padding: '16px' }}>Shared server IP address</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>1 to 4 Dedicated IPv4s</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Docker & Custom Scripts</td>
                  <td style={{ padding: '16px' }}>Blocked on shared kernels</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>Fully Supported</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Strategic Integrations and Scalability
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Optimize your backend configurations by referencing our custom <Link to="/services" style={{ color: 'var(--primary)', fontWeight: 600 }}>Software Development capabilities</Link>. If your team needs visual landing pages alongside complex API databases, reviewing our <Link to="/pricing" style={{ color: 'var(--primary)', fontWeight: 600 }}>pricing models</Link> enables budget planning to scale computational workloads correctly.
          </p>

        </div>
      </section>

      {/* Trust Signals & Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left' }}>
            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--secondary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Host2Unlimited's VPS configurations solved our API latency problems. We deployed a KVM server with 8GB RAM, and database queries are executing in under 20ms. The managed support handles security logs perfectly."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Priya Nair</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Co-Founder, EduSphere Hub</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--secondary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "KVM virtualization is highly reliable. We run complex Python microservices on CentOS. We scaled our CPU resources in less than 5 minutes during a peak marketing event without any data corruption."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Marcus Vance</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tech Director, CloudScale SaaS</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--secondary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Setting up custom firewalls and managing multiple databases on Rocky Linux is painless. Their technicians are always active to configure complex DNS and backup snapshots."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Sandeep Deshmukh</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Managing Director, AgriGlobal Exports</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>VPS Hosting FAQ</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px' }}>
              Detailed answers regarding KVM resources, SSH management, and operating system layouts.
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
                Deploy Your KVM VPS in Under 5 Minutes
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontSize: '15.5px', margin: 0 }}>
                Experience isolated server nodes and full control over your software builds. Configured on next-generation hardware.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Link to="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                  Configure Your Server
                </Link>
                <Link to="/contact" className="btn btn-glass" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                  Speak to an Engineer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VPSHosting;
