import React, { useState, useEffect } from 'react';
import { useLeads } from '../context/LeadContext';
import { Calculator as CalcIcon, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

const Calculator = () => {
  const { addLead } = useLeads();
  const [pages, setPages] = useState(5);
  const [features, setFeatures] = useState({
    blog: false,
    seo: false,
    adminPanel: false,
    bookingSystem: false,
    paymentGateway: false,
    whatsApp: false,
  });

  const [costRange, setCostRange] = useState({ min: 0, max: 0 });
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  
  // Submit Form details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Pricing calculation logic
    let basePrice = 10000;
    let baseDays = 5;

    // Page calculations
    basePrice += pages * 1500;
    baseDays += Math.ceil(pages / 5) * 2;

    // Feature toggles
    if (features.blog) {
      basePrice += 6000;
      baseDays += 3;
    }
    if (features.seo) {
      basePrice += 4000;
      baseDays += 2;
    }
    if (features.adminPanel) {
      basePrice += 15000;
      baseDays += 5;
    }
    if (features.bookingSystem) {
      basePrice += 10000;
      baseDays += 4;
    }
    if (features.paymentGateway) {
      basePrice += 8000;
      baseDays += 3;
    }
    if (features.whatsApp) {
      basePrice += 2500;
      baseDays += 1;
    }

    const min = basePrice;
    const max = Math.ceil(basePrice * 1.25);
    setCostRange({ min, max });
    setDeliveryTime(baseDays);
  }, [pages, features]);

  const handleCheckboxChange = (key) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    // Compile lead text details
    const selectedFeaturesStr = Object.keys(features)
      .filter((k) => features[k])
      .map((k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()))
      .join(', ');

    const projectDetails = `Calculator Estimate. Pages: ${pages}. Features: ${selectedFeaturesStr || 'None'}. Estimated cost: ₹${costRange.min.toLocaleString()} - ₹${costRange.max.toLocaleString()}. Est Delivery: ${deliveryTime} Days.`;

    addLead({
      name: formData.name,
      companyName: 'Calculator Estimate',
      email: formData.email,
      phone: formData.phone,
      service: 'Website Development (Calculator)',
      budget: `₹${costRange.min.toLocaleString()} – ₹${costRange.max.toLocaleString()}`,
      details: projectDetails
    });

    setSubmitted(true);
  };

  const resetCalculator = () => {
    setPages(5);
    setFeatures({
      blog: false,
      seo: false,
      adminPanel: false,
      bookingSystem: false,
      paymentGateway: false,
      whatsApp: false,
    });
    setFormData({ name: '', email: '', phone: '' });
    setSubmitted(false);
  };

  return (
    <div className="card-glass" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }} className="calc-grid">
        
        {/* Selection side */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CalcIcon size={20} className="text-gradient" /> Select Project Details
          </h3>
          
          {/* Page slider */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="form-label" style={{ margin: 0 }}>Number of Pages</span>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{pages} Pages</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={pages} 
              onChange={(e) => setPages(parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                background: 'var(--border-color)',
                outline: 'none',
                cursor: 'pointer',
                accentColor: 'var(--primary)'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1 Page</span>
              <span>25 Pages</span>
              <span>50 Pages</span>
            </div>
          </div>

          {/* Add-ons checkboxes */}
          <div style={{ marginBottom: '10px' }}>
            <label className="form-label" style={{ marginBottom: '15px' }}>Optional Modules</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="calc-checkbox-grid">
              
              {[
                { key: 'blog', label: 'Blog Module' },
                { key: 'seo', label: 'Advanced SEO' },
                { key: 'adminPanel', label: 'Admin Dashboard' },
                { key: 'bookingSystem', label: 'Booking System' },
                { key: 'paymentGateway', label: 'Payment Gateway' },
                { key: 'whatsApp', label: 'WhatsApp Integration' }
              ].map((feat) => (
                <label 
                  key={feat.key} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 20px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid',
                    borderColor: features[feat.key] ? 'var(--primary)' : 'var(--border-color)',
                    backgroundColor: features[feat.key] ? 'var(--primary-light)' : 'var(--bg-secondary)',
                    boxShadow: features[feat.key] ? '0 4px 12px rgba(14, 165, 233, 0.15)' : 'none',
                    cursor: 'pointer',
                    transition: 'all var(--transition-normal)',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    color: features[feat.key] ? 'var(--primary)' : 'var(--text-primary)'
                  }}
                  className="calc-option-card"
                >
                  <input 
                    type="checkbox" 
                    checked={features[feat.key]} 
                    onChange={() => handleCheckboxChange(feat.key)}
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '5px',
                    border: `2px solid ${features[feat.key] ? 'var(--primary)' : 'var(--text-muted)'}`,
                    backgroundColor: features[feat.key] ? 'var(--primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    transition: 'all var(--transition-fast)',
                    flexShrink: 0
                  }}>
                    {features[feat.key] && '✓'}
                  </div>
                  {feat.label}
                </label>
              ))}
              
            </div>
          </div>
        </div>

        {/* Display and submission side */}
        <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="calc-results-side">
          {!submitted ? (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>Estimated Cost</h3>
              
              {/* Pricing banner */}
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px', textAlign: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Estimated Investment</span>
                <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }} className="text-gradient">
                  ₹{costRange.min.toLocaleString()} - ₹{costRange.max.toLocaleString()}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <Calendar size={16} />
                  <span>Timeline: <strong>{deliveryTime} - {deliveryTime + 3} Days</strong></span>
                </div>
              </div>

              {/* Instant Quote Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', textAlign: 'left' }}>
                  Submit details to book a free consultation and locked-in price quote.
                </span>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  style={{ padding: '10px' }}
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  required 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  style={{ padding: '10px' }}
                />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone Number" 
                  required 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  style={{ padding: '10px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '14px', marginTop: '6px' }}>
                  Request Proposal <ChevronRight size={16} />
                </button>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '20px 0' }}>
              <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>Quote Requested!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                Thank you, <strong>{formData.name}</strong>. We have logged your specs and sent a briefing to our developers. We will contact you at <strong>{formData.email}</strong> within 4 hours.
              </p>
              
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', fontSize: '12px', border: '1px solid var(--border-color)', marginBottom: '24px', textAlign: 'left' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>Automations Triggered (Local Test):</strong>
                • Lead written to Google Sheets row.<br />
                • Admin email alert queued.<br />
                • Acknowledgement email sent to {formData.email}.
              </div>

              <button onClick={resetCalculator} className="btn btn-secondary" style={{ width: '100%', padding: '10px' }}>
                Recalculate
              </button>
            </div>
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .calc-results-side {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--border-color);
            padding-top: 30px;
          }
        }
        @media (max-width: 480px) {
          .calc-checkbox-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Calculator;
