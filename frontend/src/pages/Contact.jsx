import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const CURRENT_API_BASE = import.meta.env.VITE_API_URL || window.location.origin;
import { useLeads } from '../context/LeadContext';
import { Phone, Mail, MapPin, CheckCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What services do you provide?',
    a: 'We provide full-scale digital solutions: responsive website development, custom CRM/ERP software development, managed cloud hosting (AWS/GCP), search engine optimization (SEO), digital marketing campaigns, and specialized IT consulting.'
  },
  {
    q: 'How long does a website project take?',
    a: 'A standard corporate or landing page project usually takes 10 to 18 days. Custom enterprise solutions, API database setups, and large ecommerce systems can take 4 to 8 weeks depending on specifications.'
  },
  {
    q: 'Do you provide website maintenance?',
    a: 'Yes, we offer ongoing maintenance SLA contracts that cover weekly automated security patches, cloud database backups, core performance updates, and immediate page text/image edits.'
  },
  {
    q: 'Can you redesign an existing website?',
    a: 'Absolutely. We specialize in migratng slow legacy platforms to modern React.js frameworks to optimize speed, responsive UI interfaces, and keyword search conversions.'
  },
  {
    q: 'Do you provide SEO services?',
    a: 'Yes, our team handles technical SEO audits, site speed updates, keyword mappings, local business indexing, and ongoing content link-building reports to drive organic traffic.'
  },
  {
    q: 'What industries do you work with?',
    a: 'We work across multiple industries: E-commerce retailers, healthcare/diagnostic labs, educational setups, public government agencies, financial advisors, and SaaS startup platforms.'
  },
  {
    q: 'How much does a website cost?',
    a: 'A starter portfolio package ranges from ₹15,000 to ₹25,000. Custom corporate databases range from ₹35,000 to ₹60,000. Large multi-vendor scale platforms or SaaS dashboards require custom pricing blueprints.'
  },
  {
    q: 'Do you offer hosting solutions?',
    a: 'Yes. We provision secure virtual hosting structures on Google Cloud and AWS nodes. This includes free SSL setup, CDN installations, and active threat scans.'
  }
];

const Contact = () => {
  const { addLead } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    service: 'Website Development',
    budget: '₹35,000 – ₹60,000',
    details: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [settings, setSettings] = useState({
    company_name: 'Host2Unlimited',
    email: 'info@host2unlimited.com',
    phone: '+91 70219 35273',
    whatsapp_number: '+91 81046 12974',
    address: '1207, Runwal R-Square, LBS Marg, Veena Nagar, Mulund West, Mumbai – 400080, Maharashtra, India.',
    social_links: {
      facebook: 'https://facebook.com/host2unlimited',
      twitter: 'https://twitter.com/host2unlimited',
      linkedin: 'https://linkedin.com/company/host2unlimited'
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${CURRENT_API_BASE}/api/pages/website_settings`);
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (err) {
        console.warn('Failed to load dynamic website settings in Contact', err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead(formData);
    setSubmitted(true);
  };

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const handleNewSubmission = () => {
    setFormData({
      name: '',
      companyName: '',
      email: '',
      phone: '',
      service: 'Website Development',
      budget: '₹35,000 – ₹60,000',
      details: ''
    });
    setSubmitted(false);
  };

  const breadcrumbs = [{ name: 'Contact', path: '/contact' }];

  return (
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title="Contact Us"
        description="Get in touch with Host2Unlimited. Contact our cloud server architects and sales desk for Shared, WordPress, VPS, or Dedicated Hosting enquiries."
        keywords="contact host2unlimited, hosting support desk, server consultation, business sales email"
        canonical="https://host2unlimited.com/contact"
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
            Get In Touch
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '20px' }}>Contact Host2Unlimited</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '17px' }}>
            Ready to scale your business portal? Submit our enquiry form below. A systems consultant will get back to you with structured blueprints.
          </p>
        </div>

        {/* Contact info + Form grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '50px', marginBottom: '100px' }} className="contact-grid">
          
          {/* Info Side */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Connect Instantly</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
              Whether you need pricing queries, project updates, or urgent server assistance, reach our desk via details below.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Sales & Enquiries */}
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>
                  New Enquiries / Sales
                </span>
                <a href={`tel:${settings.phone}`} style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                  📞 {settings.phone}
                </a>
                <a href={`mailto:${settings.email}`} style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  ✉ {settings.email}
                </a>
              </div>

              {/* WhatsApp Support Desk */}
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>
                  WhatsApp Support Desk
                </span>
                <a href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  📞 {settings.whatsapp_number}
                </a>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', gap: '12px', padding: '10px 0' }}>
                <MapPin size={20} className="text-gradient" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                    Consulting Head Office
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {settings.address}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick map integration block */}
            <div style={{ height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Runwal%20R-Square%2C%20Mulund%20West%2C%20Mumbai&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Office Map Location"
              />
            </div>
          </div>

          {/* Form Side */}
          <div className="card-glass">
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px', textAlign: 'left' }}>Submit Project Brief</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="form-control" 
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input 
                      type="text" 
                      name="companyName" 
                      required 
                      value={formData.companyName} 
                      onChange={handleChange} 
                      className="form-control" 
                      placeholder="e.g. Tech Solutions Ltd"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row-grid">
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="form-control" 
                      placeholder="e.g. john@company.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="form-control" 
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-row-grid">
                  <div className="form-group">
                    <label className="form-label">Service Required</label>
                    <select 
                      name="service" 
                      value={formData.service} 
                      onChange={handleChange} 
                      className="form-control"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Custom Software Development">Custom Software Development</option>
                      <option value="Cloud Hosting Solutions">Cloud Hosting Solutions</option>
                      <option value="SEO Services">SEO Services</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="E-Commerce Development">E-Commerce Development</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget Range</label>
                    <select 
                      name="budget" 
                      value={formData.budget} 
                      onChange={handleChange} 
                      className="form-control"
                    >
                      <option value="₹15,000 – ₹25,000">₹15,000 – ₹25,000 (Starter)</option>
                      <option value="₹35,000 – ₹60,000">₹35,000 – ₹60,000 (Business)</option>
                      <option value="Custom Pricing">Custom Pricing (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Project Details & Requirements</label>
                  <textarea 
                    name="details" 
                    required 
                    value={formData.details} 
                    onChange={handleChange} 
                    className="form-control" 
                    placeholder="Briefly describe your objectives, target audience, and key features..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  Submit Enquiry
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ display: 'inline-flex', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <CheckCircle size={36} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Enquiry Logged!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px' }}>
                  Thank you, <strong>{formData.name}</strong>. We have captured your specifications. Our technical lead will contact you shortly.
                </p>

                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '32px', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertCircle size={15} color="var(--primary)" /> Simulated Integrations Executed:
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <li>✔ Stored successfully in Google Sheets Database.</li>
                    <li>✔ Admin email alerts dispatched to hello@host2unlimited.com.</li>
                    <li>✔ Client acknowledgement sent to <strong>{formData.email}</strong>.</li>
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <a 
                    href={`https://wa.me/919876543210?text=Hi%20Host2Unlimited%2C%20I%20have%20submitted%20an%20enquiry%20for%20${encodeURIComponent(formData.service)}.%20My%20name%20is%20${encodeURIComponent(formData.name)}.`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ flex: 1, backgroundColor: '#25D366', borderColor: '#25D366' }}
                  >
                    Ping WhatsApp
                  </a>
                   <button onClick={handleNewSubmission} className="btn btn-secondary" style={{ flex: 1 }}>
                    New Submission
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* FAQs Accordion Block */}
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '50px', textAlign: 'center' }}>
            Find answers to standard engagement structures, pricing ranges, and maintenance setups.
          </p>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="card-glass" 
                style={{ padding: '20px 24px', cursor: 'pointer', textAlign: 'left', transition: 'all var(--transition-fast)' }}
                onClick={() => toggleFaq(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{faq.q}</h4>
                  {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {openFaq === idx && (
                  <p style={{ marginTop: '14px', fontSize: '14.5px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '14px', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .form-row-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
