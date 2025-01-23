import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Starfield: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Star creation
    const stars: THREE.Mesh[] = [];
    for (let i = 0; i < 1000; i++) {
      const starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeometry, starMaterial);

      star.position.x = (Math.random() - 0.5) * 200;
      star.position.y = (Math.random() - 0.5) * 200;
      star.position.z = (Math.random() - 0.5) * 200;

      scene.add(star);
      stars.push(star);
    }

    // Set camera position
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      stars.forEach((star) => {
        star.position.z += 0.5;
        if (star.position.z > 50) {
          star.position.z = -50;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Adjust scene on window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    />
  );
};

export default Starfield;