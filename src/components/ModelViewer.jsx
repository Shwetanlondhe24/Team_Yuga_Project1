import React from 'react';
import '@google/model-viewer';

const ModelViewer = () => {
  return (
    <model-viewer
      src="/models/your-model.glb"
      alt="A 3D model of a product"
      ar
      ar-modes="scene-viewer webxr quick-look"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      style={{ width: '100%', height: '100vh' }}
    >
    </model-viewer>
  );
};

export default ModelViewer;
