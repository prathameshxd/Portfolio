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

const sliceVariants = {
  initial: {
    y: "0%"
  },
  animate: (i) => ({
    y: "-100%",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05
    }
  }),
  exit: (i) => ({
    y: ["100%", "0%"],
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05
    }
  })
};

function PageWrapper({ children }) {
  const slices = 5;

  return (
    <>
      <div 
        style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100vw", 
          height: "100vh", 
          display: "flex", 
          zIndex: 99999, 
          pointerEvents: "none",
          overflow: "hidden"
        }}
      >
        {Array.from({ length: slices }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={sliceVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              flex: 1,
              marginLeft: i > 0 ? "-1px" : "0",
              backgroundColor: "#050505", // Slick dark brand color
              willChange: "transform"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </motion.div>
    </>
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
