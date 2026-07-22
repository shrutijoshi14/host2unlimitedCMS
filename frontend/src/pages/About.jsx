import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, animate, useMotionValue } from 'framer-motion';
import { Globe } from 'lucide-react';
import * as Icons from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import founderImg from '../assets/h2u/RAM-SIR-01-1.png';
import aboutHeroBg from '../assets/hero_bg/about_hero_art.svg';
import visionImg from '../assets/about/vision.png';
import missionImg from '../assets/about/mission.png';
import valuesImg from '../assets/about/values.png';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticValues = [
  {
    icon_name: 'Eye',
    title: 'Our Vision',
    image: visionImg,
    desc: 'To be Partner of Choice of Educational Institutes for creating brands and increasing their Business',
    points: [
      'Driving creativity and forward-thinking solutions.',
      'Expanding our impact beyond boundaries.',
      'Building success with responsibility.',
      'Striving for quality in every detail.'
    ]
  },
  {
    icon_name: 'Rocket',
    title: 'Our Mission',
    image: missionImg,
    desc: 'To increase the business of Educational Institutes by having extremely creative & talented teams through use of Creativity, Latest Web Tools and Digital Platform',
    points: [
      'Helping clients and partners achieve sustainable success.',
      'Delivering creative and technology-driven solutions.',
      'Working together with clients to achieve shared goals.',
      'Using creativity and digital power to shape a better tomorrow.'
    ]
  },
  {
    icon_name: 'HeartHandshake',
    title: 'Our Values',
    image: valuesImg,
    desc: 'Building trust, honoring commitment, and fostering growth together.',
    points: [
      'Trust',
      'Commitment',
      'Growth'
    ]
  }
];

const staticStats = [
  { icon_name: 'Users', value: 35, suffix: '+', label: 'Skilled Experts' },
  { icon_name: 'Award', value: 16, suffix: '+', label: 'Years of Experience' },
  { icon_name: 'School', value: 70, suffix: '+', label: 'Educational Partners' },
  { icon_name: 'Briefcase', value: 300, suffix: '+', label: 'Campaigns Launched' }
];

const teamMembers = [
  { name: 'Rampratap Bugalia', role: 'Founder & CEO', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/Ram-Sir.jpg' },
  { name: 'Kirti Kadam', role: 'HR Head', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/HR.png' },
  { name: 'Niti Jotania', role: 'Social Media Manager', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/Niti-1.jpg' },
  { name: 'Yashika Shinde', role: 'Social Media Coordinator', image: 'https://host2unlimited.com/wp-content/uploads/2026/03/H2U-Yashika.png' },
  { name: 'Nishu Singh', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/Nishu.jpg' },
  { name: 'Harsha Bhondwe', role: 'WordPress Developer', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/Harsha-Bhondwe.png' },
  { name: 'Abhishek Lokhande', role: 'SEO Specialist', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Abhishek.png' },
  { name: 'Shubham Sharma', role: 'Graphics Designer', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/Shubham.jpg' },
  { name: 'Prajwal Jadhav', role: 'Graphic Designer & Video Editor', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Prajwal.png' },
  { name: 'Khushi Doshi', role: 'Graphic Design Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/02/khushi.jpg' },
  { name: 'Pranav Upare', role: 'Business Development', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/PRANAV-PRITAM-UPARE.png' },
  { name: 'Priynka Gupta', role: 'PR & Social Media', image: 'https://host2unlimited.com/wp-content/uploads/2026/03/H2U-priyanka.png' },
  { name: 'Jagjot Singh', role: 'Digital Marketing Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/Jagjot-Singh.png' },
  { name: 'Nirver Singh', role: 'Digital Marketing Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/Nirver-Singh.png' },
  { name: 'Kumkum Rathi', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/kumkum.jpeg' },
  { name: 'Omkar Mejari', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/05/Omkar.png' },
  { name: 'Dhara Joshi', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Dhara.png' },
  { name: 'Vishakha Deorukhkar', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-12-at-6.36.35-PM.jpeg' },
  { name: 'Khushi Jain', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Khushi.png' },
  { name: 'Aditi Momaya', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2025/10/aditi.jpeg' },
  { name: 'Swapnil Gaikwad', role: 'Digital Marketing Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/Swapnil-Gaikwad.png' },
  { name: 'Sakshi Kulkarni', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/03/H2U-Sakshi.png' },
  { name: 'Aditi Panigrahi', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/02/Aditi.jpg' },
  { name: 'Isha Chaubey', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/03/H2U-isha.png' },
  { name: 'Latasha Mhankavi', role: 'Seo Intern', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-13-at-11.15.10-AM.jpeg' },
  { name: 'Anuj Gorale', role: 'Social Media & Event Manager', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Anuj.png' },
  { name: 'Riten Halpani', role: 'Event Management', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/reten.jpeg' },
  { name: 'Harshit Birla', role: 'Photographer', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Harshit.jpg' },
  { name: 'Pranit Patil', role: 'Photographer', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Pranit-Patil-2.png' },
  { name: 'Pushkarni Lambole', role: 'Nashik Sales & Marketing', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/pushkarni1.jpeg' }
];

const Counter = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ''), 10) || 0;
    if (numericValue <= 0) {
      setDisplayValue(0);
      return;
    }

    let start = 0;
    const end = numericValue;
    const duration = 1500;
    const startTime = performance.now();
    let animationFrameId;

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * (end - start) + start);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  return <span>{displayValue.toLocaleString()}{suffix}</span>;
};

const About = () => {
  const teamScrollRef = React.useRef(null);
  const [aboutData] = useState({ values: staticValues, stats: staticStats });
  const [isTeamHovered, setIsTeamHovered] = useState(false);

  const scrollTeam = (direction) => {
    if (teamScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      teamScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [membersList, setMembersList] = useState(teamMembers);

  // Auto-scroll loop for Team Experts every 3.5s (pauses on hover)
  useEffect(() => {
    if (membersList.length === 0 || isTeamHovered) return;

    const interval = setInterval(() => {
      if (teamScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = teamScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          teamScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          teamScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [membersList, isTeamHovered]);
  const [banner] = useState({
    title: 'Digital Growth Partner for Education Institutes & Businesses',
    subtitle: 'About Us',
    desc: 'Founded in 2010 in Mumbai, our journey began with a deep focus on the education sector—supporting schools, colleges, coaching centers, and ed-tech platforms with creative, results-driven marketing. Partner with Host2Unlimited – your trusted digital partner for educational institutes.',
    para2: 'From boosting your online presence to social media management and school admission campaigns – we help you start early and stay ahead!',
    para3: 'From seamless event coverage to admission lead campaigns, we help educational institutes shine with the right digital strategies.'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${CURRENT_API_BASE}/api/team`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setMembersList(data);
          }
        }
      } catch (err) {
        console.warn('Backend team fetch offline, using static team members.', err);
      }
    };
    fetchTeam();

    const handleUpdate = (e) => {
      if (e.detail?.type === 'team_update' || e.type === 'cmsTeamUpdate') {
        fetchTeam();
      }
    };

    window.addEventListener('cmsTeamUpdate', handleUpdate);
    return () => {
      window.removeEventListener('cmsTeamUpdate', handleUpdate);
    };
  }, []);

  const breadcrumbs = [{ name: 'About Us', path: '/about' }];

  return (
    <div style={{ paddingTop: '80px' }}>
      <SEOMeta
        title="About Us | Host2Unlimited"
        description="Founded in 2010 in Mumbai, we are the leading digital marketing partner of educational institutions like schools, colleges, and campuses in Maharashtra."
        keywords="about host2unlimited, school marketing experts, education agency Mumbai, team host2unlimited"
        canonical="https://host2unlimited.com/about"
        breadcrumbPaths={breadcrumbs}
      />

      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ position: 'relative', height: '280px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#0b0f19' }}
      >
        <img 
          src={aboutHeroBg} 
          alt="About Hero Background" 
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
        <div style={{ textAlign: 'left', maxWidth: '850px', margin: '0 auto 50px auto' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>About Us</span>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', letterSpacing: '-0.5px', lineHeight: 1.25, textAlign: 'left' }}>
            Digital Growth Partner for Education Institutes & Businesses
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px', textAlign: 'left' }}>
            <p style={{ margin: 0 }}>
              🎓Founded in 2010 in Mumbai, our journey began with a deep focus on the education sector—supporting schools, colleges, coaching centers, and ed-tech platforms with creative, results-driven marketing.
            </p>
            <p style={{ margin: 0 }}>
              🎓From boosting your online presence to social media management and school admission campaigns – we help you start early and stay ahead!
            </p>
            <p style={{ margin: 0 }}>
              🎓From seamless event coverage to admission lead campaigns, we help educational institutes shine with the right digital strategies.
            </p>
          </div>
          <div>
            <Link to="/services" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '15px', fontWeight: 700, borderRadius: '30px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Discover Our Services <Icons.ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Stats Cards Row (Counters FIRST) */}
            <div style={{ marginBottom: '60px' }} className="about-stats-grid">
              {aboutData.stats.map((stat, idx) => {
                const Icon = Icons[stat.icon_name] || Globe;
                return (
                  <motion.div 
                    key={idx}
                    className="card-glass" 
                    whileHover={{ y: -6, scale: 1.02, borderColor: 'var(--primary)', boxShadow: '0 12px 30px -10px rgba(14, 165, 233, 0.2)' }}
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      padding: '24px 20px', 
                      borderRadius: 'var(--radius-lg)', 
                      border: '1px solid var(--border-color)', 
                      textAlign: 'center', 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'border-color 0.2s, box-shadow 0.2s' 
                    }}
                  >
                    <Icon size={30} color="var(--primary)" style={{ marginBottom: '14px' }} />
                    <h3 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', textAlign: 'center' }}>
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', fontWeight: 600, margin: 0, textAlign: 'center' }}>{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Our Core Pillars Section (SECOND) */}
            <div style={{ marginBottom: '85px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '40px', textAlign: 'center', letterSpacing: '-0.5px' }}>Our Core Pillars</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'stretch' }} className="values-grid">
                {aboutData.values.map((v, idx) => {
                  return (
                    <div key={idx} className="card-glass" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0 }}>
                      {v.image && (
                        <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderBottom: '1px solid var(--border-color)', position: 'relative', flexShrink: 0 }}>
                          <img 
                            src={v.image} 
                            alt={v.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                            className="pillar-card-image"
                          />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(15, 23, 42, 0.4))' }} />
                        </div>
                      )}
                      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)', textAlign: 'left' }}>{v.title}</h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '20px', textAlign: 'justify' }}>{v.desc}</p>
                        </div>

                        {v.points && (
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                            {v.points.map((pt, pIdx) => (
                              <li key={pIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'left' }}>
                                <Icons.CheckCircle2 size={15} color="var(--primary)" style={{ flexShrink: 0 }} />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Empowering Digital Growth Section (THIRD) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '85px', textAlign: 'left' }}>
              <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.5px', textAlign: 'left' }}>Empowering Digital Growth</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7, marginBottom: '20px', textAlign: 'left' }}>
                  Host2Unlimited is a Strategic Digital Partner for Educational Institutes in Maharashtra. We are the digital partner for preschools, primary and secondary schools, junior/degree colleges, engineering and management colleges, and deemed universities.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7, textAlign: 'left' }}>
                  From boosting online presence to executing targeted school admission lead campaigns, and managing live event coverages, our team places a dedicated digital coordinator directly at your campus to track leads and build Follower growth organically.
                </p>
              </div>
            </div>

            {/* Award Winning Moment */}
            <div className="card-glass" style={{ textAlign: 'center', marginBottom: '85px', padding: '40px', border: '1px solid var(--primary)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', marginBottom: '20px' }} className="award-header">
                <div style={{ display: 'flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icons.Trophy size={28} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Award Winning Moment</span>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'center' }}>
                    Celebrating Excellence At The Indian School Awards 2025!
                  </h2>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0, textAlign: 'center' }}>
                Recognized as the <strong>Best Digital Marketing Agency for the Education Sector</strong> in Mumbai, Nashik, Pune, Satara, and across Maharashtra. This prestigious milestone celebrates our commitment to introducing cutting-edge web tools and custom admissions campaigns for our partner campuses.
              </p>
            </div>

            {/* Team Members Grid Section */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center', marginBottom: '60px', textAlign: 'left' }} className="about-founder-grid">
                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.5px', textAlign: 'left' }}>Meet Minds Behind Host2Unlimited</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px' }}>
                    At Host2Unlimited, our strength lies in our people. Our team is a blend of innovators, strategists, creators, and digital experts who share a common passion for transforming ideas into results. From web development and design to content creation, social media, and digital marketing, each member brings unique expertise to the table.
                  </p>
                  <div className="card-glass" style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--primary)', borderRadius: 'var(--radius-md)' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0', textAlign: 'left' }}>Rampratap Bugalia</h3>
                    <p style={{ fontSize: '14.5px', color: 'var(--primary)', fontWeight: 600, margin: '0 0 10px 0' }}>Founder & CEO, Host2Unlimited</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      "Our focus has always been to build long-term relationships with educational institutes and businesses across Maharashtra, introducing the latest web tools and admission marketing funnels to secure real, measurable growth."
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="card-glass" style={{ padding: '12px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--glass-shadow)', maxWidth: '380px' }}>
                    <img 
                      src={founderImg} 
                      alt="Rampratap Bugalia, Founder and CEO of Host2Unlimited" 
                      style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>Our Team Experts</h3>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => scrollTeam('left')} 
                    aria-label="Scroll left"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  >
                    <Icons.ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => scrollTeam('right')} 
                    aria-label="Scroll right"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  >
                    <Icons.ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Scrollable Team Experts Container */}
              <div 
                ref={teamScrollRef}
                onMouseEnter={() => setIsTeamHovered(true)}
                onMouseLeave={() => setIsTeamHovered(false)}
                className="team-scroll-container hide-scrollbar" 
                style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  overflowX: 'auto', 
                  paddingBottom: '20px',
                  paddingTop: '10px',
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {membersList.map((member, idx) => (
                  <motion.div
                    key={member.id || idx}
                    className="card-glass"
                    whileHover={{ y: -8, scale: 1.02, borderColor: 'var(--primary)', boxShadow: '0 12px 30px rgba(37, 99, 235, 0.15)' }}
                    style={{ 
                      flex: '0 0 240px',
                      scrollSnapAlign: 'start',
                      padding: '24px 20px', 
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)', 
                      backgroundColor: 'var(--bg-secondary)',
                      textAlign: 'center', 
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)'
                    }} />

                    <div style={{ 
                      width: '90px', 
                      height: '90px', 
                      borderRadius: '50%', 
                      overflow: 'hidden',
                      margin: '10px auto 16px auto',
                      padding: '3px',
                      background: 'linear-gradient(135deg, var(--primary) 0%, #06b6d4 100%)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                    }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
                        {(member.image || member.image_url) ? (
                          <img 
                            src={member.image || member.image_url} 
                            alt={member.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontSize: '22px', fontWeight: 700 }}>
                            {member.name ? member.name.split(' ').map(n => n[0]).join('') : 'TM'}
                          </div>
                        )}
                      </div>
                    </div>

                    <h4 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>{member.name}</h4>
                    
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      marginTop: '4px'
                    }}>
                      {member.role}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA Banner with Unique Emerald Gradient */}
            <section style={{ padding: '60px 0 20px 0', position: 'relative' }}>
              <div className="card-glass" style={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 45%, #0d9488 100%)', 
                color: 'white', 
                padding: '65px 40px', 
                position: 'relative', 
                overflow: 'hidden', 
                borderRadius: '28px',
                boxShadow: '0 25px 60px rgba(13, 148, 136, 0.3)',
                border: '1px solid rgba(45, 212, 191, 0.25)'
              }}>
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}>
                  <path d="M-100 200 C100 100, 300 300, 500 100 C700 200, 900 50, 1100 250" fill="none" stroke="#2dd4bf" strokeWidth="8" />
                  <path d="M-100 250 C100 150, 300 350, 500 150 C700 250, 900 100, 1100 300" fill="none" stroke="#5eead4" strokeWidth="4" />
                </svg>

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px', textAlign: 'center' }}>
                  <span className="badge" style={{ backgroundColor: 'rgba(45, 212, 191, 0.25)', color: '#5eead4', border: '1px solid rgba(94, 234, 212, 0.4)', fontSize: '13px', padding: '6px 20px', fontWeight: 800, letterSpacing: '0.8px' }}>
                    🌟 TRUSTED SINCE 2010 ACROSS MAHARASHTRA
                  </span>

                  <h2 style={{ color: 'white', fontSize: 'clamp(22px, 3.8vw, 34px)', fontWeight: 900, margin: 0, lineHeight: 1.3, maxWidth: '980px', letterSpacing: '-0.5px' }}>
                    Strategic Digital Marketing Services for Educational Institutes with our Dedicated Person at Campus!
                  </h2>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', margin: '4px 0' }}>
                    {['MUMBAI', 'NASHIK', 'PUNE', 'SATARA', 'PAN MAHARASHTRA'].map((region, ridx) => (
                      <span key={ridx} style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fef08a',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        border: '1px solid rgba(254, 240, 138, 0.3)'
                      }}>
                        📍 {region}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', margin: '6px 0' }}>
                    <span style={{ fontSize: '14.5px', color: '#e2e8f0', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#4ade80', fontWeight: 900 }}>✓</span> Dedicated Person at Campus
                    </span>
                    <span style={{ fontSize: '14.5px', color: '#e2e8f0', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#4ade80', fontWeight: 900 }}>✓</span> Quality Leads Generation Ads Campaigns
                    </span>
                    <span style={{ fontSize: '14.5px', color: '#e2e8f0', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#4ade80', fontWeight: 900 }}>✓</span> Strategic Admission Boosting
                    </span>
                  </div>

                  <p style={{ color: 'rgba(241, 245, 249, 0.95)', maxWidth: '850px', fontSize: '15.5px', margin: 0, lineHeight: 1.6, textAlign: 'center' }}>
                    Strategic Digital Marketing Services for Educational Institutes with our Dedicated Person at Campus! Boost Your Institute Admissions with our Quality Leads Generation Ads Campaigns.
                  </p>

                  <div style={{ marginTop: '12px' }}>
                    <Link 
                      to="/contact" 
                      className="btn" 
                      style={{ 
                        backgroundColor: '#ffffff', 
                        color: '#0284c7', 
                        fontWeight: 800, 
                        padding: '16px 36px', 
                        fontSize: '16px',
                        borderRadius: '30px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      Enquiry Form to Get Started <Icons.ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .about-founder-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            text-align: center !important;
          }
          .about-founder-grid h2, 
          .about-founder-grid p,
          .about-founder-grid h3 {
            text-align: center !important;
          }
        }
      ` }} />
    </div>
  );
};

export default About;
