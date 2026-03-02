import { useFrame } from '@react-three/fiber';
import { MeshDiscardMaterial } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InterviewerModelProps {
  interviewState: 'idle' | 'speaking' | 'listening' | 'thinking';
  currentQuestion: string;
}

export default function InterviewerModel({ interviewState, currentQuestion }: InterviewerModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [eyeBlink, setEyeBlink] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);
  
  // Animation effects based on interview state
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Mouth animation for speaking state
    if (interviewState === 'speaking') {
      interval = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 300);
    } else {
      setMouthOpen(false);
    }
    
    // Head tilt animation for listening state
    if (interviewState === 'listening') {
      interval = setInterval(() => {
        setHeadTilt(Math.sin(Date.now() * 0.002) * 0.1);
      }, 100);
    } else {
      setHeadTilt(0);
    }
    
    // Eye blink animation periodically
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to blink every 3 seconds
        setEyeBlink(true);
        setTimeout(() => setEyeBlink(false), 150);
      }
    }, 3000);
    
    return () => {
      if (interval) clearInterval(interval);
      clearInterval(blinkInterval);
    };
  }, [interviewState]);
  
  // Animate the group based on state
  useFrame(() => {
    if (groupRef.current) {
      // Subtle breathing motion for idle state
      if (interviewState === 'idle') {
        groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.02;
      } else {
        groupRef.current.position.y = 0;
      }
      
      // Apply head tilt for listening state
      if (groupRef.current.rotation) {
        groupRef.current.rotation.z = headTilt;
      }
    }
  });
  
  // Simple geometric representation of a character
  return (
    <group ref={groupRef}>
      {/* Body - simple cylinder */}
      <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 16]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.1} roughness={0.8} />
      </mesh>
      
      {/* Head - sphere with facial features */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.1} roughness={0.7} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.15, 0.3, 0.4]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.15, 0.3, 0.4]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      
      {/* Pupils */}
      <mesh position={[0.17, 0.3, 0.42]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.17, 0.3, 0.42]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Eyelids for blinking effect */}
      {eyeBlink && (
        <>
          <mesh position={[0.15, 0.32, 0.41]} rotation={[0.5, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 8, 0, Math.PI]} />
            <meshStandardMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-0.15, 0.32, 0.41]} rotation={[0.5, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 8, 0, Math.PI]} />
            <meshStandardMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>
        </>
      )}
      
      {/* Nose */}
      <mesh position={[0, 0.1, 0.45]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.05, 0.15, 4]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
      
      {/* Mouth - changes shape based on speaking state */}
      <mesh position={[0, -0.1, 0.45]} rotation={[0.2, 0, 0]}>
        {mouthOpen ? (
          <sphereGeometry args={[0.1, 16, 8, 0, Math.PI * 2, 0, Math.PI]} />
        ) : (
          <boxGeometry args={[0.2, 0.05, 0.01]} />
        )}
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Name tag/speech bubble */}
      {interviewState !== 'idle' && (
        <group position={[0, 1.5, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
            <roundedBoxGeometry args={[currentQuestion.length * 0.1 + 0.5, 0.3, 0.1]} radius={0.05} smoothness={4} />
            <meshStandardMaterial color="white" transparent opacity={0.9} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0.06]}>
            <textGeometry args={[currentQuestion.substring(0, 30) + (currentQuestion.length > 30 ? '...' : ''), { 
              font: new THREE.Font(), 
              size: 0.1, 
              height: 0.01,
              curveSegments: 4,
              bevelEnabled: false
            }]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Helper component for rounded box geometry since it's not standard in Three.js
const roundedBoxGeometry = (width: number, height: number, depth: number, radius: number, smoothness: number) => {
  const geometry = new THREE.BufferGeometry();
  
  // This is a simplified version - in a real implementation we would calculate
  // vertices for a proper rounded box
  const boxGeometry = new THREE.BoxGeometry(width, height, depth);
  return boxGeometry;
};