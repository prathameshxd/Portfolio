import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Stack from './pages/Stack';
import Work from './pages/Work';
import PathParcel from './pages/PathParcel';
import Contact from './pages/Contact';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route 
            index 
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            } 
          />
          <Route 
            path="stack" 
            element={
              <PageWrapper>
                <Stack />
              </PageWrapper>
            } 
          />
          <Route 
            path="work" 
            element={
              <PageWrapper>
                <Work />
              </PageWrapper>
            } 
          />
          <Route 
            path="work/pathparcel" 
            element={
              <PageWrapper>
                <PathParcel />
              </PageWrapper>
            } 
          />
          <Route 
            path="contact" 
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            } 
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && <AnimatedRoutes />}
    </>
  );
}
