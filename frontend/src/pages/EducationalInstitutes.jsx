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
import educationalHeroBg from '../assets/hero_bg/educational_hero_art.svg';

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
    q: "What does Host2Unlimited do?",
    a: "Host2Unlimited is a digital marketing partner specializing in the education sector, working with schools, colleges, universities, and educational campuses across Maharashtra."
  },
  {
    q: "What services does Host2Unlimited offer?",
    a: "Their core services include digital marketing, admission marketing, website development, content marketing and branding, public relations, influencer engagement, SEO, social media management, reputation management, video storytelling, and event marketing."
  },
  {
    q: "Which types of educational institutions does Host2Unlimited work with?",
    a: "They serve preschools & daycare centers, primary & secondary schools, international schools (CBSE/ICSE/IB), private coaching institutes, junior and degree colleges, engineering & technology institutes, management studies institutes, and public/private/deemed universities."
  },
  {
    q: "Does Host2Unlimited provide a dedicated person for my campus?",
    a: "Yes — they offer a dedicated in-house Digital Marketing Coordinator at your campus for tasks like event coverage, admission lead tracking, social media monitoring, content creation, SEO-updated websites, and analytics reporting."
  },
  {
    q: "Where is Host2Unlimited located and where do they operate?",
    a: "Their head office is in Mulund West, Mumbai, and they serve clients across Mumbai, Nashik, Pune, Chhatrapati Sambhajinagar, Satara, Jalgaon, Sangli, and Kolhapur."
  },
  {
    q: "When was Host2Unlimited founded?",
    a: "The company was founded in 2010 as a strategic digital partner for educational institutes in Maharashtra."
  },
  {
    q: "Does Host2Unlimited offer any training or courses?",
    a: "Yes, they offer a comprehensive Digital Marketing Course in Mumbai covering SEO, social media marketing, Google Ads, email marketing, content marketing/blogging, and analytics — designed for beginners, professionals, and entrepreneurs, with 3-month and 6-month program options."
  },
  {
    q: "How can I get in touch with Host2Unlimited?",
    a: "You can contact them via phone for different needs — new enquiries/sales, existing client support, digital marketing & training, or careers/placements — or email them at info@host2unlimited.com, or fill out their online enquiry form."
  },
  {
    q: "Has Host2Unlimited received any industry recognition?",
    a: 'Yes — founder Rampratap Bugalia was honored with the "Award of Innovative Digital Solutions Partner for Educational Institutes" at the Indian School Awards 2025.'
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
    <div style={{ paddingTop: '80px' }}>
      <SEOMeta
        title="Educational Institutes Digital Marketing Partner | Host2Unlimited"
        description="We partner with Preschools, Schools, Junior Colleges, and Universities across Maharashtra to boost admissions and build a magnificent online brand presence."
        keywords="educational marketing, school branding, digital partner schools, junior college lead generation"
        canonical="https://host2unlimited.com/educational-institutes"
        breadcrumbPaths={breadcrumbs}
      />
      
      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ position: 'relative', height: '280px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#0b0f19' }}
      >
        <img 
          src={educationalHeroBg} 
          alt="Educational Institutes Hero Background" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center center',
            zIndex: 1, 
            pointerEvents: 'none' 
          }} 
        />
        <div className="container hero-content-wrapper" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <Breadcrumbs paths={breadcrumbs} />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {/* Subpage Header Content */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 45px auto' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Future-Ready Digital Education</span>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.5px', lineHeight: 1.25 }}>
            Digital Growth for Educational Institutes
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7 }}>
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
                <h3 style={{ fontSize: '15.5px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)', textAlign: 'left' }}>{sector.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: 1.4, marginBottom: 0, textAlign: 'left' }}>{sector.desc}</p>
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
