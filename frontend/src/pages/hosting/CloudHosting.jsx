import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, Globe, Server, Award, ChevronDown, ChevronUp, AlertCircle, Cloud, Network } from 'lucide-react';
import SEOMeta from '../../components/SEOMeta';
import Breadcrumbs from '../../components/Breadcrumbs';

const CloudHosting = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbs = [
    { name: 'Services', path: '/services' },
    { name: 'Cloud Hosting', path: '/hosting/cloud-hosting' }
  ];

  const pricingPlans = [
    {
      name: 'Cloud Start',
      price: '₹599',
      period: 'mo',
      desc: 'Affordable entry to distributed cloud power. Perfect for growing websites.',
      features: [
        '3 Websites Hosting',
        '40 GB Distributed SSD NVMe Storage',
        '3 GB Dedicated Memory',
        '2 Core Dedicated CPU',
        'Free SSL Certificates',
        'Daily Backups (14-day retention)',
        'Global Cloudflare Integration'
      ],
      popular: false,
      cta: 'Deploy Cloud Start'
    },
    {
      name: 'Cloud Performance',
      price: '₹1,199',
      period: 'mo',
      desc: 'Ideal for database-driven portals, active business tools, and membership sites.',
      features: [
        'Unlimited Websites',
        '100 GB Distributed SSD Storage',
        '6 GB Dedicated Memory',
        '4 Core Dedicated CPU',
        'Free SSL Certificates',
        'Daily Automatic Backups',
        'Integrated Load Balancers',
        '24/7 Managed Server Care'
      ],
      popular: true,
      cta: 'Deploy Cloud Performance'
    },
    {
      name: 'Cloud Enterprise',
      price: '₹2,499',
      period: 'mo',
      desc: 'High-availability infrastructure for massive traffic peaks and e-commerce scale.',
      features: [
        'Unlimited Websites & Domains',
        '200 GB Distributed SSD Storage',
        '12 GB Dedicated Memory',
        '8 Core Dedicated CPU',
        'Redundant Failover Nodes',
        'Hourly Database Backups',
        'Dedicated IP Address',
        'Priority Technical VIP Support'
      ],
      popular: false,
      cta: 'Deploy Cloud Enterprise'
    }
  ];

  const hostingFaqs = [
    {
      question: 'What is Cloud Hosting and how does it prevent downtime?',
      answer: 'Cloud hosting groups multiple physical server nodes into a single, unified cluster. Your website files and databases are replicated across several machines simultaneously. If one physical hardware node fails or encounters network issues, the cloud load balancer automatically redirects visitor requests to an active copy on another node instantly.'
    },
    {
      question: 'How does storage distribution work?',
      answer: 'We utilize distributed block storage configurations (Ceph/SAN). This separates database execution from hardware storage slots. Site data is replicated three times across different storage racks, securing files from single disk issues and physical errors.'
    },
    {
      question: 'Can I scale CPU and RAM during traffic spikes?',
      answer: 'Yes! Our cloud virtualization allows for dynamic scaling. You can increase CPU cores, memory limits, and bandwidth throughput directly from your management desk without requiring a reboot, ensuring continuous uptime during marketing campaigns.'
    },
    {
      question: 'Is a CDN included?',
      answer: 'Yes, every cloud hosting account integrates with global Content Delivery Networks (CDNs) automatically. Static assets like images and CSS files are cached on edge nodes globally, ensuring fast loading speeds for international visitors.'
    },
    {
      question: 'Do you offer custom cloud setups?',
      answer: 'Yes. For large enterprise clients, we design hybrid and private cloud environments using AWS, Google Cloud, and Azure resources. Contact our cloud architects to discuss custom load balancers, database clusters, and VPN configurations.'
    }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <SEOMeta
        title="High-Availability Distributed Cloud Hosting | Host2Unlimited"
        description="Experience 100% uptime with Host2Unlimited's Distributed Cloud Hosting. Distributed storage, automatic failover, load balancers, and instant scaling. Starting at ₹599/mo."
        keywords="cloud hosting, distributed hosting, high availability hosting, failover hosting, managed cloud server, scale cloud web, host2unlimited, nvme cloud"
        canonical="https://host2unlimited.com/hosting/cloud-hosting"
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
                ☁️ Redundant Distributed Cluster
              </span>
              <h1 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.2, marginBottom: '20px', textAlign: 'left' }}>
                Managed Cloud Hosting with Auto-Failover & High Availability
              </h1>
              <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '30px' }}>
                Eliminate downtime caused by physical server failures. Host2Unlimited distributes site resources across a secure, redundant cluster node network. Backed by automated load balancers, distributed NVMe storage arrays, and real-time database replication, our cloud infrastructure scales instantly to handle traffic peaks seamlessly.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#pricing" className="btn btn-primary">View Cloud Packages</a>
                <Link to="/contact" className="btn btn-secondary">Request Custom Infrastructure</Link>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }} className="animate-float">
              <div className="card-glass" style={{ padding: '24px', maxWidth: '400px', borderLeft: '5px solid var(--secondary)', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', textAlign: 'left' }}>Cloud Architecture Features:</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Zero Single Point of Failure (SPOF)</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Automatic Node-Level Failovers</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Replicated Distributed Storage (Ceph)</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Dynamic RAM & CPU Hot Scaling</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Global CDN Edge Caching Integration</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> 24/7 Managed Kernel Infrastructure</li>
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
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Transparent Cloud Hosting Plans</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              Choose a cloud hosting configuration built for high performance and scalability. Upgrade or downscale resources instantly.
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
                    MAX REDUNDANCY
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
            Why Choose Distributed Cloud Web Hosting Over Legacy Infrastructure?
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Traditional web hosting relies on a single physical server machine. If that machine encounters power issues, disk errors, motherboard failures, or local network disconnects, your online platform immediately goes offline. Host2Unlimited’s high-availability cloud cluster solves this vulnerability by grouping multiple physical nodes into a virtualized server network.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Multi-Node Redundancy & Automated Load Balancers
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            In our cloud hosting environment, user traffic is routed through load balancers that monitor server availability in real-time. If a physical node experiences high CPU load or hardware issues, the load balancer redirects user traffic to an active node in the cluster instantly. This seamless failover prevents service interruptions, ensuring your business tools and portals remain online.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Our storage layer runs on Ceph, a distributed object storage architecture. Rather than saving files onto a single hard disk, Ceph replicates your site assets three times across separate hardware storage slots in the data center. This ensures your data is protected even in the event of multiple drive failures.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Elastic Resource Scaling and Peak Concurrency Management
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            One of the primary benefits of cloud hosting is resource elasticity. Traditional VPS and dedicated systems require manual hardware upgrades or system reboots to expand resources. In contrast, our cloud hypervisors allocate CPU cores, RAM limits, and network bandwidth dynamically based on real-time traffic levels.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            This capability ensures that sudden spikes in visitor traffic during sales events, application launches, or public announcements do not cause server crashes. Resources scale up to handle the load automatically and return to standard baseline parameters once traffic stabilizes, keeping operational costs highly efficient.
          </p>

          {/* Comparison Table */}
          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '40px', marginBottom: '20px', textAlign: 'left' }}>
            Cloud Hosting vs. Traditional Web Hosting Parameters
          </h3>
          <div className="table-responsive" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
            <table>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Technical Metric</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Host2Unlimited Cloud Cluster</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Standard Dedicated / Shared Server</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Uptime Vulnerability</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>None (Multi-node replication)</td>
                  <td style={{ padding: '16px' }}>Single point of physical failure</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Storage File System</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>Ceph Distributed NVMe Arrays</td>
                  <td style={{ padding: '16px' }}>Local Server Disk (RAID optional)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Resource Expansion</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>Dynamic scaling (Zero reboot)</td>
                  <td style={{ padding: '16px' }}>Manual provisioning/downtime required</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Load Balancing</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>Integrated at network level</td>
                  <td style={{ padding: '16px' }}>Requires external setups/licenses</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Backup Frequency</td>
                  <td style={{ padding: '16px', color: 'var(--secondary)', fontWeight: 700 }}>Hourly automated snapshots</td>
                  <td style={{ padding: '16px' }}>Weekly or monthly options</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Strategic Marketing and Enterprise System Coordination
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            To get the most out of your high-availability cloud servers, we suggest linking them with our optimized <Link to="/services" style={{ color: 'var(--primary)', fontWeight: 600 }}>SEO Services</Link>. Integrating these systems with our custom <Link to="/solutions" style={{ color: 'var(--primary)', fontWeight: 600 }}>Enterprise Digitalization framework</Link> provides your team with the tools needed to streamline workflows and scale secure customer databases.
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
                "We switched our student portals to Host2Unlimited Cloud Hosting. During the annual registration rush, our visitor levels increased by 5x. The servers handled the peak load smoothly, scaling resources automatically."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Priya Nair</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Co-Founder, EduSphere Hub</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--secondary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Distributed Ceph NVMe storage has been incredibly reliable. We experienced zero downtime during a regional data center maintenance event, as our traffic was automatically rerouted."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Marcus Vance</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tech Director, CloudScale SaaS Co.</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--secondary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Setting up load balancers and managing DNS routing is straightforward. The support team is incredibly helpful, resolving our setup queries in under 10 minutes."
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
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Cloud Hosting FAQ</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px' }}>
              Frequently asked questions about Ceph storage, auto-scaling CPU nodes, and global CDN integrations.
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
                Deploy Your Distributed Cloud Node Today
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontSize: '15.5px', margin: 0 }}>
                Experience reliable hosting with automated failover andCeph storage replication. Scaled for speed and redundancy.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Link to="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                  Deploy Cloud Server
                </Link>
                <Link to="/contact" className="btn btn-glass" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                  Request Technical Blueprint
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloudHosting;
