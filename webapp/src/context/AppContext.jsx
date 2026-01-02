import { createContext, useContext, useState, useEffect } from 'react';
import { getJson, API_BASE } from '../lib/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock data
const DEMO_FAMILY = {
  id: 'demo',
  parentPIN: '1234',
  children: [
    {
      id: 'demo-1',
      name: 'Sam (Demo)',
      avatar: '👦',
      streak: 5,
      accuracy: 87,
      level: 4,
      sessions: [
        { date: '2025-12-01', topic: 'Addition', problems: 15, accuracy: 93, avgTime: 2.1, status: 'Mastered' },
        { date: '2025-11-30', topic: 'Multiplication', problems: 12, accuracy: 85, avgTime: 3.2, status: 'Needs Review' },
        { date: '2025-11-29', topic: 'Subtraction', problems: 10, accuracy: 90, avgTime: 1.8, status: 'Mastered' },
      ],
    },
    {
      id: 'demo-2',
      name: 'Ava (Demo)',
      avatar: '👧',
      streak: 8,
      accuracy: 92,
      level: 5,
      sessions: [
        { date: '2025-12-01', topic: 'Division', problems: 10, accuracy: 95, avgTime: 2.5, status: 'Mastered' },
        { date: '2025-11-30', topic: 'Fractions', problems: 8, accuracy: 88, avgTime: 4.1, status: 'Needs Review' },
        { date: '2025-11-29', topic: 'Multiplication', problems: 15, accuracy: 94, avgTime: 2.3, status: 'Mastered' },
      ],
    },
  ],
};

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

      if (savedFamily) {
        setFamily(JSON.parse(savedFamily));
        if (savedMode) setMode(savedMode);
        setLoadingDemo(false);
        return;
      }

      try {
        const json = await getJson('/api/demo-family');
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
      localStorage.setItem('mathbloom-family', JSON.stringify(family));
      localStorage.setItem('mathbloom-mode', mode);
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
