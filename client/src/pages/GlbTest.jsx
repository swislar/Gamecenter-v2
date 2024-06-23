import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Light() {
  return (
    <directionalLight
      castShadow
      position={[0, 0, 3]}
      intensity={0.8}
      shadow-camera-far={5}
      shadow-camera-near={0}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
  );
}

function createAnimation(mixer, action, clip) {
  gsap.to(action, {
    time: clip?.duration / 1000,
    scrollTrigger: {
      trigger: ".legoman-canvas",
      start: "top center",
      end: "bottom center",
      scrub: 3,
      onUpdate: () => mixer.update(0.01),
    },
  });
}

function LegoMan({ scale, position }) {
  const gltf = useLoader(GLTFLoader, "/legoBricks.glb");
  const mixer = useRef(null);

  useEffect(() => {
    const model = gltf.scene;
    mixer.current = new THREE.AnimationMixer(model);
    const action = mixer.current.clipAction(gltf.animations[0]);
    createAnimation(mixer.current, action, gltf.animations[0]);
    action.play();
  }, [gltf]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return <primitive object={gltf.scene} scale={scale} position={position} />;
}

function Plane() {
  return (
    <mesh receiveShadow position={[0, 0, -10]}>
      <planeGeometry args={[200, 200]} />
      <shadowMaterial opacity={0.7} />
    </mesh>
  );
}

const GlbTest = () => {
  return (
    <div className="w-full legoman-canvas">
      <Canvas shadows={{ type: "BasicShadowMap" }}>
        <Light />
        <LegoMan scale={2} position={[0, -2, 0]} />
        <Plane />
      </Canvas>
    </div>
  );
};

export default GlbTest;
