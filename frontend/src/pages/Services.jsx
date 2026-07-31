import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import servicesHeroBg from '../assets/hero_bg/services_hero_clean.png';

const staticServicesData = [
  {
    id: 1,
    title: 'Digital Marketing',
    desc: 'Digital marketing activities involve using online platforms and tools to promote a brand, product, or service. These include search engine optimization (SEO) to improve website rankings, social media marketing to build engagement, email marketing to nurture leads, and pay-per-click (PPC) advertising for targeted campaigns.',
    image: 'https://host2unlimited.com/wp-content/uploads/2025/10/host2u-SERVICES-page-01.png',
    slug: 'digital-marketing'
  },
  {
    id: 2,
    title: 'Admissions Marketing',
    desc: 'Choosing the right institution sets the foundation for your child’s or your own future success. Our programs are designed not just to deliver knowledge, but to inspire curiosity, creativity, and confidence. With expert faculty, modern facilities, and a supportive environment, we ensure every learner gets the opportunity to shine.',
    image: 'https://host2unlimited.com/wp-content/uploads/2025/10/host2u-SERVICES-page-02.png',
    slug: 'admissions-marketing'
  },
  {
    id: 3,
    title: 'Reputation Management',
    desc: 'Reputation management is the practice of shaping how your brand, business, or personal identity is perceived by the public. In today’s digital era, where customers rely heavily on online reviews, social media, and search results, maintaining a positive reputation has become crucial. A strong reputation builds trust, enhances credibility.',
    image: 'https://host2unlimited.com/wp-content/uploads/2025/10/host2u-SERVICES-page-03.png',
    slug: 'reputation-management'
  },
  {
    id: 4,
    title: 'Content Marketing',
    desc: 'Content marketing is more than just creating posts — it’s about telling a story that connects with your audience. By sharing valuable, engaging, and consistent content, brands can build trust, increase visibility, and position themselves as industry leaders. Whether it’s blogs, social media posts, or videos, the right content makes people stop, read, and relate.',
    image: 'https://host2unlimited.com/wp-content/uploads/2025/10/host2u-SERVICES-page-04.png',
    slug: 'content-marketing'
  },
  {
    id: 5,
    title: 'Public Relations',
    desc: 'Public Relations (PR) is the strategic communication process that organizations use to build and maintain a positive image with their audience, stakeholders, and the public. It focuses on creating trust, goodwill, and credibility through effective communication rather than direct advertising. PR helps shape perceptions, manage reputations.',
    image: 'https://host2unlimited.com/wp-content/uploads/2025/10/host2u-SERVICES-page-05.png',
    slug: 'public-relations'
  },
  {
    id: 6,
    title: 'Influencer Activities',
    desc: 'Influencer activities are powerful strategic collaborations between brands and social media personalities to increase visibility, trust, and engagement. By leveraging an influencer’s loyal following, businesses can showcase products or services in a more relatable and authentic way compared to traditional advertising.',
    image: 'https://host2unlimited.com/wp-content/uploads/2025/10/host2u-SERVICES-page-06.png',
    slug: 'influencer-activities'
  },
  {
    id: 7,
    title: 'Search Engine Optimization',
    desc: 'Search Engine Optimization (SEO) is the process of enhancing a website’s visibility on search engines like Google, Bing, and Yahoo. By optimizing various elements of a website, SEO helps it rank higher in search engine results pages (SERPs), which increases organic (non-paid) traffic. The main goal of SEO is to make a website more attractive.',
    image: 'https://host2unlimited.com/wp-content/uploads/2025/10/host2u-SERVICES-page-06-1.png',
    slug: 'search-engine-optimization'
  },
  {
    id: 8,
    title: 'Powerful Video Stories',
    desc: 'The video opens with scenes of hardship — a person facing rejection, failure, or loss. Through determination, learning, and persistence, they slowly rise above challenges. Every setback becomes a stepping stone, captured with emotional close-ups and inspiring music. By the end, they stand strong, achieving their dreams and inspiring others to never give up.',
    image: 'https://host2unlimited.com/wp-content/uploads/2025/10/host2u-SERVICES-page-06-2.png',
    slug: 'powerful-video-stories'
  },
  {
    id: 9,
    title: 'Event Marketing & Maximizing Event Success',
    desc: 'Event marketing is more than just organizing a gathering; it’s about creating meaningful experiences that connect your brand with your audience. By strategically planning and executing events, businesses can build stronger relationships, enhance brand awareness, and drive engagement.',
    image: 'https://host2unlimited.com/wp-content/uploads/2025/10/host2u-SERVICES-page-07.png',
    slug: 'event-marketing',
    bullets: [
      'Brand Visibility: Showcase your brand to the right audience',
      'Audience Engagement: Interactive sessions, live demos',
      'Lead Generation: Capture potential clients',
      'Customer Loyalty: Events provide valuable content for blogs',
      'Measurable ROI: Track attendance, engagement',
      'Data & Analytics: Measure attendee engagement, ROI',
      'Seamless Execution: Ensure flawless logistics',
      'Content & Storytelling: Craft compelling narratives that resonate with participants'
    ]
  }
];

const Services = () => {
  const breadcrumbs = [{ name: 'Admission Marketing Services', path: '/services' }];

  return (
    <div style={{ paddingTop: '0px' }}>
      <SEOMeta
        title="Admission Marketing Services | Host2Unlimited"
        description="Explore our full spectrum of Admission Marketing Services: Digital Marketing, Admissions Lead Generation, Reputation Management, PR, Video Stories & Event Marketing."
        keywords="admission marketing services, school marketing, college lead generation, digital marketing partner, Host2Unlimited"
        canonical="https://host2unlimited.com/services"
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
          src={servicesHeroBg} 
          alt="Services Hero Background" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, pointerEvents: 'none' }}
        />

        <div className="container hero-content-wrapper" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <Breadcrumbs paths={breadcrumbs} />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '45px', marginBottom: '80px' }}>
        {/* Page Title & Subtitle Header */}
        <div style={{ textAlign: 'left', maxWidth: '850px', marginBottom: '50px' }}>
          <span className="badge" style={{ marginBottom: '12px', padding: '6px 20px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Services
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.5px', lineHeight: 1.2, textAlign: 'left' }}>
            Admission Marketing Services
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.7, textAlign: 'left' }}>
            Empowering Educational Institutions with tailored Digital Marketing, Admissions Campaigns, Content Creation, and Event Marketing Solutions.
          </p>
        </div>

        {/* Alternating 2-Column Feature Sections for 9 Services */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {staticServicesData.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '45px',
                  alignItems: 'center',
                  padding: '45px 40px',
                  borderRadius: '28px',
                  background: isEven 
                    ? 'linear-gradient(135deg, rgba(11, 15, 25, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%)' 
                    : 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 27, 75, 0.5) 100%)',
                  border: isEven 
                    ? '1px solid rgba(56, 189, 248, 0.25)' 
                    : '1px solid rgba(129, 140, 248, 0.25)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: isEven 
                    ? '0 20px 50px rgba(2, 132, 199, 0.12)' 
                    : '0 20px 50px rgba(99, 102, 241, 0.12)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Accent Background Glow */}
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  right: isEven ? '-40px' : 'auto',
                  left: isEven ? 'auto' : '-40px',
                  width: '240px',
                  height: '240px',
                  borderRadius: '50%',
                  background: isEven ? 'rgba(56, 189, 248, 0.08)' : 'rgba(129, 140, 248, 0.08)',
                  filter: 'blur(50px)',
                  pointerEvents: 'none'
                }} />

                {/* Content Side */}
                <div style={{ order: isEven ? 1 : 2, display: 'flex', flexDirection: 'column', gap: '18px', zIndex: 2, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px' }}>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: 900, 
                      color: isEven ? '#38bdf8' : '#a855f7', 
                      letterSpacing: '1.2px', 
                      textTransform: 'uppercase',
                      backgroundColor: isEven ? 'rgba(56, 189, 248, 0.12)' : 'rgba(168, 85, 247, 0.12)',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      border: isEven ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(168, 85, 247, 0.3)'
                    }}>
                      0{index + 1} / SERVICE
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 900, color: '#ffffff', margin: 0, lineHeight: 1.2, letterSpacing: '-0.5px', textAlign: 'left' }}>
                    {service.title}
                  </h2>
                  <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: 1.7, margin: 0, textAlign: 'left' }}>
                    {service.desc}
                  </p>

                  {/* Bullet points for Event Marketing service */}
                  {service.bullets && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                      {service.bullets.map((bullet, bIdx) => (
                        <li 
                          key={bIdx} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px', 
                            fontSize: '13.5px', 
                            color: '#f1f5f9', 
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            fontWeight: 600
                          }}
                        >
                          <CheckCircle size={16} style={{ color: '#38bdf8', flexShrink: 0 }} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div style={{ marginTop: '10px' }}>
                    <Link
                      to="/contact"
                      className="btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 28px',
                        fontSize: '14.5px',
                        fontWeight: 800,
                        borderRadius: '30px',
                        textDecoration: 'none',
                        background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                        color: '#ffffff',
                        boxShadow: '0 8px 25px rgba(37, 99, 235, 0.35)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                    >
                      ENQUIRE NOW <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div style={{ order: isEven ? 2 : 1, width: '100%', textAlign: 'center', zIndex: 2 }}>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: 'relative',
                      borderRadius: '22px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      background: '#0b0f19'
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '380px',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(11, 15, 25, 0.6) 0%, transparent 60%)'
                    }} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <section style={{ padding: '60px 0 0 0', position: 'relative' }}>
          <div className="card-glass dark-cta-banner" style={{ 
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #2563eb 100%)', 
            color: 'white', 
            padding: '65px 40px', 
            position: 'relative', 
            overflow: 'hidden', 
            borderRadius: '28px',
            boxShadow: '0 25px 60px rgba(37, 99, 235, 0.3)',
            border: '1px solid rgba(147, 197, 253, 0.25)'
          }}>
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px', textAlign: 'center' }}>
              <span className="badge" style={{ backgroundColor: 'rgba(96, 165, 250, 0.25)', color: '#93c5fd', border: '1px solid rgba(147, 197, 253, 0.4)', fontSize: '13px', padding: '6px 20px', fontWeight: 800, letterSpacing: '0.8px' }}>
                🚀 CORE SERVICES GROWTH PARTNER FOR CAMPUSES
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
                  Enquiry Form to Get Started <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
