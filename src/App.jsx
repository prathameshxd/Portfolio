import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Home from './pages/Home';

const Work = lazy(() => import('./pages/Work'));
const PathParcel = lazy(() => import('./pages/PathParcel'));
const Contact = lazy(() => import('./pages/Contact'));
import { Analytics } from "@vercel/analytics/react";

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
            path="work" 
            element={
              <PageWrapper>
                <Suspense fallback={<Loader />}>
                  <Work />
                </Suspense>
              </PageWrapper>
            } 
          />
          <Route 
            path="work/pathparcel" 
            element={
              <PageWrapper>
                <Suspense fallback={<Loader />}>
                  <PathParcel />
                </Suspense>
              </PageWrapper>
            } 
          />
          <Route 
            path="contact" 
            element={
              <PageWrapper>
                <Suspense fallback={<Loader />}>
                  <Contact />
                </Suspense>
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

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && <AnimatedRoutes />}
      <Analytics />
      <CustomCursor />
    </>
  );
}
