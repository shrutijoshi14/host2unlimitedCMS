import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeads } from '../context/LeadContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Shield, Trash2, ClipboardCheck, Briefcase, LogOut,
  Settings, FileText, Plus, Edit, Upload, Eye, EyeOff, Search,
  Bold, Italic, Underline, Heading2, Heading3, Quote, List, ListOrdered,
  ChevronLeft, ChevronRight, Check, X, AlertCircle
} from 'lucide-react';
import * as Icons from 'lucide-react';
import logoPng from '../assets/logo.png';

const ACTIVE_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const formatDateForInput = (dateVal) => {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return '';
  const tzOffset = d.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
  return localISOTime;
};

const AdminDashboard = () => {
  const { leads, updateLeadStatus, deleteLead } = useLeads();
  const { darkMode } = useTheme();
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  
  // Auth state variables
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminExists, setAdminExists] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Form states for login/register
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Tab Selection: 'leads', 'blogs', 'services', 'modules'
  const [activeTab, setActiveTab] = useState('leads');

  // Module Configuration State
  const [modules, setModules] = useState([]);
  const [modulesLoading, setModulesLoading] = useState(true);

  // Blogs Management State
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsTotal, setBlogsTotal] = useState(0);
  const [blogsPage, setBlogsPage] = useState(1);
  const [blogsLimit] = useState(5);
  const [blogsTotalPages, setBlogsTotalPages] = useState(1);
  const [blogSearch, setBlogSearch] = useState('');

  // Services Management State
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesSearch, setServicesSearch] = useState('');

  // Blog Form State
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'
  const [editingBlogId, setEditingBlogId] = useState(null);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Website Development');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [author, setAuthor] = useState('Host2Unlimited Admin');
  const [status, setStatus] = useState('Draft');
  const [readTime, setReadTime] = useState('5 min read');
  const [publishedAt, setPublishedAt] = useState('');
  
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editorPreviewMode, setEditorPreviewMode] = useState(false);

  // Service Form State
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceFormMode, setServiceFormMode] = useState('create'); // 'create' | 'edit'
  const [editingServiceId, setEditingServiceId] = useState(null);

  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceSlug, setServiceSlug] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceBanner, setServiceBanner] = useState('');
  const [serviceIcon, setServiceIcon] = useState('Globe');
  const [serviceSeoTitle, setServiceSeoTitle] = useState('');
  const [serviceMetaDesc, setServiceMetaDesc] = useState('');

  // Service custom builders
  const [serviceFeatures, setServiceFeatures] = useState([]);
  const [newFeatureText, setNewFeatureText] = useState('');
  const [serviceFaqs, setServiceFaqs] = useState([]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const [serviceError, setServiceError] = useState('');
  const [serviceSuccess, setServiceSuccess] = useState('');
  const [uploadingBanner, setUploadingBanner] = useState(false);

  // Team Management State
  const [teamList, setTeamList] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamSearch, setTeamSearch] = useState('');

  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamFormMode, setTeamFormMode] = useState('create'); // 'create' | 'edit'
  const [editingTeamId, setEditingTeamId] = useState(null);

  const [teamName, setTeamName] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [teamImageUrl, setTeamImageUrl] = useState('');
  const [teamDisplayOrder, setTeamDisplayOrder] = useState(0);
  const [teamStatus, setTeamStatus] = useState('Active'); // 'Active' | 'Suspended' | 'Left'

  const [teamFormError, setTeamFormError] = useState('');
  const [uploadingTeamImage, setUploadingTeamImage] = useState(false);

  // Universal Pages CMS States
  const [pageContent, setPageContent] = useState([]);
  const [pageContentLoading, setPageContentLoading] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);
  const [pageEditIndex, setPageEditIndex] = useState(null);
  const [pageItemData, setPageItemData] = useState({});
  const [pageError, setPageError] = useState('');
  const [pageSuccess, setPageSuccess] = useState('');

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const toastTimeoutRef = useRef(null);

  // Forgot password flow states
  const [authView, setAuthView] = useState('login'); // 'login' | 'forgot' | 'reset'
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmNewPass, setShowConfirmNewPass] = useState(false);
  
  // Custom Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, title: '', desc: '', onConfirm: null });

  const triggerToast = useCallback((message, type = 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: true, message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4500); // slightly longer duration to let user read
  }, []);

  const fetchPageContent = useCallback(async (pageId) => {
    try {
      setPageContentLoading(true);
      const response = await fetch(`${ACTIVE_API_BASE}/api/pages/${pageId}`);
      if (response.ok) {
        const data = await response.json();
        setPageContent(data);
      } else if (pageId === 'banner') {
        setPageContent({
          about: { title: 'About Host2Unlimited', subtitle: 'Our Background', desc: 'We are a dedicated team of software developers, database managers, systems architects, and digital marketing consultants who help brands scale their systems.' },
          services: { title: 'Our Services & Solutions', subtitle: 'Capabilities', desc: 'We offer robust custom website design, cloud database configuration, Google organic search SEO sprints, and scalable VPS architectures.' },
          careers: { title: 'Careers at Host2Unlimited', subtitle: 'Join Our Team', desc: 'Explore opportunities to build scalable portals, launch digital marketing campaigns, and craft visual graphics with our collaborative engineering desk.' },
          portfolio: { title: 'Selected Projects & Portfolios', subtitle: 'Our Work', desc: 'Explore our track record of custom e-commerce engines, public sector portals, compliance directories, and interactive software suites.' },
          case_studies: { title: 'Success Metrics & Case Studies', subtitle: 'Client Outcomes', desc: 'Real-world blueprints detailing how our systems engineers scale database transactions, improve page loads, and cut cloud hosting overheads.' }
        });
      } else if (pageId === 'seo') {
        setPageContent({
          homepage: { meta_title: 'Host2Unlimited | Digital Innovation & Technology Solutions', meta_desc: 'We are your digital marketing partner for educational institutes and modern businesses, providing professional website development, secure cloud hosting, and custom ERP databases.', keywords: 'Website Development, Cloud Hosting, SEO, ERP databases, Education Portal', canonical_url: 'https://host2unlimited.com/', og_image: '/assets/school_marketing_hero.png' },
          about: { meta_title: 'About Us | Host2Unlimited Technologies', meta_desc: 'Learn about our corporate journey, team coordinates, and values transparency.', keywords: 'Host2Unlimited about, software architects team, corporate values', canonical_url: 'https://host2unlimited.com/about', og_image: '' },
          services: { meta_title: 'Our Capabilities & Services | Host2Unlimited', meta_desc: 'Browse our full suite of professional services including custom software programming, technical SEO audits, and managed AWS cloud instances.', keywords: 'technical SEO, custom software development, managed hosting AWS', canonical_url: 'https://host2unlimited.com/services', og_image: '' },
          careers: { meta_title: 'Careers & Positions | Host2Unlimited Team', meta_desc: 'Explore open engineering job listings and submit dynamic resume links to join our collaborative technical desk.', keywords: 'hiring software engineers, developer jobs remote, UI designer vacancy', canonical_url: 'https://host2unlimited.com/careers', og_image: '' },
          portfolio: { meta_title: 'Selected Client Portfolios | Host2Unlimited', meta_desc: 'Explore our track record of custom e-commerce apps, compliance public directories, and interactive platforms.', keywords: 'our projects, SaaS catalog portfolio, e-commerce case study', canonical_url: 'https://host2unlimited.com/portfolio', og_image: '' }
        });
      }
    } catch (err) {
      console.error('Error fetching page content:', err);
    } finally {
      setPageContentLoading(false);
    }
  }, []);

  const savePageContent = async (updatedData) => {
    setPageError('');
    setPageSuccess('');
    try {
      const response = await fetch(`${ACTIVE_API_BASE}/api/pages/${activeTab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save page configuration.');
      }
      setPageContent(updatedData);
      setPageSuccess('Page configuration updated successfully.');
      triggerToast('Page configuration updated successfully!');
      setTimeout(() => setPageSuccess(''), 3000);
      setShowPageModal(false);
    } catch (err) {
      setPageError(err.message);
    }
  };

  const handlePageItemSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (activeTab === 'about') {
      const key = pageItemData.type === 'value' ? 'values' : 'stats';
      const list = pageContent[key] ? [...pageContent[key]] : [];
      
      // Clean up helper attributes
      const itemToSave = { ...pageItemData };
      delete itemToSave.type;
      
      if (pageEditIndex !== null) {
        list[pageEditIndex] = itemToSave;
      } else {
        list.push(itemToSave);
      }
      updated = { ...pageContent, [key]: list };
    } else {
      updated = Array.isArray(pageContent) ? [...pageContent] : [];
      if (pageEditIndex !== null) {
        updated[pageEditIndex] = pageItemData;
      } else {
        updated.push(pageItemData);
      }
    }
    savePageContent(updated);
  };

  useEffect(() => {
    const pageTabs = ['solutions', 'portfolio', 'case_studies', 'pricing', 'careers', 'about', 'testimonials', 'website_settings', 'homepage', 'banner', 'seo'];
    if (pageTabs.includes(activeTab) && isAuthenticated) {
      setPageContent(
        activeTab === 'about' 
          ? { values: [], stats: [] } 
          : (['banner', 'seo'].includes(activeTab) ? {} : [])
      );
      fetchPageContent(activeTab);
    }
  }, [activeTab, isAuthenticated, fetchPageContent]);

  // Check admin registration state
  const checkAdminRegistration = useCallback(async () => {
    try {
      setCheckingAdmin(true);
      const response = await fetch(`${ACTIVE_API_BASE}/api/auth/check`);
      if (response.ok) {
        const data = await response.json();
        setAdminExists(data.exists);
      }
    } catch (err) {
      console.error('Error checking admin registration:', err);
    } finally {
      setCheckingAdmin(false);
    }
  }, []);

  useEffect(() => {
    checkAdminRegistration();
  }, [checkAdminRegistration]);

  // Reset error when authentication view changes
  useEffect(() => {
    setError('');
  }, [authView]);

  // Handle Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!usernameOrEmail.trim() || !password) {
      const errMsg = 'Username/Email and password are required.';
      setError(errMsg);
      triggerToast(errMsg, 'error');
      return;
    }

    try {
      const response = await fetch(`${ACTIVE_API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usernameOrEmail: usernameOrEmail.trim(),
          password
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      setLoggedInUser(data.user);
      setIsAuthenticated(true);
      setError('');
      triggerToast('Welcome back! Logged in successfully.', 'success');
    } catch (err) {
      setError(err.message);
      triggerToast(err.message, 'error');
    }
  };

  // Handle Register Administrator account
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password) {
      const errMsg = 'Please fill in all administrator input fields.';
      setError(errMsg);
      triggerToast(errMsg, 'error');
      return;
    }
    if (password !== confirmPassword) {
      const errMsg = 'Confirmation password does not match.';
      setError(errMsg);
      triggerToast(errMsg, 'error');
      return;
    }
    if (password.length < 6) {
      const errMsg = 'Password must be at least 6 characters.';
      setError(errMsg);
      triggerToast(errMsg, 'error');
      return;
    }

    try {
      const response = await fetch(`${ACTIVE_API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      setLoggedInUser(data.user);
      setIsAuthenticated(true);
      setAdminExists(true);
      setError('');
      triggerToast('Administrator account created and logged in successfully!', 'success');
    } catch (err) {
      setError(err.message);
      triggerToast(err.message, 'error');
    }
  };

  // Handle forgot password request code
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (!resetEmail.trim()) {
      const errMsg = 'Email address is required.';
      setError(errMsg);
      triggerToast(errMsg, 'error');
      return;
    }

    try {
      const response = await fetch(`${ACTIVE_API_BASE}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail.trim() })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify email address.');
      }

      triggerToast('Account email verified. Please choose a new password.', 'success');
      setError('');
      setAuthView('reset');
    } catch (err) {
      setError(err.message);
      triggerToast(err.message, 'error');
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (!resetEmail.trim() || !newPassword) {
      const errMsg = 'Please fill in all fields.';
      setError(errMsg);
      triggerToast(errMsg, 'error');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      const errMsg = 'Confirmation password does not match.';
      setError(errMsg);
      triggerToast(errMsg, 'error');
      return;
    }
    if (newPassword.length < 6) {
      const errMsg = 'Password must be at least 6 characters.';
      setError(errMsg);
      triggerToast(errMsg, 'error');
      return;
    }

    try {
      const response = await fetch(`${ACTIVE_API_BASE}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetEmail.trim(),
          newPassword
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password.');
      }

      triggerToast('Password reset successfully! Please log in.', 'success');
      setError('');
      setAuthView('login');
      setResetEmail('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError(err.message);
      triggerToast(err.message, 'error');
    }
  };

  // Logout admin
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInUser(null);
    setUsernameOrEmail('');
    setPassword('');
    setUsername('');
    setEmail('');
    setConfirmPassword('');
    setAuthView('login');
    checkAdminRegistration();
  };

  // Fetch modules state
  const fetchModules = useCallback(async () => {
    try {
      setModulesLoading(true);
      const response = await fetch(`${ACTIVE_API_BASE}/api/modules`);
      if (response.ok) {
        const data = await response.json();
        setModules(data);
      }
    } catch (err) {
      console.error('Error fetching CMS modules:', err);
    } finally {
      setModulesLoading(false);
    }
  }, []);

  // Fetch blogs list
  const fetchBlogs = useCallback(async () => {
    try {
      setBlogsLoading(true);
      const response = await fetch(
        `${ACTIVE_API_BASE}/api/blogs?page=${blogsPage}&limit=${blogsLimit}&search=${blogSearch}`
      );
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs);
        setBlogsTotal(data.total);
        setBlogsTotalPages(data.totalPages);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setBlogsLoading(false);
    }
  }, [blogsPage, blogsLimit, blogSearch]);

  // Fetch services list
  const fetchServices = useCallback(async () => {
    try {
      setServicesLoading(true);
      const response = await fetch(`${ACTIVE_API_BASE}/api/services?search=${servicesSearch}`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setServicesLoading(false);
    }
  }, [servicesSearch]);

  // Fetch team members list
  const fetchTeam = useCallback(async () => {
    try {
      setTeamLoading(true);
      const response = await fetch(`${ACTIVE_API_BASE}/api/team?all=true`);
      if (response.ok) {
        const data = await response.json();
        setTeamList(data);
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
    } finally {
      setTeamLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchModules();
      fetchBlogs();
      fetchServices();
      fetchTeam();
    }
  }, [isAuthenticated, blogsPage, blogSearch, servicesSearch, fetchModules, fetchBlogs, fetchServices, fetchTeam]);

  // Refetch team when team tab becomes active
  useEffect(() => {
    if (isAuthenticated && activeTab === 'team') {
      fetchTeam();
    }
  }, [isAuthenticated, activeTab, fetchTeam]);

  // Listen to SSE live update events in Admin Dashboard
  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail?.type === 'team_update' || e.type === 'cmsTeamUpdate') {
        fetchTeam();
      }
    };
    window.addEventListener('cmsTeamUpdate', handleUpdate);
    return () => {
      window.removeEventListener('cmsTeamUpdate', handleUpdate);
    };
  }, [fetchTeam]);

  // Open Create Team modal
  const openCreateTeamModal = () => {
    setTeamFormMode('create');
    setEditingTeamId(null);
    setTeamName('');
    setTeamRole('');
    setTeamImageUrl('');
    setTeamDisplayOrder(teamList.length + 1);
    setTeamStatus('Active');
    setTeamFormError('');
    setShowTeamModal(true);
  };

  // Open Edit Team modal
  const openEditTeamModal = (member) => {
    setTeamFormMode('edit');
    setEditingTeamId(member.id);
    setTeamName(member.name);
    setTeamRole(member.role);
    setTeamImageUrl(member.image_url || member.image || '');
    setTeamDisplayOrder(member.display_order || 0);
    setTeamStatus(member.status || 'Active');
    setTeamFormError('');
    setShowTeamModal(true);
  };

  // Save Team member (Create / Edit)
  const handleSaveTeam = async (e) => {
    e.preventDefault();
    setTeamFormError('');

    if (!teamName.trim() || !teamRole.trim()) {
      setTeamFormError('Name and Role/Position are required.');
      return;
    }

    try {
      const isEdit = teamFormMode === 'edit';
      const endpoint = isEdit ? `${ACTIVE_API_BASE}/api/team/${editingTeamId}` : `${ACTIVE_API_BASE}/api/team`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: teamName.trim(),
          role: teamRole.trim(),
          image_url: teamImageUrl.trim(),
          display_order: parseInt(teamDisplayOrder, 10) || 0,
          status: teamStatus
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save team member.');
      }

      setShowTeamModal(false);
      fetchTeam();
      triggerToast(`Team member ${isEdit ? 'updated' : 'added'} successfully!`, 'success');
    } catch (err) {
      setTeamFormError(err.message);
      triggerToast(err.message, 'error');
    }
  };

  // Delete Team member
  const handleDeleteTeam = (id, name) => {
    const executeDelete = async () => {
      try {
        const response = await fetch(`${ACTIVE_API_BASE}/api/team/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchTeam();
          triggerToast(`Team member "${name}" deleted successfully!`, 'error');
        } else {
          const data = await response.json();
          triggerToast(data.error || 'Failed to delete team member.', 'error');
        }
      } catch (err) {
        console.error('Error deleting team member:', err);
        triggerToast('Error deleting team member.', 'error');
      }
    };

    setDeleteConfirm({
      show: true,
      title: 'Delete Team Member',
      desc: `Are you sure you want to delete "${name}" from team members?`,
      onConfirm: executeDelete
    });
  };

  // Quick direct status update button handler for Team member
  const handleTeamStatusUpdate = async (member, newStatus) => {
    try {
      const response = await fetch(`${ACTIVE_API_BASE}/api/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: member.name,
          role: member.role,
          image_url: member.image_url || member.image || '',
          display_order: member.display_order || 0,
          status: newStatus
        })
      });
      if (response.ok) {
        fetchTeam();
        triggerToast(`Status for "${member.name}" updated to ${newStatus}.`, 'success');
      } else {
        const data = await response.json();
        triggerToast(data.error || 'Failed to update status.', 'error');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      triggerToast('Error updating status.', 'error');
    }
  };

  // Handle Team member photo upload (Max 1MB)
  const handleTeamImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate 1MB limit
    const MAX_SIZE_BYTES = 1 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      const errMsg = `Selected photo size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds the 1MB limit. Please select a smaller image.`;
      setTeamFormError(errMsg);
      triggerToast(errMsg, 'error');
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadingTeamImage(true);
      setTeamFormError('');

      const response = await fetch(`${ACTIVE_API_BASE}/api/blogs/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Photo upload failed.');
      }

      setTeamImageUrl(data.image_url);
      triggerToast('Photo uploaded successfully!', 'success');
    } catch (err) {
      setTeamFormError(err.message);
      triggerToast(err.message, 'error');
    } finally {
      setUploadingTeamImage(false);
      e.target.value = '';
    }
  };

  // Handle global key events (Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowFormModal(false);
        setShowServiceModal(false);
        setShowPageModal(false);
        setDeleteConfirm({ show: false, title: '', desc: '', onConfirm: null });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Toggle module state
  const toggleModule = async (moduleId, currentStatus) => {
    try {
      const response = await fetch(`${ACTIVE_API_BASE}/api/modules/${moduleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !currentStatus })
      });
      if (response.ok) {
        setModules(prev =>
          prev.map(m => m.id === moduleId ? { ...m, enabled: !currentStatus ? 1 : 0 } : m)
        );
      }
    } catch (err) {
      console.error('Error toggling module:', err);
    }
  };

  // Helper to check if a module is enabled
  const isModuleEnabled = (moduleId) => {
    const mod = modules.find(m => m.id === moduleId);
    return mod ? mod.enabled === 1 : false;
  };

  // Handle Blog Slug generation
  const handleTitleChange = (val) => {
    setTitle(val);
    if (formMode === 'create') {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generatedSlug);
      setSeoTitle(val);
    }
  };

  // Handle Service Slug generation
  const handleServiceTitleChange = (val) => {
    setServiceTitle(val);
    if (serviceFormMode === 'create') {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setServiceSlug(generatedSlug);
      setServiceSeoTitle(val);
    }
  };

  // Helper to insert format tags into Textarea
  const insertFormat = (tagOpen, tagClose = '') => {
    const textarea = document.getElementById('blog-content-editor');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = tagOpen + selectedText + tagClose;

    const newValue = text.substring(0, start) + replacement + text.substring(end);
    setContent(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selectedText.length);
    }, 0);
  };

  // Handle featured image upload
  const handleImageUpload = async (e, type = 'blog') => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      if (type === 'blog') {
        setUploadingImage(true);
        setFormError('');
      } else {
        setUploadingBanner(true);
        setServiceError('');
      }
      
      const response = await fetch(`${ACTIVE_API_BASE}/api/blogs/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Image upload failed.');
      }

      const data = await response.json();
      if (type === 'blog') {
        setImageUrl(data.image_url);
      } else {
        setServiceBanner(data.image_url);
      }
    } catch (err) {
      if (type === 'blog') {
        setFormError(err.message);
      } else {
        setServiceError(err.message);
      }
    } finally {
      if (type === 'blog') {
        setUploadingImage(false);
      } else {
        setUploadingBanner(false);
      }
    }
  };

  // Delete blog handler
  const handleDeleteBlog = (id) => {
    const executeDelete = async () => {
      try {
        const response = await fetch(`${ACTIVE_API_BASE}/api/blogs/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchBlogs();
          triggerToast('Blog post deleted successfully!', 'error');
        } else {
          const data = await response.json();
          triggerToast(data.error || 'Failed to delete blog.', 'error');
        }
      } catch (err) {
        console.error('Error deleting blog:', err);
        triggerToast('Error deleting blog article.', 'error');
      }
    };

    setDeleteConfirm({
      show: true,
      title: 'Delete Blog Article',
      desc: 'Are you sure you want to permanently delete this blog article? This action cannot be undone and will remove the post from the live database.',
      onConfirm: executeDelete
    });
  };

  // Delete service handler
  const handleDeleteService = (id) => {
    const executeDelete = async () => {
      try {
        const response = await fetch(`${ACTIVE_API_BASE}/api/services/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchServices();
          triggerToast('Service catalog deleted successfully!', 'error');
        } else {
          const data = await response.json();
          triggerToast(data.error || 'Failed to delete service.', 'error');
        }
      } catch (err) {
        console.error('Error deleting service:', err);
        triggerToast('Error deleting service catalog.', 'error');
      }
    };

    setDeleteConfirm({
      show: true,
      title: 'Delete Service Catalog',
      desc: 'Are you sure you want to permanently delete this service catalog? This action cannot be undone and will remove the catalog from the live database.',
      onConfirm: executeDelete
    });
  };

  // Edit blog setup
  const openEditModal = (blog) => {
    setFormMode('edit');
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setSlug(blog.slug);
    setContent(blog.content);
    setCategory(blog.category);
    setTags(blog.tags || '');
    setImageUrl(blog.image_url || '');
    setSeoTitle(blog.seo_title || '');
    setMetaDescription(blog.meta_description || '');
    setAuthor(blog.author);
    setStatus(blog.status);
    setReadTime(blog.read_time || '5 min read');
    setPublishedAt(blog.published_at ? formatDateForInput(blog.published_at) : formatDateForInput(new Date()));
    setFormError('');
    setFormSuccess('');
    setShowFormModal(true);
    setEditorPreviewMode(false);
  };

  // Open Create modal
  const openCreateModal = () => {
    setFormMode('create');
    setEditingBlogId(null);
    setTitle('');
    setSlug('');
    setContent('');
    setCategory('Website Development');
    setTags('');
    setImageUrl('');
    setSeoTitle('');
    setMetaDescription('');
    setAuthor('Host2Unlimited Admin');
    setStatus('Draft');
    setReadTime('5 min read');
    setPublishedAt(formatDateForInput(new Date()));
    setFormError('');
    setFormSuccess('');
    setShowFormModal(true);
    setEditorPreviewMode(false);
  };

  // Edit service setup
  const openEditServiceModal = (srv) => {
    setServiceFormMode('edit');
    setEditingServiceId(srv.id);
    setServiceTitle(srv.title);
    setServiceSlug(srv.slug);
    setServiceDesc(srv.description);
    setServiceBanner(srv.banner_image_url || '');
    setServiceIcon(srv.icon_name || 'Globe');
    setServiceSeoTitle(srv.seo_title || '');
    setServiceMetaDesc(srv.meta_description || '');
    setServiceFeatures(srv.features || []);
    setServiceFaqs(srv.faqs || []);
    
    setNewFeatureText('');
    setNewFaqQ('');
    setNewFaqA('');
    setServiceError('');
    setServiceSuccess('');
    setShowServiceModal(true);
  };

  // Open Create service modal
  const openCreateServiceModal = () => {
    setServiceFormMode('create');
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceSlug('');
    setServiceDesc('');
    setServiceBanner('');
    setServiceIcon('Globe');
    setServiceSeoTitle('');
    setServiceMetaDesc('');
    setServiceFeatures([]);
    setServiceFaqs([]);

    setNewFeatureText('');
    setNewFaqQ('');
    setNewFaqA('');
    setServiceError('');
    setServiceSuccess('');
    setShowServiceModal(true);
  };

  // Submit Blog Form
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!title || !slug || !content || !author) {
      setFormError('Title, URL Slug, Author, and Content are required fields.');
      return;
    }

    const blogData = {
      title,
      slug,
      content,
      category,
      tags,
      image_url: imageUrl,
      seo_title: seoTitle || title,
      meta_description: metaDescription,
      author,
      status,
      read_time: readTime,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString()
    };

    try {
      const url = formMode === 'create' 
        ? `${ACTIVE_API_BASE}/api/blogs`
        : `${ACTIVE_API_BASE}/api/blogs/${editingBlogId}`;
      
      const method = formMode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save blog post.');
      }

      const successMsg = formMode === 'create' ? 'Blog post created successfully!' : 'Blog post updated successfully!';
      setFormSuccess(successMsg);
      triggerToast(successMsg);
      
      setTimeout(() => {
        setShowFormModal(false);
        fetchBlogs();
      }, 1000);

    } catch (err) {
      setFormError(err.message);
    }
  };

  // Submit Service Form
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setServiceError('');
    setServiceSuccess('');

    if (!serviceTitle || !serviceSlug || !serviceDesc) {
      setServiceError('Title, URL Slug, and Description are required fields.');
      return;
    }

    const serviceData = {
      title: serviceTitle,
      slug: serviceSlug,
      description: serviceDesc,
      banner_image_url: serviceBanner,
      features: serviceFeatures,
      faqs: serviceFaqs,
      seo_title: serviceSeoTitle || serviceTitle,
      meta_description: serviceMetaDesc,
      icon_name: serviceIcon
    };

    try {
      const url = serviceFormMode === 'create'
        ? `${ACTIVE_API_BASE}/api/services`
        : `${ACTIVE_API_BASE}/api/services/${editingServiceId}`;
      
      const method = serviceFormMode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save service.');
      }

      const successMsg = serviceFormMode === 'create' ? 'Service catalog created successfully!' : 'Service catalog updated successfully!';
      setServiceSuccess(successMsg);
      triggerToast(successMsg);
      
      setTimeout(() => {
        setShowServiceModal(false);
        fetchServices();
      }, 1000);
    } catch (err) {
      setServiceError(err.message);
    }
  };

  // Service Features List controls
  const addFeature = () => {
    if (!newFeatureText.trim()) return;
    setServiceFeatures([...serviceFeatures, newFeatureText.trim()]);
    setNewFeatureText('');
  };

  const removeFeature = (idx) => {
    setServiceFeatures(serviceFeatures.filter((_, i) => i !== idx));
  };

  // Service FAQs list controls
  const addFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    setServiceFaqs([...serviceFaqs, { question: newFaqQ.trim(), answer: newFaqA.trim() }]);
    setNewFaqQ('');
    setNewFaqA('');
  };

  const removeFaq = (idx) => {
    setServiceFaqs(serviceFaqs.filter((_, i) => i !== idx));
  };

  // Compute metrics for leads
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted' || l.status === 'Meeting Scheduled' || l.status === 'Proposal Sent').length;
  const wonLeads = leads.filter(l => l.status === 'Won').length;
  const conversionRate = totalLeads ? Math.round((wonLeads / totalLeads) * 100) : 0;
  const selectedLead = leads.find(l => l.id === selectedLeadId);

  // Loading indicator for registration status check
  if (checkingAdmin) {
    return (
      <div style={{ 
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '20px', 
        boxSizing: 'border-box', 
        backgroundColor: 'var(--bg-primary, #0f172a)',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', animation: 'pulse 1.8s infinite ease-in-out' }}>
          <img src={logoPng} alt="Host2Unlimited Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
        </div>
        
        {/* Smooth Loader Ring */}
        <div className="animate-spin" style={{ 
          width: '28px', 
          height: '28px', 
          borderRadius: '50%', 
          border: '3px solid rgba(14, 165, 233, 0.1)', 
          borderTopColor: '#0ea5e9'
        }}></div>
      </div>
    );
  }

  // Render Login state if unauthorized
  if (!isAuthenticated) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
        
        {/* Render register form if no admins exist */}
        {!adminExists ? (
          <div className="card-glass" style={{ padding: '40px', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Shield size={24} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '10px' }}>Register Administrator</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              No accounts registered yet. Configure your master administrator credentials to unlock the console.
            </p>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                placeholder="Username *" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-input"
                required
              />
              <input 
                type="email" 
                placeholder="Email Address *" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                required
              />
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type={showPass ? 'text' : 'password'} 
                  placeholder="Password *" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input"
                  style={{ paddingRight: '48px' }}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type={showConfirmPass ? 'text' : 'password'} 
                  placeholder="Confirm Password *" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="admin-input"
                  style={{ paddingRight: '48px' }}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                >
                  {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  <AlertCircle size={14} /> {error}
                </span>
              )}
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Create Admin Account & Log In
              </button>
            </form>
          </div>
        ) : authView === 'login' ? (
          /* Render standard login form if admin exists */
          <div className="card-glass" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Shield size={24} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '10px' }}>Admin Login</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '24px' }}>
              Enter your credentials to manage the website databases and modules.
            </p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="text" 
                placeholder="Username or Email..." 
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="admin-input"
                required
                autoFocus
              />
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type={showPass ? 'text' : 'password'} 
                  placeholder="Password..." 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input"
                  style={{ paddingRight: '48px' }}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-4px', marginBottom: '4px' }}>
                <button 
                  type="button" 
                  onClick={() => setAuthView('forgot')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--primary)', 
                    fontSize: '13px', 
                    cursor: 'pointer', 
                    fontWeight: 600,
                    padding: 0,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.8'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  Forgot Password?
                </button>
              </div>

              {error && (
                <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  <AlertCircle size={14} /> {error}
                </span>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Log In
              </button>
            </form>
          </div>
        ) : authView === 'forgot' ? (
          /* Render Forgot Password request code form */
          <div className="card-glass" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Icons.KeyRound size={24} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '10px' }}>Forgot Password?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              Enter your registered administrator email address to request a reset code.
            </p>
            <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="email" 
                placeholder="Email Address..." 
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="admin-input"
                required
                autoFocus
              />
              {error && (
                <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  <AlertCircle size={14} /> {error}
                </span>
              )}
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Reset Code
              </button>
              <button 
                type="button" 
                onClick={() => setAuthView('login')}
                className="btn btn-secondary" 
                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              >
                Back to Login
              </button>
            </form>
          </div>
        ) : (
          /* Render Password Reset form using verification code */
          <div className="card-glass" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Icons.LockKeyhole size={24} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '10px' }}>Reset Password</h2>
             <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              Choose a new secure password for your administrator account.
            </p>
            <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* New Password field */}
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type={showNewPass ? 'text' : 'password'} 
                  placeholder="New Password..." 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="admin-input"
                  style={{ paddingRight: '48px' }}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                >
                  {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Confirm New Password field */}
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type={showConfirmNewPass ? 'text' : 'password'} 
                  placeholder="Confirm New Password..." 
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="admin-input"
                  style={{ paddingRight: '48px' }}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmNewPass(!showConfirmNewPass)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                >
                  {showConfirmNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  <AlertCircle size={14} /> {error}
                </span>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Reset Password
              </button>
              <button 
                type="button" 
                onClick={() => setAuthView('forgot')}
                className="btn btn-secondary" 
                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              >
                Back
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '45px 20px 60px 20px', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div className="container">
        
        {/* Main Admin Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--primary-light)', 
              color: 'var(--primary)', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              fontWeight: 600, 
              fontSize: '13px'
            }}>
              <Shield size={14} /> Workspace Administration
            </span>
            <h1 style={{ fontSize: '38px', fontWeight: 800, marginTop: '8px' }}>CMS Control Center</h1>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {loggedInUser && (
              <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                Welcome, <strong>{loggedInUser.username}</strong>
              </span>
            )}
            <button 
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '13px' }}
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>

        {/* Modular Tabs Navigation */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('leads')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'leads' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'leads' ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <ClipboardCheck size={16} /> Inbox Leads
          </button>

          {isModuleEnabled('blog') && (
            <button 
              onClick={() => setActiveTab('blogs')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'blogs' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'blogs' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <FileText size={16} /> Blog Articles CMS
            </button>
          )}

          {isModuleEnabled('services') && (
            <button 
              onClick={() => setActiveTab('services')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'services' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'services' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Briefcase size={16} /> Services CMS
            </button>
          )}

          {isModuleEnabled('solutions') && (
            <button 
              onClick={() => setActiveTab('solutions')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'solutions' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'solutions' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.Cpu size={16} /> Solutions CMS
            </button>
          )}

          {isModuleEnabled('portfolio') && (
            <button 
              onClick={() => setActiveTab('portfolio')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'portfolio' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'portfolio' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.Layers size={16} /> Portfolio CMS
            </button>
          )}

          {isModuleEnabled('case_studies') && (
            <button 
              onClick={() => setActiveTab('case_studies')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'case_studies' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'case_studies' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.LineChart size={16} /> Case Studies CMS
            </button>
          )}

          {isModuleEnabled('pricing') && (
            <button 
              onClick={() => setActiveTab('pricing')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'pricing' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'pricing' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.DollarSign size={16} /> Pricing CMS
            </button>
          )}

          {isModuleEnabled('careers') && (
            <button 
              onClick={() => setActiveTab('careers')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'careers' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'careers' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.Briefcase size={16} /> Careers CMS
            </button>
          )}

          {isModuleEnabled('about') && (
            <button 
              onClick={() => setActiveTab('about')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'about' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'about' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.Info size={16} /> About CMS
            </button>
          )}

          <button 
            onClick={() => setActiveTab('team')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'team' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'team' ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Icons.Users size={16} /> Team Members
          </button>

          {isModuleEnabled('testimonials') && (
            <button 
              onClick={() => setActiveTab('testimonials')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'testimonials' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'testimonials' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.MessageSquare size={16} /> Testimonials CMS
            </button>
          )}

          {isModuleEnabled('settings') && (
            <button 
              onClick={() => setActiveTab('website_settings')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'website_settings' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'website_settings' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.Sliders size={16} /> Website Settings
            </button>
          )}

          {isModuleEnabled('homepage') && (
            <button 
              onClick={() => setActiveTab('homepage')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'homepage' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'homepage' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.Home size={16} /> Homepage CMS
            </button>
          )}

          {isModuleEnabled('banner') && (
            <button 
              onClick={() => setActiveTab('banner')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'banner' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'banner' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.Image size={16} /> Banner CMS
            </button>
          )}

          {isModuleEnabled('seo') && (
            <button 
              onClick={() => setActiveTab('seo')}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'seo' ? 'var(--primary-light)' : 'transparent',
                color: activeTab === 'seo' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icons.Globe size={16} /> SEO CMS
            </button>
          )}

          <button 
            onClick={() => setActiveTab('modules')}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'modules' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'modules' ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Settings size={16} /> Modular Config
          </button>
        </div>

        {/* -------------------- LEADS TAB (PRESERVED) -------------------- */}
        {activeTab === 'leads' && (
          <div>
            {/* Admin Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }} className="metrics-grid">
              <div className="card-glass" style={{ padding: '20px', textAlign: 'left' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Inquiries Captured</span>
                <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px' }}>{totalLeads} Leads</h2>
              </div>
              <div className="card-glass" style={{ padding: '20px', textAlign: 'left' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Pending (Status: New)</span>
                <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--primary)' }}>{newLeads} Leads</h2>
              </div>
              <div className="card-glass" style={{ padding: '20px', textAlign: 'left' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Engaged (Contacted)</span>
                <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: 'var(--secondary)' }}>{contactedLeads}</h2>
              </div>
              <div className="card-glass" style={{ padding: '20px', textAlign: 'left' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Conversion Success</span>
                <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '4px', color: '#10b981' }}>{conversionRate}% Rate</h2>
              </div>
            </div>

            {/* Split Screen */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }} className="split-grid">
              {/* Inbox Submissions */}
              <div className="card-glass" style={{ padding: '24px', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Inbox Submissions</h3>
                {leads.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No inquiries submitted yet.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {leads.map((lead) => (
                      <div 
                        key={lead.id} 
                        onClick={() => setSelectedLeadId(lead.id)}
                        style={{
                          padding: '16px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid',
                          borderColor: selectedLeadId === lead.id ? 'var(--primary)' : 'var(--border-color)',
                          backgroundColor: selectedLeadId === lead.id ? 'var(--primary-light)' : 'var(--bg-secondary)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                        className="lead-item-row"
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{lead.name}</strong>
                          <span 
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: '12px',
                              textTransform: 'uppercase',
                              backgroundColor: 
                                lead.status === 'Won' ? 'rgba(16, 185, 129, 0.15)' :
                                lead.status === 'Lost' ? 'rgba(239, 68, 68, 0.15)' :
                                lead.status === 'New' ? 'rgba(37, 99, 235, 0.15)' :
                                'rgba(245, 158, 11, 0.15)',
                              color:
                                lead.status === 'Won' ? '#10b981' :
                                lead.status === 'Lost' ? '#ef4444' :
                                lead.status === 'New' ? 'var(--primary)' :
                                '#f59e0b'
                            }}
                          >
                            {lead.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                          <span>{lead.companyName || 'No Company'} • {lead.service}</span>
                          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Lead Details */}
              <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Lead Verification File</h3>
                {selectedLead ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer Overview</span>
                      <h4 style={{ fontSize: '20px', fontWeight: 800, marginTop: '2px' }}>{selectedLead.name}</h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        🏢 {selectedLead.companyName} | ✉ {selectedLead.email} | 📞 {selectedLead.phone}
                      </p>
                    </div>

                    <hr style={{ border: 'none', borderBottom: '1px solid var(--border-color)' }} />

                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Requested Scope & Budget</span>
                      <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '13.5px' }}>
                        <strong>Service:</strong> {selectedLead.service}<br />
                        <strong>Est Range:</strong> {selectedLead.budget}
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Requirement Specifications</span>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', margin: 0, whiteSpace: 'pre-wrap' }}>
                        {selectedLead.details}
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Update Status State</span>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'].map((st) => (
                          <button 
                            key={st}
                            onClick={() => updateLeadStatus(selectedLead.id, st)}
                            style={{
                              fontSize: '11.5px',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: 600,
                              border: '1px solid',
                              borderColor: selectedLead.status === st ? 'var(--primary)' : 'var(--border-color)',
                              backgroundColor: selectedLead.status === st ? 'var(--primary-light)' : 'var(--bg-primary)',
                              color: selectedLead.status === st ? 'var(--primary)' : 'var(--text-primary)',
                              transition: 'all var(--transition-fast)'
                            }}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Simulated Integration Logs</span>
                      <div style={{ backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '11px', color: '#38bdf8', border: '1px solid #1e293b' }}>
                        {selectedLead.logs && selectedLead.logs.map((log, idx) => (
                          <div key={idx} style={{ marginBottom: '4px' }}>
                            • {log}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                      <button 
                        onClick={() => {
                          deleteLead(selectedLead.id);
                          setSelectedLeadId(null);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '13px'
                        }}
                      >
                        <Trash2 size={14} /> Remove Record
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                    Select a submission from the list to view requirements and dispatch follow-ups.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* -------------------- BLOGS TAB -------------------- */}
        {activeTab === 'blogs' && isModuleEnabled('blog') && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            
            {/* Sub-header actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '320px' }}>
                  <input 
                    type="text" 
                    placeholder="Search articles..."
                    value={blogSearch}
                    onChange={(e) => {
                      setBlogSearch(e.target.value);
                      setBlogsPage(1);
                    }}
                    className="form-control"
                    style={{ paddingLeft: '40px', fontSize: '14px', height: '42px' }}
                  />
                  <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
                {blogsTotal > 0 && (
                  <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                    Total articles: <strong>{blogsTotal}</strong>
                  </span>
                )}
              </div>

              <button 
                onClick={openCreateModal}
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', height: '42px' }}
              >
                <Plus size={16} /> Create Article
              </button>
            </div>

            {/* Blogs Table/List */}
            {blogsLoading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                Loading article data logs...
              </div>
            ) : blogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                No article logs captured. Click "Create Article" to draft one.
              </div>
            ) : (
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-primary)' }}>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>Title</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>Category</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>Author</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>Date Created</th>
                      <th style={{ textAlign: 'center', padding: '12px 16px', fontWeight: 700 }}>Status</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }} className="table-row-hover">
                        <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {blog.title}
                        </td>
                        <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>
                          <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600 }}>
                            {blog.category}
                          </span>
                        </td>
                        <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{blog.author}</td>
                        <td style={{ padding: '16px', color: 'var(--text-muted)' }}>
                          {new Date(blog.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '12px',
                            textTransform: 'uppercase',
                            backgroundColor: blog.status === 'Published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                            color: blog.status === 'Published' ? '#10b981' : 'var(--text-muted)'
                          }}>
                            {blog.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <a 
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              title="Preview Article"
                              className="icon-btn-preview"
                            >
                              <Eye size={14} />
                            </a>
                            <button 
                              onClick={() => openEditModal(blog)}
                              title="Edit Article"
                              className="icon-btn-edit"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteBlog(blog.id)}
                              title="Delete Article"
                              className="icon-btn-delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {blogsTotalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                  Showing page <strong>{blogsPage}</strong> of <strong>{blogsTotalPages}</strong>
                </span>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    disabled={blogsPage === 1}
                    onClick={() => setBlogsPage(prev => Math.max(1, prev - 1))}
                    className="btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '13px', opacity: blogsPage === 1 ? 0.5 : 1, cursor: blogsPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <button 
                    disabled={blogsPage === blogsTotalPages}
                    onClick={() => setBlogsPage(prev => Math.min(blogsTotalPages, prev + 1))}
                    className="btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '13px', opacity: blogsPage === blogsTotalPages ? 0.5 : 1, cursor: blogsPage === blogsTotalPages ? 'not-allowed' : 'pointer' }}
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* -------------------- SERVICES TAB -------------------- */}
        {activeTab === 'services' && isModuleEnabled('services') && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            
            {/* Header controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '320px' }}>
                  <input 
                    type="text" 
                    placeholder="Search services..."
                    value={servicesSearch}
                    onChange={(e) => setServicesSearch(e.target.value)}
                    className="form-control"
                    style={{ paddingLeft: '40px', fontSize: '14px', height: '42px' }}
                  />
                  <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
                {services.length > 0 && (
                  <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
                    Total: <strong>{services.length}</strong> services
                  </span>
                )}
              </div>

              <button 
                onClick={openCreateServiceModal}
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', height: '42px' }}
              >
                <Plus size={16} /> Create Service
              </button>
            </div>

            {/* Services Table */}
            {servicesLoading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                Loading service database rows...
              </div>
            ) : services.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                No active services logged. Click "Create Service" to add.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14.5px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-primary)' }}>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>Icon</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>Title</th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>URL Path Slug</th>
                      <th style={{ textAlign: 'center', padding: '12px 16px', fontWeight: 700 }}>Features</th>
                      <th style={{ textAlign: 'center', padding: '12px 16px', fontWeight: 700 }}>FAQs</th>
                      <th style={{ textAlign: 'right', padding: '12px 16px', fontWeight: 700 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((srv) => {
                      const SrvIcon = Icons[srv.icon_name] || Icons.Globe;
                      return (
                        <tr key={srv.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }} className="table-row-hover">
                          <td style={{ padding: '16px', color: 'var(--primary)' }}>
                            <div style={{ display: 'inline-flex', width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--primary-light)', alignItems: 'center', justifyContent: 'center' }}>
                              <SrvIcon size={18} />
                            </div>
                          </td>
                          <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {srv.title}
                          </td>
                          <td style={{ padding: '16px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                            /services/{srv.slug}
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            <strong>{srv.features ? srv.features.length : 0}</strong> features
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            <strong>{srv.faqs ? srv.faqs.length : 0}</strong> accordion rows
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <a 
                                href={`/services/${srv.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Preview Service Page"
                                className="icon-btn-preview"
                              >
                                <Eye size={14} />
                              </a>
                              <button 
                                onClick={() => openEditServiceModal(srv)}
                                title="Edit Service"
                                className="icon-btn-edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                onClick={() => handleDeleteService(srv.id)}
                                title="Delete Service"
                                className="icon-btn-delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* -------------------- CONFIGS TAB -------------------- */}
        {activeTab === 'modules' && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>CMS Modular Config</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '30px' }}>
              Select which page elements are active or manageable via administrative dynamic databases. When disabled, standard page structures fall back to their initial coded layouts.
            </p>

            {modulesLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                Loading structural states...
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {modules.map((mod) => {
                  const isManageable = true;
                  return (
                    <div 
                      key={mod.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 20px',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        opacity: isManageable ? 1 : 0.65
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {mod.name}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {mod.id === 'blog' ? 'Enable/Disable dynamic blog database CRUD endpoints.' :
                           mod.id === 'services' ? 'Enable/Disable dynamic services catalog and accordion details.' :
                           mod.id === 'contact_leads' ? 'Lead submission logging panel.' :
                           mod.id === 'solutions' ? 'Enable/Disable custom solutions verticals dynamic CMS.' :
                           mod.id === 'portfolio' ? 'Enable/Disable dynamic project portfolio listing.' :
                           mod.id === 'case_studies' ? 'Enable/Disable dynamic success metrics and case study documents.' :
                           mod.id === 'pricing' ? 'Enable/Disable dynamic product pricing plans catalog.' :
                           mod.id === 'careers' ? 'Enable/Disable dynamic recruitment listings and applications.' :
                           mod.id === 'about' ? 'Enable/Disable custom company values and counter stats.' :
                           'CMS panel.'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          disabled={!isManageable}
                          onClick={() => toggleModule(mod.id, mod.enabled)}
                          style={{
                            width: '54px',
                            height: '28px',
                            borderRadius: '14px',
                            backgroundColor: mod.enabled ? '#10b981' : 'var(--border-color)',
                            border: 'none',
                            position: 'relative',
                            cursor: isManageable ? 'pointer' : 'not-allowed',
                            transition: 'background-color var(--transition-fast)'
                          }}
                        >
                          <div 
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: 'white',
                              position: 'absolute',
                              top: '4px',
                              left: mod.enabled ? '30px' : '4px',
                              transition: 'left var(--transition-fast)'
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* -------------------- UNIVERSAL CMS PAGES -------------------- */}
        {['solutions', 'portfolio', 'case_studies', 'pricing', 'careers', 'testimonials'].includes(activeTab) && isModuleEnabled(activeTab) && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, textTransform: 'capitalize' }}>
                  {activeTab.replace('_', ' ')} CMS Editor
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '4px' }}>
                  Manage the dynamic records that display on the public website {activeTab} section.
                </p>
              </div>
              <button 
                onClick={() => {
                  setPageEditIndex(null);
                  setPageItemData({});
                  setShowPageModal(true);
                }}
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', height: '42px' }}
              >
                <Plus size={16} /> Add Record
              </button>
            </div>

            {pageContentLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                Retrieving dynamic records...
              </div>
            ) : !Array.isArray(pageContent) || pageContent.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                No active records. Click "Add Record" to seed the list.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {pageContent.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="card-glass" 
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      {/* Meta header depending on page type */}
                      {activeTab === 'solutions' && (
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                            {item.icon_name || 'Globe'}
                          </span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px', marginBottom: '4px' }}>{item.title}</h4>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.subtitle}</span>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '10px', lineHeight: 1.4 }}>{item.desc}</p>
                        </div>
                      )}
                      
                      {activeTab === 'portfolio' && (
                        <div>
                          <div style={{ height: '140px', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px', border: '1px solid var(--border-color)' }}>
                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.client} • {item.category}</span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px', marginBottom: '8px' }}>{item.title}</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.4 }}>{item.desc}</p>
                        </div>
                      )}

                      {activeTab === 'case_studies' && (
                        <div>
                          <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                            {item.client}
                          </span>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px', marginBottom: '8px' }}>{item.title}</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.4 }}>{item.challenge?.substring(0, 100)}...</p>
                        </div>
                      )}

                      {activeTab === 'pricing' && (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{item.name}</h4>
                            {item.popular && <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>POPULAR</span>}
                          </div>
                          <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', display: 'block', margin: '8px 0' }}>{item.price}</span>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.4 }}>{item.desc}</p>
                        </div>
                      )}

                      {activeTab === 'careers' && (
                        <div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px' }}>
                              {item.department}
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.type}</span>
                          </div>
                          <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h4>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>📍 {item.location}</span>
                        </div>
                      )}

                      {activeTab === 'testimonials' && (
                        <div>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                            <img src={item.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>{item.name}</strong>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.designation}, {item.company}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
                            {[...Array(item.rating || 5)].map((_, i) => (
                              <Icons.Star key={i} size={12} fill="var(--secondary)" color="var(--secondary)" />
                            ))}
                          </div>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.4, fontStyle: 'italic' }}>"{item.review}"</p>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: '16px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => {
                          setPageEditIndex(idx);
                          setPageItemData(item);
                          setShowPageModal(true);
                        }}
                        className="action-btn-edit" 
                      >
                        <Edit size={12} /> Edit
                      </button>
                      <button 
                        onClick={() => {
                          setDeleteConfirm({
                            show: true,
                            title: 'Delete CMS Record',
                            desc: 'Are you sure you want to permanently delete this record? This action will save immediately and update the public website sections.',
                            onConfirm: () => {
                              const updated = [...pageContent];
                              updated.splice(idx, 1);
                              savePageContent(updated);
                              triggerToast('CMS record deleted successfully!', 'error');
                            }
                          });
                        }}
                        className="action-btn-delete" 
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------- BANNER MANAGEMENT CMS EDITOR -------------------- */}
        {activeTab === 'banner' && isModuleEnabled('banner') && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Global Banner Management</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '30px' }}>
              Configure headers, titles, subtitles, and introductory paragraphs for all secondary pages on the website.
            </p>

            {pageContentLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                Retrieving banner configuration...
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  savePageContent(pageContent);
                }} 
                style={{ display: 'flex', flexDirection: 'column', gap: '30px', margin: 0 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {['about', 'services', 'careers', 'portfolio', 'case_studies'].map((key) => {
                    const sectionData = pageContent[key] || { title: '', subtitle: '', desc: '' };
                    return (
                      <div 
                        key={key} 
                        className="card-glass" 
                        style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                      >
                        <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>
                          {key.replace('_', ' ')} Page Banner
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', marginBottom: '15px' }} className="form-grid-2">
                          <div>
                            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                              Subtitle / Badge *
                            </label>
                            <input 
                              type="text" 
                              value={sectionData.subtitle || ''} 
                              onChange={(e) => {
                                const section = { ...sectionData, subtitle: e.target.value };
                                setPageContent(prev => ({ ...prev, [key]: section }));
                              }}
                              placeholder="e.g. Join Our Team (Introductory badge label)"
                              className="form-control"
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                              Banner Title *
                            </label>
                            <input 
                              type="text" 
                              value={sectionData.title || ''} 
                              onChange={(e) => {
                                const section = { ...sectionData, title: e.target.value };
                                setPageContent(prev => ({ ...prev, [key]: section }));
                              }}
                              placeholder="e.g. Careers at Host2Unlimited (Primary h1 heading)"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                            Introduction Paragraph / Description *
                          </label>
                          <textarea 
                            value={sectionData.desc || ''} 
                            onChange={(e) => {
                              const section = { ...sectionData, desc: e.target.value };
                              setPageContent(prev => ({ ...prev, [key]: section }));
                            }}
                            placeholder="Enter primary header description detailing what this page represents..."
                            className="form-control"
                            style={{ minHeight: '60px' }}
                            required
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ padding: '12px 36px', borderRadius: '6px' }}
                  >
                    Save All Banners
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* -------------------- ABOUT US CMS EDITOR -------------------- */}
        {activeTab === 'about' && isModuleEnabled('about') && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>About Us CMS Editor</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '30px' }}>
              Manage corporate operating values and interactive statistics blocks appearing on the public page.
            </p>

            {pageContentLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                Retrieving dynamic records...
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }} className="split-grid">
                
                {/* operating values */}
                <div className="card-glass" style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Core Values Array</h4>
                    <button 
                      onClick={() => {
                        setPageEditIndex(null);
                        setPageItemData({ icon_name: 'ShieldCheck', title: '', desc: '', type: 'value' });
                        setShowPageModal(true);
                      }}
                      className="btn btn-secondary" 
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                    >
                      + Add Value
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Array.isArray(pageContent.values) && pageContent.values.map((val, idx) => (
                      <div key={idx} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{val.title}</strong>
                          <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Icon: {val.icon_name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => {
                              setPageEditIndex(idx);
                              setPageItemData({ ...val, type: 'value' });
                              setShowPageModal(true);
                            }}
                            className="action-btn-edit" 
                            style={{ padding: '4px 10px', fontSize: '11px' }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => {
                              setDeleteConfirm({
                                show: true,
                                title: 'Delete Core Value',
                                desc: 'Are you sure you want to permanently delete this corporate core value?',
                                onConfirm: () => {
                                  const updatedValues = Array.isArray(pageContent.values) ? [...pageContent.values] : [];
                                  updatedValues.splice(idx, 1);
                                  savePageContent({ ...pageContent, values: updatedValues });
                                  triggerToast('Core value deleted successfully!', 'error');
                                }
                              });
                            }}
                            className="action-btn-delete" 
                            style={{ padding: '4px 10px', fontSize: '11px' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Counter metrics */}
                <div className="card-glass" style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Metrics Statistics Counters</h4>
                    <button 
                      onClick={() => {
                        setPageEditIndex(null);
                        setPageItemData({ icon_name: 'Users', value: 100, suffix: '+', label: '', type: 'stat' });
                        setShowPageModal(true);
                      }}
                      className="btn btn-secondary" 
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                    >
                      + Add Counter
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Array.isArray(pageContent.stats) && pageContent.stats.map((stat, idx) => (
                      <div key={idx} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ textAlign: 'left' }}>
                          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{stat.label}</strong>
                          <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Value: {stat.value}{stat.suffix} (Icon: {stat.icon_name})</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => {
                              setPageEditIndex(idx);
                              setPageItemData({ ...stat, type: 'stat' });
                              setShowPageModal(true);
                            }}
                            className="action-btn-edit" 
                            style={{ padding: '4px 10px', fontSize: '11px' }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => {
                              setDeleteConfirm({
                                show: true,
                                title: 'Delete Metric Counter',
                                desc: 'Are you sure you want to permanently delete this metrics counter statistic?',
                                onConfirm: () => {
                                  const updatedStats = Array.isArray(pageContent.stats) ? [...pageContent.stats] : [];
                                  updatedStats.splice(idx, 1);
                                  savePageContent({ ...pageContent, stats: updatedStats });
                                  triggerToast('Metric statistic counter deleted successfully!', 'error');
                                }
                              });
                            }}
                            className="action-btn-delete" 
                            style={{ padding: '4px 10px', fontSize: '11px' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* -------------------- TEAM MEMBERS CMS MANAGEMENT -------------------- */}
        {activeTab === 'team' && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Team Members CMS</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px', margin: 0 }}>
                  Add, edit, or remove staff members, leadership positions, and roles displayed on the About page.
                </p>
              </div>
              <button 
                onClick={openCreateTeamModal}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '13.5px' }}
              >
                <Plus size={16} /> Add Team Member
              </button>
            </div>

            {/* Search filter */}
            <div style={{ marginBottom: '24px', maxWidth: '400px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  placeholder="Search by name or position/role..."
                  className="form-control"
                  style={{ paddingLeft: '38px', fontSize: '13.5px' }}
                />
              </div>
            </div>

            {teamLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                Loading team members...
              </div>
            ) : teamList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
                No team members found. Click <strong>+ Add Team Member</strong> to add a team member.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', backgroundColor: 'var(--bg-secondary)' }}>
                      <th style={{ padding: '12px 16px', fontWeight: 700 }}>Photo</th>
                      <th style={{ padding: '12px 16px', fontWeight: 700 }}>Name</th>
                      <th style={{ padding: '12px 16px', fontWeight: 700 }}>Position & Role</th>
                      <th style={{ padding: '12px 16px', fontWeight: 700 }}>Status</th>
                      <th style={{ padding: '12px 16px', fontWeight: 700 }}>Order</th>
                      <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamList
                      .filter(m => 
                        !teamSearch || 
                        m.name.toLowerCase().includes(teamSearch.toLowerCase()) || 
                        m.role.toLowerCase().includes(teamSearch.toLowerCase()) ||
                        (m.status || 'Active').toLowerCase().includes(teamSearch.toLowerCase())
                      )
                      .map((member) => {
                        const statusVal = member.status || 'Active';
                        const strokeColor = statusVal === 'Active' ? '%2310b981' : statusVal === 'Suspended' ? '%23f59e0b' : '%23ef4444';
                        const statusBadgeStyle = 
                          statusVal === 'Active' 
                            ? { backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }
                            : statusVal === 'Suspended'
                            ? { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }
                            : { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' };

                        return (
                          <tr key={member.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                {(member.image_url || member.image) ? (
                                  <img src={member.image_url || member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'var(--primary-light)' }}>
                                    {member.name ? member.name[0] : 'T'}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {member.name}
                            </td>
                            <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                              <span style={{ display: 'inline-block', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 10px', borderRadius: '12px', fontSize: '12.5px', fontWeight: 600 }}>
                                {member.role}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <select 
                                value={statusVal}
                                onChange={(e) => handleTeamStatusUpdate(member, e.target.value)}
                                style={{ 
                                  padding: '5px 30px 5px 14px', 
                                  borderRadius: '20px', 
                                  fontSize: '12px', 
                                  fontWeight: 700, 
                                  cursor: 'pointer',
                                  outline: 'none',
                                  appearance: 'none',
                                  WebkitAppearance: 'none',
                                  MozAppearance: 'none',
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='${strokeColor}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'right 10px center',
                                  ...statusBadgeStyle 
                                }}
                              >
                                <option value="Active" style={{ background: darkMode ? '#0f172a' : '#fff', color: '#10b981' }}>Active</option>
                                <option value="Suspended" style={{ background: darkMode ? '#0f172a' : '#fff', color: '#f59e0b' }}>Suspended</option>
                                <option value="Left" style={{ background: darkMode ? '#0f172a' : '#fff', color: '#ef4444' }}>Left</option>
                              </select>
                            </td>
                            <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                              {member.display_order || 0}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <button 
                                  onClick={() => openEditTeamModal(member)}
                                  className="action-btn-edit"
                                  style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                >
                                  <Edit size={12} /> Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteTeam(member.id, member.name)}
                                  className="action-btn-delete"
                                  style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                >
                                  <Trash2 size={12} /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* -------------------- WEBSITE SETTINGS CMS EDITOR -------------------- */}
        {activeTab === 'website_settings' && isModuleEnabled('settings') && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Website General Settings</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '30px' }}>
              Manage public coordinates, social profiles, contact numbers, address details, and brand identity fields.
            </p>

            {pageContentLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                Retrieving settings configuration...
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  savePageContent(pageContent);
                }} 
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: 0 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                      Company Name *
                    </label>
                    <input 
                      type="text" 
                      value={pageContent.company_name || ''} 
                      onChange={(e) => setPageContent(prev => ({ ...prev, company_name: e.target.value }))}
                      placeholder="e.g. Host2Unlimited"
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                      Support Email Address *
                    </label>
                    <input 
                      type="email" 
                      value={pageContent.email || ''} 
                      onChange={(e) => setPageContent(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. info@host2unlimited.com"
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                      Primary Support Phone *
                    </label>
                    <input 
                      type="text" 
                      value={pageContent.phone || ''} 
                      onChange={(e) => setPageContent(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. +91 70219 35273"
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                      WhatsApp Integration Number *
                    </label>
                    <input 
                      type="text" 
                      value={pageContent.whatsapp_number || ''} 
                      onChange={(e) => setPageContent(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                      placeholder="e.g. +91 81046 12974 (International format)"
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                    Corporate Address *
                  </label>
                  <input 
                    type="text" 
                    value={pageContent.address || ''} 
                    onChange={(e) => setPageContent(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter physical headquarters or business address..."
                    className="form-control"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                      Logo URL
                    </label>
                    <input 
                      type="text" 
                      value={pageContent.logo || ''} 
                      onChange={(e) => setPageContent(prev => ({ ...prev, logo: e.target.value }))}
                      placeholder="Leave blank to use default template logo"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                      Favicon URL
                    </label>
                    <input 
                      type="text" 
                      value={pageContent.favicon || ''} 
                      onChange={(e) => setPageContent(prev => ({ ...prev, favicon: e.target.value }))}
                      placeholder="Leave blank to use default favicon"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="card-glass" style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', color: 'var(--primary)' }}>Social Profiles URLs</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Facebook Link</label>
                      <input 
                        type="url" 
                        value={pageContent.social_links?.facebook || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          social_links: { ...(prev.social_links || {}), facebook: e.target.value }
                        }))}
                        placeholder="https://facebook.com/..."
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Twitter/X Link</label>
                      <input 
                        type="url" 
                        value={pageContent.social_links?.twitter || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          social_links: { ...(prev.social_links || {}), twitter: e.target.value }
                        }))}
                        placeholder="https://twitter.com/..."
                        className="form-control"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>LinkedIn Company Page</label>
                      <input 
                        type="url" 
                        value={pageContent.social_links?.linkedin || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          social_links: { ...(prev.social_links || {}), linkedin: e.target.value }
                        }))}
                        placeholder="https://linkedin.com/company/..."
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '12px 36px', borderRadius: '6px' }}>
                    Save Website Settings
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* -------------------- HOMEPAGE CMS EDITOR -------------------- */}
        {activeTab === 'homepage' && isModuleEnabled('homepage') && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Homepage Section Layout</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '30px' }}>
              Manage the hero banner introduction, CTA pitches, and title banners appearing on the front landing page.
            </p>

            {pageContentLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                Retrieving homepage configuration...
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  savePageContent(pageContent);
                }} 
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: 0 }}
              >
                {/* Hero Section */}
                <div className="card-glass" style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', color: 'var(--primary)' }}>Hero Banner Block</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Hero Badge Label *</label>
                      <input 
                        type="text" 
                        value={pageContent.hero?.badge || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          hero: { ...(prev.hero || {}), badge: e.target.value }
                        }))}
                        placeholder="e.g. ⭐ Next-Generation Digital Solutions"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Hero Main Title Heading *</label>
                      <input 
                        type="text" 
                        value={pageContent.hero?.title || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          hero: { ...(prev.hero || {}), title: e.target.value }
                        }))}
                        placeholder="Primary h1 heading on home page"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Hero Description Text *</label>
                      <textarea 
                        value={pageContent.hero?.description || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          hero: { ...(prev.hero || {}), description: e.target.value }
                        }))}
                        placeholder="Introductory body paragraph on landing page"
                        className="form-control"
                        style={{ minHeight: '80px' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="card-glass" style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', color: 'var(--primary)' }}>About Section Header</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Header Title *</label>
                      <input 
                        type="text" 
                        value={pageContent.about?.title || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          about: { ...(prev.about || {}), title: e.target.value }
                        }))}
                        placeholder="e.g. Why Businesses Choose Host2Unlimited"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Short Pitch Description *</label>
                      <textarea 
                        value={pageContent.about?.description || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          about: { ...(prev.about || {}), description: e.target.value }
                        }))}
                        placeholder="Description supporting the choice/why choose section"
                        className="form-control"
                        style={{ minHeight: '60px' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Services Section */}
                <div className="card-glass" style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', color: 'var(--primary)' }}>Services Section Header</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Header Title *</label>
                      <input 
                        type="text" 
                        value={pageContent.services?.title || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          services: { ...(prev.services || {}), title: e.target.value }
                        }))}
                        placeholder="e.g. Core Engineering Capabilities"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Short Pitch Description *</label>
                      <textarea 
                        value={pageContent.services?.description || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          services: { ...(prev.services || {}), description: e.target.value }
                        }))}
                        placeholder="Description supporting services grid banner"
                        className="form-control"
                        style={{ minHeight: '60px' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="card-glass" style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', color: 'var(--primary)' }}>CTA Pitch Block</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Action Header Title *</label>
                      <input 
                        type="text" 
                        value={pageContent.cta?.title || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          cta: { ...(prev.cta || {}), title: e.target.value }
                        }))}
                        placeholder="e.g. Ready to Build Your Digital Future?"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-muted)' }}>Description Text *</label>
                      <textarea 
                        value={pageContent.cta?.description || ''} 
                        onChange={(e) => setPageContent(prev => ({
                          ...prev,
                          cta: { ...(prev.cta || {}), description: e.target.value }
                        }))}
                        placeholder="CTA card description text inviting leads"
                        className="form-control"
                        style={{ minHeight: '60px' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '12px 36px', borderRadius: '6px' }}>
                    Save Homepage Sections
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* -------------------- SEO SETTINGS CMS EDITOR -------------------- */}
        {activeTab === 'seo' && isModuleEnabled('seo') && (
          <div className="card-glass" style={{ padding: '30px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Global Search Engine Optimization (SEO) CMS</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '30px' }}>
              Manage search engine indexing, keywords, meta tags, and Open Graph previews for each major public sub-page.
            </p>

            {pageContentLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                Retrieving SEO metadata...
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  savePageContent(pageContent);
                }} 
                style={{ display: 'flex', flexDirection: 'column', gap: '30px', margin: 0 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {['homepage', 'about', 'services', 'careers', 'portfolio'].map((key) => {
                    const sectionData = pageContent[key] || { meta_title: '', meta_desc: '', keywords: '', canonical_url: '', og_image: '' };
                    return (
                      <div 
                        key={key} 
                        className="card-glass" 
                        style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                      >
                        <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>
                          {key.replace('_', ' ')} SEO Meta tags
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '15px' }} className="form-grid-2">
                          <div>
                            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                              Meta Title Tag *
                            </label>
                            <input 
                              type="text" 
                              value={sectionData.meta_title || ''} 
                              onChange={(e) => {
                                const section = { ...sectionData, meta_title: e.target.value };
                                setPageContent(prev => ({ ...prev, [key]: section }));
                              }}
                              placeholder="e.g. Page Title | Branding Pitch (Keep under 60 characters)"
                              className="form-control"
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                              Canonical URL *
                            </label>
                            <input 
                              type="text" 
                              value={sectionData.canonical_url || ''} 
                              onChange={(e) => {
                                const section = { ...sectionData, canonical_url: e.target.value };
                                setPageContent(prev => ({ ...prev, [key]: section }));
                              }}
                              placeholder="e.g. https://host2unlimited.com/page"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }} className="form-grid-2">
                          <div>
                            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                              SEO Focus Keywords *
                            </label>
                            <input 
                              type="text" 
                              value={sectionData.keywords || ''} 
                              onChange={(e) => {
                                const section = { ...sectionData, keywords: e.target.value };
                                setPageContent(prev => ({ ...prev, [key]: section }));
                              }}
                              placeholder="e.g. key1, key2, key3 (comma separated list)"
                              className="form-control"
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                              Open Graph (OG) Image URL
                            </label>
                            <input 
                              type="text" 
                              value={sectionData.og_image || ''} 
                              onChange={(e) => {
                                const section = { ...sectionData, og_image: e.target.value };
                                setPageContent(prev => ({ ...prev, [key]: section }));
                              }}
                              placeholder="Social preview image source link"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                            Meta Description Tag * (Recommended 150-160 characters)
                          </label>
                          <textarea 
                            value={sectionData.meta_desc || ''} 
                            onChange={(e) => {
                              const section = { ...sectionData, meta_desc: e.target.value };
                              setPageContent(prev => ({ ...prev, [key]: section }));
                            }}
                            placeholder="Enter description search engines will show below the title..."
                            className="form-control"
                            style={{ minHeight: '60px' }}
                            required
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ padding: '12px 36px', borderRadius: '6px' }}
                  >
                    Save SEO Metadata
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>

      {/* -------------------- CREATE/EDIT BLOG FORM MODAL -------------------- */}
      {showFormModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: darkMode ? 'rgba(5, 8, 22, 0.9)' : 'rgba(240, 244, 250, 0.9)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px',
          overflow: 'hidden'
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="card-glass" 
            style={{
              maxWidth: '920px',
              width: '100%',
              maxHeight: '92vh',
              overflow: 'hidden',
              padding: '0',
              textAlign: 'left',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: darkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)' : '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
              borderRadius: '16px',
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 12, 30, 0.98) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)'
            }}
          >
            {/* Glow Header Accent Banner */}
            <div style={{ height: '4px', background: 'var(--grad-primary)', width: '100%', flexShrink: 0 }} />

            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '24px 32px 20px 32px', flexShrink: 0, backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)', zIndex: 5 }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: darkMode ? '#f8fafc' : 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                  {formMode === 'create' ? 'Draft New Blog Article' : 'Modify Existing Article'}
                </h2>
                <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Publish rich text insights directly to the public reader.</span>
              </div>
              <button 
                onClick={() => setShowFormModal(false)}
                style={{ background: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', transition: 'all var(--transition-fast)' }}
                className="modal-close-hover"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flexGrow: 1, margin: 0 }}>
              
              {/* Scrollable Form Fields Wrapper */}
              <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 32px 24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Errors & Success */}
                {formError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <AlertCircle size={16} /> {formError}
                  </div>
                )}
                {formSuccess && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px 16px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 600, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <Check size={16} /> {formSuccess}
                  </div>
                )}

                {/* Title & Slug */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }} className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                      Title * <span style={{ fontSize: '10.5px', textTransform: 'none', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '4px' }}>(e.g. "Why Vite is the Standard for Modern SaaS")</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter catchy article title..."
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="form-control"
                      style={{ background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                      URL Slug * <span style={{ fontSize: '10.5px', textTransform: 'none', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '4px' }}>(e.g. "vite-standard-modern-saas")</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. why-vite-react-standard-2026"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                      className="form-control"
                      style={{ background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                      required
                    />
                  </div>
                </div>

                {/* Meta row: Category, Author, Read Time, Status, Publish Date */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }} className="form-grid-4">
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                      Category <span style={{ fontSize: '10px', textTransform: 'none', fontWeight: 500, color: 'var(--text-muted)' }}>(Topic)</span>
                    </label>
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control"
                      style={{ height: '42px', padding: '0 12px', background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="SEO">SEO</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Technology">Technology</option>
                      <option value="Case Studies">Case Studies</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                      Author * <span style={{ fontSize: '10px', textTransform: 'none', fontWeight: 500, color: 'var(--text-muted)' }}>(e.g. "Jane Doe")</span>
                    </label>
                    <input 
                      type="text" 
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="form-control"
                      style={{ background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                      Read Time <span style={{ fontSize: '10px', textTransform: 'none', fontWeight: 500, color: 'var(--text-muted)' }}>(e.g. "5 min read")</span>
                    </label>
                    <input 
                      type="text" 
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="form-control"
                      style={{ background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                      Status State <span style={{ fontSize: '10px', textTransform: 'none', fontWeight: 500, color: 'var(--text-muted)' }}>(Visibility)</span>
                    </label>
                    <select 
                      value={status} 
                      onChange={(e) => setStatus(e.target.value)}
                      className="form-control"
                      style={{ height: '42px', padding: '0 12px', background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                    >
                      <option value="Draft">Draft (Hidden)</option>
                      <option value="Published">Published (Visible)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                      Publish Date & Time <span style={{ fontSize: '10px', textTransform: 'none', fontWeight: 500, color: 'var(--text-muted)' }}>(Scheduling)</span>
                    </label>
                    <input 
                      type="datetime-local" 
                      value={publishedAt}
                      onChange={(e) => setPublishedAt(e.target.value)}
                      className="form-control"
                      style={{ height: '42px', background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)', color: darkMode ? '#fff' : '#000', colorScheme: darkMode ? 'dark' : 'light' }}
                    />
                  </div>
                </div>

                {/* Image URL & Upload */}
                <div style={{ border: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '20px', borderRadius: '12px', background: darkMode ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)' }}>
                  <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', color: 'var(--primary)', letterSpacing: '0.5px' }}>Featured Cover Image</span>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="image-inputs">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                          Image Web Address URL <span style={{ fontSize: '9.5px', fontWeight: 500, textTransform: 'none', color: 'var(--text-muted)' }}>(e.g. "https://images.unsplash.com/photo-...")</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="Paste image address (Unsplash, CDN etc)..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="form-control"
                          style={{ background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                        />
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ height: '1px', backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)', flexGrow: 1 }} />
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>OR UPLOAD FILE</span>
                        <div style={{ height: '1px', backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)', flexGrow: 1 }} />
                      </div>
                      
                      <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'blog')}
                          style={{ display: 'none' }}
                          id="image-file-picker"
                        />
                        <label 
                          htmlFor="image-file-picker" 
                          className="btn file-upload-hover" 
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', border: darkMode ? '1px dashed rgba(255, 255, 255, 0.15)' : '1px dashed rgba(15, 23, 42, 0.15)', backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)', cursor: 'pointer', height: '42px', fontSize: '13.5px', borderRadius: '6px', transition: 'all var(--transition-fast)' }}
                        >
                          <Upload size={14} style={{ color: 'var(--primary)' }} /> {uploadingImage ? 'Uploading to Live Storage...' : 'Browse Local Image...'}
                        </label>
                      </div>
                    </div>

                    {/* Preview box */}
                    <div style={{ border: darkMode ? '1px dashed rgba(255, 255, 255, 0.1)' : '1px dashed rgba(15, 23, 42, 0.1)', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)', minHeight: '120px' }}>
                      {imageUrl ? (
                        <img 
                          src={imageUrl.startsWith('http') ? imageUrl : `${ACTIVE_API_BASE}${imageUrl}`} 
                          alt="Preview" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <EyeOff size={24} style={{ opacity: 0.4 }} />
                          <span style={{ fontSize: '11px', fontWeight: 600 }}>No Cover Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Markup & Custom Rich Text Editor */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: darkMode ? '#f8fafc' : 'var(--text-primary)', margin: 0, letterSpacing: '0.5px' }}>
                      Content Body * <span style={{ fontSize: '10.5px', textTransform: 'none', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '4px' }}>(Write detailed article content using tools)</span>
                    </label>
                    
                    {/* Editor / Preview toggle pill capsule */}
                    <div style={{ display: 'flex', gap: '2px', backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)', padding: '3px', borderRadius: '20px', border: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)' }}>
                      <button
                        type="button"
                        onClick={() => setEditorPreviewMode(false)}
                        style={{
                          padding: '6px 14px', fontSize: '11px', border: 'none', borderRadius: '15px', cursor: 'pointer',
                          fontWeight: 700,
                          backgroundColor: !editorPreviewMode ? 'var(--primary)' : 'transparent',
                          color: !editorPreviewMode ? 'white' : 'var(--text-secondary)',
                          transition: 'all var(--transition-fast)',
                          boxShadow: !editorPreviewMode ? '0 2px 8px rgba(37, 99, 235, 0.4)' : 'none'
                        }}
                      >
                        Write HTML/Markup
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditorPreviewMode(true)}
                        style={{
                          padding: '6px 14px', fontSize: '11px', border: 'none', borderRadius: '15px', cursor: 'pointer',
                          fontWeight: 700,
                          backgroundColor: editorPreviewMode ? 'var(--primary)' : 'transparent',
                          color: editorPreviewMode ? 'white' : 'var(--text-secondary)',
                          transition: 'all var(--transition-fast)',
                          boxShadow: editorPreviewMode ? '0 2px 8px rgba(37, 99, 235, 0.4)' : 'none'
                        }}
                      >
                        Visual Preview
                      </button>
                    </div>
                  </div>

                  {/* Rich Text Custom Toolbar */}
                  {!editorPreviewMode && (
                    <div style={{ display: 'flex', gap: '4px', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)', borderBottom: 'none', padding: '8px', backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.03)', borderRadius: '8px 8px 0 0', flexWrap: 'wrap', alignItems: 'center' }}>
                      <button type="button" onClick={() => insertFormat('<strong>', '</strong>')} className="toolbar-btn" title="Bold"><span style={{ fontWeight: 700, fontSize: '15px' }}>B</span></button>
                      <button type="button" onClick={() => insertFormat('<em>', '</em>')} className="toolbar-btn" title="Italic"><span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '15px' }}>I</span></button>
                      <button type="button" onClick={() => insertFormat('<u>', '</u>')} className="toolbar-btn" title="Underline"><span style={{ textDecoration: 'underline', fontWeight: 600, fontSize: '15px' }}>U</span></button>
                      <div style={{ width: '1px', height: '22px', backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)', margin: '0 6px' }} />
                      <button type="button" onClick={() => insertFormat('<h2>', '</h2>')} className="toolbar-btn" title="Heading 2"><span style={{ fontWeight: 700, fontSize: '12.5px' }}>H2</span></button>
                      <button type="button" onClick={() => insertFormat('<h3>', '</h3>')} className="toolbar-btn" title="Heading 3"><span style={{ fontWeight: 700, fontSize: '12.5px' }}>H3</span></button>
                      <div style={{ width: '1px', height: '22px', backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)', margin: '0 6px' }} />
                      <button type="button" onClick={() => insertFormat('<blockquote>', '</blockquote>')} className="toolbar-btn" title="Blockquote"><Quote size={15} strokeWidth={2.5} /></button>
                      <button type="button" onClick={() => insertFormat('<ul>\n  <li>', '</li>\n</ul>')} className="toolbar-btn" title="Unordered List"><List size={16} strokeWidth={2.5} /></button>
                      <button type="button" onClick={() => insertFormat('<ol>\n  <li>', '</li>\n</ol>')} className="toolbar-btn" title="Ordered List"><ListOrdered size={16} strokeWidth={2.5} /></button>
                    </div>
                  )}

                  {/* Editor display or Live preview */}
                  {editorPreviewMode ? (
                    <div 
                      className="blog-content-body" 
                      dangerouslySetInnerHTML={{ __html: content || '<p style="color:#64748b; font-style:italic; text-align:center; padding: 20px 0;">Start writing in the code editor to generate visual structures.</p>' }}
                      style={{
                        border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)',
                        padding: '20px',
                        borderRadius: '8px',
                        minHeight: '260px',
                        maxHeight: '320px',
                        overflowY: 'auto',
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)',
                        fontSize: '15.5px',
                        lineHeight: '1.7',
                        textAlign: 'left',
                        color: darkMode ? '#cbd5e1' : '#334155'
                      }}
                    />
                  ) : (
                    <textarea 
                      id="blog-content-editor"
                      placeholder="Compose your article body. You can use standard HTML formatting tags or the formatting toolbar buttons above..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="form-control"
                      style={{
                        minHeight: '260px',
                        maxHeight: '320px',
                        borderRadius: '0 0 8px 8px',
                        fontFamily: 'monospace',
                        fontSize: '13.5px',
                        lineHeight: '1.6',
                        padding: '16px',
                        background: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
                        border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)'
                      }}
                      required
                    />
                  )}
                </div>

                {/* Tags & SEO block */}
                <div style={{ border: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '20px', borderRadius: '12px', background: darkMode ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>SEO Metrics & Metadata</span>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Tags (Comma separated) <span style={{ fontSize: '9.5px', fontWeight: 500, textTransform: 'none', color: 'var(--text-muted)' }}>(e.g. "react, optimization, web-dev")</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. vite, react, saas, coding"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="form-control"
                      style={{ background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }} className="form-grid-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                        SEO Page Title <span style={{ fontSize: '9.5px', fontWeight: 500, textTransform: 'none', color: 'var(--text-muted)' }}>(e.g. "React SEO Guide | Host2Unlimited")</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="Google Search title block..."
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        className="form-control"
                        style={{ background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                        Meta Search Description <span style={{ fontSize: '9.5px', fontWeight: 500, textTransform: 'none', color: 'var(--text-muted)' }}>(e.g. "Discover why React build optimizations boost ranking...")</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="Brief search indexing snippet description..."
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        className="form-control"
                        style={{ background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.1)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

                {/* Submit Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '16px 32px 24px 32px', flexShrink: 0, margin: 0, backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)', zIndex: 5 }}>
                  <button 
                    type="button" 
                    onClick={() => setShowFormModal(false)}
                    className="btn btn-secondary"
                    style={{ padding: '12px 28px', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '6px' }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ padding: '12px 36px', borderRadius: '6px' }}
                  >
                    Save Changes
                  </button>
                </div>

              </form>
          </motion.div>
        </div>
      )}

      {/* -------------------- CREATE/EDIT SERVICE FORM MODAL -------------------- */}
      {showServiceModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: darkMode ? 'rgba(5, 8, 22, 0.9)' : 'rgba(240, 244, 250, 0.9)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px',
          overflow: 'hidden'
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="card-glass" 
            style={{
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              padding: '0',
              textAlign: 'left',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: darkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)' : '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
              borderRadius: '16px',
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 12, 30, 0.98) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)'
            }}
          >
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '24px 32px 20px 32px', flexShrink: 0, backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)', zIndex: 5 }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: darkMode ? '#f8fafc' : 'var(--text-primary)' }}>
                {serviceFormMode === 'create' ? 'Register New Service Catalog' : 'Modify Existing Service Parameters'}
              </h2>
              <button 
                onClick={() => setShowServiceModal(false)}
                style={{ background: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', transition: 'all var(--transition-fast)' }}
                className="modal-close-hover"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleServiceSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flexGrow: 1, margin: 0 }}>
              
              {/* Scrollable Form Fields Wrapper */}
              <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 32px 24px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Errors & Success */}
              {serviceError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '13.5px', fontWeight: 600 }}>
                  <AlertCircle size={16} /> {serviceError}
                </div>
              )}
              {serviceSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '13.5px', fontWeight: 600 }}>
                  <Check size={16} /> {serviceSuccess}
                </div>
              )}

              {/* Title, Slug & Icon Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr', gap: '20px' }} className="form-grid-3">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>Service Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Technical SEO consulting..."
                    value={serviceTitle}
                    onChange={(e) => handleServiceTitleChange(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>URL Slug *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. technical-seo"
                    value={serviceSlug}
                    onChange={(e) => setServiceSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="form-control"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>Lucide Icon</label>
                  <select 
                    value={serviceIcon} 
                    onChange={(e) => setServiceIcon(e.target.value)}
                    className="form-control"
                    style={{ height: '42px', padding: '0 12px' }}
                  >
                    <option value="Globe">Globe (Web)</option>
                    <option value="Cpu">Cpu (Software)</option>
                    <option value="Cloud">Cloud (Hosting)</option>
                    <option value="LineChart">LineChart (SEO)</option>
                    <option value="Megaphone">Megaphone (Marketing)</option>
                    <option value="ShoppingCart">ShoppingCart (Store)</option>
                    <option value="Shield">Shield (Security)</option>
                    <option value="Users">Users (Team)</option>
                    <option value="Settings">Settings (Automations)</option>
                  </select>
                </div>
              </div>

              {/* Service Description */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>Overview Description *</label>
                <textarea 
                  placeholder="Detail the value proposition, delivery methods, and benefits of this service..."
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  className="form-control"
                  style={{ minHeight: '100px', padding: '12px' }}
                  required
                />
              </div>

              {/* Service Banner configuration */}
              <div style={{ border: '1px solid var(--border-color)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px', color: 'var(--text-primary)' }}>Service Header Banner Image</span>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }} className="image-inputs">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>Banner Image URL</label>
                    <input 
                      type="text" 
                      placeholder="Paste image address (Unsplash, CDN etc)..."
                      value={serviceBanner}
                      onChange={(e) => setServiceBanner(e.target.value)}
                      className="form-control"
                    />
                    
                    <span style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-muted)', textAlign: 'center', margin: '8px 0' }}>— OR UPLOAD LOCAL FILE —</span>
                    
                    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'service')}
                        style={{ display: 'none' }}
                        id="service-banner-picker"
                      />
                      <label 
                        htmlFor="service-banner-picker" 
                        className="btn" 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', border: '1px dashed var(--border-color)', backgroundColor: 'var(--bg-secondary)', cursor: 'pointer', height: '42px', fontSize: '13.5px' }}
                      >
                        <Upload size={14} /> {uploadingBanner ? 'Uploading to Live Storage...' : 'Browse Local Image...'}
                      </label>
                    </div>
                  </div>

                  {/* Preview box */}
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', minHeight: '110px' }}>
                    {serviceBanner ? (
                      <img 
                        src={serviceBanner.startsWith('http') ? serviceBanner : `${ACTIVE_API_BASE}${serviceBanner}`} 
                        alt="Banner Preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Banner Preview</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Core Features Interactive checklist builder */}
              <div style={{ border: '1px solid var(--border-color)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px', color: 'var(--text-primary)' }}>Interactive Features Checklist</span>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input 
                    type="text" 
                    placeholder="Enter feature bullet point (e.g. technical audits)..."
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    className="form-control"
                    style={{ flexGrow: 1 }}
                  />
                  <button 
                    type="button" 
                    onClick={addFeature}
                    className="btn btn-secondary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', height: '42px', padding: '0 16px' }}
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>

                {serviceFeatures.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '140px', overflowY: 'auto', padding: '6px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)' }}>
                    {serviceFeatures.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '13.5px' }}>
                        <span>• {feat}</span>
                        <button 
                          type="button" 
                          onClick={() => removeFeature(idx)}
                          style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No features added yet. Include at least 3 features.</span>
                )}
              </div>

              {/* Dynamic Accordion FAQs builder */}
              <div style={{ border: '1px solid var(--border-color)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px', color: 'var(--text-primary)' }}>accordion FAQ Builders</span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  <input 
                    type="text" 
                    placeholder="Enter FAQ Question..."
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const answerTextarea = document.querySelector('textarea[placeholder="Enter FAQ Answer..."]');
                        if (answerTextarea) answerTextarea.focus();
                      }
                    }}
                    className="form-control"
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <textarea 
                      placeholder="Enter FAQ Answer..."
                      value={newFaqA}
                      onChange={(e) => setNewFaqA(e.target.value)}
                      className="form-control"
                      style={{ flexGrow: 1, minHeight: '60px', padding: '8px' }}
                    />
                    <button 
                      type="button" 
                      onClick={addFaq}
                      className="btn btn-secondary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', height: '60px', padding: '0 16px', alignSelf: 'flex-end' }}
                    >
                      <Plus size={14} /> Insert FAQ
                    </button>
                  </div>
                </div>

                {serviceFaqs.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto', padding: '6px', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)' }}>
                    {serviceFaqs.map((faq, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 12px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '13.5px', gap: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                          <strong>Q: {faq.question}</strong>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>A: {faq.answer}</span>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeFaq(idx)}
                          style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', marginTop: '2px' }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No FAQs created yet.</span>
                )}
              </div>

              {/* SEO block */}
              <div style={{ border: '1px solid var(--border-color)', padding: '16px', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)' }}>SEO Metrics & Metadata</span>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '15px' }} className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>SEO Page Title</label>
                    <input 
                      type="text" 
                      placeholder="Google Search title block..."
                      value={serviceSeoTitle}
                      onChange={(e) => setServiceSeoTitle(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>Meta Search Description</label>
                    <input 
                      type="text" 
                      placeholder="Brief search indexing snippet description..."
                      value={serviceMetaDesc}
                      onChange={(e) => setServiceMetaDesc(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '16px 32px 24px 32px', flexShrink: 0, margin: 0, backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)', zIndex: 5 }}>
                <button 
                  type="button" 
                  onClick={() => setShowServiceModal(false)}
                  className="btn btn-secondary"
                  style={{ padding: '12px 28px', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '6px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '12px 36px', borderRadius: '6px' }}
                >
                  Save Catalog
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

      {/* -------------------- DYNAMIC UNIVERSAL CMS PAGE MODAL -------------------- */}
      {showPageModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: darkMode ? 'rgba(5, 8, 22, 0.9)' : 'rgba(240, 244, 250, 0.9)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px',
          overflow: 'hidden'
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="card-glass" 
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '85vh',
              overflow: 'hidden',
              padding: '0',
              textAlign: 'left',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: darkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)' : '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
              borderRadius: '16px',
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 12, 30, 0.98) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '24px 32px 20px 32px', flexShrink: 0, backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)', zIndex: 5 }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: darkMode ? '#f8fafc' : 'var(--text-primary)' }}>
                {pageEditIndex !== null ? 'Modify Record' : 'Create Record'}
              </h2>
              <button 
                onClick={() => setShowPageModal(false)}
                style={{ background: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', transition: 'all var(--transition-fast)' }}
                className="modal-close-hover"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePageItemSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flexGrow: 1, margin: 0 }}>
              
              {/* Scrollable Form Fields Wrapper */}
              <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 32px 24px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* solutions */}
              {activeTab === 'solutions' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Title *</label>
                      <input 
                        type="text" 
                        value={pageItemData.title || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, title: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Enterprise Cloud Architecture (Header label for the solution card)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Subtitle *</label>
                      <input 
                        type="text" 
                        value={pageItemData.subtitle || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, subtitle: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Scalable microservices for modern enterprise growth"
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Lucide Icon Name *</label>
                    <select 
                      value={pageItemData.icon_name || 'Globe'} 
                      onChange={(e) => setPageItemData({ ...pageItemData, icon_name: e.target.value })} 
                      className="form-control"
                    >
                      <option value="Building2">Building2 (Office)</option>
                      <option value="Rocket">Rocket (Startup)</option>
                      <option value="ShoppingBag">ShoppingBag (Retail)</option>
                      <option value="GraduationCap">GraduationCap (Education)</option>
                      <option value="Brain">Brain (AI/ML)</option>
                      <option value="Globe">Globe (Web)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Description *</label>
                    <textarea 
                      value={pageItemData.desc || ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, desc: e.target.value })} 
                      className="form-control" 
                      style={{ minHeight: '80px' }}
                      placeholder="Enter a detailed description of the solution vertical, why it is used, and how it helps the customer..."
                      required 
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Bullets Section Title *</label>
                      <input 
                        type="text" 
                        value={pageItemData.bulletTitle || 'Key Focus Areas:'} 
                        onChange={(e) => setPageItemData({ ...pageItemData, bulletTitle: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Key focus metrics: (Title printed above bullet list)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Bullets (Comma separated)</label>
                      <input 
                        type="text" 
                        value={Array.isArray(pageItemData.bullets) ? pageItemData.bullets.join(', ') : ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, bullets: e.target.value.split(',').map(s => s.trim()) })} 
                        className="form-control" 
                        placeholder="e.g. Migration audits, 99.9% reliability, custom CDN sync (helps list highlights)" 
                      />
                    </div>
                  </div>
                </>
              )}

              {/* portfolio */}
              {activeTab === 'portfolio' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Project Name *</label>
                      <input 
                        type="text" 
                        value={pageItemData.title || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, title: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Apex Global Logistics Platform (What is the project called)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Client Name *</label>
                      <input 
                        type="text" 
                        value={pageItemData.client || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, client: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Apex Cargo Corp (Name of the customer company)"
                        required 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Category *</label>
                      <input 
                        type="text" 
                        value={pageItemData.category || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, category: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. E-Commerce Development (For categorization tags)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Cover Image URL *</label>
                      <input 
                        type="text" 
                        value={pageItemData.image || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, image: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. https://images.unsplash.com/... or /uploads/portfolio.jpg (Feature cover graphic)"
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Description *</label>
                    <textarea 
                      value={pageItemData.desc || ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, desc: e.target.value })} 
                      className="form-control" 
                      style={{ minHeight: '80px' }}
                      placeholder="Explain what the project is, why it was developed, and what technical values were delivered to the client..."
                      required 
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Project URL</label>
                      <input 
                        type="text" 
                        value={pageItemData.link || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, link: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. https://apexlogistics.com (Live web address of the project)"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Technologies (Comma separated)</label>
                      <input 
                        type="text" 
                        value={Array.isArray(pageItemData.tech) ? pageItemData.tech.join(', ') : ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, tech: e.target.value.split(',').map(s => s.trim()) })} 
                        className="form-control" 
                        placeholder="e.g. React, Node.js, AWS, MySQL (Lists the stacks used)" 
                      />
                    </div>
                  </div>
                </>
              )}

              {/* case studies */}
              {activeTab === 'case_studies' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Study Title *</label>
                      <input 
                        type="text" 
                        value={pageItemData.title || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, title: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Scaling Database Syncing to 1M Daily Transactions"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Client Name *</label>
                      <input 
                        type="text" 
                        value={pageItemData.client || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, client: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. SwiftBuy Financials"
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Challenge Overview *</label>
                    <textarea 
                      value={pageItemData.challenge || ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, challenge: e.target.value })} 
                      className="form-control" 
                      style={{ minHeight: '60px' }}
                      placeholder="Detail the technical or architectural challenge/bottleneck that the client faced (e.g. legacy monolithic server locks)..."
                      required 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Solution Implemented *</label>
                    <textarea 
                      value={pageItemData.solution || ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, solution: e.target.value })} 
                      className="form-control" 
                      style={{ minHeight: '60px' }}
                      placeholder="Detail the strategy and technical stack deployed to solve this challenge (e.g. migrated database to a master-replica configuration)..."
                      required 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Results Deployed *</label>
                    <textarea 
                      value={pageItemData.results || ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, results: e.target.value })} 
                      className="form-control" 
                      style={{ minHeight: '60px' }}
                      placeholder="Detail the metrics, efficiency gains, and improvements achieved (e.g. database sync time reduced by 85%)..."
                      required 
                    />
                  </div>
                </>
              )}

              {/* pricing */}
              {activeTab === 'pricing' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Package Name *</label>
                      <input 
                        type="text" 
                        value={pageItemData.name || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, name: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Enterprise Managed Hosting (Plan title card)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Price Tag *</label>
                      <input 
                        type="text" 
                        value={pageItemData.price || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, price: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. $299 / month or custom quote"
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Overview Description *</label>
                    <input 
                      type="text" 
                      value={pageItemData.desc || ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, desc: e.target.value })} 
                      className="form-control" 
                      placeholder="Explain who this plan is tailored for (e.g. built for scaling medium-sized e-commerce shops)..."
                      required 
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="checkbox" 
                      id="pricing-badge" 
                      checked={!!pageItemData.popular} 
                      onChange={(e) => setPageItemData({ ...pageItemData, popular: e.target.checked })} 
                      style={{ width: '18px', height: '18px' }} 
                    />
                    <label htmlFor="pricing-badge" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>Highlight as Popular Package</label>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Features List (Comma separated)</label>
                    <input 
                      type="text" 
                      value={Array.isArray(pageItemData.features) ? pageItemData.features.join(', ') : ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, features: e.target.value.split(',').map(s => s.trim()) })} 
                      className="form-control" 
                      placeholder="e.g. 100 GB SSD Space, 24/7 SLA Phone Support, Premium Firewalls (list of deliverables)" 
                    />
                  </div>
                </>
              )}

              {/* careers */}
              {activeTab === 'careers' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Job Title *</label>
                      <input 
                        type="text" 
                        value={pageItemData.title || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, title: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Senior Frontend Engineer (React / Next.js)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Department Name *</label>
                      <input 
                        type="text" 
                        value={pageItemData.department || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, department: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Product Engineering & UI Development"
                        required 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Location *</label>
                      <input 
                        type="text" 
                        value={pageItemData.location || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, location: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. New York, NY (Hybrid remote allowed)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Employment Type (e.g. Full-Time) *</label>
                      <input 
                        type="text" 
                        value={pageItemData.type || 'Full-Time'} 
                        onChange={(e) => setPageItemData({ ...pageItemData, type: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Full-Time / Part-Time / Contract"
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Requirements (Comma separated)</label>
                    <input 
                      type="text" 
                      value={Array.isArray(pageItemData.requirements) ? pageItemData.requirements.join(', ') : ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, requirements: e.target.value.split(',').map(s => s.trim()) })} 
                      className="form-control" 
                      placeholder="e.g. React Native, AWS EC2, Git workflow, REST API design (skills expected)" 
                    />
                  </div>
                </>
              )}

              {/* about core values & counters */}
              {activeTab === 'about' && pageItemData.type === 'value' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Core Value Title *</label>
                      <input 
                        type="text" 
                        value={pageItemData.title || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, title: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Absolute Transparency (Value banner header)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Icon Name *</label>
                      <input 
                        type="text" 
                        value={pageItemData.icon_name || 'ShieldCheck'} 
                        onChange={(e) => setPageItemData({ ...pageItemData, icon_name: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. ShieldCheck / Users / Rocket (Lucide Icon name)"
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Overview Description *</label>
                    <textarea 
                      value={pageItemData.desc || ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, desc: e.target.value })} 
                      className="form-control" 
                      style={{ minHeight: '80px' }}
                      placeholder="Explain how this value impacts clients (e.g. We provide real-time uptime counters on our main page)..."
                      required 
                    />
                  </div>
                </>
              )}

              {activeTab === 'about' && pageItemData.type === 'stat' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Metric Label *</label>
                      <input 
                        type="text" 
                        value={pageItemData.label || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, label: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Enterprise Websites Maintained (What statistic are we showing)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Icon Name *</label>
                      <input 
                        type="text" 
                        value={pageItemData.icon_name || 'Users'} 
                        onChange={(e) => setPageItemData({ ...pageItemData, icon_name: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Users / Globe / Server (Lucide Icon name)"
                        required 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Numeric Value *</label>
                      <input 
                        type="number" 
                        value={pageItemData.value || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, value: parseInt(e.target.value) || 0 })} 
                        className="form-control" 
                        placeholder="e.g. 500 (Statistical count digits only)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Suffix (e.g. +, %)</label>
                      <input 
                        type="text" 
                        value={pageItemData.suffix || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, suffix: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. + / % / M (Unit display suffix)"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* testimonials */}
              {activeTab === 'testimonials' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Client Name *</label>
                      <input 
                        type="text" 
                        value={pageItemData.name || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, name: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Robert Chen (Who is reviewing the company)"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Company Name *</label>
                      <input 
                        type="text" 
                        value={pageItemData.company || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, company: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. TechFlow Micro Systems (Client company name)"
                        required 
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Designation *</label>
                      <input 
                        type="text" 
                        value={pageItemData.designation || ''} 
                        onChange={(e) => setPageItemData({ ...pageItemData, designation: e.target.value })} 
                        className="form-control" 
                        placeholder="e.g. Director of Infrastructure Engineering"
                        required 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Rating Score *</label>
                      <select 
                        value={pageItemData.rating || 5} 
                        onChange={(e) => setPageItemData({ ...pageItemData, rating: parseInt(e.target.value) })} 
                        className="form-control"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Avatar / Photo URL</label>
                    <input 
                      type="text" 
                      value={pageItemData.photo || ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, photo: e.target.value })} 
                      className="form-control" 
                      placeholder="e.g. https://images.unsplash.com/... or /uploads/avatar.jpg (User display profile photo)"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Review Quote *</label>
                    <textarea 
                      value={pageItemData.review || ''} 
                      onChange={(e) => setPageItemData({ ...pageItemData, review: e.target.value })} 
                      className="form-control" 
                      style={{ minHeight: '80px' }}
                      placeholder="Enter the detailed review/quote testimonial text from the customer client..."
                      required 
                    />
                  </div>
                </>
              )}

              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '16px 32px 24px 32px', flexShrink: 0, margin: 0, backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)', zIndex: 5 }}>
                <button 
                  type="button" 
                  onClick={() => setShowPageModal(false)}
                  className="btn btn-secondary"
                  style={{ padding: '12px 28px', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.15)', borderRadius: '6px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '12px 36px', borderRadius: '6px' }}
                >
                  Save Changes
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

      {/* -------------------- TOAST NOTIFICATION OVERLAY -------------------- */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              padding: '16px 20px',
              borderRadius: '12px',
              border: toast.type === 'error' ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid rgba(16, 185, 129, 0.25)',
              backgroundColor: toast.type === 'error' 
                ? (darkMode ? 'rgba(24, 18, 18, 0.95)' : 'rgba(254, 242, 242, 0.97)')
                : (darkMode ? 'rgba(18, 24, 20, 0.95)' : 'rgba(240, 253, 244, 0.97)'),
              backdropFilter: 'blur(16px)',
              boxShadow: toast.type === 'error' 
                ? '0 10px 30px -10px rgba(239, 68, 68, 0.2)' 
                : '0 10px 30px -10px rgba(16, 185, 129, 0.2)',
              color: toast.type === 'error' 
                ? (darkMode ? '#fca5a5' : '#dc2626') 
                : (darkMode ? '#a7f3d0' : '#15803d'),
              fontWeight: 600,
              fontSize: '14.5px',
              maxWidth: '380px',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {toast.type === 'error' ? <AlertCircle size={20} style={{ flexShrink: 0 }} /> : <Check size={20} style={{ flexShrink: 0 }} />}
              <span style={{ lineHeight: '1.4' }}>{toast.message}</span>
            </div>
            
            <button 
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
              style={{
                background: 'transparent',
                border: 'none',
                color: toast.type === 'error' 
                  ? (darkMode ? '#fca5a5' : '#dc2626') 
                  : (darkMode ? '#a7f3d0' : '#15803d'),
                opacity: 0.7,
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s, background-color 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; }}
              onMouseOut={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <X size={14} />
            </button>

            {/* Glowing progress bar indicator that shrinks */}
            <motion.div
              key={toast.message}
              initial={{ width: '100%' }}
              animate={{ width: 0 }}
              transition={{ duration: 4.5, ease: 'linear' }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '3.5px',
                backgroundColor: toast.type === 'error' ? '#ef4444' : '#10b981',
                boxShadow: toast.type === 'error' ? '0 0 8px #ef4444' : '0 0 8px #10b981'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------- TEAM MEMBER ADD/EDIT MODAL -------------------- */}
      {showTeamModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(7, 11, 25, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: '20px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="card-glass"
            style={{
              maxWidth: '550px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              padding: '0',
              borderRadius: '16px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: darkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)' : '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(15, 23, 42, 0.1)',
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 30, 0.99) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.99) 100%)'
            }}
          >
            {/* Modal Sticky Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '24px 32px 20px 32px', flexShrink: 0, backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)', zIndex: 5 }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: darkMode ? '#f8fafc' : 'var(--text-primary)' }}>
                {teamFormMode === 'create' ? 'Add New Team Member' : 'Edit Team Member'}
              </h3>
              <button 
                onClick={() => setShowTeamModal(false)}
                className="modal-close-hover"
                style={{ background: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)', border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', transition: 'all var(--transition-fast)' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSaveTeam} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flexGrow: 1, margin: 0 }}>
              
              {/* Scrollable Form Fields Wrapper */}
              <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 32px 24px 32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {teamFormError && (
                  <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', margin: 0 }}>
                    {teamFormError}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Rampratap Bugalia"
                    className="form-control"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                    Position & Role *
                  </label>
                  <input 
                    type="text"
                    value={teamRole}
                    onChange={(e) => setTeamRole(e.target.value)}
                    placeholder="e.g. Founder & CEO, HR Head, SEO Specialist"
                    className="form-control"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                      Display Order Index
                    </label>
                    <input 
                      type="number"
                      value={teamDisplayOrder}
                      onChange={(e) => setTeamDisplayOrder(e.target.value)}
                      placeholder="1"
                      className="form-control"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                      Photo Upload (Max 1MB)
                    </label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleTeamImageUpload}
                      style={{ display: 'none' }}
                      id="team-photo-file-picker"
                    />
                    <label 
                      htmlFor="team-photo-file-picker" 
                      className="btn file-upload-hover" 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', border: '1px dashed var(--border-color)', backgroundColor: 'var(--bg-secondary)', cursor: 'pointer', height: '42px', fontSize: '12.5px', borderRadius: '6px' }}
                    >
                      <Upload size={14} style={{ color: 'var(--primary)' }} /> {uploadingTeamImage ? 'Uploading...' : 'Browse Photo...'}
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-muted)' }}>
                    Image URL / Web Address
                  </label>
                  <input 
                    type="text"
                    value={teamImageUrl}
                    onChange={(e) => setTeamImageUrl(e.target.value)}
                    placeholder="Paste URL or upload image above..."
                    className="form-control"
                  />
                </div>

                {teamImageUrl && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <img src={teamImageUrl.startsWith('http') ? teamImageUrl : `${ACTIVE_API_BASE}${teamImageUrl}`} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{teamImageUrl}</span>
                  </div>
                )}
              </div>

              {/* Modal Sticky Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(15, 23, 42, 0.06)', padding: '16px 32px 24px 32px', flexShrink: 0, margin: 0, backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(8px)', zIndex: 5 }}>
                <button 
                  type="button" 
                  onClick={() => setShowTeamModal(false)}
                  className="btn btn-secondary"
                  style={{ padding: '10px 24px', borderRadius: '6px', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '10px 28px', borderRadius: '6px', fontSize: '13px' }}
                >
                  {teamFormMode === 'create' ? 'Add Team Member' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* -------------------- DELETE CONFIRMATION DIALOG MODAL -------------------- */}
      {deleteConfirm.show && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(7, 11, 25, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: '20px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="card-glass"
            style={{
              maxWidth: '420px',
              width: '100%',
              padding: '28px',
              textAlign: 'center',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)',
              borderRadius: '16px',
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 12, 30, 0.98) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)'
            }}
          >
            <div style={{ display: 'inline-flex', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Trash2 size={22} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: darkMode ? '#f8fafc' : 'var(--text-primary)' }}>{deleteConfirm.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.5', margin: '0 0 24px 0' }}>{deleteConfirm.desc}</p>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setDeleteConfirm({ show: false, title: '', desc: '', onConfirm: null })}
                className="btn btn-secondary"
                style={{ padding: '10px 20px', borderRadius: '6px', fontSize: '13px' }}
              >
                Keep Record
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirm.onConfirm) deleteConfirm.onConfirm();
                  setDeleteConfirm({ show: false, title: '', desc: '', onConfirm: null });
                }}
                className="btn"
                style={{ padding: '10px 24px', borderRadius: '6px', fontSize: '13px', backgroundColor: '#ef4444', color: 'white', border: 'none' }}
              >
                Confirm Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Styled component helper rules */}
      <style>{`
        .toolbar-btn {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-secondary);
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        .toolbar-btn:hover {
          background-color: var(--primary-light);
          color: var(--primary);
          border-color: var(--primary);
        }
        .table-row-hover:hover {
          background-color: var(--primary-light);
        }

        /* Action Text Button - Edit (Light Theme) */
        .action-btn-edit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all var(--transition-fast);
          background-color: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.18);
          color: #1d4ed8;
        }
        .action-btn-edit:hover {
          background-color: rgba(37, 99, 235, 0.15);
          transform: translateY(-1px);
        }
        /* Action Text Button - Edit (Dark Theme) */
        body.dark .action-btn-edit {
          background-color: rgba(37, 99, 235, 0.15);
          border: 1px solid rgba(37, 99, 235, 0.28);
          color: #60a5fa;
        }
        body.dark .action-btn-edit:hover {
          background-color: rgba(37, 99, 235, 0.28);
        }

        /* Action Text Button - Delete (Light Theme) */
        .action-btn-delete {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all var(--transition-fast);
          background-color: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #dc2626;
        }
        .action-btn-delete:hover {
          background-color: rgba(239, 68, 68, 0.12);
          transform: translateY(-1px);
        }
        /* Action Text Button - Delete (Dark Theme) */
        body.dark .action-btn-delete {
          background-color: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #ef4444;
        }
        body.dark .action-btn-delete:hover {
          background-color: rgba(239, 68, 68, 0.25);
        }

        /* Icon Button - Edit (Light Theme) */
        .icon-btn-edit {
          display: inline-flex;
          padding: 6px;
          border-radius: 6px;
          border: 1px solid rgba(37, 99, 235, 0.18);
          background-color: rgba(37, 99, 235, 0.08);
          color: #1d4ed8;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .icon-btn-edit:hover {
          background-color: rgba(37, 99, 235, 0.15);
          transform: translateY(-1px);
        }
        /* Icon Button - Edit (Dark Theme) */
        body.dark .icon-btn-edit {
          border: 1px solid rgba(37, 99, 235, 0.28);
          background-color: rgba(37, 99, 235, 0.15);
          color: #60a5fa;
        }
        body.dark .icon-btn-edit:hover {
          background-color: rgba(37, 99, 235, 0.28);
        }

        /* Icon Button - Delete (Light Theme) */
        .icon-btn-delete {
          display: inline-flex;
          padding: 6px;
          border-radius: 6px;
          border: 1px solid rgba(239, 68, 68, 0.15);
          background-color: rgba(239, 68, 68, 0.06);
          color: #dc2626;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .icon-btn-delete:hover {
          background-color: rgba(239, 68, 68, 0.12);
          transform: translateY(-1px);
        }
        /* Icon Button - Delete (Dark Theme) */
        body.dark .icon-btn-delete {
          border: 1px solid rgba(239, 68, 68, 0.25);
          background-color: rgba(239, 68, 68, 0.12);
          color: #ef4444;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        body.dark .icon-btn-delete:hover {
          background-color: rgba(239, 68, 68, 0.25);
        }

        /* Icon Button - Preview (Light Theme) */
        .icon-btn-preview {
          display: inline-flex;
          padding: 6px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background-color: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .icon-btn-preview:hover {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        @media (max-width: 992px) {
          .metrics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .split-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .form-grid-4 {
            grid-template-columns: 1fr 1fr !important;
          }
          .form-grid-3 {
            grid-template-columns: 1fr 1fr !important;
          }
          .form-grid-2, .image-inputs {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 576px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
          }
          .form-grid-4, .form-grid-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
