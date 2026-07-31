import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, GraduationCap, Scale, Stethoscope, ShoppingBag, Globe, ArrowRight } from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import caseStudiesHeroBg from '../assets/hero_bg/case_studies_hero_clean.png';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5000' : (import.meta.env.VITE_API_URL || 'https://host2unlimitedcms-backend.onrender.com').replace(/\/+$/, '');

// ── Logo images ──────────────────────────────────────────────
import newHorizonPanvel from '../assets/h2u logos/new-horizon-public-school-panvel.png';
import newHorizonRodasInt from '../assets/h2u logos/new-horizon-International-school-Rodas.png';
import newHorizonKavesar from '../assets/h2u logos/new-horizon-scholars-school-kavesar-thane.png';
import newHorizonAiroli13 from '../assets/h2u logos/new-horizon-scholars-school-airoli-sector-13.png';
import newHorizonAiroli3 from '../assets/h2u logos/new-horizon-public-school-airoli-Sector-3.png';
import newHorizonVasant from '../assets/h2u logos/new-horizon-scholars-school-Vasant-Lawns (1).png';
import newHorizonAiroli19 from '../assets/h2u logos/new-horizon-public-school-airoli-Sector-19.png';
import newHorizonRodasKolshet from '../assets/h2u logos/new-horizon-scholars-school-Rodas-Kolshet.png';
import ulweLogo from '../assets/h2u logos/Ulwe-logo (1).png';
import vsignLogo from '../assets/h2u logos/V-Sign-logo.png';
import gsgsLogo from '../assets/h2u logos/GSGS-logo@4x (1).png';
import armietLogo from '../assets/h2u logos/armiet_logo.jpeg';
import drPillaiLogo from '../assets/h2u logos/dr-pillai-global-academy.png';
import uudaanLogo from '../assets/h2u logos/uudaan-montessori-preschool.jpg';
import dnyanGangaLogo from '../assets/h2u logos/DNYAN_GANGA_EDUCATION_TRUST_S-removebg-preview-e1750267686501 (1).webp';
import pillaiLogo from '../assets/h2u logos/pillai-logo.png';
import ardentLogo from '../assets/h2u logos/ardent_tutorials_thane.png';
import i3rLogo from '../assets/h2u logos/i3globle-logo.png';
import avLogo from '../assets/h2u logos/av-solution-logo.png';
import rnpLogo from '../assets/h2u logos/RNP_Logo-1.webp';
import skytechLogo from '../assets/h2u logos/skytech-logo.png';
import lotusLogo from '../assets/h2u logos/lotusleafentertainment-logo.png';
import verticesLogo from '../assets/h2u logos/Vertices-Partners_logo (1).svg';
import euroKidsLogo from '../assets/h2u logos/euro_kids.jpeg';
import newHorizonLogo from '../assets/h2u logos/New-Horizon-logo.png';

// ── Detailed clients with description and target link ──────────────────────────
const detailedClients = [
  {
    id: 1,
    name: 'NEW HORIZON PUBLIC SCHOOL, PANVEL',
    logo: newHorizonPanvel,
    category: 'Education',
    icon: GraduationCap,
    color: '#0284c7',
    description: 'New Horizon Public School, Panvel is a premier CBSE institution dedicated to academic excellence, innovation, and holistic student growth. Equipped with modern digital classrooms and state-of-the-art facilities.'
  },
  {
    id: 2,
    name: 'NEW HORIZON INTERNATIONAL SCHOOL, RODAS',
    logo: newHorizonRodasInt,
    category: 'Education',
    icon: GraduationCap,
    color: '#7c3aed',
    description: 'New Horizon International School, Rodas delivers world-class international education, combining global curricula with strong value systems and advanced digital learning environments.'
  },
  {
    id: 3,
    name: 'RAMSHETH THAKUR PUBLIC SCHOOL, ULWE',
    logo: ulweLogo,
    category: 'Education',
    icon: GraduationCap,
    color: '#059669',
    description: 'Ramsheth Thakur Public School, Ulwe is a leading educational landmark in Navi Mumbai, offering excellent academic programs, sports infrastructure, and comprehensive co-curricular activities.'
  },
  {
    id: 4,
    name: 'NEW HORIZON SCHOLARS SCHOOL, KAVESAR, THANE',
    logo: newHorizonKavesar,
    category: 'Education',
    icon: GraduationCap,
    color: '#2563eb',
    description: 'New Horizon Scholars School, Kavesar, Thane provides top-tier education with emphasis on STEM learning, creative arts, leadership development, and digital parent-teacher engagement.'
  },
  {
    id: 5,
    slug: 'poddar-brio-school',
    name: 'PODDAR BRIO SCHOOL',
    logo: euroKidsLogo,
    category: 'Education',
    icon: GraduationCap,
    color: '#2563eb',
    description: 'PODDAR BRIO International School is a leading CBSE educational institution in Badlapur that provides schooling from kindergarten to higher secondary levels. The school emphasizes academic excellence blended with global teaching standards and Indian cultural values. It focuses on digital learning, co-curricular growth.'
  },
  {
    id: 6,
    name: 'NEW HORIZON SCHOLARS SCHOOL, AIROLI (SECTOR 13)',
    logo: newHorizonAiroli13,
    category: 'Education',
    icon: GraduationCap,
    color: '#d97706',
    description: 'New Horizon Scholars School, Airoli (Sector 13) empowers young minds through quality CBSE education, interactive digital teaching methods, and outstanding co-curricular opportunities.'
  },
  {
    id: 7,
    slug: 'dr-pillai-global-academy-panvel',
    name: 'DR. PILLAI GLOBAL ACADEMY PANVEL',
    logo: drPillaiLogo,
    category: 'Education',
    icon: GraduationCap,
    color: '#7c3aed',
    description: 'The Dr. Pillai Global Academy Panvel is a well-planned initiative from the Mahatma Education Society, a trust committed to provide meaningful education with tangible results. It is the brainchild and the enterprise of Dr. K. M. Vasudevan Pillai, an educator with 40 years experience.'
  },
  {
    id: 8,
    name: 'NEW HORIZON PUBLIC SCHOOL, AIROLI (SECTOR 3)',
    logo: newHorizonAiroli3,
    category: 'Education',
    icon: GraduationCap,
    color: '#0891b2',
    description: 'New Horizon Public School, Airoli (Sector 3) is a distinguished CBSE school known for producing top academic rankers, sports champions, and well-rounded global citizens.'
  },
  {
    id: 9,
    slug: 'royal-international-cbse-school',
    name: 'ROYAL INTERNATIONAL CBSE SCHOOL',
    logo: newHorizonLogo,
    category: 'Education',
    icon: GraduationCap,
    color: '#dc2626',
    description: 'At Royal International School, we believe in providing excellent learning with the best infrastructure and academic performance. Experience quality facilities and a superior study environment for your children\'s success!'
  },
  {
    id: 10,
    slug: 'armiet-engineering-and-mgmt-college',
    name: 'ARMIET ENGINEERING & MGMT COLLEGE',
    logo: armietLogo,
    category: 'Higher Education',
    icon: GraduationCap,
    color: '#059669',
    description: 'ARMIET (Alamuri Ratnamala Institute of Engineering and Technology) is a reputed engineering and management institute in Asangaon offering diploma, degree, and postgraduate programs. The college focuses on practical, industry-based learning, innovation, and overall student development. It is known for its advanced infrastructure, research-driven education.'
  },
  {
    id: 11,
    name: 'NEW HORIZON SCHOLARS SCHOOL, VASANT LAWNS',
    logo: newHorizonVasant,
    category: 'Education',
    icon: GraduationCap,
    color: '#4f46e5',
    description: 'New Horizon Scholars School, Vasant Lawns offers an enriched educational journey with modern digital learning aids, sports complexes, and vibrant extracurricular programs.'
  },
  {
    id: 12,
    name: 'NEW HORIZON PUBLIC SCHOOL, AIROLI (SECTOR 19)',
    logo: newHorizonAiroli19,
    category: 'Education',
    icon: GraduationCap,
    color: '#0284c7',
    description: 'New Horizon Public School, Airoli (Sector 19) is an established center of educational excellence, fostering critical thinking, sportsmanship, and moral values.'
  },
  {
    id: 13,
    slug: 'gautam-singhania-global-school-dombiali',
    name: 'GAUTAM SINGHANIA GLOBAL SCHOOL DOMBIVALI',
    logo: gsgsLogo,
    category: 'Education',
    icon: GraduationCap,
    color: '#d97706',
    description: 'Innovate & Thrive – A New Era of Education, transforming learning. Gautam Singhania Global School is a dynamic and inclusive learning community with a global perspective, dedicated to shaping future-ready individuals. We believe in nurturing lifelong learners who are not only academically strong but also socially responsible and emotionally intelligent.'
  },
  {
    id: 14,
    slug: 'poddar-brio-kids',
    name: 'PODDAR BRIO KIDS',
    logo: euroKidsLogo,
    category: 'Preschool',
    icon: GraduationCap,
    color: '#ec4899',
    description: 'Poddar Brio Kids is a leading preschool chain offering a nurturing environment focused on early childhood development. The website is designed to engage parents through detailed program information, activity highlights, and an easy inquiry process. Built with a child-friendly visual theme and simplified navigation, it ensures accessibility and strong brand presence online.'
  },
  {
    id: 15,
    slug: 'dg-international-cbse-school',
    name: 'DG INTERNATIONAL CBSE SCHOOL',
    logo: dnyanGangaLogo,
    category: 'Education',
    icon: GraduationCap,
    color: '#0891b2',
    description: 'DG International CBSE School is a leading educational institution in Thane that provides schooling from kindergarten to higher secondary levels. The school emphasizes academic excellence blended with global teaching standards and Indian cultural values. It focuses on digital learning, co-curricular growth, and strong parent–teacher communication.'
  },
  {
    id: 16,
    slug: 'shivajirao-s-jondhle-college-of-engineering-technology',
    name: 'SHIVAJIRAO S. JONDHLE COLLEGE OF ENGINEERING & TECHNOLOGY',
    category: 'Higher Education',
    icon: GraduationCap,
    color: '#7c3aed',
    description: 'Shivajirao S. Jondhle College of Engineering & Technology is a leading institution offering diploma, degree, and postgraduate programs in engineering and technology. The website highlights the institute\'s academic strength, departmental structure, and placement support through a technically robust layout integrated with Smart School MIS for online student and admission management.'
  },
  {
    id: 17,
    name: 'NEW HORIZON SCHOLARS SCHOOL RODAS, KOLSHET',
    logo: newHorizonRodasKolshet,
    category: 'Education',
    icon: GraduationCap,
    color: '#2563eb',
    description: 'New Horizon Scholars School Rodas, Kolshet provides high-standard schooling with state-of-the-art facilities, experimental science labs, and holistic sports coaching.'
  },
  {
    id: 18,
    name: 'PILLAI INSTITUTE PANVEL',
    logo: pillaiLogo,
    category: 'Higher Education',
    icon: GraduationCap,
    color: '#6d28d9',
    description: 'At PIL, we facilitate immersive study abroad experiences, allowing you to fully embrace a new language and culture. Take your education beyond borders and create memories that will last a lifetime. Learning a foreign language enhances critical thinking, problem-solving, and creativity. We recognize the tremendous personal growth that language learning brings.'
  },
  {
    id: 19,
    slug: 'uudaan-montessori',
    name: 'UUDAAN MONTESSORI',
    logo: uudaanLogo,
    category: 'Preschool',
    icon: GraduationCap,
    color: '#f59e0b',
    description: 'Uudaan Montessori Preschool and Daycare, is headquartered at Thane, in the heart of the city, Mumbai; maintaining a high-quality learning atmosphere for Young-Minds for the age between 2 years to 6 years. Our core focus is on exercises that develop each individual to concentrate, be self-disciplined, self-motivated and follow a system of order.'
  },
  {
    id: 20,
    slug: 'dr-shivajirao-s-jondhle-international-school',
    name: 'DR SHIVAJIRAO S JONDHLE INTERNATIONAL SCHOOL',
    category: 'Education',
    icon: GraduationCap,
    color: '#10b981',
    description: 'Dr. Shivajirao S. Jondhle International School is a reputed CBSE educational institution committed to delivering quality learning through modern teaching methodologies and digital integration. The school website focuses on providing easy access to essential information such as admissions, academics, and facilities while integrating Smart School MIS for seamless student management.'
  },
  {
    id: 21,
    name: 'DPGA GORAI',
    logo: drPillaiLogo,
    category: 'Education',
    icon: GraduationCap,
    color: '#7c3aed',
    description: 'The DPGA Borivali is a well-planned initiative from the Mahatma Education Society, a trust committed to provide meaningful education with tangible results. It is the brainchild and the enterprise of Dr. K. M. Vasudevan Pillai, an educator with 40 years experience.'
  },
  {
    id: 22,
    slug: 'ardent-tutorials',
    name: 'ARDENT TUTORIALS',
    logo: ardentLogo,
    category: 'Coaching',
    icon: GraduationCap,
    color: '#2563eb',
    description: 'Premier Commerce Tutorials in Thane. Certified Online Coaching for 11th & 12th Commerce, CA & CS Foundation.'
  },
  {
    id: 23,
    slug: 'royal-junior-degree-college',
    name: 'ROYAL JUNIOR & DEGREE COLLEGE',
    category: 'Higher Education',
    icon: GraduationCap,
    color: '#dc2626',
    description: 'Royal Junior and Degree College, Dombivli, is a renowned higher education institution offering a wide range of undergraduate and postgraduate programs in arts, science, and commerce.'
  },
  {
    id: 24,
    name: 'GAUTAM SINGHANIA GLOBAL SCHOOL THANE',
    logo: gsgsLogo,
    category: 'Education',
    icon: GraduationCap,
    color: '#d97706',
    description: 'Innovate & Thrive – A New Era of Education, transforming learning, Gautam Singhania Global School is a dynamic and inclusive learning community with a global perspective, dedicated to shaping future-ready individuals who are academically strong, socially responsible and emotionally intelligent.'
  },
  {
    id: 25,
    name: 'SWAMI VIVEKANAND EDUCATION SOCIETY',
    category: 'Education',
    icon: GraduationCap,
    color: '#f97316',
    description: 'Swami Vivekanand Education Society is a reputed educational group offering comprehensive learning from school to higher education. The website consolidates information across its institutions, including programs, admissions, and events, through a technically efficient and well-structured framework.'
  },
  {
    id: 26,
    name: 'DGET TRUST BED COLLEGE',
    category: 'Higher Education',
    icon: GraduationCap,
    color: '#0284c7',
    description: 'DGET Trust BEd College is an educational hub delivering quality education from KG to PG in Thane. Determined to run institutions professionally, adopting modern advancements in academics and technology to shape individuals into truly global citizens with Indian values.'
  },
  {
    id: 27,
    name: 'PODDAR BRIO COLLEGE OF LAW',
    category: 'Higher Education',
    icon: Scale,
    color: '#1e3a8a',
    description: 'The college website features detailed information about 3-year LL.B and 5-year B.A. LL.B programs, admission process, and infrastructure details like library, moot court, and classrooms. The platform promotes academic excellence, legal education facilities, and student resources with a focus on enrollment and communication through enquiry options.'
  },
  {
    id: 28,
    name: 'DNYAN GANGA COLLEGE OF PHARMACY',
    logo: dnyanGangaLogo,
    category: 'Higher Education',
    icon: GraduationCap,
    color: '#059669',
    description: 'The website provides complete academic details including D.Pharm and B.Pharm programs, admission guidelines, faculty and committees info, exam notifications, and syllabus downloads. It also highlights infrastructure, labs, library, campus events, and includes AICTE, PCI, and DTE links for accreditation compliance.'
  },
  {
    id: 29,
    name: 'NAVODAYA ENGLISH HIGH SCHOOL & JUNIOR COLLEGE',
    category: 'Education',
    icon: GraduationCap,
    color: '#dc2626',
    description: 'Well-designed education system is a blessing of Indian culture. Navodaya Kannada Seva Sangha, the conductors of Navodaya English High School & Junior College, move on with total commitment, enabling to sculpt better citizens, a better society.'
  },
  {
    id: 30,
    name: 'HOLY CROSS ENGLISH MEDIUM SCHOOL',
    category: 'Education',
    icon: GraduationCap,
    color: '#4f46e5',
    description: 'Holy Cross English Medium School, Dombivili, Thane: An English-medium co-educational school offering classes from pre-primary through higher levels, Holy Cross focuses on holistic development in a nurturing environment, emphasizing identifying a child\'s unique strengths via activity-based learning.'
  },
  {
    id: 31,
    name: 'THE LEARNING CURVE INDIA',
    category: 'Preschool',
    icon: GraduationCap,
    color: '#ec4899',
    description: 'The Learning Curve India specializes in early childhood education with a structured preschool and daycare program. The curriculum focuses on cognitive, social, and emotional development through activity-based learning and play-centric pedagogy.'
  },
  {
    id: 32,
    name: 'I3R GLOBAL',
    logo: i3rLogo,
    category: 'Business',
    icon: Globe,
    color: '#0891b2',
    description: 'i3R Global\'s core expertise lies in identifying opportunities, emerging market trends, and leveraging cutting-edge technologies. We facilitate meaningful professional networking and knowledge sharing through face-to-face meetings via live events, digital and hybrid formats.'
  },
  {
    id: 33,
    name: 'AV SOLUTIONS INDIA',
    logo: avLogo,
    category: 'Technology',
    icon: Building2,
    color: '#1e40af',
    description: 'AV Solutions is a leading System Integrator for customized and personalized Audio Video, Home Automation and Control Solutions. AV Solutions has catered its HNI Clients and Educational Institutes with Cinema like Auditorium Experience into their Schools.'
  },
  {
    id: 34,
    name: 'RNP SYDNEY',
    logo: rnpLogo,
    category: 'Real Estate',
    icon: Building2,
    color: '#0f766e',
    description: 'RNP Sydney is a real estate and property development company in Australia offering professional services in property buying, selling, and project consulting. It specializes in home and land packages and end-to-end real estate solutions.'
  },
  {
    id: 35,
    name: 'SMILES ROYALE',
    category: 'Healthcare',
    icon: Stethoscope,
    color: '#059669',
    description: 'We at Smiles Royale are committed to provide our patients with the most innovative and pleasant experience possible. Our team of extremely experienced and knowledgeable doctors believe in creating the right and healthy atmosphere for our patients.'
  },
  {
    id: 36,
    name: "V'SIGN",
    logo: vsignLogo,
    category: 'E-Commerce',
    icon: ShoppingBag,
    color: '#7c3aed',
    description: 'The official website of VSign Pen serves as an e-commerce platform showcasing premium fountain pens, ball pens, and roller pens. It provides detailed product listings with specifications, nib types, and ink-filling mechanisms.'
  },
  {
    id: 37,
    name: 'SKYTECH INDIA',
    logo: skytechLogo,
    category: 'Technology',
    icon: Building2,
    color: '#0369a1',
    description: 'Established in 1993, Skytech Systems (I) Pvt Ltd stands as a pioneering force in the field of analytical instrument distribution in India. We deliver comprehensive solutions that empower researchers and analysts to push the boundaries of knowledge.'
  },
  {
    id: 38,
    name: 'LOTUS LEAF ENTERTAINMENT',
    logo: lotusLogo,
    category: 'Entertainment',
    icon: Globe,
    color: '#db2777',
    description: 'Lotus Leaf Entertainment is the dream child of Meenakshi Khosla. Meenakshi had a strong desire to have a one stop solution for all entertainment events, delivering seamless event organization and management.'
  },
  {
    id: 39,
    name: 'GOEL AND SONS',
    category: 'Transport',
    icon: Building2,
    color: '#15803d',
    description: 'Welcome to our website. Our bus services was started in April 2006 and we are located in Mulund West, Mumbai. We bring along an experience of 18 brilliant years of bus services to school kids.'
  },
  {
    id: 40,
    name: 'VERTICES PARTNERS',
    logo: verticesLogo,
    category: 'Legal',
    icon: Scale,
    color: '#1e3a8a',
    description: 'Vertices Partners is a full-service law firm providing legal solutions in Corporate & Commercial Law, M&A, Private Equity, Venture Capital, Dispute Resolution, and Regulatory Affairs.'
  }
];

const logoClients = [
  { name: 'New Horizon Public School, Panvel', logo: newHorizonPanvel, link: '/educational-institutes/international' },
  { name: 'New Horizon International School, Rodas', logo: newHorizonRodasInt, link: '/educational-institutes/international' },
  { name: 'Ramsheth Thakur Public School, Ulwe', logo: ulweLogo, link: '/educational-institutes/international' },
  { name: 'New Horizon Scholars School, Kavesar, Thane', logo: newHorizonKavesar, link: '/educational-institutes/international' },
  { name: 'New Horizon Scholars School, Airoli (Sector 13)', logo: newHorizonAiroli13, link: '/educational-institutes/international' },
  { name: 'New Horizon Public School, Airoli (Sector 3)', logo: newHorizonAiroli3, link: '/educational-institutes/international' },
  { name: 'New Horizon Scholars School, Vasant Lawns', logo: newHorizonVasant, link: '/educational-institutes/international' },
  { name: 'New Horizon Public School, Airoli (Sector 19)', logo: newHorizonAiroli19, link: '/educational-institutes/international' },
  { name: 'New Horizon Scholars School, Rodas Kolshet', logo: newHorizonRodasKolshet, link: '/educational-institutes/international' },
];

const categoryColors = {
  'Education': '#2563eb',
  'Higher Education': '#7c3aed',
  'Preschool': '#ec4899',
  'Coaching': '#f59e0b',
  'Business': '#0891b2',
  'Technology': '#1e40af',
  'Real Estate': '#0f766e',
  'Healthcare': '#059669',
  'E-Commerce': '#7c3aed',
  'Entertainment': '#db2777',
  'Transport': '#15803d',
  'Legal': '#1e3a8a',
};

const allCategories = ['All', ...new Set(detailedClients.map(c => c.category))];

const CaseStudies = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dynamicStudies, setDynamicStudies] = useState([]);
  const [bannerContent, setBannerContent] = useState(null);
  const breadcrumbs = [{ name: 'Case Studies', path: '/case-studies' }];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${CURRENT_API_BASE}/api/pages/case_studies`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setDynamicStudies(data);
          }
        }
      } catch (err) {
        console.warn('Failed to load dynamic case studies', err);
      }
      try {
        const bannerRes = await fetch(`${CURRENT_API_BASE}/api/pages/banner`);
        if (bannerRes.ok) {
          const bannerData = await bannerRes.json();
          if (bannerData && bannerData.case_studies) {
            setBannerContent(bannerData.case_studies);
          }
        }
      } catch (err) {
        console.warn('Failed to load banner content', err);
      }
    };
    fetchData();

    const handleUpdate = (e) => {
      if (e.detail?.page === 'case_studies' || e.detail?.page === 'banner') {
        fetchData();
      }
    };
    window.addEventListener('cmsPageUpdate', handleUpdate);
    return () => window.removeEventListener('cmsPageUpdate', handleUpdate);
  }, []);

  const mappedDynamic = dynamicStudies.map((ds, index) => {
    // Preserve matching icon/color/logo from detailedClients if available by name
    const match = detailedClients.find(c => c.name?.toLowerCase() === (ds.name || ds.title || ds.client)?.toLowerCase());
    return {
      id: ds.id || match?.id || `dynamic-${index}`,
      name: ds.name || ds.title || ds.client || 'Case Study',
      category: ds.category || match?.category || 'Education',
      icon: match?.icon || GraduationCap,
      color: match?.color || categoryColors[ds.category] || '#2563eb',
      link: ds.link || match?.link || '/contact',
      description: ds.description || ds.challenge || ds.desc || match?.description || ''
    };
  });

  const allCombinedClients = detailedClients;

  const filtered = activeCategory === 'All'
    ? allCombinedClients
    : allCombinedClients.filter(c => c.category === activeCategory);

  return (
    <div style={{ paddingTop: '0px' }}>
      <SEOMeta
        title="Client Case Studies & Success Stories | Host2Unlimited"
        description="Discover Host2Unlimited's partnerships with 35+ educational institutes, colleges, schools, and businesses across Maharashtra. Real results, real growth."
        keywords="case studies, client partnerships, educational institutes marketing, school digital marketing, Mumbai, Maharashtra"
        canonical="https://host2unlimited.com/case-studies"
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
          src={caseStudiesHeroBg}
          alt="Case Studies Hero Background"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, pointerEvents: 'none' }}
        />
        
        <div className="container hero-content-wrapper" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <Breadcrumbs paths={breadcrumbs} />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px', paddingBottom: '80px' }}>

        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px auto' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>{bannerContent?.subtitle || 'Partnerships That Drive Growth'}</span>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            {bannerContent?.title || 'Client Case Studies & Success Stories'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7 }}>
            {bannerContent?.desc || (
              <>Over <strong>35+ educational institutes, colleges, schools, and businesses</strong> across Maharashtra trust Host2Unlimited as their strategic digital growth partner.</>
            )}
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {[
            { value: '35+', label: 'Partner Clients' },
            { value: '16+', label: 'Years Experience' },
            { value: '300+', label: 'Campaigns Executed' },
            { value: '70+', label: 'Team Members' }
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-glass"
              style={{ textAlign: 'center', padding: '24px 16px' }}
            >
              <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--primary)', display: 'block', letterSpacing: '-1px' }}>{s.value}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '48px' }}>
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '30px',
                border: activeCategory === cat ? 'none' : '1px solid var(--border-color)',
                backgroundColor: activeCategory === cat ? 'var(--primary)' : 'var(--bg-secondary)',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clean Modern Premium Case Study Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px', marginBottom: '80px' }}>
          {filtered.map((client, idx) => {
            const Icon = client.icon || Building2;
            return (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (idx % 6) * 0.06 }}
                style={{ height: '100%' }}
              >
                <div className="case-study-card">
                  {/* Top 4px gradient accent line */}
                  <div style={{
                    height: '4px',
                    width: '100%',
                    background: 'linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)'
                  }} />

                  {/* Circle Logo Badge */}
                  <div className="case-study-logo-circle">
                    {client.logo ? (
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                        <Icon size={30} />
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div style={{ padding: '0 24px 24px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center' }}>
                    <div>
                      {/* Category Pill */}
                      <span className="case-study-card-badge">
                        {client.category || 'Education Sector'}
                      </span>

                      {/* Card Title */}
                      <h3 style={{ 
                        fontSize: '17px', 
                        fontWeight: 800, 
                        color: 'var(--text-primary)',
                        marginBottom: '10px', 
                        lineHeight: 1.35,
                        textAlign: 'center'
                      }}>
                        {client.name}
                      </h3>

                      {/* Description */}
                      <p style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: '13.5px', 
                        lineHeight: 1.6, 
                        margin: '0 0 16px 0', 
                        textAlign: 'center'
                      }}>
                        {client.description}
                      </p>
                    </div>

                    {/* Clean Bootstrap-Style Vice Versa Outline CTA Button */}
                    {client.hasDetailPage !== false && (
                      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color)', marginTop: 'auto', textAlign: 'center' }}>
                        <Link 
                          to={client.slug ? `/${client.slug}` : `/case-studies/${client.id}`}
                          className="case-study-btn-outline"
                        >
                          Read Full Case Study
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* New Horizon Partner Schools Grid - Clickable */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="badge" style={{ marginBottom: '10px' }}>Exclusive Multi-School Partnership</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>New Horizon Group of Schools</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '10px' }}>
              Proud digital marketing partner for the entire New Horizon Group network across Mumbai &amp; Thane.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
            {logoClients.map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(37, 99, 235, 0.18)' }}
                style={{ borderRadius: '14px', overflow: 'hidden' }}
              >
                <Link
                  to={client.link}
                  className="card-glass"
                  style={{
                    padding: '20px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    borderRadius: '14px',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ width: '46px', height: '46px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                    <img src={client.logo} alt={client.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, flexGrow: 1 }}>{client.name}</span>
                  <ArrowRight size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className="card-glass dark-cta-banner"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #2563eb 100%)',
            padding: '60px 40px',
            borderRadius: '24px',
            textAlign: 'center',
            color: 'white',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            boxShadow: '0 25px 60px rgba(37, 99, 235, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
            <path d="M-100 200 C100 100, 300 300, 500 100 C700 200, 900 50, 1100 250" fill="none" stroke="#60a5fa" strokeWidth="6" />
          </svg>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span className="badge" style={{ backgroundColor: 'rgba(96, 165, 250, 0.2)', color: '#93c5fd', border: '1px solid rgba(147, 197, 253, 0.4)', marginBottom: '16px', display: 'inline-block' }}>
              🤝 YOUR INSTITUTE COULD BE NEXT
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 900, marginBottom: '14px', lineHeight: 1.3 }}>
              Ready to Be Our Next Success Story?
            </h2>
            <p style={{ color: 'rgba(226, 232, 240, 0.9)', fontSize: '15.5px', maxWidth: '600px', margin: '0 auto 28px auto', lineHeight: 1.7 }}>
              Join 35+ institutes and businesses across Maharashtra who trust Host2Unlimited for admissions marketing, branding, and digital growth.
            </p>
            <Link to="/contact" className="btn" style={{ backgroundColor: '#fff', color: '#2563eb', fontWeight: 800, padding: '16px 36px', fontSize: '15px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Enquire Now 🚀
            </Link>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .case-grid { grid-template-columns: 1fr !important; }
        }
      ` }} />
    </div>
  );
};

export default CaseStudies;
