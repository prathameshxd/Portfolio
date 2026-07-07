import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import CustomCursor from './CustomCursor';
import FloatingNoteButton from './FloatingNoteButton';
import SideRays from '../sections/SideRays/SideRays';

export default function Layout() {
  const location = useLocation();
  const isWorkPage = location.pathname.startsWith('/work');

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
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: -1,
          opacity: !isWorkPage ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.5s ease',
        }}
      >
        <SideRays 
          speed={3} 
          rayColor1="#001636" 
          rayColor2="#020f26" 
          opacity={0.8}
        />
      </div>
      <CustomCursor />
      <Nav />
      <FloatingNoteButton />
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </>
  );
}
