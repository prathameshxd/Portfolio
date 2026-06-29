import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import CustomCursor from './CustomCursor';
import NoiseOverlay from './NoiseOverlay';
import FloatingNoteButton from './FloatingNoteButton';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to top or to hash
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
    
    // Manage theme switching based on route
    if (location.pathname.startsWith('/work')) {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <NoiseOverlay />
      <CustomCursor />
      <Nav />
      <FloatingNoteButton />
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </>
  );
}
