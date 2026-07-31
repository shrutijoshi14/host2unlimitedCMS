import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLeads } from '../context/LeadContext';
import { 
  Baby, BookOpen, Globe, GraduationCap, School, Cpu, 
  Briefcase, Award, CheckCircle2, Send, ArrowLeft,
  Target, TrendingUp, Users, Star, Calendar, BarChart3,
  MessageSquare, Bot, Brain, Sparkles, Phone, DollarSign,
  Clock, MapPin, Video, Smartphone
} from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import educationalHeroBg from '../assets/hero_bg/educational_hero_clean.png';
import preschoolHero from '../assets/preschool_hero_clean.png';
import preschoolClassroom from '../assets/preschool_classroom_learning.png';
import primarySchoolLearning from '../assets/primary_secondary_school_learning.png';
import internationalSchoolCampus from '../assets/international_school_campus.png';
import coachingClassroom from '../assets/coaching_classroom_learning.png';
import juniorDegreeCollegeCampus from '../assets/junior_degree_college_campus.png';
import engineeringManagementCampus from '../assets/engineering_management_institute.png';
import universityCampusArchitecture from '../assets/university_campus_architecture.png';
import schoolBuildingHero from '../assets/school_building_clean.png';

const sectorsData = {
  preschools: {
    icon: Baby,
    title: 'Preschools & Daycare Centers',
    lead: 'How HOST2UNLIMITED supports admissions, branding, and parent engagement through 11 key activities.',
    desc: (
      <>
        {/* Top Feature Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '20px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }}>
          <img 
            src={preschoolClassroom} 
            alt="Preschool Interactive Learning Environment" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.3) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '8px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.9)', color: '#fff' }}>
                Early Childhood Marketing
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Building Parent Trust & Maximizing Early Admissions
              </h3>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid #3b82f6', borderRadius: '12px', padding: '18px 22px', marginBottom: '30px' }}>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, margin: 0, color: 'var(--text-primary)', fontWeight: 500 }}>
            Here are the <strong>11 HOST2UNLIMITED key activities</strong> of our digital marketing for preschools — engineered to boost admissions, build lasting parent trust, and maximize hyperlocal visibility:
          </p>
        </div>

        {/* PART 1: Core Admissions & Visibility Activities (1 to 5) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#3b82f6' }}>Part 1:</span> Admissions, Branding & Trust Building
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 1 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                01
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <Target size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Targeted Reach
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Reach the right parents:</strong> Run hyper-targeted ads focusing on parent age groups, location pin codes, interests, and income levels.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Local visibility:</strong> Optimize Google Maps, local SEO, and social ads specifically for nearby residential communities.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 2 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(6, 182, 212, 0.6)', letterSpacing: '1px' }}>
                02
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)', flexShrink: 0 }}>
                  <Globe size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Build Strong Online Presence
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Well-designed responsive website and active social pages that inspire parent trust.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Showcases curriculum, safety standards, and facilities in high resolution.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Positions your preschool as modern, transparent, and tech-enabled.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 3 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(16, 185, 129, 0.6)', letterSpacing: '1px' }}>
                03
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
                  <TrendingUp size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Cost-Effective Admissions Marketing
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Meta & Google Ads cost significantly less than print flyers or newspaper ads.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Pay strictly for measurable results — clicks, inquiries, or form submissions.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Accurately track ROI per enrolled child.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 4 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(236, 72, 153, 0.6)', letterSpacing: '1px' }}>
                04
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(236, 72, 153, 0.4)', flexShrink: 0 }}>
                  <Users size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Parent Engagement & Community
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Instagram Reels & Facebook posts highlighting classroom fun and creative activities.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Builds an authentic emotional connection with prospective parents.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Drives word-of-mouth recommendations and parent referrals.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 5 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(245, 158, 11, 0.6)', letterSpacing: '1px' }}>
                05
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>
                  <Star size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Reviews & Social Proof
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Systematic collection of Google Reviews, Facebook ratings, and video testimonials.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Strong social proof instills confidence in parents exploring local options.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Middle Feature Image Spotlight Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '28px', 
            alignItems: 'center', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            borderRadius: '24px', 
            padding: '28px', 
            margin: '40px 0',
            textAlign: 'left',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ borderRadius: '18px', overflow: 'hidden', height: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <img 
              src={preschoolHero} 
              alt="Preschool Activity Day" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              Full Funnel Strategy
            </span>
            <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'left' }}>
              Turning Parent Inquiries into Confirmed Admissions
            </h4>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
              From initial social media awareness to Google Maps reviews and round-the-clock website inquiry funnels, we provide a complete growth ecosystem for preschools and daycare centers.
            </p>
          </div>
        </motion.div>

        {/* PART 2: Engagement, Automation & Retention Activities (6 to 11) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#06b6d4' }}>Part 2:</span> Events, Analytics & 24/7 Virtual Counselor
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 6 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(139, 92, 246, 0.6)', letterSpacing: '1px' }}>
                06
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)', flexShrink: 0 }}>
                  <Calendar size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Promote Events & Open Houses
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Promote open house days, workshops, summer camps, and festival celebrations online.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Generates event turnout and creates strong interest among unenrolled parents.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 7 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(2, 132, 199, 0.6)', letterSpacing: '1px' }}>
                07
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.4)', flexShrink: 0 }}>
                  <BarChart3 size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Measurable Analytics & ROI
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Real-time conversion tracking for website visits, phone calls, and lead form fills.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Continuous campaign optimization based on empirical data and analytics.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 8 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(20, 184, 166, 0.6)', letterSpacing: '1px' }}>
                08
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(20, 184, 166, 0.4)', flexShrink: 0 }}>
                  <MessageSquare size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Long-Term Parent Nurturing
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Automated WhatsApp broadcasts and email newsletters for active parents.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Shares child development insights to boost retention and sibling enrollments.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 9 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(99, 102, 241, 0.6)', letterSpacing: '1px' }}>
                09
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)', flexShrink: 0 }}>
                  <Bot size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  24×7 Automated Inquiry Desk
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Parents researching late at night can immediately view fees and curriculum.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Automated instant responses ensure zero parent leads go cold.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 10 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(168, 85, 247, 0.6)', letterSpacing: '1px' }}>
                10
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                  <Brain size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Educational Content Marketing
                </h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Publishing parenting tips and early childhood development guides establishes your preschool as the leading educational authority in your district.</span>
              </div>
            </motion.div>

            {/* Activity 11 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', gridColumn: '1 / -1', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                11
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <Sparkles size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Website as a 24/7 Virtual Admission Counselor
                </h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>A high-converting, mobile-optimized website acts as a 24/7 admission counselor — displaying your curriculum, safety accreditations, gallery tours, and instant inquiry booking form seamlessly.</span>
              </div>
            </motion.div>

          </div>
        </div>
      </>
    )
  },
  'primary-secondary': {
    icon: BookOpen,
    title: 'Primary & Secondary Schools',
    lead: 'How HOST2UNLIMITED supports admissions, branding, and parent engagement through 10 key digital marketing activities.',
    desc: (
      <>
        {/* Top Feature Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '20px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }}>
          <img 
            src={primarySchoolLearning} 
            alt="Primary & Secondary School Campus Learning" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.3) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '8px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.9)', color: '#fff' }}>
                K-12 Educational Marketing
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Driving Admissions, Reputation & Parent Engagement
              </h3>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid #3b82f6', borderRadius: '12px', padding: '18px 22px', marginBottom: '30px' }}>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-primary)', margin: 0, fontWeight: 500, textAlign: 'left' }}>
            Here are the key activities of <strong>HOST2UNLIMITED digital marketing for Primary & Secondary Schools</strong> — and how we support admissions, branding, and parent engagement through <strong>10 key activities</strong>:
          </p>
        </div>

        {/* PART 1: Global Reach, Admissions & Engagement (1 to 5) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#3b82f6' }}>Part 1:</span> Global Reach, Admissions & Engagement
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 1 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                01
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <Globe size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Global Reach, Local Impact
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital marketing allows international schools to reach both local and global audiences — attracting parents relocating from abroad or seeking global-standard education in India.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 2 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(6, 182, 212, 0.6)', letterSpacing: '1px' }}>
                02
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)', flexShrink: 0 }}>
                  <TrendingUp size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Increased Admissions Enquiries
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>With targeted campaigns (Google Ads, Meta Ads, etc.), schools can directly reach parents searching for admissions, increasing leads during admission season.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 3 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(16, 185, 129, 0.6)', letterSpacing: '1px' }}>
                03
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
                  <Star size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Strong Brand Visibility
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>A well-maintained digital presence — website, social media, and reviews — helps build a trusted, premium image, setting the school apart from competitors.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 4 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(236, 72, 153, 0.6)', letterSpacing: '1px' }}>
                04
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(236, 72, 153, 0.4)', flexShrink: 0 }}>
                  <MessageSquare size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Better Parent Engagement
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Regular social media updates, videos, and newsletters keep parents emotionally connected and proud to be part of the school community.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 5 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(245, 158, 11, 0.6)', letterSpacing: '1px' }}>
                05
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>
                  <Award size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Showcase Infrastructure & Activities
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Through videos, reels, and virtual tours, schools can highlight campus facilities, events, extracurriculars, and student achievements — giving a visual experience to parents before visiting.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Middle Feature Image Spotlight Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '28px', 
            alignItems: 'center', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            borderRadius: '24px', 
            padding: '28px', 
            margin: '40px 0',
            textAlign: 'left',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ borderRadius: '18px', overflow: 'hidden', height: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <img 
              src={schoolBuildingHero} 
              alt="School Building & Campus Growth" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              Complete Admission Strategy
            </span>
            <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'left' }}>
              Building Long-Term Brand Authority & Admissions
            </h4>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
              From initial Google search discovery to 24/7 online inquiries and NRI family outreach, we help primary and secondary schools build a powerful digital reputation that fills classrooms year after year.
            </p>
          </div>
        </motion.div>

        {/* PART 2: Analytics, Reputation & 24/7 Digital Desk (6 to 10) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#06b6d4' }}>Part 2:</span> Analytics, Reputation & 24/7 Digital Desk
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 6 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(139, 92, 246, 0.6)', letterSpacing: '1px' }}>
                06
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)', flexShrink: 0 }}>
                  <BarChart3 size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Data-Driven Marketing Decisions
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Unlike traditional marketing, digital platforms provide real-time analytics — allowing schools to track what works best and optimize campaigns accordingly.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 7 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(2, 132, 199, 0.6)', letterSpacing: '1px' }}>
                07
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.4)', flexShrink: 0 }}>
                  <Sparkles size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Cost-Effective Compared to Traditional Ads
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital marketing provides a higher ROI compared to print or hoardings, letting schools target precise demographics without wastage.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 8 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(20, 184, 166, 0.6)', letterSpacing: '1px' }}>
                08
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(20, 184, 166, 0.4)', flexShrink: 0 }}>
                  <CheckCircle2 size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Stronger Online Reputation
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Online reviews, testimonials, and positive stories on Google & social media build trust — crucial for high-fee, international schools.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 9 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(99, 102, 241, 0.6)', letterSpacing: '1px' }}>
                09
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)', flexShrink: 0 }}>
                  <Bot size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Website as a 24/7 Admission Counselor
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>A well-optimized website serves as a round-the-clock information hub for parents — showcasing curriculum, accreditations, and admission details.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 10 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(168, 85, 247, 0.6)', letterSpacing: '1px' }}>
                10
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                  <Users size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Builds Community and Alumni Relations
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital channels help maintain long-term engagement with alumni, students, and parents — driving referral networks, community pride, and long-term brand equity.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </>
    )
  },
  international: {
    icon: Globe,
    title: 'International Schools (CBSE / ICSE / IB)',
    lead: 'How HOST2UNLIMITED digital marketing supports admissions, branding, and parent engagement for International Schools (CBSE, ICSE & IB Board).',
    desc: (
      <>
        {/* Top Feature Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '20px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }}>
          <img 
            src={internationalSchoolCampus} 
            alt="International School CBSE ICSE IB Campus" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.3) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '8px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.9)', color: '#fff' }}>
                CBSE • ICSE • IB Board Digital Marketing
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Driving Global Admissions, Prestige & Parent Trust
              </h3>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid #3b82f6', borderRadius: '12px', padding: '18px 22px', marginBottom: '30px' }}>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-primary)', margin: 0, fontWeight: 500, textAlign: 'left' }}>
            Here are the key activities of <strong>HOST2UNLIMITED digital marketing for International Schools (CBSE / ICSE / IB)</strong> — and how we support admissions, branding, and parent engagement:
          </p>
        </div>

        {/* PART 1: Global Reach, Admissions & Engagement (1 to 5) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#3b82f6' }}>Part 1:</span> Global Reach, Admissions & Branding
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 1 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                01
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <Globe size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Global Reach, Local Impact
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital marketing allows international schools to reach both local and global audiences — attracting parents relocating from abroad or seeking global-standard education in India.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 2 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(6, 182, 212, 0.6)', letterSpacing: '1px' }}>
                02
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)', flexShrink: 0 }}>
                  <TrendingUp size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Increased Admissions Enquiries
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>With targeted campaigns (Google Ads, Meta Ads, etc.), schools can directly reach parents searching for admissions, increasing leads during admission season.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 3 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(16, 185, 129, 0.6)', letterSpacing: '1px' }}>
                03
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
                  <Star size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Strong Brand Visibility
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>A well-maintained digital presence — website, social media, and reviews — helps build a trusted, premium image, setting the school apart from competitors.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 4 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(236, 72, 153, 0.6)', letterSpacing: '1px' }}>
                04
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(236, 72, 153, 0.4)', flexShrink: 0 }}>
                  <MessageSquare size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Better Parent Engagement
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Regular social media updates, videos, and newsletters keep parents emotionally connected and proud to be part of the school community.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 5 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(245, 158, 11, 0.6)', letterSpacing: '1px' }}>
                05
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>
                  <Award size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Showcase Infrastructure & Activities
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Through videos, reels, and virtual tours, schools can highlight campus facilities, events, extracurriculars, and student achievements — giving a visual experience to parents before visiting.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Middle Feature Image Spotlight Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '28px', 
            alignItems: 'center', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            borderRadius: '24px', 
            padding: '28px', 
            margin: '40px 0',
            textAlign: 'left',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ borderRadius: '18px', overflow: 'hidden', height: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <img 
              src={schoolBuildingHero} 
              alt="International School Infrastructure & Campus" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              CBSE • ICSE • IB Growth Hub
            </span>
            <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'left' }}>
              Building Prestige, Global Reputation & High Enrolment
            </h4>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
              International and IB board schools compete on prestige, trust, and global standards. From 24/7 virtual admission counselors to NRI parent outreach, HOST2UNLIMITED powers high-value enrolment.
            </p>
          </div>
        </motion.div>

        {/* PART 2: Analytics, Reputation & 24/7 Digital Desk (6 to 10) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#06b6d4' }}>Part 2:</span> Analytics, Reputation & 24/7 Digital Hub
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 6 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(139, 92, 246, 0.6)', letterSpacing: '1px' }}>
                06
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)', flexShrink: 0 }}>
                  <BarChart3 size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Data-Driven Marketing Decisions
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Unlike traditional marketing, digital platforms provide real-time analytics — allowing schools to track what works best and optimize campaigns accordingly.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 7 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(2, 132, 199, 0.6)', letterSpacing: '1px' }}>
                07
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.4)', flexShrink: 0 }}>
                  <Sparkles size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Cost-Effective Compared to Traditional Ads
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital marketing provides a higher ROI compared to print or hoardings, letting schools target precise demographics without wastage.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 8 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(20, 184, 166, 0.6)', letterSpacing: '1px' }}>
                08
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(20, 184, 166, 0.4)', flexShrink: 0 }}>
                  <CheckCircle2 size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Stronger Online Reputation
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Online reviews, testimonials, and positive stories on Google & social media build trust — crucial for high-fee, international schools.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 9 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(99, 102, 241, 0.6)', letterSpacing: '1px' }}>
                09
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)', flexShrink: 0 }}>
                  <Bot size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Website as a 24/7 Admission Counselor
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>A well-optimized website serves as a round-the-clock information hub for parents — showcasing curriculum, accreditations, and admission details.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 10 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(168, 85, 247, 0.6)', letterSpacing: '1px' }}>
                10
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                  <Users size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Builds Community and Alumni Relations
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital channels help maintain long-term engagement with alumni, students, and parents, strengthening the school’s global community.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </>
    )
  },
  coaching: {
    icon: GraduationCap,
    title: 'Private Coaching Institutions',
    lead: 'How HOST2UNLIMITED digital marketing fills batches for NEET, JEE, Competitive Exams, Language Training & Skill Development Institutes.',
    desc: (
      <>
        {/* Top Feature Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '20px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }}>
          <img 
            src={coachingClassroom} 
            alt="Private Coaching Institute Classroom & Science Lab" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.3) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '8px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.9)', color: '#fff' }}>
                NEET • JEE • Competitive Exam Lead Generation
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                High-Conversion Digital Marketing for Coaching Institutes
              </h3>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid #3b82f6', borderRadius: '12px', padding: '18px 22px', marginBottom: '30px' }}>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-primary)', margin: 0, fontWeight: 500, textAlign: 'left' }}>
            Here are the key activities of our <strong>digital marketing for Private Coaching Institutions</strong> — whether you’re promoting NEET/JEE classes, competitive exams, language training, or skill development institutes:
          </p>
        </div>

        {/* PART 1: Targeted Outreach & Lead Generation (1 to 6) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#3b82f6' }}>Part 1:</span> Targeted Outreach & Lead Generation
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 1 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                01
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <Target size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Targeted Audience Reach
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>You can reach students and parents based on location, age, interests, or academic goals.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Example: Running ads specifically for “Class 12 Science Students in Mumbai” or “Parents of 10th graders.”</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 2 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(6, 182, 212, 0.6)', letterSpacing: '1px' }}>
                02
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)', flexShrink: 0 }}>
                  <DollarSign size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Cost-Effective Marketing
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital ads (Google, Meta, YouTube) are cheaper than hoardings or newspaper ads.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>You pay only when someone clicks or engages, giving measurable ROI.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 3 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(16, 185, 129, 0.6)', letterSpacing: '1px' }}>
                03
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
                  <TrendingUp size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Measurable Results
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Every campaign can be tracked — you know how many leads, calls, and admissions came from each platform.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Tools like Google Analytics, Meta Ads, and CRM dashboards help monitor real-time performance.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 4 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(236, 72, 153, 0.6)', letterSpacing: '1px' }}>
                04
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(236, 72, 153, 0.4)', flexShrink: 0 }}>
                  <Award size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Builds Trust and Credibility
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Regular posts of student testimonials, faculty expertise, and success stories enhance credibility.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>A strong digital presence builds brand trust among new students and parents.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 5 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(245, 158, 11, 0.6)', letterSpacing: '1px' }}>
                05
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>
                  <Brain size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Brand Awareness & Recall
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Consistent online presence (social media, Google listings, YouTube, blogs) ensures your institute stays top of mind when students look for coaching options.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 6 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(139, 92, 246, 0.6)', letterSpacing: '1px' }}>
                06
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)', flexShrink: 0 }}>
                  <Smartphone size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Increased Engagement with Students
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Using Instagram reels, YouTube shorts, polls, or quizzes keeps your audience engaged and informed.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>You can also build a community through Telegram/WhatsApp groups.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Middle Feature Image Spotlight Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '28px', 
            alignItems: 'center', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            borderRadius: '24px', 
            padding: '28px', 
            margin: '40px 0',
            textAlign: 'left',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ borderRadius: '18px', overflow: 'hidden', height: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <img 
              src={schoolBuildingHero} 
              alt="Coaching Institute Batch Enrolment Growth Strategy" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              Batch Fill Accelerator
            </span>
            <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'left' }}>
              Fill Coaching Batches Fast with Targeted Lead Funnels
            </h4>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
              Coaching institutes run on tight timelines. From demo-class video ads to instant WhatsApp follow-ups and local Google Maps domination, HOST2UNLIMITED ensures maximum student enrolments per batch.
            </p>
          </div>
        </motion.div>

        {/* PART 2: Local Dominance, Video Power & Admissions (7 to 12) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#06b6d4' }}>Part 2:</span> Local Dominance, Video Power & Admissions
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 7 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(2, 132, 199, 0.6)', letterSpacing: '1px' }}>
                07
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.4)', flexShrink: 0 }}>
                  <Clock size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  24/7 Visibility
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Your digital presence works round the clock.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Even when your institute is closed, your website, ads, and social pages keep attracting inquiries.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 8 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(20, 184, 166, 0.6)', letterSpacing: '1px' }}>
                08
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(20, 184, 166, 0.4)', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Local SEO Benefits
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Through Google My Business and local SEO, you can attract nearby students searching “best coaching near me.”</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Helps dominate your local area searches.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 9 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(99, 102, 241, 0.6)', letterSpacing: '1px' }}>
                09
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)', flexShrink: 0 }}>
                  <MessageSquare size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Personalized Communication
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Email and WhatsApp marketing allow for direct follow-up with students and parents.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>You can tailor messages for different groups — e.g., repeaters, toppers, new joiners.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 10 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(168, 85, 247, 0.6)', letterSpacing: '1px' }}>
                10
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                  <Video size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Video Marketing Power
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Students trust visuals — demo classes, concept explainer videos, and toppers’ interviews build engagement and trust faster than text ads.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 11 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(234, 179, 8, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(234, 179, 8, 0.6)', letterSpacing: '1px' }}>
                11
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(234, 179, 8, 0.4)', flexShrink: 0 }}>
                  <Briefcase size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Competitive Advantage
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#eab308" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Many local coaching centers still rely on word-of-mouth; digital marketing helps you stand out professionally and attract a wider audience.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 12 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                12
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <BookOpen size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Supports Admission Campaigns
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital campaigns can drive inquiries during admission seasons, helping fill batches quickly with qualified leads.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </>
    )
  },
  colleges: {
    icon: School,
    title: 'Junior and Degree Colleges',
    lead: 'How HOST2UNLIMITED digital marketing drives admissions, branding, and parent-student engagement for Junior and Degree Colleges.',
    desc: (
      <>
        {/* Top Feature Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '20px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }}>
          <img 
            src={juniorDegreeCollegeCampus} 
            alt="Junior and Degree College Campus & Academic Building" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.3) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '8px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.9)', color: '#fff' }}>
                Junior & Degree College Marketing
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Empowering Campus Growth, Degree Enrolments & Brand Legacy
              </h3>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid #3b82f6', borderRadius: '12px', padding: '18px 22px', marginBottom: '30px' }}>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-primary)', margin: 0, fontWeight: 500, textAlign: 'left' }}>
            Here are the key activities of our <strong>digital marketing for Junior and Degree Colleges</strong> — and how we support admissions, branding, and parent engagement:
          </p>
        </div>

        {/* PART 1: Admissions, Reach & Reputation (1 to 5) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#3b82f6' }}>Part 1:</span> Admissions, Reach & Reputation
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 1 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                01
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <Globe size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Brand Visibility & Awareness
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Helps the college stand out in a crowded education market.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Builds a strong digital presence through websites, social media, and Google listings.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Makes it easy for parents and students to discover the college online.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 2 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(6, 182, 212, 0.6)', letterSpacing: '1px' }}>
                02
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)', flexShrink: 0 }}>
                  <TrendingUp size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Increased Admissions & Lead Generation
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Targeted ads on Google, Facebook, Instagram, and YouTube reach students actively searching for courses.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Conversion-optimized landing pages help turn inquiries into admissions.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Easy to track which campaigns bring maximum ROI.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 3 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(16, 185, 129, 0.6)', letterSpacing: '1px' }}>
                03
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
                  <GraduationCap size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Building Trust & Reputation
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Regular social media updates about achievements, student success stories, and events enhance credibility.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Google Reviews, testimonials, and alumni stories strengthen the college’s image.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>A professional online identity shows the college as modern and progressive.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 4 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(236, 72, 153, 0.6)', letterSpacing: '1px' }}>
                04
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(236, 72, 153, 0.4)', flexShrink: 0 }}>
                  <DollarSign size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Cost-Effective Compared to Traditional Marketing
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Lower cost than newspaper ads, billboards, or hoardings.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Campaigns can be scaled up or down anytime based on performance and budget.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Saves money by targeting only relevant audiences.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 5 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(245, 158, 11, 0.6)', letterSpacing: '1px' }}>
                05
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Wider Reach Beyond Local Area
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Attracts students from other cities, states, or even countries.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Builds an audience of parents, counselors, and educational partners online.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Enables colleges to expand their catchment area for admissions.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Middle Feature Image Spotlight Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '28px', 
            alignItems: 'center', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            borderRadius: '24px', 
            padding: '28px', 
            margin: '40px 0',
            textAlign: 'left',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ borderRadius: '18px', overflow: 'hidden', height: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <img 
              src={schoolBuildingHero} 
              alt="Junior & Degree College Campus Growth & Placement Strategy" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              Gen Z Admission Engine
            </span>
            <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'left' }}>
              Building Student-Centric Branding & High Degree Enrolments
            </h4>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
              From campus fest highlights and alumni placement reels to multi-state digital lead funnels, HOST2UNLIMITED helps Junior & Degree Colleges build a modern, future-ready brand identity.
            </p>
          </div>
        </motion.div>

        {/* PART 2: Analytics, Student Community & Future-Ready Growth (6 to 10) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#06b6d4' }}>Part 2:</span> Analytics, Student Community & Future-Ready Growth
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 6 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(139, 92, 246, 0.6)', letterSpacing: '1px' }}>
                06
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)', flexShrink: 0 }}>
                  <BarChart3 size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Measurable Results & Data Insights
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Colleges can track clicks, form fills, website visits, and inquiries in real time.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Analytics help understand which courses attract more attention.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Data-driven decisions improve future campaigns and optimize admission strategy.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 7 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(2, 132, 199, 0.6)', letterSpacing: '1px' }}>
                07
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.4)', flexShrink: 0 }}>
                  <Users size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Engagement with Students & Parents
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Social media keeps the college connected and interactive with its audience.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Engagement through polls, stories, reels, and Q&A builds a community feeling.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Encourages student participation and pride in sharing college content.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 8 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(20, 184, 166, 0.6)', letterSpacing: '1px' }}>
                08
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(20, 184, 166, 0.4)', flexShrink: 0 }}>
                  <Award size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Promoting Academic & Co-curricular Achievements
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Highlighting results, placements, fests, and awards creates a positive image.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Videos and reels showcasing campus life attract prospective students.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Helps position the college as dynamic and student-focused.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 9 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(99, 102, 241, 0.6)', letterSpacing: '1px' }}>
                09
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)', flexShrink: 0 }}>
                  <Star size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Long-Term Brand Growth
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Consistent digital marketing helps colleges build a strong online legacy.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Over time, the college becomes the go-to brand in education in its category.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Helps in alumni engagement, sponsorships, and collaborations.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 10 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(168, 85, 247, 0.6)', letterSpacing: '1px' }}>
                10
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                  <Brain size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Adaptable & Future-Ready Strategy
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Prepares colleges for the digital-first mindset of Gen Z students.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Allows quick adaptation to trends like AI, reels, and influencer marketing.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Positions the college as tech-savvy and future-oriented.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </>
    )
  },
  engineering: {
    icon: Cpu,
    title: 'Institutes of Engineering & Technology',
    lead: 'How HOST2UNLIMITED digital marketing drives admissions, branding, and industry collaborations for Engineering & Technology Institutes.',
    desc: (
      <>
        {/* Top Feature Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '20px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }}>
          <img 
            src={engineeringManagementCampus} 
            alt="Engineering and Technology Institute Campus & Science Lab" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.3) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '8px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.9)', color: '#fff' }}>
                Engineering & Tech Marketing
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Driving Technical Admissions, Corporate Placement & Brand Prestige
              </h3>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid #3b82f6', borderRadius: '12px', padding: '18px 22px', marginBottom: '30px' }}>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-primary)', margin: 0, fontWeight: 500, textAlign: 'left' }}>
            Here are the key activities of <strong>HOST2UNLIMITED digital marketing for Engineering & Management Institutes</strong> — and how we support admissions, branding, and parent engagement:
          </p>
        </div>

        {/* PART 1: Targeted Student Reach, Lead Gen & Storytelling (1 to 5) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#3b82f6' }}>Part 1:</span> Targeted Reach, Lead Gen & Brand Storytelling
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 1 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                01
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <Target size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Targeted Student Reach
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Reach students based on interests, academic background, and career goals (like engineering aspirants or MBA seekers).</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Use tools like Google Ads, Meta Ads, and LinkedIn Campaigns to reach parents, working professionals, or diploma holders.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Run geo-targeted ads near industrial or educational hubs.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 2 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(6, 182, 212, 0.6)', letterSpacing: '1px' }}>
                02
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)', flexShrink: 0 }}>
                  <TrendingUp size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Improved Admissions & Lead Generation
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Generate high-quality admission inquiries through optimized campaigns.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Track and nurture leads using CRM tools and remarketing ads.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 3 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(16, 185, 129, 0.6)', letterSpacing: '1px' }}>
                03
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
                  <Globe size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Strong Online Brand Presence
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Build a professional image of the college with well-managed social media, SEO, and website updates.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Showcase accreditations, placements, and alumni success stories to create trust.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Enhance reputation among students, parents, and recruiters.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 4 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(236, 72, 153, 0.6)', letterSpacing: '1px' }}>
                04
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(236, 72, 153, 0.4)', flexShrink: 0 }}>
                  <Video size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Powerful Storytelling via Content
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Use videos, reels, blogs, and virtual campus tours to highlight labs, projects, and campus life.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Create relatable content like student testimonials, faculty talks, and placement success reels.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Improve organic visibility through blogs on engineering trends or management careers.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 5 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(245, 158, 11, 0.6)', letterSpacing: '1px' }}>
                05
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>
                  <Users size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Better Engagement & Community Building
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Build a loyal online community of students, alumni, and faculty.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Engage with audiences through quizzes, polls, webinars, and live Q&A sessions.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Strengthen alumni relations through LinkedIn and Facebook groups.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Middle Feature Image Spotlight Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '28px', 
            alignItems: 'center', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            borderRadius: '24px', 
            padding: '28px', 
            margin: '40px 0',
            textAlign: 'left',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ borderRadius: '18px', overflow: 'hidden', height: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <img 
              src={schoolBuildingHero} 
              alt="Engineering & Management Campus Placement & Industry Partnerships" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              Engineering & MBA Corporate Hub
            </span>
            <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'left' }}>
              Driving Corporate Placements & High-Value Enrolments
            </h4>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
              Engineering and Management institutes compete on placement records, NAAC/NBA accreditations, and industry tie-ups. HOST2UNLIMITED positions your institution directly in front of students, parents, and corporate recruiters.
            </p>
          </div>
        </motion.div>

        {/* PART 2: Cost Control, Industry Alliances & Credibility (6 to 10) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#06b6d4' }}>Part 2:</span> Cost Control, Industry Alliances & Credibility
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 6 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(139, 92, 246, 0.6)', letterSpacing: '1px' }}>
                06
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)', flexShrink: 0 }}>
                  <DollarSign size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Cost-Effective Marketing
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital ads cost far less than traditional print or hoarding campaigns.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>You can measure ROI in real time and adjust campaigns instantly.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Run seasonal or admission-based campaigns without wasteful spending.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 7 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(2, 132, 199, 0.6)', letterSpacing: '1px' }}>
                07
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.4)', flexShrink: 0 }}>
                  <BarChart3 size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Data-Driven Decisions
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Use analytics tools to understand student behavior and campaign performance.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Track metrics like ad impressions, conversion rates, and admission inquiries.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Continuously refine strategy using insights and trends.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 8 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(20, 184, 166, 0.6)', letterSpacing: '1px' }}>
                08
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(20, 184, 166, 0.4)', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Wider & Global Reach
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Attract students from other states or countries looking for management & tech programs.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Use SEO and international campaigns to reach NRIs and foreign applicants.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Showcase campus facilities suitable for international students.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 9 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(99, 102, 241, 0.6)', letterSpacing: '1px' }}>
                09
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)', flexShrink: 0 }}>
                  <Briefcase size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Boosts Industry Collaboration
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Build visibility among corporates and recruiters through LinkedIn and targeted campaigns.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Highlight industry tie-ups, internships, and placement records.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Helps attract guest speakers, research partners, and corporate sponsors.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 10 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(168, 85, 247, 0.6)', letterSpacing: '1px' }}>
                10
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                  <Award size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Enhances College Credibility
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>A well-managed digital presence reflects a modern, forward-thinking institution.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Students trust colleges with active, transparent, and engaging digital footprints.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Supports NAAC, NBA, or AICTE branding goals by showcasing institutional excellence online.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </>
    )
  },
  management: {
    icon: Briefcase,
    title: 'Institutes of Management Studies',
    lead: 'How HOST2UNLIMITED digital marketing drives admissions, branding, and industry collaborations for Management Studies Institutes.',
    desc: (
      <>
        {/* Top Feature Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '20px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }}>
          <img 
            src={engineeringManagementCampus} 
            alt="Management Studies & MBA Executive Campus" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.3) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '8px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.9)', color: '#fff' }}>
                Management & MBA Digital Marketing
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Driving MBA Admissions, Corporate Placement & Brand Prestige
              </h3>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid #3b82f6', borderRadius: '12px', padding: '18px 22px', marginBottom: '30px' }}>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-primary)', margin: 0, fontWeight: 500, textAlign: 'left' }}>
            Here are the key activities of <strong>HOST2UNLIMITED digital marketing for Engineering & Management Institutes</strong> — and how we support admissions, branding, and parent engagement:
          </p>
        </div>

        {/* PART 1: Targeted Student Reach, Lead Gen & Storytelling (1 to 5) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#3b82f6' }}>Part 1:</span> Targeted Reach, Lead Gen & Brand Storytelling
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 1 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                01
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <Target size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Targeted Student Reach
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Reach students based on interests, academic background, and career goals (like engineering aspirants or MBA seekers).</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Use tools like Google Ads, Meta Ads, and LinkedIn Campaigns to reach parents, working professionals, or diploma holders.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Run geo-targeted ads near industrial or educational hubs.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 2 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(6, 182, 212, 0.6)', letterSpacing: '1px' }}>
                02
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)', flexShrink: 0 }}>
                  <TrendingUp size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Improved Admissions & Lead Generation
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Generate high-quality admission inquiries through optimized campaigns.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Track and nurture leads using CRM tools and remarketing ads.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 3 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(16, 185, 129, 0.6)', letterSpacing: '1px' }}>
                03
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
                  <Globe size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Strong Online Brand Presence
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Build a professional image of the college with well-managed social media, SEO, and website updates.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Showcase accreditations, placements, and alumni success stories to create trust.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Enhance reputation among students, parents, and recruiters.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 4 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(236, 72, 153, 0.6)', letterSpacing: '1px' }}>
                04
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(236, 72, 153, 0.4)', flexShrink: 0 }}>
                  <Video size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Powerful Storytelling via Content
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Use videos, reels, blogs, and virtual campus tours to highlight labs, projects, and campus life.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Create relatable content like student testimonials, faculty talks, and placement success reels.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Improve organic visibility through blogs on engineering trends or management careers.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 5 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(245, 158, 11, 0.6)', letterSpacing: '1px' }}>
                05
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>
                  <Users size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Better Engagement & Community Building
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Build a loyal online community of students, alumni, and faculty.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Engage with audiences through quizzes, polls, webinars, and live Q&A sessions.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Strengthen alumni relations through LinkedIn and Facebook groups.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Middle Feature Image Spotlight Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '28px', 
            alignItems: 'center', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            borderRadius: '24px', 
            padding: '28px', 
            margin: '40px 0',
            textAlign: 'left',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ borderRadius: '18px', overflow: 'hidden', height: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <img 
              src={schoolBuildingHero} 
              alt="Engineering & Management Placement & Industry Partnerships" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              Engineering & MBA Corporate Hub
            </span>
            <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'left' }}>
              Driving Corporate Placements & High-Value Enrolments
            </h4>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
              Engineering and Management institutes compete on placement records, NAAC/NBA accreditations, and industry tie-ups. HOST2UNLIMITED positions your institution directly in front of students, parents, and corporate recruiters.
            </p>
          </div>
        </motion.div>

        {/* PART 2: Cost Control, Industry Alliances & Credibility (6 to 10) */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#06b6d4' }}>Part 2:</span> Cost Control, Industry Alliances & Credibility
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Activity 6 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(139, 92, 246, 0.6)', letterSpacing: '1px' }}>
                06
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)', flexShrink: 0 }}>
                  <DollarSign size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Cost-Effective Marketing
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital ads cost far less than traditional print or hoarding campaigns.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>You can measure ROI in real time and adjust campaigns instantly.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Run seasonal or admission-based campaigns without wasteful spending.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 7 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(2, 132, 199, 0.6)', letterSpacing: '1px' }}>
                07
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.4)', flexShrink: 0 }}>
                  <BarChart3 size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Data-Driven Decisions
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Use analytics tools to understand student behavior and campaign performance.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Track metrics like ad impressions, conversion rates, and admission inquiries.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Continuously refine strategy using insights and trends.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 8 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(20, 184, 166, 0.6)', letterSpacing: '1px' }}>
                08
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(20, 184, 166, 0.4)', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Wider & Global Reach
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Attract students from other states or countries looking for management & tech programs.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Use SEO and international campaigns to reach NRIs and foreign applicants.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#14b8a6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Showcase campus facilities suitable for international students.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 9 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(99, 102, 241, 0.6)', letterSpacing: '1px' }}>
                09
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)', flexShrink: 0 }}>
                  <Briefcase size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Boosts Industry Collaboration
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Build visibility among corporates and recruiters through LinkedIn and targeted campaigns.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Highlight industry tie-ups, internships, and placement records.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#6366f1" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Helps attract guest speakers, research partners, and corporate sponsors.</span>
                </div>
              </div>
            </motion.div>

            {/* Activity 10 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(168, 85, 247, 0.6)', letterSpacing: '1px' }}>
                10
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(168, 85, 247, 0.4)', flexShrink: 0 }}>
                  <Award size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Enhances College Credibility
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>A well-managed digital presence reflects a modern, forward-thinking institution.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Students trust colleges with active, transparent, and engaging digital footprints.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Supports NAAC, NBA, or AICTE branding goals by showcasing institutional excellence online.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </>
    )
  },
  universities: {
    icon: Award,
    title: 'Public / Private / Deemed Universities',
    lead: 'How HOST2UNLIMITED digital marketing supports admissions, branding, global reach, and parent-student engagement for Public, Private, and Deemed Universities.',
    desc: (
      <>
        {/* Top Feature Banner Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '20px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)' }}>
          <img 
            src={universityCampusArchitecture} 
            alt="Public Private Deemed University Campus Architecture" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 15, 25, 0.9) 0%, rgba(11, 15, 25, 0.3) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px'
          }}>
            <div>
              <span className="badge" style={{ marginBottom: '8px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.9)', color: '#fff' }}>
                Public / Private / Deemed University Marketing
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Driving Global University Enrolments, Research Prestige & Brand Authority
              </h3>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid #3b82f6', borderRadius: '12px', padding: '18px 22px', marginBottom: '30px' }}>
          <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-primary)', margin: 0, fontWeight: 500, textAlign: 'left' }}>
            Here are the key activities of our <strong>digital marketing for Public / Private / Deemed Universities</strong> — and how HOST2UNLIMITED supports admissions, branding, and parent engagement:
          </p>
        </div>

        {/* SECTION 1: Common Advantages for All Universities */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
            <span style={{ color: '#3b82f6' }}>🎓 Section 1:</span> Common Advantages for All Universities
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Advantage 1 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(59, 130, 246, 0.6)', letterSpacing: '1px' }}>
                01
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)', flexShrink: 0 }}>
                  <Globe size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Increased Visibility & Reach
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital marketing helps universities reach a global audience—students, parents, alumni, and industry partners—far beyond their local region.</span>
                </div>
              </div>
            </motion.div>

            {/* Advantage 2 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(6, 182, 212, 0.6)', letterSpacing: '1px' }}>
                02
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(6, 182, 212, 0.4)', flexShrink: 0 }}>
                  <DollarSign size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Cost-Effective Outreach
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#06b6d4" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Compared to print or outdoor ads, digital campaigns (Google Ads, Meta Ads, etc.) offer better ROI with measurable performance.</span>
                </div>
              </div>
            </motion.div>

            {/* Advantage 3 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(16, 185, 129, 0.6)', letterSpacing: '1px' }}>
                03
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
                  <Target size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Targeted Student Acquisition
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Run geo-targeted, interest-based campaigns (e.g., for engineering, MBA, law, etc.) to attract the right students rather than just large numbers.</span>
                </div>
              </div>
            </motion.div>

            {/* Advantage 4 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(236, 72, 153, 0.6)', letterSpacing: '1px' }}>
                04
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(236, 72, 153, 0.4)', flexShrink: 0 }}>
                  <Award size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Enhanced Brand Image
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#ec4899" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>A consistent digital presence through SEO, social media, and online PR builds a modern, forward-thinking institutional reputation.</span>
                </div>
              </div>
            </motion.div>

            {/* Advantage 5 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(245, 158, 11, 0.6)', letterSpacing: '1px' }}>
                05
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(245, 158, 11, 0.4)', flexShrink: 0 }}>
                  <BarChart3 size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Real-Time Performance Tracking
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Analytics tools (Google Analytics, Meta Insights) enable data-driven decisions on which campaigns or courses perform best.</span>
                </div>
              </div>
            </motion.div>

            {/* Advantage 6 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(139, 92, 246, 0.6)', letterSpacing: '1px' }}>
                06
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)', flexShrink: 0 }}>
                  <Users size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Engagement & Relationship Building
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Interactive content like webinars, reels, campus tours, and student stories creates emotional connections with prospects.</span>
                </div>
              </div>
            </motion.div>

            {/* Advantage 7 */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="card-glass preschool-activity-card" 
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '20px', textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="card-number-badge" style={{ position: 'absolute', top: '16px', right: '18px', fontSize: '14px', fontWeight: 900, color: 'rgba(2, 132, 199, 0.6)', letterSpacing: '1px' }}>
                07
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 6px 16px rgba(2, 132, 199, 0.4)', flexShrink: 0 }}>
                  <TrendingUp size={22} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left', paddingRight: '24px' }}>
                  Admission Funnel Optimization
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  <CheckCircle2 size={16} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Digital marketing supports the entire student journey — awareness → inquiry → application → admission — through automation tools (CRM, chatbots, remarketing).</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Middle Feature Image Spotlight Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '28px', 
            alignItems: 'center', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            borderRadius: '24px', 
            padding: '28px', 
            margin: '40px 0',
            textAlign: 'left',
            boxShadow: '0 14px 35px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ borderRadius: '18px', overflow: 'hidden', height: '220px', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <img 
              src={schoolBuildingHero} 
              alt="Global University Campus Infrastructure & International Reach" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              Institutional Scale & Rankings
            </span>
            <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'left' }}>
              Driving National & International University Enrolments
            </h4>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
              Whether boosting transparency for Public Universities, driving high-converting leads for Private Universities, or elevating research credentials for Deemed Universities, HOST2UNLIMITED delivers end-to-end digital excellence.
            </p>
          </div>
        </motion.div>

        {/* SECTIONS 2, 3, 4: Advantages by University Category */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px', textAlign: 'left' }}>
            Tailored Advantages by University Type
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Section 2: Public Universities */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '20px', textAlign: 'left' }}
            >
              <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                🏛️ Public (Government) Universities
              </span>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', textAlign: 'left' }}>
                Promoting Inclusion & Public Initiatives
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Improving Awareness:</strong> Highlight government scholarships, research programs, and affordable education options.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Attracting Diverse Students:</strong> Target underrepresented regions or first-generation learners to promote inclusion.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Showcasing Research & Impact:</strong> Feature social impact, innovations, and industry-government collaborations.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Boosting Transparency:</strong> Regular online communication builds public trust in admissions and results.</span>
                </div>
              </div>
            </motion.div>

            {/* Section 3: Private Universities */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '20px', textAlign: 'left' }}
            >
              <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                🏫 Private Universities
              </span>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', textAlign: 'left' }}>
                Brand Differentiation & Enrolment Growth
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Brand Differentiation:</strong> Highlight USPs—industry tie-ups, international exposure, placements, and infrastructure.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Driving Admissions:</strong> Digital ads, SEO, and lead nurturing systems increase enrollments efficiently.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Alumni & Corporate Networks:</strong> LinkedIn marketing and newsletters strengthen corporate placement partnerships.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Student Ambassadors:</strong> Leverage student influencers and content creators for authentic campus promotion.</span>
                </div>
              </div>
            </motion.div>

            {/* Section 4: Deemed Universities */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '20px', textAlign: 'left' }}
            >
              <span className="badge" style={{ marginBottom: '12px', fontSize: '11.5px', backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                🎓 Deemed Universities
              </span>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', textAlign: 'left' }}>
                Academic Prestige & Research Leadership
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Strengthening Credibility:</strong> Highlight research publications, patents, NAAC/NIRF rankings, and awards.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Niche Programs:</strong> Market specialized programs (Biotechnology, AI, Law-Tech) to a global audience.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Global Collaborations:</strong> Multilingual content & international SEO attract NRI and foreign applicants.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Enhancing Autonomy:</strong> Position the university as an innovative leader appealing to global partners.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* SECTION 5: Digital Marketing Channels Matrix */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', textAlign: 'left' }}>
            📊 Section 5: High-Performing Digital Marketing Channels
          </h3>

          <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(59, 130, 246, 0.12)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Digital Channel</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Core Purpose</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: 'var(--text-primary)' }}>Live Execution Example</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#3b82f6' }}>SEO (Search Engine Optimization)</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>Improve organic visibility for high-intent program searches</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 600 }}>“Best MBA Colleges in India” ranking keywords</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#06b6d4' }}>Google Ads (PPC)</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>Generate direct, high-converting admission leads</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 600 }}>Course-specific search & display campaigns</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#ec4899' }}>Social Media Marketing</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>Build active student community & brand engagement</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 600 }}>Instagram reels showcasing vibrant campus life</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#f59e0b' }}>YouTube & Video Marketing</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>Showcase virtual campus tours & authentic student stories</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 600 }}>“Day in the Life of a University Student” videos</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#8b5cf6' }}>Email & CRM Automation</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>Nurture student inquiries from application to enrollment</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 600 }}>Automated admission deadline reminder series</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#10b981' }}>Online PR & Content Marketing</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>Highlight research achievements, NIRF rank & faculty expertise</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 600 }}>Published research articles, patents & news releases</td>
                </tr>
                <tr>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#0284c7' }}>WhatsApp & Chatbots</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>Deliver instant real-time student support & counseling</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 600 }}>24/7 automated inquiry assistance on website</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
};

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
  schools: [
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

const EducationalInstituteDetail = ({ defaultId }) => {
  const { id: paramId } = useParams();
  const rawId = paramId || defaultId || 'preschools';
  const { addLead } = useLeads();

  const normalizeSectorId = (paramId) => {
    if (!paramId) return 'preschools';
    const lower = paramId.toLowerCase();
    if (lower.includes('preschool')) return 'preschools';
    if (lower.includes('international') || lower.includes('cbse') || lower.includes('icse') || lower.includes('ib')) return 'international';
    if (lower.includes('coaching') || lower.includes('tuition') || lower.includes('classes') || lower.includes('neet') || lower.includes('jee')) return 'coaching';
    if (lower.includes('primary') || lower.includes('secondary') || lower.includes('school')) return 'primary-secondary';
    if (lower.includes('engineering') || lower.includes('technology')) return 'engineering';
    if (lower.includes('college')) return 'colleges';
    if (lower.includes('university') || lower.includes('universities')) return 'universities';
    return paramId;
  };

  const sectorKey = normalizeSectorId(rawId);
  const sector = sectorsData[sectorKey] || sectorsData['primary-secondary'];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Admission Marketing Enquiry',
    qualification: 'Graduation',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!sector) {
    return (
      <div style={{ padding: '120px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Sector Profile Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>Please go back and select a valid educational sector.</p>
        <Link to="/educational-institutes" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Institutes
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead({
      name: formData.name,
      companyName: sector.title,
      email: formData.email,
      phone: formData.phone,
      service: `Educational - ${sector.title} (${formData.program})`,
      budget: 'Detail Page Enquiry',
      details: `Qualification: ${formData.qualification}. Enquiry details: ${formData.details || 'None'}`
    });
    setSubmitted(true);
  };

  const renderCaseStudies = (sectionKey) => {
    const studies = caseStudiesData[sectionKey];
    
    if (!studies || studies.length === 0) {
      return (
        <div style={{ 
          backgroundColor: 'rgba(239, 68, 68, 0.04)', 
          border: '1px dashed rgba(239, 68, 68, 0.3)', 
          borderRadius: '12px', 
          padding: '24px', 
          textAlign: 'left',
          marginTop: '24px'
        }}>
          <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
            Content Gap Alert
          </span>
          <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            No dedicated case study published yet for this sector.
          </p>
          <Link 
            to="/case-studies" 
            className="btn btn-primary" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              fontSize: '12.5px', 
              padding: '10px 18px', 
              marginTop: '12px',
              textDecoration: 'none'
            }}
          >
            Browse Case Studies Portfolio
          </Link>
        </div>
      );
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '24px', width: '100%' }}>
        {studies.map((study, idx) => (
          <div 
            key={idx} 
            className="card-glass" 
            style={{ 
              padding: '20px', 
              border: '1px solid var(--glass-border)', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              alignItems: 'stretch',
              gap: '12px',
              backgroundColor: 'var(--bg-secondary)',
              transition: 'all 0.25s ease'
            }}
          >
            <div>
              <span style={{ fontSize: '10.5px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', backgroundColor: 'var(--primary-light)', padding: '3px 8px', borderRadius: '4px', display: 'inline-block' }}>
                {study.metric}
              </span>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '10px', marginBottom: '4px', textAlign: 'left' }}>
                {study.name}
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, textAlign: 'left' }}>
                {study.tag}
              </p>
            </div>
            <Link 
              to="/case-studies" 
              className="btn btn-primary"
              style={{ 
                fontSize: '12px', 
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginTop: '10px',
                textDecoration: 'none'
              }}
            >
              View Case Study
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const breadcrumbs = [
    { name: 'Educational Institutes', path: '/educational-institutes' },
    { name: sector.title, path: `/educational-institutes/${sectorKey}` }
  ];

  return (
    <div>
      <SEOMeta
        title={`${sector.title} Digital Marketing | Host2Unlimited`}
        description={sector.lead}
        keywords="school advertising, college marketing, university lead generation"
        canonical={`https://host2unlimited.com/educational-institutes/${sectorKey}`}
        breadcrumbPaths={breadcrumbs}
      />
      
      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ position: 'relative', height: '190px', minHeight: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#0b0f19' }}
      >
        <img 
          src={educationalHeroBg} 
          alt={`${sector.title} Hero Background`} 
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
        
        {/* Navigation back */}
        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <Link 
            to="/educational-institutes" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'var(--text-secondary)', 
              fontWeight: 600, 
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)'
            }}
            className="back-hover-primary"
          >
            <ArrowLeft size={16} /> Back to Educational Institutes
          </Link>
        </div>

        {/* Main Content (Full Width) */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '38px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
              {sector.title}
            </h1>
            <p style={{ fontSize: '16.5px', fontWeight: 600, color: 'var(--primary)', marginBottom: '24px', lineHeight: 1.5 }}>
              {sector.lead}
            </p>
            <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7 }}>
              {sector.desc}
            </div>
            
            <div style={{ marginTop: '50px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
                Demonstrated Case Studies
              </h3>
              {renderCaseStudies(sectorKey)}
            </div>
          </div>

          {/* Full-Width Bottom Contact CTA Section */}
          <div style={{ marginTop: '60px', marginBottom: '80px' }}>
            <div 
              className="card-glass" 
              style={{ 
                padding: '40px 36px', 
                textAlign: 'center',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '24px'
              }}
            >
              <span className="badge" style={{ marginBottom: '14px', fontSize: '12px' }}>
                Education Growth Partner
              </span>
              
              <h2 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '14px', color: 'var(--text-primary)' }}>
                Ready to Scale {sector.title} Admissions & Parent Engagement?
              </h2>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '680px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
                Connect directly with our specialized digital marketing experts to design a customized campaign for your campus or educational group.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)', padding: '10px 18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span><strong>100+</strong> Campuses Scaled</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)', padding: '10px 18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Hyperlocal Meta & Google Ads</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)', padding: '10px 18px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <CheckCircle2 size={16} color="#10b981" /> <span>Dedicated On-Campus Coordinator</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link 
                  to="/contact" 
                  className="btn btn-primary" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px', 
                    padding: '14px 36px',
                    fontSize: '16px',
                    fontWeight: 800,
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.35)'
                  }}
                >
                  Contact Our Team <Send size={18} />
                </Link>

                <a 
                  href="tel:+918104612974" 
                  className="btn btn-secondary"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '14px 28px',
                    fontSize: '15px',
                    fontWeight: 700
                  }}
                >
                  <Phone size={16} color="var(--primary)" /> Call +91 81046 12974
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EducationalInstituteDetail;
