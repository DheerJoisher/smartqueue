/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialize, store, resetDemoData } from '../services/storage'
const AppContext = createContext(null)
export function AppProvider({ children }) {
  const [businesses, setBusinesses] = useState(() => { initialize(); return store.getBusinesses() }); const [services, setServices] = useState(() => store.getServices()); const [entries, setEntries] = useState(() => store.getEntries()); const [auth, setAuthState] = useState(() => store.getAuth()); const [toast, setToast] = useState(null)
  const refresh = () => { initialize(); setBusinesses(store.getBusinesses()); setServices(store.getServices()); setEntries(store.getEntries()); setAuthState(store.getAuth()) }
  useEffect(() => { const listener = e => { if (e.key?.startsWith('smartqueue_')) refresh() }; window.addEventListener('storage', listener); return () => window.removeEventListener('storage', listener) }, [])
  const notify = (message, type = 'success') => { setToast({ message, type }); setTimeout(() => setToast(null), 3500) }
  const saveEntries = (value) => { store.saveEntries(value); setEntries(value) }; const saveServices = (value) => { store.saveServices(value); setServices(value) }; const saveBusinesses = (value) => { store.saveBusinesses(value); setBusinesses(value) }
  const value = useMemo(() => ({ businesses, services, entries, auth, toast, notify, refresh, saveEntries, saveServices, saveBusinesses, login: (email, password) => { if (email === 'admin@careplus.com' && password === 'admin123') { const a = { businessId: 'careplus', name: 'CarePlus Clinic', email }; store.setAuth(a); setAuthState(a); return true } return false }, logout: () => { store.clearAuth(); setAuthState(null) }, reset: () => { resetDemoData(); refresh(); notify('Original demo data restored.') } }), [businesses, services, entries, auth, toast])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp = () => useContext(AppContext)
