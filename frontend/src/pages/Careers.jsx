import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeads } from '../context/LeadContext';
import { Briefcase, MapPin, Clock, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const CURRENT_API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5050'
  : window.location.origin;

const staticPositions = [
  {
    title: 'Graphics Designer',
    department: 'Creative Design',
    location: 'Mumbai Office / Hybrid',
    type: 'Full-Time',
    requirements: ['Expertise in Photoshop, Illustrator, and Figma', 'Strong portfolio in branding, layouts, and social media designs', 'Knowledge of modern web visual guidelines & typography']
  },
  {
    title: 'WordPress Developer',
    department: 'Engineering',
    location: 'Mumbai Office',
    type: 'Full-Time',
    requirements: ['Proficient in custom themes, Gutenberg, and ACF', 'Strong knowledge of PHP, HTML5, CSS3, and JavaScript', 'Experience in speed optimization and core web vitals tuning']
  },
  {
    title: 'Social Media Executive',
    department: 'Digital Marketing',
    location: 'Hybrid',
    type: 'Full-Time',
    requirements: ['Experience managing Facebook, Instagram, and LinkedIn accounts', 'Proven track record of driving organic content engagement', 'Skills in copy writing and content scheduling tools']
  },
  {
    title: 'Video Editor',
    department: 'Creative Production',
    location: 'Hybrid',
    type: 'Full-Time',
    requirements: ['Proficiency in Premiere Pro, After Effects, or DaVinci Resolve', 'Ability to edit fast-paced reels, corporate clips, and promo videos', 'Knowledge of sound design, color grading, and graphics overlays']
  },
  {
    title: 'Event Management Photography / Videography',
    department: 'Creative Production',
    location: 'On-Site / Project-Based',
    type: 'Contract',
    requirements: ['Professional photography and videography experience', 'Own high-end mirrorless gear and stabilization equipment', 'Experience coverage for corporate keynotes, institutional campaigns, and events']
  },
  {
    title: 'Business Development Sales',
    department: 'Sales & Partnerships',
    location: 'Mumbai Office / Field',
    type: 'Full-Time',
    requirements: ['Experience selling web services, hosting, or custom software', 'Outstanding verbal and written presentation abilities', 'Skill in pipeline CRM logging, proposal writing, and client pitching']
  }
];

const Careers = () => {
  const { addLead } = useLeads();
  const formRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [banner, setBanner] = useState({
    title: 'Careers at Host2Unlimited',
    subtitle: 'Join Our Team',
    desc: 'Explore opportunities to build scalable portals, launch digital marketing campaigns, and craft visual graphics with our collaborative engineering desk.'
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolioLink: '',
    coverLetter: ''
  });

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        // 1. Check module status
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        let cmsActive = false;
        let bannerActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const targetMod = modules.find(m => m.id === 'careers');
          if (targetMod && targetMod.enabled === 1) {
            cmsActive = true;
          }
          const targetBannerMod = modules.find(m => m.id === 'banner');
          if (targetBannerMod && targetBannerMod.enabled === 1) {
            bannerActive = true;
          }
        }

        if (cmsActive) {
          // 2. Fetch from database page CMS
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/careers`);
          if (response.ok) {
            const data = await response.json();
            setPositions(data);
            if (data.length > 0) {
              setSelectedJob(data[0].title);
            }
          } else {
            throw new Error('Careers database content not seeded.');
          }
        } else {
          setPositions(staticPositions);
          setSelectedJob(staticPositions[0].title);
        }

        if (bannerActive) {
          const bannerRes = await fetch(`${CURRENT_API_BASE}/api/pages/banner`);
          if (bannerRes.ok) {
            const bannerData = await bannerRes.json();
            if (bannerData.careers) {
              setBanner(bannerData.careers);
            }
          }
        }
      } catch (err) {
        console.warn('Careers CMS failed, loading static data backups.', err);
        setPositions(staticPositions);
        setSelectedJob(staticPositions[0].title);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleApplyClick = (title) => {
    setSelectedJob(title);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    addLead({
      name: formData.name,
      companyName: `Job Application`,
      email: formData.email,
      phone: formData.phone,
      service: `Careers - ${selectedJob}`,
      budget: 'N/A (Job Application)',
      details: `Applied Position: ${selectedJob}. Portfolio/Resume Link: ${formData.portfolioLink || 'None'}. Cover Letter: ${formData.coverLetter || 'None'}`
    });

    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      portfolioLink: '',
      coverLetter: ''
    });
    setSubmitted(false);
  };

  const breadcrumbs = [{ name: 'Careers', path: '/careers' }];

  return (
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title="Careers & Open Job Openings | Host2Unlimited"
        description="Join the team at Host2Unlimited. Explore open positions in web design, system engineering, digital marketing, and software developers."
        keywords="careers host2unlimited, job openings web designer, hiring database engineer, tech jobs Mumbai"
        canonical="https://host2unlimited.com/careers"
        breadcrumbPaths={breadcrumbs}
      />
      <Breadcrumbs paths={breadcrumbs} />

      <div className="container" style={{ marginTop: '40px' }}>
        
        {/* Header Section */}
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
            {banner.subtitle}
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}>{banner.title}</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.6 }}>
            {banner.desc}
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Retrieving open job positions...
          </div>
        ) : (
          /* Grid of Open Positions */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '100px' }}>
            {positions.map((pos, idx) => (
              <motion.div
                key={idx}
                className="card-glass"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.02, borderColor: 'var(--primary)', boxShadow: '0 20px 40px -15px rgba(14, 165, 233, 0.15)' }}
                style={{ display: 'flex', flexDirection: 'column', justifycontent: 'space-between', textAlign: 'left', border: '1px solid var(--glass-border)', transition: 'border-color 0.2s, box-shadow 0.2s' }}
              >
                <div>
                  {/* Meta details */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>
                      {pos.department}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <MapPin size={13} /> {pos.location}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>{pos.title}</h3>
                  
                  {/* Requirements */}
                  {pos.requirements && pos.requirements.length > 0 && (
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>Job Requirements:</h4>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                        {pos.requirements.map((req, ridx) => (
                          <li key={ridx} style={{ display: 'flex', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleApplyClick(pos.title)} 
                  className="btn btn-secondary" 
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: 'auto' }}
                >
                  Apply Now <ChevronRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Application Form block */}
        <div ref={formRef} style={{ maxWidth: '650px', margin: '0 auto' }}>
          <div className="card-glass" style={{ padding: '40px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '10px' }}>Apply For Placement</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '30px' }}>
              Submit your resume details. Our recruitment desk will contact you inside 48 business hours.
            </p>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <div style={{ display: 'inline-flex', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Application Dispatched!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '30px' }}>
                  Thank you for submitting your details. We have registered your application file for <strong>{selectedJob}</strong>.
                </p>
                <button onClick={resetForm} className="btn btn-secondary">
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Enter your name..."
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Enter your email..."
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="e.g. +91 98765 43210..."
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Job Position *</label>
                    <select 
                      name="selectedJob"
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="form-control"
                      style={{ height: '46px', padding: '0 12px' }}
                    >
                      {positions.map((pos, idx) => (
                        <option key={idx} value={pos.title}>{pos.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Resume / Portfolio Link</label>
                  <input 
                    type="url" 
                    name="portfolioLink"
                    placeholder="Paste Google Drive, Dropbox, or LinkedIn PDF URL..."
                    value={formData.portfolioLink}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Cover Letter / Details</label>
                  <textarea 
                    name="coverLetter"
                    placeholder="Briefly introduce yourself and outline your experience..."
                    value={formData.coverLetter}
                    onChange={handleChange}
                    className="form-control"
                    style={{ minHeight: '120px', padding: '12px' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px' }}
                >
                  <Send size={15} /> Dispatch Application File
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Careers;
