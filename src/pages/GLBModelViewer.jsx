import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelViewer = () => {
  const mountRef = useRef(null);
  const audioRef = useRef(null); // Reference to the audio element
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Track audio state

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Soft white ambient light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4); // Strong directional light
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load GLB model with animations
    const loader = new GLTFLoader();
    let mixer; // Used for playing animations

    loader.load('/public/models/model.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Ensure proper material handling to fix black color issue
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.side = THREE.DoubleSide;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Set up animation
      const animations = gltf.animations;
      if (animations && animations.length) {
        mixer = new THREE.AnimationMixer(model);
        animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });
      }

      animate();
    });

    // Camera position
    camera.position.set(0, 1, 5);

    // OrbitControls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) mixer.update(delta); // Update the animation mixer

      controls.update(); // Update the orbit controls
      renderer.render(scene, camera);
    };

    // Clean up on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle audio play/pause
  const handleAudioToggle = () => {
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying); // Toggle state
  };

  return (
    <>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
      
      {/* Audio controls */}
      <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
        <audio ref={audioRef} src="/public/audio/audio.mp3" />
        <button onClick={handleAudioToggle}>
          {isAudioPlaying ? 'Pause Audio' : 'Play Audio'}
        </button>
      </div>
    </>
  );
};

export default ModelViewer;
