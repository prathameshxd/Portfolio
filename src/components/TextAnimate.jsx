import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';

export function TextAnimate({
  children,
  className = '',
  by = 'character',
  as: Component = 'span',
  delayOffset = 0,
  startDelay = 0.1,
  stagger = 0.045,
  triggerOnce = false, // Re-triggers on scroll so user always sees the animation
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    margin: '-5% 0px -5% 0px',
    amount: 0.25 
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('show');
    } else if (!triggerOnce) {
      controls.set('hidden');
    }
  }, [isInView, controls, triggerOnce]);

  const text = typeof children === 'string' ? children : '';

  if (!text) {
    return <Component ref={ref} className={className} style={style} {...props}>{children}</Component>;
  }

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      rotate: 45,
      scale: 0.4,
    },
    show: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        delay: startDelay + i * stagger,
        duration: 0.45,
        y: {
          type: 'spring',
          damping: 12,
          stiffness: 200,
          mass: 0.8,
        },
        rotate: {
          type: 'spring',
          damping: 8,
          stiffness: 150,
        },
        scale: {
          type: 'spring',
          damping: 10,
          stiffness: 300,
        },
      },
    }),
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      rotate: 35,
      scale: 0.5,
    },
    show: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        delay: startDelay + i * stagger * 2,
        duration: 0.5,
        y: {
          type: 'spring',
          damping: 12,
          stiffness: 180,
          mass: 0.8,
        },
        rotate: {
          type: 'spring',
          damping: 8,
          stiffness: 140,
        },
        scale: {
          type: 'spring',
          damping: 10,
          stiffness: 280,
        },
      },
    }),
  };

  const words = text.split(' ');

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        ...style,
      }}
      {...props}
    >
      <span style={{ display: 'inline-block' }}>
        {words.map((word, wordIndex) => {
          const prevCharsCount = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);

          if (by === 'word') {
            return (
              <span
                key={`${word}-${wordIndex}`}
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  marginRight: wordIndex < words.length - 1 ? '0.28em' : '0',
                }}
              >
                <motion.span
                  custom={wordIndex + delayOffset}
                  variants={wordVariants}
                  initial="hidden"
                  animate={controls}
                  style={{
                    display: 'inline-block',
                    transformOrigin: 'center center',
                    willChange: 'transform, opacity',
                  }}
                >
                  {word}
                </motion.span>
              </span>
            );
          }

          return (
            <span
              key={`${word}-${wordIndex}`}
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap', // Prevents mid-word breaking
                marginRight: wordIndex < words.length - 1 ? '0.28em' : '0',
              }}
            >
              {word.split('').map((char, charIndex) => {
                const globalIndex = prevCharsCount + charIndex;
                return (
                  <motion.span
                    key={`${char}-${globalIndex}`}
                    custom={globalIndex + delayOffset}
                    variants={characterVariants}
                    initial="hidden"
                    animate={controls}
                    style={{
                      display: 'inline-block',
                      transformOrigin: 'center center',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
      </span>
    </Component>
  );
}

TextAnimate.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  by: PropTypes.oneOf(['character', 'word']),
  as: PropTypes.elementType,
  delayOffset: PropTypes.number,
  startDelay: PropTypes.number,
  stagger: PropTypes.number,
  triggerOnce: PropTypes.bool,
  style: PropTypes.object,
};

export default TextAnimate;
