import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import contactHeroBg from '../assets/hero_bg/contact_hero.png';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');
import pointingWomanImg from '../assets/h2u/host2new-contact-page-01 (1).png';
import { useLeads } from '../context/LeadContext';
import { Phone, Mail, MapPin, CheckCircle, ChevronDown, ChevronUp, AlertCircle, Globe } from 'lucide-react';

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

const getBudgetOptions = (service) => {
  switch (service) {
    case 'Website Development':
      return [
        { value: '₹15,000 – ₹25,000', label: '₹15,000 – ₹25,000 (Starter Website)' },
        { value: '₹35,000 – ₹60,000', label: '₹35,000 – ₹60,000 (Business Website)' },
        { value: 'Custom Pricing', label: 'Custom Pricing (Enterprise Solutions)' }
      ];
    case 'Web App/Software Development':
      return [
        { value: '₹35,000 – ₹60,000', label: '₹35,000 – ₹60,000 (Basic Portal)' },
        { value: '₹60,000 – ₹1,20,000', label: '₹60,000 – ₹1,20,000 (Custom Web App)' },
        { value: 'Above ₹1,20,000', label: 'Above ₹1,20,000 (Enterprise CRM/ERP)' }
      ];
    case 'Social Media Post Designing':
      return [
        { value: '₹5,000 – ₹10,000 / month', label: '₹5,000 – ₹10,000 / month (4-12 posts)' },
        { value: '₹10,000 – ₹15,000 / month', label: '₹10,000 – ₹15,000 / month (12-20 posts)' },
        { value: '₹15,000 – ₹20,000 / month', label: '₹15,000 – ₹20,000 / month (20-60 posts)' }
      ];
    case 'Facebook Management':
    case 'Instagram Management':
    case 'Google Business Profile Management':
    case 'LinkedIn Management':
    case 'YouTube Management':
      return [
        { value: '₹3,000 – ₹5,000 / month', label: '₹3,000 – ₹5,000 / month (Single Platform)' },
        { value: '₹8,000 – ₹15,000 / month', label: '₹8,000 – ₹15,000 / month (Multiple Platforms)' },
        { value: 'Above ₹15,000 / month', label: 'Above ₹15,000 / month (Full Platform Sync)' }
      ];
    case 'Monthly Photoshoot / Video Shoot':
      return [
        { value: '₹6,000 – ₹15,000 / month', label: '₹6,000 – ₹15,000 / month (1-3 Shoot Days)' },
        { value: '₹15,000 – ₹35,000 / month', label: '₹15,000 – ₹35,000 / month (3-8 Shoot Days)' },
        { value: 'Above ₹35,000 / month', label: 'Above ₹35,000 / month (Enterprise Coverage)' }
      ];
    case 'Meta Ads Management':
    case 'Google Ads Management':
      return [
        { value: '₹5,000 – ₹25,000 / month', label: '₹5,000 – ₹25,000 / month (Small Ad Spend)' },
        { value: '₹25,000 – ₹1,00,000 / month', label: '₹25,000 – ₹1,00,000 / month (Medium Ad Spend)' },
        { value: 'Above ₹1,00,000 / month', label: 'Above ₹1,00,000 / month (Enterprise Ad Spend)' }
      ];
    case 'Website Maintenance':
    case 'SEO':
      return [
        { value: '₹10,000 / month', label: '₹10,000 / month (Standard Monthly Package)' },
        { value: 'Custom / Multi-Month Packages', label: 'Custom / Multi-Month Retainer' }
      ];
    case 'Online Reputation Management':
      return [
        { value: '₹15,000 / month', label: '₹15,000 / month (Standard Monthly Package)' },
        { value: 'Custom Monthly Package', label: 'Custom Monthly Package' }
      ];
    case 'WhatsApp Marketing':
      return [
        { value: '₹5,000 / month', label: '₹5,000 / month (Standard Monthly Package)' },
        { value: 'Custom Monthly Package', label: 'Custom Monthly Package' }
      ];
    default:
      return [
        { value: '₹15,000 – ₹25,000', label: '₹15,000 – ₹25,000 (Starter)' },
        { value: '₹35,000 – ₹60,000', label: '₹35,000 – ₹60,000 (Business)' },
        { value: 'Custom Pricing', label: 'Custom Pricing (Enterprise)' }
      ];
  }
};

const Contact = () => {
  const { addLead } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    service: '',
    budget: '₹15,000 – ₹25,000',
    details: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [settings, setSettings] = useState({
    company_name: 'Host2Unlimited',
    email: 'info@host2unlimited.com',
    emailHR: 'hr@host2unlimited.com',
    emailSales: 'marketing@host2unlimited.com',
    emailSupport: 'seo@host2unlimited.com',
    phoneHR: '+91 7021935273',
    phoneSales: '+91 8104612974',
    phoneSupport: '+91 8879750893',
    address: '1207, Runwal R-Square, LBS Marg, Veena Nagar, Mulund West, Mumbai – 400080, Maharashtra, India.',
    presenceHeadline: 'Serving a Diverse Clientele in the Education Vertical with Customized Digital Marketing Services',
    presenceSubtitle: 'We craft tailored strategies for schools, colleges, and edtech brands to boost visibility and engagement.',
    cities: ['MUMBAI', 'NASHIK', 'PUNE', 'CHHATRAPATI SAMBHAJI NAGAR', 'SATARA', 'JALGAON', 'KOLHAPUR', 'SANGALI'],
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
          // Mix dynamic if available, keeping new structure intact
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.warn('Failed to load dynamic website settings in Contact', err);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'service') {
        const budgets = getBudgetOptions(value);
        updated.budget = budgets[0] ? budgets[0].value : '';
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save to local CMS log
    addLead(formData);
    setSubmitted(true);

    // Send email via Web3Forms
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "17ec246a-7f1e-44f9-b8e4-ea3625b2cb01",
          subject: "Thank you for contacting us",
          from_name: "Thank you for contacting us",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.companyName,
          service: formData.service,
          budget: formData.budget,
          message: formData.details || "New Contact Submission"
        })
      });
    } catch (err) {
      console.warn("Web3Forms email delivery failed:", err);
    }
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
      service: '',
      budget: '₹35,000 – ₹60,000',
      details: ''
    });
    setSubmitted(false);
  };

  const breadcrumbs = [{ name: 'Contact', path: '/contact' }];

  return (
    <div style={{ paddingTop: '80px' }}>
      <SEOMeta
        title="Contact Us"
        description="Get in touch with Host2Unlimited. Contact our digital marketing coordinators and support teams for admissions marketing and school branding."
        keywords="contact host2unlimited, school branding support, admissions sales, HR career WhatsApp"
        canonical="https://host2unlimited.com/contact"
        breadcrumbPaths={breadcrumbs}
      />
      
      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ backgroundImage: `url(${contactHeroBg})` }}
      >
        <div className="container hero-content-wrapper">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <Breadcrumbs paths={breadcrumbs} />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>

        {/* Contact info + Form grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '50px', marginBottom: '100px' }} className="contact-grid">
          
          {/* Info Side */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '35px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '10px' }}>Connect Instantly</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
                Whether you need pricing queries, admission campaigns planning, or recruitment support, reach our departments directly.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Careers & Placements */}
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>
                  FOR CAREERS | PLACEMENTS
                </span>
                <a href="mailto:hr@host2unlimited.com" style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  ✉ hr@host2unlimited.com
                </a>
                <a href="tel:+917021935273" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  📞 +91 7021935273
                </a>
              </div>

              {/* Head Office */}
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
                <MapPin size={20} className="text-gradient" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '4px' }}>
                    HEAD OFFICE
                  </span>
                  <span style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 600, display: 'block', marginBottom: '6px', lineHeight: 1.4 }}>
                    1207, Runwal R-Square, LBS Marg, Veena Nagar, Mulund West, Mumbai – 400080, Maharashtra, India.
                  </span>
                  <a href="mailto:info@host2unlimited.com" style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    ✉ info@host2unlimited.com
                  </a>
                </div>
              </div>

              {/* Contact Details HR */}
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>
                  CONTACT DETAILS
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  HR
                </span>
                <a href="tel:+917021935273" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  📞 +91 7021935273
                </a>
              </div>

              {/* Servicing Support */}
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>
                  EXISTING CLIENTS SERVICING SUPPORT
                </span>
                <a href="tel:+918879750893" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                  📞 +91 8879750893
                </a>
                <a href="mailto:seo@host2unlimited.com" style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  ✉ seo@host2unlimited.com
                </a>
              </div>

              {/* New Enquiries / Sales */}
              <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>
                  NEW ENQUIRIES / SALES
                </span>
                <a href="tel:+918104612974" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                  📞 +91 8104612974
                </a>
                <a href="mailto:marketing@host2unlimited.com" style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  ✉ marketing@host2unlimited.com
                </a>
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
                      required
                      value={formData.service} 
                      onChange={handleChange} 
                      className="form-control"
                    >
                      <option value="">- Select -</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Web App/Software Development">Web App/Software Development</option>
                      <option value="Social Media Post Designing">Social Media Post Designing</option>
                      <option value="Facebook Management">Facebook Management</option>
                      <option value="Instagram Management">Instagram Management</option>
                      <option value="Google Business Profile Management">Google Business Profile Management</option>
                      <option value="LinkedIn Management">LinkedIn Management</option>
                      <option value="YouTube Management">YouTube Management</option>
                      <option value="Monthly Photoshoot / Video Shoot">Monthly Photoshoot / Video Shoot</option>
                      <option value="Meta Ads Management">Meta Ads Management</option>
                      <option value="Google Ads Management">Google Ads Management</option>
                      <option value="Website Maintenance">Website Maintenance</option>
                      <option value="SEO">SEO (Search Engine Optimization)</option>
                      <option value="Online Reputation Management">Online Reputation Management</option>
                      <option value="WhatsApp Marketing">WhatsApp Marketing</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget Range</label>
                    <select 
                      name="budget" 
                      required
                      value={formData.budget} 
                      onChange={handleChange} 
                      className="form-control"
                    >
                      {getBudgetOptions(formData.service).map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
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

        {/* Our Presence - Separate Full Width Section */}
        <div className="card-glass" style={{ textAlign: 'left', marginBottom: '80px', padding: '40px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '8px' }}>
            OUR PRESENCE
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', textAlign: 'left' }}>
            {settings.presenceHeadline}
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
            {settings.presenceSubtitle}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {settings.cities.map((city) => (
              <span 
                key={city} 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 700, 
                  color: 'var(--primary)', 
                  backgroundColor: 'var(--primary-light)', 
                  padding: '6px 14px', 
                  borderRadius: '8px',
                  letterSpacing: '0.4px'
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Visit Our Office Map Location Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '50px', alignItems: 'center', marginBottom: '80px' }} className="contact-map-grid">
          
          {/* Pointing Woman Image */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={pointingWomanImg} 
              alt="Find Host2Unlimited Office Map Location" 
              style={{ width: '100%', maxWidth: '385px', height: 'auto', display: 'block', objectFit: 'contain' }} 
            />
          </div>

          {/* Map details Card */}
          <div className="card-glass" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                📍 VISIT OUR OFFICE
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0', textAlign: 'left' }}>
                Find Us On The Map
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                {settings.address}
              </p>
            </div>

            {/* Embedded Google Map iframe */}
            <div style={{ width: '100%', height: '320px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <iframe
                title="Host2Unlimited Office Location Map"
                src="https://maps.google.com/maps?q=Runwal%20R-Square%20Mulund%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
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
          .contact-map-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
