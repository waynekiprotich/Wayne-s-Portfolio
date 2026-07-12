export const PROJECT_TYPES = [
  { id: 'business-website', label: 'Business Website', base: 70000 },
  { id: 'landing-page', label: 'Landing Page', base: 40000 },
  { id: 'portfolio', label: 'Portfolio', base: 50000 },
  { id: 'ecommerce', label: 'E-commerce Store', base: 240000 },
  { id: 'saas', label: 'SaaS Platform', base: 500000 },
  { id: 'marketplace', label: 'Marketplace', base: 550000 },
  { id: 'crm', label: 'CRM', base: 380000 },
  { id: 'erp', label: 'ERP', base: 750000 },
  { id: 'dashboard', label: 'Dashboard', base: 220000 },
  { id: 'booking-system', label: 'Booking System', base: 190000 },
  { id: 'school-management', label: 'School Management System', base: 420000 },
  { id: 'hospital-management', label: 'Hospital Management System', base: 600000 },
  { id: 'restaurant-system', label: 'Restaurant System', base: 160000 },
  { id: 'real-estate', label: 'Real Estate Platform', base: 380000 },
  { id: 'ai-application', label: 'AI Application', base: 450000 },
  { id: 'internal-tool', label: 'Internal Business Tool', base: 200000 },
  { id: 'mobile-app', label: 'Mobile App', base: 380000 },
  { id: 'custom-web-app', label: 'Custom Web Application', base: 280000 },
  { id: 'other', label: 'Other', base: 150000 },
]

export const INDUSTRIES = [
  'Retail & E-commerce',
  'Hospitality & Restaurants',
  'Healthcare',
  'Education',
  'Real Estate',
  'Finance & Fintech',
  'Agriculture',
  'Logistics & Transport',
  'Manufacturing',
  'Professional Services',
  'Media & Entertainment',
  'Non-profit',
  'Technology',
  'Other',
]

export const COMPANY_SIZES = [
  { id: '1-5', label: '1-5 employees', multiplier: 1 },
  { id: '6-20', label: '6-20 employees', multiplier: 1.05 },
  { id: '21-50', label: '21-50 employees', multiplier: 1.1 },
  { id: '51-200', label: '51-200 employees', multiplier: 1.2 },
  { id: '200+', label: '200+ employees', multiplier: 1.35 },
]

export const CONTACT_METHODS = ['Email', 'Phone Call', 'WhatsApp', 'Video Call']

export const PROJECT_NATURE = [
  { id: 'new', label: 'A new project', description: 'Starting from scratch' },
  { id: 'redesign', label: 'A redesign', description: 'Refreshing something that already exists' },
  { id: 'existing-system', label: 'An existing system', description: 'Adding to or extending a live product' },
]

export const ESTIMATED_USERS = [
  { id: 'under-100', label: 'Under 100', multiplier: 1 },
  { id: '100-1000', label: '100 - 1,000', multiplier: 1.05 },
  { id: '1000-10000', label: '1,000 - 10,000', multiplier: 1.15 },
  { id: '10000+', label: '10,000+', multiplier: 1.3 },
]

export const FEATURE_GROUPS = [
  {
    id: 'authentication',
    label: 'Authentication',
    features: [
      { id: 'login', label: 'Login', cost: 6000 },
      { id: 'registration', label: 'Registration', cost: 5000 },
      { id: 'google-login', label: 'Google Login', cost: 7000 },
      { id: 'apple-login', label: 'Apple Login', cost: 9000 },
      { id: 'otp', label: 'OTP', cost: 8000 },
      { id: '2fa', label: 'Two-factor Authentication', cost: 10000 },
    ],
  },
  {
    id: 'user-management',
    label: 'User Management',
    features: [
      { id: 'user-profiles', label: 'User Profiles', cost: 8000 },
      { id: 'roles', label: 'Roles', cost: 9000 },
      { id: 'permissions', label: 'Permissions', cost: 10000 },
      { id: 'teams', label: 'Teams', cost: 12000 },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    features: [
      { id: 'mpesa', label: 'M-Pesa', cost: 20000 },
      { id: 'stripe', label: 'Stripe', cost: 18000 },
      { id: 'paypal', label: 'PayPal', cost: 15000 },
      { id: 'flutterwave', label: 'Flutterwave', cost: 18000 },
      { id: 'subscription-billing', label: 'Subscription Billing', cost: 25000 },
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    features: [
      { id: 'email', label: 'Email', cost: 6000 },
      { id: 'sms', label: 'SMS', cost: 10000 },
      { id: 'push-notifications', label: 'Push Notifications', cost: 12000 },
      { id: 'whatsapp', label: 'WhatsApp', cost: 15000 },
      { id: 'live-chat', label: 'Live Chat', cost: 14000 },
    ],
  },
  {
    id: 'business',
    label: 'Business',
    features: [
      { id: 'business-dashboard', label: 'Dashboard', cost: 25000 },
      { id: 'reports', label: 'Reports', cost: 15000 },
      { id: 'analytics', label: 'Analytics', cost: 18000 },
      { id: 'inventory', label: 'Inventory', cost: 22000 },
      { id: 'crm-feature', label: 'CRM', cost: 30000 },
      { id: 'orders', label: 'Orders', cost: 20000 },
      { id: 'bookings', label: 'Bookings', cost: 22000 },
      { id: 'calendar', label: 'Calendar', cost: 10000 },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    features: [
      { id: 'gallery', label: 'Gallery', cost: 8000 },
      { id: 'video', label: 'Video', cost: 10000 },
      { id: 'file-uploads', label: 'File Uploads', cost: 8000 },
    ],
  },
  {
    id: 'maps',
    label: 'Maps',
    features: [
      { id: 'google-maps', label: 'Google Maps', cost: 12000 },
      { id: 'gps', label: 'GPS', cost: 15000 },
      { id: 'route-tracking', label: 'Route Tracking', cost: 20000 },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    features: [
      { id: 'ai-chatbot', label: 'AI Chatbot', cost: 35000 },
      { id: 'ai-assistant', label: 'AI Assistant', cost: 45000 },
      { id: 'recommendations', label: 'Recommendations', cost: 30000 },
      { id: 'document-analysis', label: 'Document Analysis', cost: 40000 },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    features: [
      { id: 'search', label: 'Search', cost: 8000 },
      { id: 'filters', label: 'Filters', cost: 6000 },
      { id: 'export-pdf', label: 'Export PDF', cost: 8000 },
      { id: 'qr-codes', label: 'QR Codes', cost: 9000 },
      { id: 'barcode-scanner', label: 'Barcode Scanner', cost: 12000 },
      { id: 'multi-language', label: 'Multi-language', cost: 15000 },
      { id: 'dark-mode', label: 'Dark Mode', cost: 6000 },
      { id: 'offline-support', label: 'Offline Support', cost: 20000 },
    ],
  },
]

export const INTEGRATIONS = [
  { id: 'google', label: 'Google', cost: 10000 },
  { id: 'microsoft', label: 'Microsoft', cost: 12000 },
  { id: 'slack', label: 'Slack', cost: 10000 },
  { id: 'zoom', label: 'Zoom', cost: 12000 },
  { id: 'openai', label: 'OpenAI', cost: 20000 },
  { id: 'mailchimp', label: 'Mailchimp', cost: 8000 },
  { id: 'hubspot', label: 'HubSpot', cost: 15000 },
  { id: 'zapier', label: 'Zapier', cost: 12000 },
  { id: 'whatsapp-integration', label: 'WhatsApp', cost: 12000 },
  { id: 'facebook', label: 'Facebook', cost: 8000 },
  { id: 'instagram', label: 'Instagram', cost: 8000 },
  { id: 'linkedin', label: 'LinkedIn', cost: 8000 },
  { id: 'tiktok', label: 'TikTok', cost: 10000 },
  { id: 'custom-api', label: 'Custom API', cost: 25000 },
]

export const DESIGN_STYLES = [
  'Minimal & Modern',
  'Bold & Colorful',
  'Corporate & Professional',
  'Playful & Creative',
  'Luxury & Editorial',
  'Technical & Data-dense',
]

export const TECHNICAL_REQUIREMENTS = [
  { id: 'cms', label: 'Content Management System', cost: 25000 },
  { id: 'admin-panel', label: 'Admin Panel', cost: 35000 },
  { id: 'seo', label: 'SEO Setup', cost: 15000 },
  { id: 'hosting', label: 'Hosting Setup', cost: 8000 },
  { id: 'domain', label: 'Domain Registration', cost: 3000 },
  { id: 'maintenance', label: 'Maintenance Plan', cost: 15000 },
  { id: 'analytics', label: 'Analytics Integration', cost: 8000 },
  { id: 'security', label: 'Security Hardening', cost: 20000 },
  { id: 'backups', label: 'Automated Backups', cost: 10000 },
]

export const TIMELINES = [
  { id: 'asap', label: 'ASAP', multiplier: 1.5 },
  { id: '1-week', label: '1 Week', multiplier: 1.6 },
  { id: '2-weeks', label: '2 Weeks', multiplier: 1.35 },
  { id: '1-month', label: '1 Month', multiplier: 1.15 },
  { id: '2-months', label: '2 Months', multiplier: 1 },
  { id: '3-months', label: '3 Months', multiplier: 0.92 },
  { id: 'flexible', label: 'Flexible', multiplier: 0.85 },
]

export const BUDGETS = [
  'Under KES 50,000',
  'KES 50,000 - 100,000',
  'KES 100,000 - 250,000',
  'KES 250,000 - 500,000',
  'KES 500,000 - 1,000,000',
  'KES 1,000,000+',
]

export const MEETING_PLATFORMS = ['Google Meet', 'Zoom', 'Phone Call', 'WhatsApp Call', 'In Person']

export const ACCEPTED_FILE_TYPES = '.pdf,.doc,.docx,.zip,.png,.jpg,.jpeg,.svg,.fig'

export const WIZARD_STEPS = [
  { id: 1, title: 'Project Type', eyebrow: 'Discovery' },
  { id: 2, title: 'Business Information', eyebrow: 'Discovery' },
  { id: 3, title: 'Project Goals', eyebrow: 'Discovery' },
  { id: 4, title: 'Pages & Scope', eyebrow: 'Scope' },
  { id: 5, title: 'Features', eyebrow: 'Scope' },
  { id: 6, title: 'Integrations', eyebrow: 'Scope' },
  { id: 7, title: 'Design', eyebrow: 'Design' },
  { id: 8, title: 'Technical Requirements', eyebrow: 'Design' },
  { id: 9, title: 'Timeline & Budget', eyebrow: 'Planning' },
  { id: 10, title: 'Project Description', eyebrow: 'Planning' },
  { id: 11, title: 'Contact Information', eyebrow: 'Planning' },
  { id: 12, title: 'Your Estimate', eyebrow: 'Review' },
]

export const INITIAL_ESTIMATOR_DATA = {
  projectType: '',
  business: {
    companyName: '',
    industry: '',
    companySize: '',
    existingWebsite: '',
    country: 'Kenya',
    phone: '',
    email: '',
    preferredContact: '',
  },
  goals: {
    nature: '',
    problem: '',
    businessGoals: '',
    targetAudience: '',
  },
  scope: {
    pages: 5,
    dashboards: 0,
    estimatedUsers: '',
    publicPages: 0,
    privatePages: 0,
    adminArea: false,
    customerPortal: false,
  },
  features: [],
  integrations: [],
  design: {
    style: '',
    hasExistingBranding: false,
    needLogo: false,
    needUIUX: true,
    colorPreferences: '',
    inspirationSites: '',
    designFiles: [],
  },
  technical: [],
  timeline: '',
  budget: '',
  description: '',
  projectFiles: [],
  contact: {
    fullName: '',
    email: '',
    phone: '',
    company: '',
    meetingPlatform: '',
  },
}