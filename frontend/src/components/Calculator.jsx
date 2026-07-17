import React, { useState, useEffect } from 'react';
import { useLeads } from '../context/LeadContext';
import { Calculator as CalcIcon, Calendar, CheckCircle2, ChevronRight, Check } from 'lucide-react';

const Calculator = () => {
  const { addLead } = useLeads();
  const [calcTab, setCalcTab] = useState('web'); // 'web' | 'webapp' | 'marketing'

  // ==========================================
  // WEBSITE CALCULATOR STATE
  // ==========================================
  const [pages, setPages] = useState(5);
  const [features, setFeatures] = useState({
    blog: false,
    seo: false,
    bookingSystem: false,
    whatsApp: false,
    contactForms: false,
  });
  const [costRange, setCostRange] = useState({ min: 0, max: 0 });
  const [deliveryTime, setDeliveryTime] = useState(0);

  // ==========================================
  // WEB APP CALCULATOR STATE
  // ==========================================
  const [appArchetype, setAppArchetype] = useState('ecommerce'); // 'ecommerce', 'cms', 'saas', 'crmerp'
  const [appFeatures, setAppFeatures] = useState({
    adminDashboard: false,
    paymentGateway: false,
    authRoles: false,
    realtimeMessaging: false,
    apiSync: false,
    cloudStorage: false,
  });
  const [appCostRange, setAppCostRange] = useState({ min: 0, max: 0 });
  const [appDeliveryTime, setAppDeliveryTime] = useState(0);

  // ==========================================
  // MARKETING CALCULATOR STATE
  // ==========================================
  const [marketingPosts, setMarketingPosts] = useState(0); // 0, 4, 8, 12, 15, 20, 25, 30, 60
  const [shootDays, setShootDays] = useState(0); // 0, 1, 2, 3, 4, 8, 15
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    facebook: false,
    instagram: false,
    gmb: false,
    xtwitter: false,
    linkedin: false,
    youtube: false
  });
  const [retainerServices, setRetainerServices] = useState({
    maintenance: false,
    seo: false,
    orm: false,
    whatsapp: false
  });
  const [adChannels, setAdChannels] = useState({
    metaAds: false,
    googleAds: false
  });
  const [adBudgetIndex, setAdBudgetIndex] = useState(0);
  const [adDuration, setAdDuration] = useState('1 Month'); // '1 Month', '3 Months', '6 Months', '1 Year'
  const [marketingCostRange, setMarketingCostRange] = useState({ min: 0, max: 0 });

  const adBudgets = [0, 5000, 10000, 25000, 50000, 100000, 200000, 300000, 500000];
  const adBudgetLabels = ['None', '₹5K', '₹10K', '₹25K', '₹50K', '₹1L', '₹2L', '₹3L', '₹5L'];

  // ==========================================
  // FORM & SUBMISSION STATE
  // ==========================================
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Website calculation rules
  useEffect(() => {
    let basePrice = 10000;
    let baseDays = 5;

    basePrice += pages * 1500;
    baseDays += Math.ceil(pages / 5) * 2;

    if (features.blog) { basePrice += 6000; baseDays += 3; }
    if (features.seo) { basePrice += 4000; baseDays += 2; }
    if (features.bookingSystem) { basePrice += 10000; baseDays += 4; }
    if (features.whatsApp) { basePrice += 2500; baseDays += 1; }
    if (features.contactForms) { basePrice += 2000; baseDays += 1; }

    const min = basePrice;
    const max = Math.ceil(basePrice * 1.15);
    setCostRange({ min, max });
    setDeliveryTime(baseDays);
  }, [pages, features]);

  // Web App calculation rules
  const archetypePricing = {
    ecommerce: { price: 35000, days: 20 },
    cms: { price: 4000, days: 25 }, // Custom CMS Portal base
    saas: { price: 60000, days: 35 },
    crmerp: { price: 80000, days: 45 }
  };

  useEffect(() => {
    const activeArch = archetypePricing[appArchetype] || { price: 30000, days: 20 };
    let basePrice = activeArch.price;
    let baseDays = activeArch.days;

    if (appFeatures.adminDashboard) { basePrice += 15000; baseDays += 5; }
    if (appFeatures.paymentGateway) { basePrice += 8000; baseDays += 3; }
    if (appFeatures.authRoles) { basePrice += 6000; baseDays += 3; }
    if (appFeatures.realtimeMessaging) { basePrice += 10000; baseDays += 4; }
    if (appFeatures.apiSync) { basePrice += 12000; baseDays += 5; }
    if (appFeatures.cloudStorage) { basePrice += 5000; baseDays += 2; }

    setAppCostRange({
      min: basePrice,
      max: Math.ceil(basePrice * 1.15)
    });
    setAppDeliveryTime(baseDays);
  }, [appArchetype, appFeatures]);

  // Marketing calculation rules (Exact matching of notebook image)
  const postPricing = { 0: 0, 4: 5000, 8: 8000, 12: 10000, 15: 12000, 20: 14000, 25: 16000, 30: 18000, 60: 20000 };
  const shootPricing = { 0: 0, 1: 6000, 2: 10000, 3: 15000, 4: 20000, 8: 35000, 15: 50000 };
  const platformPricing = { facebook: 4000, instagram: 4000, gmb: 3000, xtwitter: 4000, linkedin: 5000, youtube: 5000 };
  const retainerPricing = { maintenance: 10000, seo: 10000, orm: 15000, whatsapp: 5000 };

  useEffect(() => {
    let monthlyTotal = 0;

    // 1. Social media posts cost
    monthlyTotal += postPricing[marketingPosts] || 0;

    // 2. Shoot days cost
    monthlyTotal += shootPricing[shootDays] || 0;

    // 3. Platform management cost
    Object.keys(selectedPlatforms).forEach((p) => {
      if (selectedPlatforms[p]) {
        monthlyTotal += platformPricing[p] || 0;
      }
    });

    // 4. Retainer services cost
    Object.keys(retainerServices).forEach((r) => {
      if (retainerServices[r]) {
        monthlyTotal += retainerPricing[r] || 0;
      }
    });

    // 5. Ad Management flat fees + budget percent management fee
    let adFee = 0;
    if (adChannels.metaAds) adFee += 4000;
    if (adChannels.googleAds) adFee += 4000;
    
    // Add 10% of ad spend budget as campaign management retainer
    const activeAdBudget = adBudgets[adBudgetIndex];
    if (activeAdBudget > 0 && (adChannels.metaAds || adChannels.googleAds)) {
      adFee += Math.ceil(activeAdBudget * 0.10);
    }
    
    monthlyTotal += adFee;

    // Contract term discounts (apply only to agencies retainers, not direct ad spend)
    let discountMultiplier = 1;
    if (adDuration === '3 Months') discountMultiplier = 0.95; // 5% discount
    else if (adDuration === '6 Months') discountMultiplier = 0.90; // 10% discount
    else if (adDuration === '1 Year') discountMultiplier = 0.85; // 15% discount
    
    monthlyTotal = Math.ceil(monthlyTotal * discountMultiplier);

    setMarketingCostRange({
      min: monthlyTotal,
      max: Math.ceil(monthlyTotal * 1.12)
    });
  }, [marketingPosts, shootDays, selectedPlatforms, retainerServices, adChannels, adBudgetIndex, adDuration]);

  // Handle checkboxes
  const handleWebCheckboxChange = (key) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAppCheckboxChange = (key) => {
    setAppFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePlatformCheckboxChange = (key) => {
    setSelectedPlatforms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRetainerCheckboxChange = (key) => {
    setRetainerServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Lead
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    let projectDetails = '';
    let budgetStr = '';
    let serviceStr = '';

    if (calcTab === 'web') {
      const selectedFeaturesStr = Object.keys(features)
        .filter((k) => features[k])
        .map((k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()))
        .join(', ');

      projectDetails = `Calculator Web Estimate. Pages: ${pages}. Modules: ${selectedFeaturesStr || 'None'}. Estimate: ₹${costRange.min.toLocaleString()} - ₹${costRange.max.toLocaleString()}. Timeline: ${deliveryTime} Days.`;
      budgetStr = `₹${costRange.min.toLocaleString()} – ₹${costRange.max.toLocaleString()}`;
      serviceStr = 'Website Development (Calculator)';
    } else if (calcTab === 'webapp') {
      const selectedFeaturesStr = Object.keys(appFeatures)
        .filter((k) => appFeatures[k])
        .map((k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()))
        .join(', ');

      projectDetails = `Calculator Web App Estimate. Archetype: ${appArchetype.toUpperCase()}. Modules: ${selectedFeaturesStr || 'None'}. Estimate: ₹${appCostRange.min.toLocaleString()} - ₹${appCostRange.max.toLocaleString()}. Timeline: ${appDeliveryTime} Days.`;
      budgetStr = `₹${appCostRange.min.toLocaleString()} – ₹${appCostRange.max.toLocaleString()}`;
      serviceStr = 'Web App/Software Development (Calculator)';
    } else {
      const platformsStr = Object.keys(selectedPlatforms)
        .filter((p) => selectedPlatforms[p])
        .map((p) => p.toUpperCase())
        .join(', ');

      const retainersStr = Object.keys(retainerServices)
        .filter((r) => retainerServices[r])
        .map((r) => r.toUpperCase())
        .join(', ');

      const adsStr = Object.keys(adChannels)
        .filter((a) => adChannels[a])
        .map((a) => a === 'metaAds' ? 'Meta Ads' : 'Google Ads')
        .join(', ');

      projectDetails = `Calculator Marketing Estimate. Posts: ${marketingPosts}/mo. Shoots: ${shootDays} days. Platforms: ${platformsStr || 'None'}. Retainers: ${retainersStr || 'None'}. Ads: ${adsStr || 'None'}. Ad Budget: ₹${adBudgets[adBudgetIndex].toLocaleString()}/mo. Contract: ${adDuration}. Retainer Est: ₹${marketingCostRange.min.toLocaleString()} - ₹${marketingCostRange.max.toLocaleString()}/month.`;
      budgetStr = `₹${marketingCostRange.min.toLocaleString()} – ₹${marketingCostRange.max.toLocaleString()} / month (plus Ad spend)`;
      serviceStr = 'Digital Marketing Services (Calculator)';
    }

    addLead({
      name: formData.name,
      companyName: `Calculator Estimate (${calcTab.toUpperCase()})`,
      email: formData.email,
      phone: formData.phone,
      service: serviceStr,
      budget: budgetStr,
      details: projectDetails
    });

    // Send email alert via Web3Forms
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "17ec246a-7f1e-44f9-b8e4-ea3625b2cb01",
          subject: `New Calculator Lead: ${serviceStr}`,
          from_name: "Host2Unlimited Calculator",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: `Calculator Estimate (${calcTab.toUpperCase()})`,
          service: serviceStr,
          budget: budgetStr,
          message: projectDetails
        })
      });
    } catch (err) {
      console.warn("Web3Forms lead email delivery failed:", err);
    }

    setSubmitted(true);
  };

  // Reset Form
  const resetCalculator = () => {
    setPages(5);
    setFeatures({ blog: false, seo: false, bookingSystem: false, whatsApp: false, contactForms: false });
    setAppArchetype('ecommerce');
    setAppFeatures({ adminDashboard: false, paymentGateway: false, authRoles: false, realtimeMessaging: false, apiSync: false, cloudStorage: false });
    setMarketingPosts(0);
    setShootDays(0);
    setSelectedPlatforms({ facebook: false, instagram: false, gmb: false, xtwitter: false, linkedin: false, youtube: false });
    setRetainerServices({ maintenance: false, seo: false, orm: false, whatsapp: false });
    setAdChannels({ metaAds: false, googleAds: false });
    setAdBudgetIndex(0);
    setAdDuration('1 Month');
    setFormData({ name: '', email: '', phone: '' });
    setSubmitted(false);
  };

  return (
    <div className="card-glass" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px' }}>
      
      {/* Switcher Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '35px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => { setCalcTab('web'); setSubmitted(false); }}
          className={`btn ${calcTab === 'web' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '13px', padding: '8px 20px', borderRadius: '20px' }}
        >
          💻 Website Calculator
        </button>
        <button 
          onClick={() => { setCalcTab('webapp'); setSubmitted(false); }}
          className={`btn ${calcTab === 'webapp' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '13px', padding: '8px 20px', borderRadius: '20px' }}
        >
          ⚙️ Web App Calculator
        </button>
        <button 
          onClick={() => { setCalcTab('marketing'); setSubmitted(false); }}
          className={`btn ${calcTab === 'marketing' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ fontSize: '13px', padding: '8px 20px', borderRadius: '20px' }}
        >
          📣 Digital Marketing Calculator
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '40px' }} className="calc-grid">
        
        {/* Left Side Inputs */}
        <div style={{ textAlign: 'left' }}>
          
          {calcTab === 'web' && (
            // ==========================================
            // WEBSITE CALCULATOR FORM VIEW
            // ==========================================
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalcIcon size={18} className="text-gradient" /> Configure Informational Website
              </h3>
              
              {/* Pages Slider */}
              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="form-label" style={{ margin: 0, fontWeight: 700 }}>Number of Pages</span>
                  <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{pages} Pages</span>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>1 Page</span>
                  <span>25 Pages</span>
                  <span>50 Pages</span>
                </div>
              </div>

              {/* Add-ons checkboxes */}
              <div>
                <label className="form-label" style={{ marginBottom: '15px', fontWeight: 700 }}>Core Features Checklist</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="calc-checkbox-grid">
                  {[
                    { key: 'blog', label: 'Blog Module (+₹6,000)' },
                    { key: 'seo', label: 'Advanced SEO Setup (+₹4,000)' },
                    { key: 'bookingSystem', label: 'Booking System (+₹10,000)' },
                    { key: 'whatsApp', label: 'WhatsApp Chat Integration (+₹2,500)' },
                    { key: 'contactForms', label: 'Contact Enquiry Forms (+₹2,000)' }
                  ].map((feat) => (
                    <label 
                      key={feat.key} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid',
                        borderColor: features[feat.key] ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: features[feat.key] ? 'var(--primary-light)' : 'var(--bg-secondary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-normal)',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: features[feat.key] ? 'var(--primary)' : 'var(--text-primary)'
                      }}
                      className="calc-option-card"
                    >
                      <input 
                        type="checkbox" 
                        checked={features[feat.key]} 
                        onChange={() => handleWebCheckboxChange(feat.key)}
                        style={{ display: 'none' }}
                      />
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        border: `2px solid ${features[feat.key] ? 'var(--primary)' : 'var(--text-muted)'}`,
                        backgroundColor: features[feat.key] ? 'var(--primary)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 'bold',
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
          )}

          {calcTab === 'webapp' && (
            // ==========================================
            // WEB APP CALCULATOR FORM VIEW
            // ==========================================
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalcIcon size={18} className="text-gradient" /> Configure Web App / Portal
              </h3>

              {/* Select Archetype */}
              <div style={{ marginBottom: '24px' }}>
                <label className="form-label" style={{ fontWeight: 700, marginBottom: '8px' }}>Select Web App Base</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="calc-checkbox-grid">
                  {[
                    { key: 'ecommerce', label: 'E-Commerce Store (₹35,000 base)' },
                    { key: 'cms', label: 'Content Management Portal (₹40,000 base)' },
                    { key: 'saas', label: 'SaaS MVP System (₹60,000 base)' },
                    { key: 'crmerp', label: 'Custom CRM / ERP Software (₹80,000 base)' }
                  ].map((arch) => (
                    <label 
                      key={arch.key}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid',
                        borderColor: appArchetype === arch.key ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: appArchetype === arch.key ? 'var(--primary-light)' : 'var(--bg-secondary)',
                        color: appArchetype === arch.key ? 'var(--primary)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}
                    >
                      <input 
                        type="radio" 
                        name="appArchetype"
                        value={arch.key}
                        checked={appArchetype === arch.key}
                        onChange={() => setAppArchetype(arch.key)}
                        style={{ display: 'none' }}
                      />
                      {arch.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Add-ons Checkboxes */}
              <div>
                <label className="form-label" style={{ marginBottom: '15px', fontWeight: 700 }}>Custom Functional Add-ons</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="calc-checkbox-grid">
                  {[
                    { key: 'adminDashboard', label: 'React Admin Dashboard (+₹15,000)' },
                    { key: 'paymentGateway', label: 'Payment Gateway Integration (+₹8,000)' },
                    { key: 'authRoles', label: 'User Roles & Permissions (+₹6,000)' },
                    { key: 'realtimeMessaging', label: 'Real-Time Messaging System (+₹10,000)' },
                    { key: 'apiSync', label: '3rd-Party API Syncing (+₹12,000)' },
                    { key: 'cloudStorage', label: 'Cloud File Upload / CDN (+₹5,000)' }
                  ].map((feat) => (
                    <label 
                      key={feat.key} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        border: '2px solid',
                        borderColor: appFeatures[feat.key] ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: appFeatures[feat.key] ? 'var(--primary-light)' : 'var(--bg-secondary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-normal)',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: appFeatures[feat.key] ? 'var(--primary)' : 'var(--text-primary)'
                      }}
                      className="calc-option-card"
                    >
                      <input 
                        type="checkbox" 
                        checked={appFeatures[feat.key]} 
                        onChange={() => handleAppCheckboxChange(feat.key)}
                        style={{ display: 'none' }}
                      />
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        border: `2px solid ${appFeatures[feat.key] ? 'var(--primary)' : 'var(--text-muted)'}`,
                        backgroundColor: appFeatures[feat.key] ? 'var(--primary)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {appFeatures[feat.key] && '✓'}
                      </div>
                      {feat.label}
                    </label>
                  ))}
                </div>
              </div>

            </div>
          )}

          {calcTab === 'marketing' && (
            // ==========================================
            // MARKETING CALCULATOR FORM VIEW
            // ==========================================
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalcIcon size={18} className="text-gradient" /> Configure Marketing Scope
              </h3>

              {/* Row 1: Select dropdowns for posts and shoots */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="calc-checkbox-grid">
                <div>
                  <label className="form-label" style={{ fontWeight: 700, marginBottom: '6px', fontSize: '13px' }}>Monthly Social Media Posts</label>
                  <select 
                    value={marketingPosts}
                    onChange={(e) => setMarketingPosts(parseInt(e.target.value))}
                    className="form-control"
                    style={{ height: '38px', padding: '0 10px', fontSize: '13.5px' }}
                  >
                    <option value={0}>None</option>
                    <option value={4}>4 Posts (₹5,000/mo)</option>
                    <option value={8}>8 Posts (₹8,000/mo)</option>
                    <option value={12}>12 Posts (₹10,000/mo)</option>
                    <option value={15}>15 Posts (₹12,000/mo)</option>
                    <option value={20}>20 Posts (₹14,000/mo)</option>
                    <option value={25}>25 Posts (₹16,000/mo)</option>
                    <option value={30}>30 Posts (₹18,000/mo)</option>
                    <option value={60}>60 Posts (₹20,000/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: 700, marginBottom: '6px', fontSize: '13px' }}>Photoshoot / Video Shoots</label>
                  <select 
                    value={shootDays}
                    onChange={(e) => setShootDays(parseInt(e.target.value))}
                    className="form-control"
                    style={{ height: '38px', padding: '0 10px', fontSize: '13.5px' }}
                  >
                    <option value={0}>None</option>
                    <option value={1}>1 Day / Month (₹6,000)</option>
                    <option value={2}>2 Days / Month (₹10,000)</option>
                    <option value={3}>3 Days / Month (₹15,000)</option>
                    <option value={4}>4 Days / Month (₹20,000)</option>
                    <option value={8}>8 Days / Month (₹35,000)</option>
                    <option value={15}>15 Days / Month (₹50,000)</option>
                  </select>
                </div>
              </div>

              {/* Platform Management Checkboxes */}
              <div>
                <label className="form-label" style={{ fontWeight: 700, marginBottom: '10px', fontSize: '13px' }}>Social Media Channels Management</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {[
                    { key: 'facebook', label: 'Facebook (₹4,000)' },
                    { key: 'instagram', label: 'Instagram (₹4,000)' },
                    { key: 'gmb', label: 'GMB (₹3,000)' },
                    { key: 'xtwitter', label: 'X Twitter (₹4,000)' },
                    { key: 'linkedin', label: 'LinkedIn (₹5,000)' },
                    { key: 'youtube', label: 'YouTube (₹5,000)' }
                  ].map((plat) => (
                    <label 
                      key={plat.key} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: selectedPlatforms[plat.key] ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: selectedPlatforms[plat.key] ? 'var(--primary-light)' : 'var(--bg-secondary)',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: selectedPlatforms[plat.key] ? 'var(--primary)' : 'var(--text-primary)'
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedPlatforms[plat.key]} 
                        onChange={() => handlePlatformCheckboxChange(plat.key)}
                        style={{ display: 'none' }}
                      />
                      <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '1.5px solid', borderColor: selectedPlatforms[plat.key] ? 'var(--primary)' : 'var(--text-muted)', backgroundColor: selectedPlatforms[plat.key] ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '9px', flexShrink: 0 }}>
                        {selectedPlatforms[plat.key] && '✓'}
                      </div>
                      {plat.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Monthly Retainers Checklist */}
              <div>
                <label className="form-label" style={{ fontWeight: 700, marginBottom: '10px', fontSize: '13px' }}>Operations & Retainer Modules</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="calc-checkbox-grid">
                  {[
                    { key: 'maintenance', label: 'Website Maintenance (₹10,000/mo)' },
                    { key: 'seo', label: 'Search Engine Optimization (₹10,000/mo)' },
                    { key: 'orm', label: 'Online Reputation Management (₹15,000/mo)' },
                    { key: 'whatsapp', label: 'WhatsApp Marketing (₹5,000/mo)' }
                  ].map((ret) => (
                    <label 
                      key={ret.key} 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: retainerServices[ret.key] ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: retainerServices[ret.key] ? 'var(--primary-light)' : 'var(--bg-secondary)',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: retainerServices[ret.key] ? 'var(--primary)' : 'var(--text-primary)'
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={retainerServices[ret.key]} 
                        onChange={() => handleRetainerCheckboxChange(ret.key)}
                        style={{ display: 'none' }}
                      />
                      <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '1.5px solid', borderColor: retainerServices[ret.key] ? 'var(--primary)' : 'var(--text-muted)', backgroundColor: retainerServices[ret.key] ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '9px', flexShrink: 0 }}>
                        {retainerServices[ret.key] && '✓'}
                      </div>
                      {ret.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Paid Ad and Term Duration Switcher */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="calc-checkbox-grid">
                <div>
                  <label className="form-label" style={{ fontWeight: 700, marginBottom: '10px', fontSize: '13px' }}>Paid Ads Management</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { key: 'metaAds', label: 'Meta Ads setup & optimization' },
                      { key: 'googleAds', label: 'Google Ads setup & optimization' }
                    ].map((ad) => (
                      <label key={ad.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        <input 
                          type="checkbox" 
                          checked={adChannels[ad.key]} 
                          onChange={() => {
                            setAdChannels((prev) => ({ ...prev, [ad.key]: !prev[ad.key] }));
                          }}
                          style={{ display: 'none' }}
                        />
                        <div style={{ 
                          width: '16px', 
                          height: '16px', 
                          borderRadius: '4px', 
                          border: '2px solid', 
                          borderColor: adChannels[ad.key] ? 'var(--primary)' : 'var(--text-muted)', 
                          backgroundColor: adChannels[ad.key] ? 'var(--primary)' : 'transparent', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: 'white', 
                          fontSize: '10px', 
                          fontWeight: 'bold',
                          flexShrink: 0,
                          transition: 'all var(--transition-fast)'
                        }}>
                          {adChannels[ad.key] && '✓'}
                        </div>
                        <span>{ad.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: 700, marginBottom: '6px', fontSize: '13px' }}>Contract Term Duration</label>
                  <select 
                    value={adDuration}
                    onChange={(e) => setAdDuration(e.target.value)}
                    className="form-control"
                    style={{ height: '38px', padding: '0 10px', fontSize: '13.5px' }}
                  >
                    <option value="1 Month">1 Month Retainer (List Price)</option>
                    <option value="3 Months">3 Months Contract (5% OFF)</option>
                    <option value="6 Months">6 Months Contract (10% OFF)</option>
                    <option value="1 Year">1 Year Contract (15% OFF)</option>
                  </select>
                </div>
              </div>

              {/* Slider for Monthly Ads Budget Axis */}
              {(adChannels.metaAds || adChannels.googleAds) && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label className="form-label" style={{ fontWeight: 700, margin: 0, fontSize: '13px' }}>Monthly Ad Spend Budget (Direct to Platforms)</label>
                    <span style={{ fontWeight: 800, color: 'var(--primary)' }}>
                      {adBudgetIndex === 0 ? 'None' : `₹${adBudgets[adBudgetIndex].toLocaleString()}`}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={adBudgets.length - 1} 
                    value={adBudgetIndex}
                    onChange={(e) => setAdBudgetIndex(parseInt(e.target.value))}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {adBudgetLabels.map((lbl, idx) => (
                      <span key={idx}>{lbl}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                    * Agency ad campaign management fee is calculated at a flat setup rate plus 10% of total ad budget.
                  </span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Right Side Displays & Form */}
        <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="calc-results-side">
          
          {!submitted ? (
            <div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '24px' }}>Estimated Investment</h3>
              
              {/* Cost Range Panel */}
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px', textAlign: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                  {calcTab === 'web' ? 'One-Time Dev Cost' : calcTab === 'webapp' ? 'One-Time Web App Cost' : 'Monthly Retainer Investment'}
                </span>
                
                <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }} className="text-gradient">
                  {calcTab === 'web' && `₹${costRange.min.toLocaleString()} - ₹${costRange.max.toLocaleString()}`}
                  {calcTab === 'webapp' && `₹${appCostRange.min.toLocaleString()} - ₹${appCostRange.max.toLocaleString()}`}
                  {calcTab === 'marketing' && `₹${marketingCostRange.min.toLocaleString()} - ₹${marketingCostRange.max.toLocaleString()}`}
                </span>
                
                {calcTab === 'marketing' && adBudgets[adBudgetIndex] > 0 && (
                  <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
                    Plus Direct Ad Budget: <strong>₹{adBudgets[adBudgetIndex].toLocaleString()}/month</strong>
                  </div>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                  <Calendar size={15} />
                  {calcTab === 'web' && (
                    <span>Est. Delivery: <strong>{deliveryTime} - {deliveryTime + 3} Days</strong></span>
                  )}
                  {calcTab === 'webapp' && (
                    <span>Est. Delivery: <strong>{appDeliveryTime} - {appDeliveryTime + 5} Days</strong></span>
                  )}
                  {calcTab === 'marketing' && (
                    <span>Contract Billing: <strong>{adDuration}</strong></span>
                  )}
                </div>
              </div>

              {/* Instant Lead Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', textAlign: 'left', lineHeight: 1.4 }}>
                  Submit details to lock in this price estimate and receive a free comprehensive consultation.
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
            // Success view
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '20px 0' }}>
              <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Quote Requested!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.5 }}>
                Thank you, <strong>{formData.name}</strong>. We have logged your project parameters and sent a briefing sheet to our specialists. We will contact you at <strong>{formData.email}</strong> shortly.
              </p>
              
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', fontSize: '13px', border: '1px solid var(--border-color)', marginBottom: '24px', textAlign: 'left', lineHeight: 1.5 }}>
                <strong style={{ display: 'block', color: 'var(--primary)', marginBottom: '6px' }}>What happens next:</strong>
                • Proposal brief compiled.<br />
                • Price lock verified for {formData.name}.<br />
                • Representative callback scheduled.
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
