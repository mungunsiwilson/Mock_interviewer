import { useState, useEffect } from 'react';

// Define animation states
type AnimationState = 'idle' | 'speaking' | 'listening' | 'thinking' | 'greeting';

interface AnimationStateConfig {
  body: string;
  head: string;
  eyes: string;
  hands: string;
  expression?: string;
  mouth?: string;
}

// Animation configuration based on state
const animationStates: Record<AnimationState, AnimationStateConfig> = {
  idle: {
    body: 'subtle_breathing',
    head: 'micro_movements',
    eyes: 'periodic_blink',
    hands: 'rest_position'
  },
  speaking: {
    body: 'gesturing',
    head: 'emphasizing',
    eyes: 'engaging',
    hands: 'illustrative_movements',
    mouth: 'lip_sync',
    expression: 'appropriate_to_topic'
  },
  listening: {
    body: 'slightly_forward',
    head: 'occasional_nod',
    eyes: 'focused_on_user',
    hands: 'still',
    expression: 'attentive'
  },
  thinking: {
    body: 'slight_recline',
    head: 'tilt',
    eyes: 'upward_glance',
    hands: 'steepled',
    expression: 'thoughtful'
  },
  greeting: {
    body: 'upright_posture',
    head: 'nod',
    eyes: 'warm_gaze',
    hands: 'welcoming_gesture',
    expression: 'smile'
  }
};

interface CharacterAnimationsProps {
  currentState: AnimationState;
  onStateChange?: (newState: AnimationState) => void;
}

export default function CharacterAnimations({ currentState, onStateChange }: CharacterAnimationsProps) {
  const [activeAnimations, setActiveAnimations] = useState<AnimationStateConfig>(animationStates[currentState]);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // Update animations when state changes
    setActiveAnimations(animationStates[currentState]);
    
    // Trigger state change callback if provided
    if (onStateChange) {
      onStateChange(currentState);
    }
    
    // Set transitioning state for smooth transitions
    setTransitioning(true);
    const transitionTimer = setTimeout(() => setTransitioning(false), 300);
    
    return () => clearTimeout(transitionTimer);
  }, [currentState, onStateChange]);

  // Render animation indicators (in a real implementation, these would drive 3D model animations)
  return (
    <div className="character-animations" style={{ display: 'none' }}>
      {/* Animation state indicators for debugging purposes */}
      <div className="animation-state-info">
        <span data-state={currentState} data-transitioning={transitioning}>
          {currentState}
        </span>
      </div>
      
      {/* Animation classes that would be applied to 3D model parts */}
      <div 
        className={`body-animation ${activeAnimations.body} ${transitioning ? 'transitioning' : ''}`}
        data-animation-type="body"
      />
      <div 
        className={`head-animation ${activeAnimations.head} ${transitioning ? 'transitioning' : ''}`}
        data-animation-type="head"
      />
      <div 
        className={`eyes-animation ${activeAnimations.eyes} ${transitioning ? 'transitioning' : ''}`}
        data-animation-type="eyes"
      />
      <div 
        className={`hands-animation ${activeAnimations.hands} ${transitioning ? 'transitioning' : ''}`}
        data-animation-type="hands"
      />
      {activeAnimations.expression && (
        <div 
          className={`expression-animation ${activeAnimations.expression} ${transitioning ? 'transitioning' : ''}`}
          data-animation-type="expression"
        />
      )}
      {activeAnimations.mouth && (
        <div 
          className={`mouth-animation ${activeAnimations.mouth} ${transitioning ? 'transitioning' : ''}`}
          data-animation-type="mouth"
        />
      )}
    </div>
  );
}

// Hook to manage character animations
export const useCharacterAnimations = () => {
  const [currentState, setCurrentState] = useState<AnimationState>('idle');
  
  const changeState = (newState: AnimationState) => {
    setCurrentState(newState);
  };
  
  const triggerGreeting = () => {
    setCurrentState('greeting');
    setTimeout(() => setCurrentState('listening'), 2000);
  };
  
  const startSpeaking = () => {
    setCurrentState('speaking');
  };
  
  const startListening = () => {
    setCurrentState('listening');
  };
  
  const startThinking = () => {
    setCurrentState('thinking');
  };
  
  return {
    currentState,
    changeState,
    triggerGreeting,
    startSpeaking,
    startListening,
    startThinking
  };
};