import React from 'react';

// Import brand logos
import logo01 from '../assets/h2u logos/470d6319b7e082b743eebb72679dd576-e1757952610616.jpg';
import logo02 from '../assets/h2u logos/ardent_tutorials_thane.png';
import logo03 from '../assets/h2u logos/armiet_logo.jpeg';
import logo04 from '../assets/h2u logos/av-solution-logo.png';
import logo05 from '../assets/h2u logos/bms-kiddds (1).png';
import logo06 from '../assets/h2u logos/DG-bed-logo (1).png';
import logo07 from '../assets/h2u logos/DNYAN_GANGA_EDUCATION_TRUST_S-removebg-preview-e1750267686501 (1).webp';
import logo08 from '../assets/h2u logos/dr-pillai-global-academy.png';
import logo09 from '../assets/h2u logos/euro_kids.jpeg';
import logo10 from '../assets/h2u logos/GSGS-logo@4x (1).png';
import logo11 from '../assets/h2u/host2new-contact-page-01 (1).png';
import logo12 from '../assets/h2u logos/i3globle-logo.png';
import logo13 from '../assets/h2u logos/international-travel-tour-co-logo.png';
import logo14 from '../assets/h2u logos/law-college-logo_03-logo-and-name-m2Wqob7oxVH14090 (1).avif';
import logo15 from '../assets/h2u logos/lotusleafentertainment-logo.png';
import logo16 from '../assets/h2u logos/new-horizon-International-school-Rodas.png';
import logo17 from '../assets/h2u logos/New-Horizon-logo.png';
import logo18 from '../assets/h2u logos/new-horizon-public-school-airoli-Sector-19.png';
import logo19 from '../assets/h2u logos/new-horizon-public-school-airoli-Sector-3.png';
import logo20 from '../assets/h2u logos/new-horizon-public-school-panvel.png';
import logo21 from '../assets/h2u logos/new-horizon-scholars-school-airoli-sector-13.png';
import logo22 from '../assets/h2u logos/new-horizon-scholars-school-kavesar-thane.png';
import logo23 from '../assets/h2u logos/new-horizon-scholars-school-Rodas-Kolshet.png';
import logo24 from '../assets/h2u logos/new-horizon-scholars-school-Vasant-Lawns (1).png';
import logo25 from '../assets/h2u logos/New-Project.png';
import logo26 from '../assets/h2u/RAM-SIR-01-1.png';
import logo27 from '../assets/h2u logos/RNP_Logo-1.webp';
import logo28 from '../assets/h2u logos/skytech-logo.png';
import logo29 from '../assets/h2u logos/somaiya_college.png';
import logo30 from '../assets/h2u logos/swami_vivekananda.jpg';
import logo31 from '../assets/h2u logos/Ulwe-logo (1).png';
import logo32 from '../assets/h2u logos/uudaan-montessori-preschool.jpg';
import logo33 from '../assets/h2u logos/Vertices-Partners_logo (1).svg';
import logo34 from '../assets/h2u logos/V-Sign-logo.png';

const clientLogos = [
  logo01, logo02, logo03, logo04, logo05, logo06, logo07, logo08, logo09, logo10,
  logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20,
  logo21, logo22, logo23, logo24, logo25, logo27, logo28, logo29, logo30,
  logo31, logo32, logo33, logo34
];

const TrustedBrands = () => {
  return (
    <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', backgroundColor: '#ffffff', padding: '40px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 800, color: '#0284c7', textAlign: 'center', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>
            TRUSTED BY BRANDS
          </h2>
        </div>

        <div className="carousel-track-container" style={{ overflow: 'hidden', padding: '15px 0' }}>
          <div className="carousel-track">
            {clientLogos.concat(clientLogos).map((logo, idx) => (
              <div key={idx} className="carousel-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '140px', height: '120px', padding: '0 12px', flexShrink: 0 }}>
                <img 
                  src={logo} 
                  alt="Trusted Brand Logo" 
                  style={{ width: 'auto', height: 'auto', maxHeight: '100px', maxWidth: '160px', objectFit: 'contain', transition: 'all 0.3s ease' }} 
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
