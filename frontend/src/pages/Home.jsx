import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, animate, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Zap, Cpu, Shield, PhoneCall, 
  GraduationCap, BookOpen, Users, Award, Globe, Briefcase, 
  Smile, Video, Target, Camera, Search, TrendingUp, Mail, 
  FileText, Check, ChevronLeft, ChevronRight 
} from 'lucide-react';
import Timeline from '../components/Timeline';
import MarketingTimeline from '../components/MarketingTimeline';
import TestimonialSlider from '../components/TestimonialSlider';
import SEOMeta from '../components/SEOMeta';
import schoolBuildingHero from '../assets/school_building_hero.png';
import universityHero from '../assets/university_hero.png';
import campusHero from '../assets/campus_hero.png';
import managementCollegeHero from '../assets/management_college_hero.png';
import preschoolHero from '../assets/preschool_hero.png';

const institutionsData = [
  {
    title: 'Preschools & Daycare Centers',
    desc: 'Enrolments ensured with highly effective custom digital campaigns, driving engagement.',
    iconName: 'Smile',
    link: 'https://host2unlimited.com/digital-marketing-partner-for-preschools/'
  },
  {
    title: 'Primary & Secondary Schools',
    desc: 'Reputation with impactful stories and updates. Engage your audience with content.',
    iconName: 'BookOpen',
    link: 'https://host2unlimited.com/digital-marketing-partner-for-primary-secondary-schools/'
  },
  {
    title: 'International Schools CBSE: ICSE: IB Board',
    desc: 'Boost student engagement by consistently highlighting academic excellence.',
    iconName: 'Globe',
    link: 'https://host2unlimited.com/digital-marketing-partner-for-international-schools-cbse-icse-ib/'
  },
  {
    title: 'Private Coaching Institutions',
    desc: 'Promote innovative coaching methods, proven results, and unique approach.',
    iconName: 'Users',
    link: 'https://host2unlimited.com/digital-marketing-partner-for-private-coaching-institutions/'
  },
  {
    title: 'Junior and Degree Colleges',
    desc: 'Empowering students at Junior and Degree Colleges to achieve academic of excellence.',
    iconName: 'GraduationCap',
    link: 'https://host2unlimited.com/digital-marketing-partner-for-junior-and-degree-colleges/'
  },
  {
    title: 'Institutes of Engineering & Technology',
    desc: 'Future engineers with innovative learning, hands-on experience.',
    iconName: 'Cpu',
    link: 'https://host2unlimited.com/digital-marketing-partner-for-institutes-of-engineering-management-studies/'
  },
  {
    title: 'Institutes of Management Studies',
    desc: 'Empowering future leaders with practical knowledge, strategic thinking.',
    iconName: 'Briefcase',
    link: 'https://host2unlimited.com/digital-marketing-partner-for-institutes-of-engineering-management-studies/'
  },
  {
    title: 'Public / Private / Deemed Universities',
    desc: 'Empowering private educational institutions to attract the right students.',
    iconName: 'Award',
    link: 'https://host2unlimited.com/digital-marketing-partner-for-public-private-deemed-universities/'
  }
];

const coordinatorBenefits = [
  {
    title: 'SEAMLESS EVENT COVERAGE & LIVE UPDATES',
    desc: 'Capturing every important campus moment.',
    iconName: 'Camera'
  },
  {
    title: 'ADMISSION LEADS CAMPAIGNS',
    desc: 'Keeping track of Admission leads for driving the right students to your institution.',
    iconName: 'Target'
  },
  {
    title: 'SOCIAL MEDIA MONITORING & ENGAGEMENT',
    desc: 'Building a strong digital presence.',
    iconName: 'Users'
  },
  {
    title: 'CONTENT CREATION & MANAGEMENT',
    desc: 'Capture and curate high-quality photos and videos of school events, student achievements, classroom activities, etc.',
    iconName: 'Video'
  },
  {
    title: 'SEO-UPDATED WEBSITE',
    desc: 'Making your institute visible & credible online.',
    iconName: 'Search'
  },
  {
    title: 'ANALYTICS & REPORTING',
    desc: 'Track post engagement, reach, and follower growth.',
    iconName: 'TrendingUp'
  }
];

const courseTopics = [
  { title: 'Search Engine Optimization (SEO)', iconName: 'Search' },
  { title: 'Social Media Marketing (SMM)', iconName: 'Users' },
  { title: 'Google Ads & Paid Campaigns', iconName: 'Target' },
  { title: 'Email Marketing & Automation', iconName: 'Mail' },
  { title: 'Content Marketing & Blogging', iconName: 'FileText' },
  { title: 'Analytics, Strategy & Reporting', iconName: 'TrendingUp' }
];

const getIconComponent = (name) => {
  switch (name) {
    case 'Smile': return <Smile size={24} />;
    case 'BookOpen': return <BookOpen size={24} />;
    case 'Globe': return <Globe size={24} />;
    case 'Users': return <Users size={24} />;
    case 'GraduationCap': return <GraduationCap size={24} />;
    case 'Cpu': return <Cpu size={24} />;
    case 'Briefcase': return <Briefcase size={24} />;
    case 'Award': return <Award size={24} />;
    case 'Camera': return <Camera size={24} />;
    case 'Target': return <Target size={24} />;
    case 'Video': return <Video size={24} />;
    case 'Search': return <Search size={24} />;
    case 'TrendingUp': return <TrendingUp size={24} />;
    case 'Mail': return <Mail size={24} />;
    case 'FileText': return <FileText size={24} />;
    default: return <CheckCircle2 size={24} />;
  }
};

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const Counter = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const numericValue = parseInt(value, 10) || 0;
    const controls = animate(count, numericValue, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toString());
      }
    });
    return () => controls.stop();
  }, [value, count]);

  return <span>{displayValue}{suffix}</span>;
};

import armietLogo from '../assets/h2u logos/armiet_logo.jpeg';
import pillaiLogo from '../assets/h2u logos/dr-pillai-global-academy.png';
import euroKidsLogo from '../assets/h2u logos/euro_kids.jpeg';
import somaiyaLogo from '../assets/h2u logos/somaiya_college.png';
import uudaanLogo from '../assets/h2u logos/uudaan-montessori-preschool.jpg';
import newHorizonLogo from '../assets/h2u logos/New-Horizon-logo.png';
import dnyanGangaLogo from '../assets/h2u logos/DNYAN_GANGA_EDUCATION_TRUST_S-removebg-preview-e1750267686501 (1).webp';
import gsgsLogo from '../assets/h2u logos/GSGS-logo@4x (1).png';
import ulweLogo from '../assets/h2u logos/Ulwe-logo (1).png';
import vsignLogo from '../assets/h2u logos/V-Sign-logo.png';

const clientLogos = [
  armietLogo, pillaiLogo, euroKidsLogo, somaiyaLogo, uudaanLogo,
  newHorizonLogo, dnyanGangaLogo, gsgsLogo, ulweLogo, vsignLogo
];

const staticWhyChooseUsData = [
  {
    title: 'Custom Solutions',
    desc: 'Every business is unique. We build tailored systems that align perfectly with your organizational goals.'
  },
  {
    title: 'Experienced Team',
    desc: 'Skilled developers, UI/UX designers, certified marketers, and systems consultants working in alignment.'
  },
  {
    title: 'Growth Focused',
    desc: 'Our engineering designs focus on improving operational efficiency, search visibility, and revenue streams.'
  },
  {
    title: 'Reliable Support',
    desc: 'Dedicated support before, during, and after project completion to ensure uninterrupted operations.'
  },
  {
    title: 'Scalable Technology',
    desc: 'Future-ready architectures that scale seamlessly as your userbase and inventory databases grow.'
  },
  {
    title: 'Transparent Communication',
    desc: 'Regular updates, visual staging links, clear Slack reports, and structured progress timelines.'
  }
];

const staticServicesPreview = [
  {
    title: 'Website Development',
    desc: 'Responsive, modern websites built for high performance, top-tier security, and optimized user conversions.'
  },
  {
    title: 'Custom Software Development',
    desc: 'Intelligent business software solutions tailored to automate manual operations and improve productivity.'
  },
  {
    title: 'Cloud Hosting Solutions',
    desc: 'Ultra-reliable cloud hosting infrastructure designed for max speeds, redundant security backups, and 99.9% uptime.'
  }
];

const heroServices = [
  'Social Media Marketing',
  'Video Marketing',
  'Admissions Marketing',
  'Website Development',
  'Content Marketing',
  'Influencer Activities',
  'Search Engine Optimization'
];

const topicSlides = [
  {
    category: 'INTERNATIONAL SCHOOL',
    bg: schoolBuildingHero
  },
  {
    category: 'UNIVERSITIES',
    bg: universityHero
  },
  {
    category: 'EDUCATIONAL CAMPUS',
    bg: campusHero
  },
  {
    category: 'MGMT COLLEGES',
    bg: managementCollegeHero
  },
  {
    category: 'PRESCHOOLS & DAYCARE',
    bg: preschoolHero
  }
];

const heroChecklist = [
  'DIGITAL MARKETING ACTIVITIES',
  'PUBLIC RELATIONS',
  'ADMISSION MARKETING',
  'INFLUENCER ACTIVITIES',
  'REPUTATION MANAGEMENT',
  'SEARCH ENGINE OPTIMIZATION',
  'CONTENT MARKETING, BRANDING',
  'POWERFUL VIDEO STORIES'
];

const defaultHomepageData = {
  hero: {
    badge: '⭐ Next-Generation Digital Solutions',
    title: 'Digital Marketing Partner of Educational Institutes & Modern Businesses',
    description: 'We serve as a dedicated digital marketing partner for educational institutes like international schools, colleges, campuses, and universities, helping them grow through professional website development, secure cloud hosting, Google-rank SEO services, custom software solutions, and ERP databases.'
  },
  about: {
    title: 'Why Businesses Choose Host2Unlimited',
    description: 'We partner with businesses to deploy scalable digital platforms, driving engagement and compounding search visibility.'
  },
  services: {
    title: 'Core Engineering Capabilities',
    description: 'We translate client specifications into robust websites, automated enterprise software, and scalable hosting frameworks.'
  },
  cta: {
    title: 'Ready to Build Your Digital Future?',
    description: 'Get in touch with our tech consultants today. Let us lock in a tailored blueprint and cost range for your custom software or enterprise portal.'
  }
};

const Home = () => {
  const [homepageData, setHomepageData] = useState(defaultHomepageData);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % topicSlides.length);
    }, 5500);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        setLoading(true);
        // 1. Check if homepage CMS module is enabled
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        let cmsActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const targetMod = modules.find(m => m.id === 'homepage');
          if (targetMod && targetMod.enabled === 1) {
            cmsActive = true;
          }
        }

        if (cmsActive) {
          // 2. Fetch data from CMS page endpoint
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/homepage`);
          if (response.ok) {
            const data = await response.json();
            setHomepageData(data);
          }
        }
      } catch (err) {
        console.warn('Homepage CMS connection offline, using static defaults.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomepage();

    const handleUpdate = (e) => {
      if (e.detail?.page === 'homepage' || e.detail?.type === 'module_update') {
        fetchHomepage();
      }
    };

    window.addEventListener('cmsPageUpdate', handleUpdate);
    window.addEventListener('cmsModuleUpdate', handleUpdate);

    return () => {
      window.removeEventListener('cmsPageUpdate', handleUpdate);
      window.removeEventListener('cmsModuleUpdate', handleUpdate);
    };
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <SEOMeta
        title="Enterprise Cloud Web Hosting & Digital Solutions"
        description="Host2Unlimited provides premium, high-speed Shared NVMe Hosting, Managed WordPress Hosting, KVM VPS, Bare Metal Servers, and Cloud infrastructures alongside custom development."
        keywords="web hosting, cloud hosting, VPS server, dedicated server, hosting company, Host2Unlimited, cheap domain hosting"
        canonical="https://host2unlimited.com/"
      />
      {/* Background blobs */}
      <div className="bg-decorations">
        <div className="decor-shape decor-shape-1" />
        <div className="decor-shape decor-shape-2" />
      </div>
      {/* Hero Section */}
      <section 
        className="section-padding" 
        style={{ 
          paddingTop: '175px', 
          paddingBottom: '40px',
          position: 'relative', 
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #021235 0%, #061a40 50%, #3f4f13 100%)',
          color: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Dynamic Background Image on the Right */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '55%',
          zIndex: 1,
          overflow: 'hidden'
        }} className="hero-right-img-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.8 }}
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${topicSlides[currentSlide].bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              {/* Soft fade overlays to blend the building image while keeping it clear and visible */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #061a40 0%, rgba(6, 26, 64, 0.7) 15%, rgba(6, 26, 64, 0.2) 50%, transparent 100%)',
                zIndex: 2
              }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(63, 79, 19, 0.6) 0%, rgba(63, 79, 19, 0.15) 40%, transparent 100%)',
                zIndex: 2
              }} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 0.9fr', gap: '30px', alignItems: 'center' }} className="hero-grid">
            
            {/* Hero Left Content */}
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Huge Titles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                <h1 style={{ 
                  fontSize: '32px', 
                  fontWeight: 800, 
                  lineHeight: 1.15, 
                  margin: 0, 
                  letterSpacing: '-0.5px', 
                  color: '#ffffff',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textAlign: 'left',
                  whiteSpace: 'nowrap'
                }}>
                  DIGITAL PROMOTION PARTNERS
                </h1>
                
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={currentSlide}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    style={{ 
                      fontSize: '30px', 
                      fontWeight: 800, 
                      margin: '5px 0 0 0', 
                      color: '#fef08a', // Yellow color matching screenshot
                      letterSpacing: '-0.5px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      textAlign: 'left'
                    }}
                  >
                    {topicSlides[currentSlide].category}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* WE PLAN AND EXECUTE Checklist */}
              <div style={{ marginTop: '10px', textAlign: 'left' }}>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: 800, 
                  letterSpacing: '1px', 
                  color: '#ffffff', 
                  marginBottom: '12px',
                  fontFamily: 'Georgia, serif',
                  textTransform: 'uppercase',
                  textAlign: 'left'
                }}>
                  WE PLAN AND EXECUTE
                </h3>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1.1fr', 
                  gap: '10px 18px',
                  maxWidth: '600px'
                }}>
                  {heroChecklist.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '13px', flexShrink: 0 }}>✓</span>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 600, 
                        color: '#ffffff', 
                        letterSpacing: '0.3px',
                        textAlign: 'left'
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROI Strategies text */}
              <div style={{ 
                marginTop: '5px',
                padding: '10px 14px', 
                borderLeft: '3px solid #fef08a', 
                backgroundColor: 'rgba(255, 255, 255, 0.04)', 
                borderRadius: '0 6px 6px 0',
                maxWidth: '550px'
              }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', margin: 0, lineHeight: 1.45, textAlign: 'left' }}>
                  Digital Strategies for Educational Institute: Get your <span style={{ color: '#fef08a', fontWeight: 700 }}>FREE SOCIAL MEDIA STRATEGY</span> and <span style={{ color: '#fef08a', fontWeight: 700 }}>ROI REPORT</span> that best suits your goals, today!
                </p>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '5px' }}>
                <Link 
                  to="/contact" 
                  className="btn" 
                  style={{ 
                    fontSize: '12.5px', 
                    padding: '10px 24px', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    backgroundColor: '#ffffff',
                    color: '#021235',
                    fontWeight: 700,
                    borderRadius: '30px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fef08a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                >
                  Click Here to fill the Enquiry form <ArrowRight size={13} />
                </Link>
              </div>

            </div>

            {/* Empty right grid space because image covers full background right half */}
            <div></div>

          </div>
        </div>
      </section>





      {/* Services Highlight Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }} className="service-header-flex">
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>{homepageData.services.title}</h2>
              <p style={{ maxWidth: '550px', color: 'var(--text-secondary)', fontSize: '16px' }}>
                {homepageData.services.description}
              </p>
            </div>
            <Link to="/services" className="btn btn-primary">
              All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {staticServicesPreview.map((service, idx) => (
              <motion.div 
                key={idx} 
                className="card-glass" 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: 'var(--shadow-lg)' }}
                style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'left' }}
              >
                <div className="card-icon-container" style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '24px' }}>
                  {idx === 0 ? <Zap size={22} /> : idx === 1 ? <Cpu size={22} /> : <Shield size={22} />}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '24px', lineHeight: 1.5 }}>{service.desc}</p>
                <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Educational Institutions We Work With */}
      <section className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
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
              Academic Verticals
            </span>
            <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>Major Educational Institutions We Work With</h2>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '800px', margin: '0 auto 24px auto', lineHeight: 1.4 }}>
              WISH TO BE AN EDUCATIONAL INSTITUTE WITH A MAGNIFICENT BRAND IMAGE ONLINE?
            </h3>
            <p style={{ maxWidth: '900px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: 1.6 }}>
              We are Digital Marketing Partner of Educational Institutes like International Schools, Colleges, Campuses, Universities, etc. Our Major Activities include Digital Marketing Activities, Admission Marketing, Website development, Branding, Content Marketing, Public Relations, Influencer Engagements, Search Engine Optimization (SEO), Social Media Management, Reputation Management, Powerful Video Stories & Maximizing Event Success.
            </p>
          </div>

          <div className="institutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {institutionsData.map((inst, idx) => (
              <motion.a 
                key={idx}
                href={inst.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: 'var(--shadow-lg)', borderColor: 'var(--primary)' }}
                style={{ 
                  textAlign: 'left', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  height: '100%',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  padding: '30px'
                }}
              >
                <div>
                  <div className="card-icon-container" style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '20px' }}>
                    {getIconComponent(inst.iconName)}
                  </div>
                  <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)', textAlign: 'left' }}>
                    {inst.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px' }}>
                    {inst.desc}
                  </p>
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: 600, color: 'var(--primary)', marginTop: 'auto' }}>
                  Learn More <ArrowRight size={14} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* In-House Coordinator Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '50px', alignItems: 'center' }} className="coordinator-grid">
            
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'left' }}
            >
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
                On-Campus Partnership
              </span>
              <h2 style={{ fontSize: '38px', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px', textAlign: 'left' }}>
                Our Dedicated In-House Digital Marketing Coordinator at Your Campus
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                In today's fast-paced digital world, every educational institute needs more than just a digital marketing agency – it needs the right digital partner right at the source. We deploy a trained coordinator on your campus to capture and manage live events, admissions campaigns, and updates.
              </p>
              
              <div className="card-glass" style={{ background: 'var(--grad-primary)', color: 'white', padding: '30px', borderRadius: 'var(--radius-lg)' }}>
                <h4 style={{ color: 'white', fontSize: '20px', fontWeight: 700, marginBottom: '10px', textAlign: 'left' }}>
                  Need a custom strategy?
                </h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14.5px', marginBottom: '20px' }}>
                  Get your FREE SOCIAL MEDIA STRATEGY and ROI REPORT that best suits your Institute’s goals, today!
                </p>
                <Link to="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Get Free Strategy <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Right Benefits Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {coordinatorBenefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="card-glass"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  style={{ 
                    padding: '24px', 
                    textAlign: 'left', 
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    {getIconComponent(benefit.iconName)}
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', textAlign: 'left', lineHeight: 1.3 }}>
                    {benefit.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.4, margin: 0 }}>
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Brand Video Presentation Section */}
      <section className="section-padding" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
        {/* Decorative circle glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="video-section-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '50px', alignItems: 'center' }}>
            {/* Left Column: Descriptive Content & CTA */}
            <div className="video-content-block" style={{ textAlign: 'left' }}>
              <span style={{ 
                display: 'inline-block', 
                backgroundColor: 'var(--primary-light)', 
                color: 'var(--primary)', 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontWeight: 600, 
                fontSize: '13px',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Discover Us
              </span>
              <h2 style={{ fontSize: '36px', marginBottom: '20px', fontWeight: 800, lineHeight: 1.25 }}>
                See How We Elevate Educational Brands
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: 1.6, marginBottom: '24px' }}>
                Take a look inside our mission, campus activations, and client success stories in this short video presentation. Learn how we structure campaigns that drive admissions and branding.
              </p>
              
              <ul className="video-highlights-list" style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Strategic Admission Campaign Planning',
                  'High-Impact Video Storytelling & Production',
                  'Full-Funnel SEO & Digital Reputation Management'
                ].map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14.5px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', flexShrink: 0, fontWeight: 'bold' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Get Free Consultation
              </Link>
            </div>

            {/* Right Column: Embedded Youtube Video */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ 
                width: '100%',
                borderRadius: '18px', 
                overflow: 'hidden', 
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                aspectRatio: '16/9'
              }}
              whileHover={{ scale: 1.01, boxShadow: '0 30px 70px rgba(37, 99, 235, 0.15)' }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/kpa9UiktETY"
                title="Host2Unlimited Video Presentation"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ display: 'block', border: 'none' }}
              />
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 992px) {
            .video-section-layout {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .video-content-block {
              text-align: center !important;
            }
            .video-highlights-list {
              align-items: center !important;
            }
          }
        `}</style>
      </section>

      {/* Plan & Execute Marketing Process Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
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
              Marketing Operations
            </span>
            <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>How We Plan and Execute</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              We design and execute integrated digital strategies that scale enrollment and elevate institutional brand images.
            </p>
          </div>
          
          <MarketingTimeline />
        </div>
      </section>

      {/* Our Proven Process Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>Our Proven Development Process</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              From initial consultation to deployment and maintenance, we ensure transparency and alignment at every milestone.
            </p>
          </div>
          
          <Timeline />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>What Our Clients Say</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              Real metrics and reviews from companies that scaled their operations with Host2Unlimited solutions.
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* Digital Marketing Course Section */}
      <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="card-glass" style={{ 
            padding: '50px 40px', 
            background: 'var(--glass-bg)', 
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)' 
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }} className="course-grid">
              
              {/* Left Column: Course Details */}
              <div style={{ textAlign: 'left' }}>
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
                  Expert Career Training
                </span>
                <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', textAlign: 'left' }}>
                  Master Digital Marketing with Expert Guidance
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: 1.6, marginBottom: '30px' }}>
                  At Host2Unlimited, we offer a comprehensive Digital Marketing Course in Mumbai designed for beginners, professionals, and entrepreneurs. Whether you want to start a career in digital marketing, grow your business online, or upskill for better job opportunities, our hands-on training will give you the skills you need to succeed.
                </p>

                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  What You Will Learn:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px 20px' }}>
                  {courseTopics.map((topic, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: '14.5px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {topic.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: CTA Card */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="card-glass" style={{ 
                  width: '100%', 
                  maxWidth: '380px', 
                  padding: '35px 30px', 
                  backgroundColor: 'var(--bg-primary)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <GraduationCap size={28} />
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>Join the Next Batch</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                    Get hands-on training and mentorship from industry specialists. Batch sizes are limited.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                      Enroll Now
                    </Link>
                    <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                      Enquiry for Your Institute
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>{homepageData.about.title}</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              {homepageData.about.description}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {staticWhyChooseUsData.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="card-glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ textAlign: 'left' }}
              >
                <div className="card-icon-container" style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '20px' }}>
                  <CheckCircle2 size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.5 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '40px 0' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Trusted by Educational Institutes & Brands Across Maharashtra
          </p>
          <div className="carousel-track-container">
            <div className="carousel-track">
              {clientLogos.concat(clientLogos).map((logo, idx) => (
                <div key={idx} className="carousel-logo" style={{ display: 'flex', alignItems: 'center', height: '60px', padding: '0 25px' }}>
                  <img 
                    src={logo} 
                    alt="Partner Logo" 
                    style={{ maxHeight: '100%', maxWidth: '140px', objectFit: 'contain', opacity: 0.85, transition: 'all 0.3s ease' }} 
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section-padding" style={{ padding: '80px 0', position: 'relative' }}>
        <div className="container">
          <div className="card-glass" style={{ background: 'var(--grad-primary)', color: 'white', padding: '60px 40px', position: 'relative', overflow: 'hidden' }}>
            
            {/* Background SVG abstract lines */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
              <path d="M-100 200 C100 100, 300 300, 500 100 C700 200, 900 50, 1100 250" fill="none" stroke="white" strokeWidth="8" />
              <path d="M-100 250 C100 150, 300 350, 500 150 C700 250, 900 100, 1100 300" fill="none" stroke="white" strokeWidth="4" />
            </svg>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 800, margin: 0 }}>{homepageData.cta.title}</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '16px', margin: 0 }}>
                {homepageData.cta.description}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Link to="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                  Get Free Consultation
                </Link>
                <Link to="/contact" className="btn btn-glass" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                  <PhoneCall size={16} /> Contact Sales
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .topic-card:hover .topic-card-bg {
          transform: scale(1.08);
        }
        .topic-card:hover {
          border-color: var(--primary) !important;
          box-shadow: 0 12px 30px rgba(14, 165, 233, 0.25) !important;
        }
        @media (max-width: 992px) {
          .hero-right-img-container {
            width: 100% !important;
            opacity: 0.3 !important;
          }
          .hero-grid, .coordinator-grid, .course-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 40px !important;
          }
          .hero-grid div, .coordinator-grid div, .course-grid div {
            text-align: center !important;
          }
          .stats-grid {
            justify-content: center !important;
          }
          .service-header-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .process-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .coordinator-grid h2, .coordinator-grid p, .coordinator-grid div h4, .coordinator-grid div p, .course-grid h2, .course-grid p, .course-grid h4 {
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
