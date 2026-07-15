import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, animate, useMotionValue } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Zap, Cpu, Shield, PhoneCall, 
  GraduationCap, BookOpen, Users, Award, Globe, Briefcase, 
  Smile, Video, Target, Camera, Search, TrendingUp, Mail, 
  FileText, Check 
} from 'lucide-react';
import Timeline from '../components/Timeline';
import MarketingTimeline from '../components/MarketingTimeline';
import TestimonialSlider from '../components/TestimonialSlider';
import SEOMeta from '../components/SEOMeta';
import schoolHero from '../assets/school_marketing_hero.png';

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
      <section className="section-padding" style={{ paddingTop: '160px', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }} className="hero-grid">
            
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
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
                marginBottom: '20px'
              }}>
                {homepageData.hero.badge}
              </span>
              
              <h1 style={{ fontSize: '50px', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-1px' }}>
                {homepageData.hero.title}
              </h1>
              
              <p style={{ fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: 1.6 }}>
                {homepageData.hero.description}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '0' }}>
                <Link to="/contact" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                  Get Free Consultation <ArrowRight size={18} />
                </Link>
                <Link to="/portfolio" className="btn btn-secondary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                  View Portfolio
                </Link>
              </div>
            </motion.div>

            {/* Hero Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
              className="animate-float"
            >
              {/* Premium Generated Technology Visual */}
              <div className="card-glass" style={{ padding: '12px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--glass-shadow)', maxWidth: '460px', border: '1px solid var(--glass-border)' }}>
                <img 
                  src={schoolHero} 
                  alt="Host2Unlimited digital marketing partner and custom software services illustration" 
                  style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block' }}
                />
              </div>
            </motion.div>

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
                    style={{ maxHeight: '100%', maxWidth: '140px', objectFit: 'contain', filter: 'grayscale(1) opacity(0.75)', transition: 'all 0.3s ease' }} 
                    onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0) opacity(1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(1) opacity(0.75)'; }}
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
        @media (max-width: 992px) {
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
