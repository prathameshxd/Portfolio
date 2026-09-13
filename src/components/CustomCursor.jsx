import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovering = false;
    let isVisible = false;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.classList.add(styles.visible);
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = Boolean(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest?.('a') ||
        target.closest?.('button') ||
        target.dataset?.cursorHover === 'true' ||
        target.closest?.('[data-cursor-hover="true"]')
      );

      if (isInteractive !== isHovering) {
        isHovering = isInteractive;
        if (isHovering) {
          cursor.classList.add(styles.hovering);
        } else {
          cursor.classList.remove(styles.hovering);
        }
      }
    };

    const onMouseLeaveDoc = () => {
      isVisible = false;
      cursor.classList.remove(styles.visible);
    };

    const render = () => {
      // Spring lerp factor (0.35 gives tight responsive tracking)
      const offset = isHovering ? 20 : 8;
      currentX += (mouseX - offset - currentX) * 0.35;
      currentY += (mouseY - offset - currentY) * 0.35;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveDoc, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveDoc);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} className={styles.cursor} />;
}
