import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Billboard, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import PropTypes from 'prop-types';

const TOOLS = [
  // Design & Prototyping
  { id: 'figma', name: 'Figma', category: 'Design & Prototyping', desc: 'End-to-end UI design and interactive prototyping.', pos: [-4, 2, 0], color: '#F24E1E' },
  { id: 'framer', name: 'Framer', category: 'Design & Prototyping', desc: 'High-fidelity interactions and web publishing.', pos: [-3, 4, -2], color: '#0055FF' },
  { id: 'stitch', name: 'Stitch', category: 'Design & Prototyping', desc: 'Advanced prototyping and component modeling.', pos: [-5, 0, -1], color: '#FF3366' },
  // AI Collaborators
  { id: 'claude', name: 'Claude', category: 'AI Collaborators', desc: 'Strategic thinking and complex problem solving.', pos: [4, 3, -1], color: '#D4C5B9' },
  { id: 'gemini', name: 'Gemini', category: 'AI Collaborators', desc: 'Multimodal analysis and rapid ideation.', pos: [5, 1, 0], color: '#1A73E8' },
  { id: 'chatgpt', name: 'ChatGPT', category: 'AI Collaborators', desc: 'Code generation and architectural drafting.', pos: [3, 0, -2], color: '#10A37F' },
  { id: 'antigravity', name: 'Antigravity', category: 'AI Collaborators', desc: 'Agentic IDE for autonomous coding workflows.', pos: [4, -2, 0], color: '#FF00FF' },
  // Code
  { id: 'react', name: 'React', category: 'Code', desc: 'Component-based UI development.', pos: [0, -3, 2], color: '#61DAFB' },
  { id: 'html5', name: 'HTML5', category: 'Code', desc: 'Semantic markup and accessibility.', pos: [-2, -4, 1], color: '#E34F26' },
  { id: 'css3', name: 'CSS3', category: 'Code', desc: 'Styling, layout, and animations.', pos: [2, -4, 1], color: '#1572B6' },
  { id: 'js', name: 'JavaScript', category: 'Code', desc: 'Client-side logic and interactions.', pos: [0, -5, 0], color: '#F7DF1E' },
  // UX Methods
  { id: 'research', name: 'User Research', category: 'UX Methods', desc: 'Qualitative and quantitative user insights.', pos: [0, 4, 1], color: '#FFFFFF' },
  { id: 'testing', name: 'Usability Testing', category: 'UX Methods', desc: 'Validating assumptions with real users.', pos: [-1.5, 5, 0], color: '#FFFFFF' },
  { id: 'journey', name: 'Journey Mapping', category: 'UX Methods', desc: 'Visualizing the end-to-end user experience.', pos: [1.5, 5, 0], color: '#FFFFFF' },
];

function Card({ tool, setActiveTool, activeToolId }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isActive = activeToolId === tool.id;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Interactive scaling
    const targetScale = isActive ? 1.2 : (hovered ? 1.1 : 1.0);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.15));

    if (!isActive) {
      // Gentle floating rotation
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.15;
    } else {
      // Face the camera directly when active
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={tool.pos}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <group
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTool(tool);
          }}
          // Cursor hint
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = 'auto'}
        >
          {/* 3D Thick Card */}
          <RoundedBox args={[2.5, 1, 0.3]} radius={0.15} smoothness={4}>
            <meshStandardMaterial 
              color={hovered || isActive ? '#D4FF3F' : '#1a1a1a'} 
              roughness={0.4}
              metalness={0.6}
            />
          </RoundedBox>
          
          <Text
            position={[0, 0, 0.16]}
            fontSize={0.28}
            color={hovered || isActive ? '#000' : '#fff'}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {tool.name}
          </Text>
        </group>
      </Billboard>
    </Float>
  );
}

Card.propTypes = {
  tool: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pos: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  setActiveTool: PropTypes.func.isRequired,
  activeToolId: PropTypes.string,
};

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function StackScene({ setActiveTool, activeToolId }) {
  const sceneRef = useRef();

  useEffect(() => {
    return () => {
      if (sceneRef.current) {
        sceneRef.current.traverse((child) => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  return (
    <div aria-label="Interactive 3D representation of technical skills and tools" role="img" style={{width: '100%', height: '100%'}}>
      <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
        Interactive 3D visualization of tools. Use mouse to rotate cards.
      </span>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }} 
        ref={sceneRef}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'default' }}
      >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <CameraRig />
      {TOOLS.map(tool => (
        <Card 
          key={tool.id} 
          tool={tool} 
          setActiveTool={setActiveTool} 
          activeToolId={activeToolId} 
        />
      ))}
      <mesh onClick={() => setActiveTool(null)} visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>
      </Canvas>
    </div>
  );
}

StackScene.propTypes = {
  setActiveTool: PropTypes.func.isRequired,
  activeToolId: PropTypes.string,
};
