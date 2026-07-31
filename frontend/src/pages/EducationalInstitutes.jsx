import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeads } from '../context/LeadContext';
import { 
  Baby, BookOpen, Globe, GraduationCap, School, Cpu, 
  Briefcase, Award, CheckCircle2, ChevronDown, ChevronUp, Send 
} from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import educationalHeroBg from '../assets/hero_bg/educational_hero_clean.png';
import schoolBuildingHero from '../assets/school_building_clean.png';
import universityHero from '../assets/university_hero_clean.png';
import campusHero from '../assets/campus_hero_clean.png';
import managementCollegeHero from '../assets/management_college_clean.png';
import preschoolHero from '../assets/preschool_hero_clean.png';
import internationalSchoolCampus from '../assets/international_school_campus.png';
import coachingClassroom from '../assets/coaching_classroom_learning.png';

import euroKidsLogo from '../assets/h2u logos/euro_kids.jpeg';
import newHorizonLogo from '../assets/h2u logos/New-Horizon-logo.png';
import dnyanGangaLogo from '../assets/h2u logos/DNYAN_GANGA_EDUCATION_TRUST_S-removebg-preview-e1750267686501 (1).webp';
import ardentLogo from '../assets/h2u logos/ardent_tutorials_thane.png';
import somaiyaLogo from '../assets/h2u logos/somaiya_college.png';
import armietLogo from '../assets/h2u logos/armiet_logo.jpeg';
import pillaiLogo from '../assets/h2u logos/dr-pillai-global-academy.png';
import gsgsLogo from '../assets/h2u logos/GSGS-logo@4x (1).png';

const sectors = [
  {
    id: 'preschools',
    icon: Baby,
    title: 'Preschools & Daycare Centers',
    desc: 'Enrolments ensured with highly effective custom digital campaigns, driving engagement.',
    image: preschoolHero,
    logo: euroKidsLogo
  },
  {
    id: 'primary-secondary',
    icon: BookOpen,
    title: 'Primary & Secondary Schools',
    desc: 'Reputation built with impactful stories and updates — engage your audience with content.',
    image: schoolBuildingHero,
    logo: newHorizonLogo
  },
  {
    id: 'international',
    icon: Globe,
    title: 'International Schools (CBSE / ICSE / IB)',
    desc: 'Boost student engagement by highlighting academic excellence and achievements.',
    image: internationalSchoolCampus,
    logo: dnyanGangaLogo
  },
  {
    id: 'coaching',
    icon: GraduationCap,
    title: 'Private Coaching Institutions',
    desc: 'Promote innovative and personalized coaching methods, proven results, and approach.',
    image: coachingClassroom,
    logo: ardentLogo
  },
  {
    id: 'colleges',
    icon: School,
    title: 'Junior and Degree Colleges',
    desc: 'Empowering students at Junior and Degree Colleges to achieve academic excellence.',
    image: campusHero,
    logo: somaiyaLogo
  },
  {
    id: 'engineering',
    icon: Cpu,
    title: 'Institutes of Engineering & Technology',
    desc: 'Future engineers with innovative learning and hands-on experience.',
    image: universityHero,
    logo: armietLogo
  },
  {
    id: 'management',
    icon: Briefcase,
    title: 'Institutes of Management Studies',
    desc: 'Future leaders with practical knowledge, strategic thinking, and a global perspective.',
    image: managementCollegeHero,
    logo: pillaiLogo
  },
  {
    id: 'universities',
    icon: Award,
    title: 'Public / Private / Deemed Universities',
    desc: 'Private educational institutions striving continuously to attract the right students.',
    image: universityHero,
    logo: gsgsLogo
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
  const [sectorList, setSectorList] = useState(sectors);
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

  useEffect(() => {
    let isMounted = true;
    const fetchInstitutes = async () => {
      try {
        const CURRENT_API_BASE = process.env.NODE_ENV === 'production'
          ? (window.location.origin.includes('localhost') ? 'http://localhost:5000' : 'https://host2unlimitedcms-backend.onrender.com')
          : 'http://localhost:5000';
        const response = await fetch(`${CURRENT_API_BASE}/api/pages/educational_institutes`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            // Merge with local icons
            const merged = data.map(item => {
              const def = sectors.find(s => s.id === item.id);
              return {
                ...item,
                icon: def?.icon || GraduationCap,
                image: item.image || def?.image || educationalHeroBg,
                logo: item.logo || def?.logo || euroKidsLogo
              };
            });
            setSectorList(merged);
          }
        }
      } catch (err) {
        console.warn('Backend fetch for educational_institutes fallback to static:', err.message);
      }
    };
    fetchInstitutes();
    return () => { isMounted = false; };
  }, []);

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
    <div style={{ paddingTop: '0px' }}>
      <SEOMeta
        title="Educational Institutes Digital Marketing & Growth Partner | Host2Unlimited"
        description="Empowering schools, junior colleges, degree colleges, engineering institutes, management institutes, and universities across Maharashtra."
        canonical="https://host2unlimited.com/educational-institutes"
        breadcrumbPaths={breadcrumbs}
      />
      
      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ 
          position: 'relative', 
          height: '210px', 
          minHeight: '210px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden', 
          backgroundColor: '#0b0f19'
        }}
      >
        <img 
          src={educationalHeroBg} 
          alt="Educational Institutes Hero Background" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, pointerEvents: 'none' }}
        />

        <div className="container hero-content-wrapper" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '60px' }}>
          {sectorList.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <Link
                key={idx}
                to={`/educational-institutes/${sector.id}`}
                style={{ 
                  textAlign: 'left', 
                  border: '1px solid rgba(255, 255, 255, 0.12)', 
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer', 
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Top Photographic Campus Image Header */}
                {sector.image && (
                  <div style={{ width: '100%', height: '170px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={sector.image} 
                      alt={sector.title} 
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.1) 60%, transparent 100%)'
                    }} />
                    
                    {/* Floating Brand Logo Box Badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '14px',
                      backgroundColor: '#ffffff',
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.45)',
                      border: '2px solid rgba(255, 255, 255, 0.95)',
                      zIndex: 2
                    }}>
                      {sector.logo ? (
                        <img 
                          src={sector.logo} 
                          alt={sector.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                        />
                      ) : (
                        <Icon size={24} color="#0284c7" />
                      )}
                    </div>
                  </div>
                )}

                {/* Card Body Content */}
                <div style={{ padding: '22px 24px 24px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', gap: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)', textAlign: 'left', lineHeight: 1.35 }}>
                      {sector.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.6, marginBottom: 0, textAlign: 'left' }}>
                      {sector.desc}
                    </p>
                  </div>

                  <div 
                    className="btn btn-primary"
                    style={{ 
                      marginTop: '8px', 
                      padding: '10px 18px', 
                      fontSize: '13.5px', 
                      fontWeight: 700, 
                      borderRadius: '10px', 
                      textAlign: 'center',
                      width: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                    }}
                  >
                    View Custom Strategy
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '850px', margin: '0 auto 80px auto', textAlign: 'left' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Frequently Asked Questions</h2>
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

          <div className="card-glass" style={{ marginTop: '40px', padding: '30px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>Ready to Scale Your Institute's Admissions?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
              Connect with our specialized education marketing team today to receive a tailored digital roadmap.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}>
              Contact Our Team <Send size={16} />
            </Link>
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
