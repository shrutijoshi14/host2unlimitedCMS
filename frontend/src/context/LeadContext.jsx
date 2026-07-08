import React, { createContext, useContext, useState, useEffect } from 'react';

const LeadContext = createContext();

const initialLeads = [
  {
    id: 'lead-1',
    name: 'Rajesh Sharma',
    companyName: 'Apex Retail Tech',
    email: 'rajesh@apexretail.in',
    phone: '+91 98765 43210',
    service: 'E-Commerce Development',
    budget: '₹35,000 – ₹60,000',
    details: 'Looking to construct an online grocery platform with local payment gateways and stock manager integration.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    logs: [
      'Saved to Google Sheets (Simulated)',
      'Admin Alert Sent to hello@host2unlimited.com (Simulated)',
      'Welcome Email Sent to rajesh@apexretail.in (Simulated)'
    ]
  },
  {
    id: 'lead-2',
    name: 'Sarah D\'Souza',
    companyName: 'Nesta Learning Solutions',
    email: 'sarah.d@nestaedu.org',
    phone: '+91 91234 56789',
    service: 'Website Development',
    budget: '₹15,000 – ₹25,000',
    details: 'Need a fast corporate website with standard details, course catalogs, and contact widgets.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    logs: [
      'Saved to Google Sheets (Simulated)',
      'Admin Alert Sent (Simulated)',
      'Welcome Email Sent (Simulated)'
    ]
  },
  {
    id: 'lead-3',
    name: 'Anil Mehta',
    companyName: 'FinVibe Capital',
    email: 'amehta@finvibecap.com',
    phone: '+91 99887 76655',
    service: 'Custom Software Development',
    budget: 'Custom Pricing',
    details: 'Custom SaaS accounting tracker development with secure user profiles, reports engine, and API sync.',
    status: 'Won',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
    logs: [
      'Saved to Google Sheets (Simulated)',
      'Admin Alert Sent (Simulated)',
      'Welcome Email Sent (Simulated)'
    ]
  }
];

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('h2u_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  useEffect(() => {
    localStorage.setItem('h2u_leads', JSON.stringify(leads));
  }, [leads]);

  const addLead = (leadData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      logs: [
        'Enquiry successfully stored in Google Sheets (Simulated)',
        'Admin email notification sent (Simulated)',
        `Customer confirmation email dispatched to ${leadData.email} (Simulated)`
      ],
      ...leadData
    };

    setLeads((prev) => [newLead, ...prev]);

    // Simulate logs in console to demonstrate integrations
    console.log('--- INTEGRATION ALERTS (SIMULATED) ---');
    console.log('⚡ Data exported to Google Sheets: row appended.');
    console.log(`📧 Notification email sent to Admin: "New Inquiry from ${leadData.name}"`);
    console.log(`✉️ Acknowledgment email sent to ${leadData.email}`);
    console.log('--------------------------------------');

    return newLead;
  };

  const updateLeadStatus = (id, newStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => {
        if (lead.id === id) {
          const updatedLogs = [
            ...lead.logs,
            `Status updated to "${newStatus}" on ${new Date().toLocaleString()}`
          ];
          return { ...lead, status: newStatus, logs: updatedLogs };
        }
        return lead;
      })
    );
  };

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLeadStatus, deleteLead }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) throw new Error('useLeads must be used within a LeadProvider');
  return context;
};
