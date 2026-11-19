const KEYS = { businesses: 'smartqueue_businesses', services: 'smartqueue_services', entries: 'smartqueue_queue_entries', auth: 'smartqueue_auth', initialized: 'smartqueue_initialized' }

const ago = (mins) => new Date(Date.now() - mins * 60000).toISOString()
const seedBusinesses = [
  { id: 'careplus', name: 'CarePlus Clinic', category: 'Healthcare', location: 'Bandra West, Mumbai', description: 'Primary care and consultation services with a simple digital queue.', phone: '+91 22 4000 1144', hours: 'Mon–Sat · 9:00 AM – 7:00 PM', prefix: 'A', open: true },
  { id: 'stylestudio', name: 'StyleStudio Salon', category: 'Salon', location: 'Andheri West, Mumbai', description: 'Thoughtful salon care without the waiting room.', phone: '+91 22 4000 2277', hours: 'Daily · 10:00 AM – 8:00 PM', prefix: 'S', open: true },
  { id: 'quickfix', name: 'QuickFix Service Centre', category: 'Service Centre', location: 'Powai, Mumbai', description: 'Device care, repairs and pickup support made simpler.', phone: '+91 22 4000 3388', hours: 'Mon–Sat · 10:00 AM – 6:30 PM', prefix: 'Q', open: true },
  { id: 'healthfirst', name: 'HealthFirst Diagnostics', category: 'Diagnostics', location: 'Thane West, Maharashtra', description: 'Reliable diagnostics with a more considerate arrival experience.', phone: '+91 22 4000 4499', hours: 'Mon–Sun · 7:00 AM – 5:00 PM', prefix: 'H', open: true },
]
const seedServices = [
  { id: 'general', businessId: 'careplus', name: 'General Consultation', description: 'Consultation with a primary care physician', duration: 10, active: true, price: '₹500' },
  { id: 'dental', businessId: 'careplus', name: 'Dental Consultation', description: 'Initial dental consultation', duration: 20, active: true, price: '₹700' },
  { id: 'followup', businessId: 'careplus', name: 'Follow-up', description: 'Brief follow-up appointment', duration: 8, active: true, price: '₹300' },
  { id: 'haircut', businessId: 'stylestudio', name: 'Haircut', description: 'Haircut and finish', duration: 30, active: true, price: '₹600' },
  { id: 'styling', businessId: 'stylestudio', name: 'Hair Styling', description: 'Styling session', duration: 45, active: true, price: '₹1,200' },
  { id: 'salon-consult', businessId: 'stylestudio', name: 'Consultation', description: 'Style consultation', duration: 10, active: true, price: '₹250' },
  { id: 'diagnosis', businessId: 'quickfix', name: 'Device Diagnosis', description: 'Technical device assessment', duration: 20, active: true, price: '₹399' },
  { id: 'repair', businessId: 'quickfix', name: 'Repair Consultation', description: 'Repair discussion and estimate', duration: 15, active: true, price: '₹199' },
  { id: 'pickup', businessId: 'quickfix', name: 'Pickup/Drop-off', description: 'Quick handover service', duration: 10, active: true, price: '₹0' },
  { id: 'blood', businessId: 'healthfirst', name: 'Blood Test', description: 'Routine blood test collection', duration: 10, active: true, price: '₹450' },
  { id: 'check', businessId: 'healthfirst', name: 'Health Check', description: 'Comprehensive health check', duration: 25, active: true, price: '₹1,999' },
  { id: 'sample', businessId: 'healthfirst', name: 'Sample Collection', description: 'Sample collection appointment', duration: 10, active: true, price: '₹250' },
]
const seedEntries = [
  { id: 'e21', token: 'A-021', businessId: 'careplus', serviceId: 'general', customerName: 'Rahul Sharma', mobile: '9876501201', joinedAt: ago(100), status: 'COMPLETED', calledAt: ago(90), completedAt: ago(80), serviceDuration: 10 },
  { id: 'e22', token: 'A-022', businessId: 'careplus', serviceId: 'general', customerName: 'Priya Shah', mobile: '9876501202', joinedAt: ago(70), status: 'SERVING', calledAt: ago(5), serviceDuration: 10 },
  { id: 'e23', token: 'A-023', businessId: 'careplus', serviceId: 'general', customerName: 'Aarav Mehta', mobile: '9876501203', joinedAt: ago(55), status: 'WAITING', serviceDuration: 10 },
  { id: 'e24', token: 'A-024', businessId: 'careplus', serviceId: 'dental', customerName: 'Ananya Patel', mobile: '9876501204', joinedAt: ago(42), status: 'WAITING', serviceDuration: 20 },
  { id: 'e25', token: 'A-025', businessId: 'careplus', serviceId: 'general', customerName: 'Rohan Desai', mobile: '9876501205', joinedAt: ago(29), status: 'WAITING', serviceDuration: 10 },
  { id: 'e26', token: 'A-026', businessId: 'careplus', serviceId: 'followup', customerName: 'Neha Kulkarni', mobile: '9876501206', joinedAt: ago(15), status: 'WAITING', serviceDuration: 8 },
  { id: 's13', token: 'S-013', businessId: 'stylestudio', serviceId: 'haircut', customerName: 'Ishita Rao', mobile: '9876501301', joinedAt: ago(35), status: 'WAITING', serviceDuration: 30 },
  { id: 'h30', token: 'H-030', businessId: 'healthfirst', serviceId: 'blood', customerName: 'Kabir Joshi', mobile: '9876501401', joinedAt: ago(28), status: 'WAITING', serviceDuration: 10 },
]
const read = (key, fallback = []) => { try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : fallback } catch { return fallback } }
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value))
export const initialize = () => { if (!localStorage.getItem(KEYS.initialized)) { write(KEYS.businesses, seedBusinesses); write(KEYS.services, seedServices); write(KEYS.entries, seedEntries); localStorage.setItem(KEYS.initialized, 'true') } }
export const resetDemoData = () => { write(KEYS.businesses, seedBusinesses); write(KEYS.services, seedServices); write(KEYS.entries, seedEntries); localStorage.setItem(KEYS.initialized, 'true') }
export const store = {
  getBusinesses: () => read(KEYS.businesses), saveBusinesses: (v) => write(KEYS.businesses, v),
  getServices: () => read(KEYS.services), saveServices: (v) => write(KEYS.services, v),
  getEntries: () => read(KEYS.entries), saveEntries: (v) => write(KEYS.entries, v),
  getAuth: () => read(KEYS.auth, null), setAuth: (v) => write(KEYS.auth, v), clearAuth: () => localStorage.removeItem(KEYS.auth),
}
export const getActiveEntries = (entries, businessId) => entries.filter(e => e.businessId === businessId && ['WAITING', 'SERVING'].includes(e.status)).sort((a, b) => new Date(a.joinedAt) - new Date(b.joinedAt))
export const entryMetrics = (entry, entries) => { const active = getActiveEntries(entries, entry.businessId); const pos = active.findIndex(e => e.id === entry.id); const ahead = entry.status === 'WAITING' ? Math.max(pos, 0) : 0; const wait = active.slice(0, Math.max(pos, 0)).reduce((sum, e) => sum + (e.serviceDuration || 10), 0); return { position: entry.status === 'WAITING' ? pos + 1 : entry.status === 'SERVING' ? 1 : 0, ahead, wait } }
export const makeEntry = ({ businessId, service, customerName, mobile, email }) => { const entries = store.getEntries(); const biz = store.getBusinesses().find(b => b.id === businessId); const nums = entries.filter(e => e.businessId === businessId).map(e => Number(e.token.split('-')[1]) || 0); const next = Math.max(...nums, 0) + 1; const entry = { id: crypto.randomUUID(), token: `${biz.prefix}-${String(next).padStart(3, '0')}`, businessId, serviceId: service.id, customerName, mobile, email, joinedAt: new Date().toISOString(), status: 'WAITING', serviceDuration: Number(service.duration) }; store.saveEntries([...entries, entry]); return entry }
