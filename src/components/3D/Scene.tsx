import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the InterviewerModel to avoid SSR issues
const InterviewerModel = dynamic(() => import('./InterviewerModel'), { ssr: false });

interface SceneProps {
  interviewState: 'idle' | 'speaking' | 'listening' | 'thinking';
  currentQuestion: string;
}

export default function Scene({ interviewState, currentQuestion }: SceneProps) {
  return (
    <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <Stage intensity={1} environment="city">
          <InterviewerModel interviewState={interviewState} currentQuestion={currentQuestion} />
        </Stage>
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minPolarAngle={Math.PI / 6} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Suspense>
    </Canvas>
  );
}