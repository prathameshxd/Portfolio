import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import NoiseOverlay from './NoiseOverlay';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Manage theme switching based on route
    if (location.pathname === '/work') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [location.pathname]);

  return (
    <>
      <NoiseOverlay />
      <CustomCursor />
      <Nav />
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </>
  );
}
