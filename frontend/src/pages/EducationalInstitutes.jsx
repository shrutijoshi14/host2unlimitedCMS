import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeads } from '../context/LeadContext';
import { 
  Baby, BookOpen, Globe, GraduationCap, School, Cpu, 
  Briefcase, Award, CheckCircle2, ChevronDown, ChevronUp, Send 
} from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const sectors = [
  {
    id: 'preschools',
    icon: Baby,
    title: 'Preschools & Daycare Centers',
    desc: 'Enrolments ensured with highly effective custom digital campaigns, driving engagement.'
  },
  {
    id: 'primary-secondary',
    icon: BookOpen,
    title: 'Primary & Secondary Schools',
    desc: 'Reputation built with impactful stories and updates — engage your audience with content.'
  },
  {
    id: 'international',
    icon: Globe,
    title: 'International Schools (CBSE / ICSE / IB)',
    desc: 'Boost student engagement by highlighting academic excellence and achievements.'
  },
  {
    id: 'coaching',
    icon: GraduationCap,
    title: 'Private Coaching Institutions',
    desc: 'Promote innovative and personalized coaching methods, proven results, and approach.'
  },
  {
    id: 'colleges',
    icon: School,
    title: 'Junior and Degree Colleges',
    desc: 'Empowering students at Junior and Degree Colleges to achieve academic excellence.'
  },
  {
    id: 'engineering',
    icon: Cpu,
    title: 'Institutes of Engineering & Technology',
    desc: 'Future engineers with innovative learning and hands-on experience.'
  },
  {
    id: 'management',
    icon: Briefcase,
    title: 'Institutes of Management Studies',
    desc: 'Future leaders with practical knowledge, strategic thinking, and a global perspective.'
  },
  {
    id: 'universities',
    icon: Award,
    title: 'Public / Private / Deemed Universities',
    desc: 'Private educational institutions striving continuously to attract the right students.'
  }
];

const caseStudiesData = {
  preschools: [
    { name: 'Poddar Brio Kids', tag: 'Hyperlocal Leads', metric: '45% Enrolment Growth' },
    { name: 'Uudaan Montessori', tag: 'Local SEO & Maps', metric: '3x Parent Inquiries' },
    { name: 'The Learning Curve India', tag: 'Social Media Trust', metric: '200+ Active Leads' }
  ],
  'primary-secondary': [
    { name: 'Holy Cross English Medium School', tag: 'School Branding & Engagement', metric: '3x Social Reach' },
    { name: 'Navodaya English High School & Junior College', tag: 'Admission Season Campaign', metric: '60% More Conversions' }
  ],
  international: [
    { name: 'Poddar Brio School', tag: 'Prestige Positioning & Search', metric: 'High-intent Inquiries' },
    { name: 'DG International CBSE School', tag: 'Admissions Campaign & Ads', metric: '100% Seats Filled' },
    { name: 'Gautam Singhania Global School', tag: 'Virtual Tour & Reputation', metric: 'Top Local Authority' }
  ],
  coaching: [
    { name: 'Ardent Tutorials', tag: 'Urgency Campaign & Topper Interviews', metric: 'Fast Batch Bookings' }
  ],
  colleges: [
    { name: 'Royal Junior & Degree College', tag: 'Student-centric Reels & Web Funnels', metric: 'Gen Z Focus' }
  ],
  engineering: [
    { name: 'ARMIET Engineering & Management College', tag: 'Multi-audience SEO & LinkedIn', metric: '60% More Direct Leads' },
    { name: 'Shivajirao S. Jondhle College of Engineering & Technology', tag: 'Targeted Regional Funnels', metric: 'Enhanced admissions flow' }
  ]
};

const faqs = [
  {
    q: 'What is Host2Unlimited?',
    a: 'Host2Unlimited is a reliable web hosting provider and digital partner offering unlimited hosting solutions and dedicated digital marketing for educational institutes.'
  },
  {
    q: 'Which hosting plans do you offer?',
    a: 'We offer Shared NVMe, KVM VPS, Cloud, and Dedicated Hosting plans optimized for speed and high availability.'
  },
  {
    q: 'Can I host multiple websites on one account?',
    a: 'Absolutely. Our unlimited hosting plans allow you to host multiple domains and web portals on a single dashboard.'
  },
  {
    q: 'Do you provide daily backups?',
    a: 'Yes, we perform automatic daily backups to safeguard your databases, file systems, and emails from data loss.'
  },
  {
    q: 'Do you offer website migration services?',
    a: 'Yes, we provide 100% free website migration services with zero downtime for all new customers.'
  },
  {
    q: 'Can I upgrade my hosting plan later?',
    a: 'Yes, you can upgrade your virtual hosting or CPU resources instantly as your platform traffic grows.'
  },
  {
    q: 'Which control panel do you use?',
    a: 'We use cPanel, providing a clean, standard dashboard interface to configure databases, file directories, and SSL.'
  },
  {
    q: 'Do you support WordPress and other CMS platforms?',
    a: 'Yes, our servers fully support WordPress, Joomla, Drupal, Moodle LMS, and other open-source learning management tools.'
  },
  {
    q: 'Is technical support available 24/7?',
    a: 'Absolutely. Our technical support experts are available 24/7/365 via live chat, email ticket desks, and phone.'
  }
];

const EducationalInstitutes = () => {
  const { addLead } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '6-Month Program',
    qualification: 'Graduation',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead({
      name: formData.name,
      companyName: 'Educational Institute',
      email: formData.email,
      phone: formData.phone,
      service: `Training/Course - ${formData.program}`,
      budget: 'Course Enquiry',
      details: `Qualification: ${formData.qualification}. Enquiry details: ${formData.details || 'None'}`
    });
    setSubmitted(true);
  };

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const breadcrumbs = [{ name: 'Educational Institutes', path: '/educational-institutes' }];

  return (
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title="Educational Institutes Digital Marketing Partner | Host2Unlimited"
        description="We partner with Preschools, Schools, Junior Colleges, and Universities across Maharashtra to boost admissions and build a magnificent online brand presence."
        keywords="educational marketing, school branding, digital partner schools, junior college lead generation"
        canonical="https://host2unlimited.com/educational-institutes"
        breadcrumbPaths={breadcrumbs}
      />
      <Breadcrumbs paths={breadcrumbs} />

      <div className="container" style={{ marginTop: '40px' }}>
        
        {/* Banner Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
            Future-Ready Digital Education
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}>
            Digital Growth for Educational Institutes
          </h1>
          <p style={{ maxWidth: '750px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.6 }}>
            We help educational institutes harness the power of digital platforms to achieve sustainable growth. Click a card to view our customized strategy for each sector.
          </p>
        </div>

        {/* Sectors Index Directory Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {sectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <Link
                key={idx}
                to={`/educational-institutes/${sector.id}`}
                className="card-glass"
                style={{ 
                  textAlign: 'left', 
                  border: '1px solid var(--glass-border)', 
                  padding: '24px', 
                  cursor: 'pointer', 
                  transition: 'all 0.3s ease',
                  display: 'block',
                  textDecoration: 'none'
                }}
              >
                <div className="card-icon-container" style={{ width: '40px', height: '40px', borderRadius: '10px', marginBottom: '16px' }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: '15.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{sector.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: 1.4, marginBottom: 0 }}>{sector.desc}</p>
              </Link>
            );
          })}
        </div>

        {/* Form and FAQ Section Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', marginBottom: '80px', textAlign: 'left' }} className="form-faq-grid">
          
          {/* FAQ block */}
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '24px' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="card-glass" 
                  style={{ padding: '16px 20px', cursor: 'pointer', transition: 'all var(--transition-fast)' }}
                  onClick={() => toggleFaq(idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{faq.q}</h4>
                    {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  {openFaq === idx && (
                    <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '12px', lineHeight: 1.5 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Training Course Enquiry Form */}
          <div className="card-glass" style={{ alignSelf: 'start' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Start Your Digital Journey</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginBottom: '24px' }}>
              Submit an enquiry to launch admissions marketing campaigns or register for our professional training program.
            </p>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '30px 0' }}
              >
                <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Enquiry Dispatched!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                  Thank you for connecting. Our academic coordinator will contact you shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ width: '100%' }}>
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your name..."
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email..."
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter phone number..."
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-row-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Select Program</label>
                    <select 
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="form-control"
                      style={{ height: '40px' }}
                    >
                      <option value="6-Month Program">6-Month Program</option>
                      <option value="3-Month Program">3-Month Program</option>
                      <option value="Admission Marketing Enquiry">Admissions Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Last Qualification</label>
                    <select 
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="form-control"
                      style={{ height: '40px' }}
                    >
                      <option value="10th">10th</option>
                      <option value="12th">12th</option>
                      <option value="Graduation">Graduation</option>
                      <option value="Master">Master</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Message / Requirements</label>
                  <textarea 
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Describe your requirements or questions..."
                    style={{ minHeight: '100px', padding: '12px' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', marginTop: '10px' }}
                >
                  <Send size={14} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .form-faq-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 480px) {
          .form-row-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EducationalInstitutes;
