import { createContext, useContext, useState, useEffect } from 'react';
import { getJson, API_BASE } from '../lib/api';
import DEMO_FAMILY from '../data/mock/demo_family.json';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock data lives in JSON so it can be reused across the app

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState('demo'); // 'demo' | 'parent'
  const [isParentUnlocked, setIsParentUnlocked] = useState(false);
  const [currentChild, setCurrentChild] = useState(null);
  const [family, setFamily] = useState(DEMO_FAMILY);
  const [loadingDemo, setLoadingDemo] = useState(true);

  // Load from server or localStorage (uses centralized api helper)
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const savedFamily = localStorage.getItem('mathbloom-family');
      const savedMode = localStorage.getItem('mathbloom-mode');

      // Only restore from localStorage for non-demo families.
      // This prevents stale demo data from sticking around after the demo JSON/server data changes.
      if (savedFamily) {
        const parsed = JSON.parse(savedFamily);
        if (parsed?.id && parsed.id !== 'demo') {
          setFamily(parsed);
          if (savedMode) setMode(savedMode);
          setLoadingDemo(false);
          return;
        }
      }

      try {
        const json = await getJson('/api/v1/mathbloom/demo-family');
        if (!cancelled) {
          setFamily(json);
          setMode('demo');
        }
      } catch (err) {
        if (!cancelled) {
          setFamily(DEMO_FAMILY);
          setMode('demo');
        }
      } finally {
        if (!cancelled) setLoadingDemo(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // Save to localStorage when in parent mode
  useEffect(() => {
    if (mode === 'parent') {
      // Don't persist demo family data; keep it server/mock-driven.
      if (family?.id !== 'demo') {
        localStorage.setItem('mathbloom-family', JSON.stringify(family));
        localStorage.setItem('mathbloom-mode', mode);
      }
    }
  }, [family, mode]);

  const enterDemoMode = () => {
    setMode('demo');
    setIsParentUnlocked(false);
    setCurrentChild(null);
    // keep server-provided family if already loaded, otherwise default
    if (!loadingDemo) return;
    setFamily(DEMO_FAMILY);
  };

  const unlockParent = (pin) => {
    if (pin === family.parentPIN) {
      setIsParentUnlocked(true);
      setMode('parent');
      return true;
    }
    return false;
  };

  const lockParent = () => {
    setIsParentUnlocked(false);
    setCurrentChild(null);
  };

  const selectChild = (childId) => {
    const child = family.children.find(c => c.id === childId);
    setCurrentChild(child);
  };

  const addChild = (childData) => {
    const newChild = {
      id: `child-${Date.now()}`,
      ...childData,
      streak: 0,
      accuracy: 0,
      level: 1,
      sessions: [],
    };
    setFamily(prev => ({
      ...prev,
      children: [...prev.children, newChild],
    }));
    return newChild;
  };

  const updateChildSession = (childId, sessionData) => {
    setFamily(prev => ({
      ...prev,
      children: prev.children.map(child =>
        child.id === childId
          ? { ...child, sessions: [sessionData, ...child.sessions] }
          : child
      ),
    }));
  };

  const value = {
    mode,
    isParentUnlocked,
    currentChild,
    family,
    loadingDemo,
    enterDemoMode,
    unlockParent,
    lockParent,
    selectChild,
    addChild,
    updateChildSession,
    setFamily,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
