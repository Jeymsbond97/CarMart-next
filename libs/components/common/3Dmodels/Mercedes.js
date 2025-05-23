import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export function Mercedes(props) {
    const ref = useRef();
    const { scene, nodes, materials } = useGLTF('./mers/mers.gltf');

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.rotation.x += 0.001;
    }
  });

  useMemo(() => {
    Object.values(nodes).forEach((node) => {
      if (node.isMesh && node.name.startsWith('glass')) {
        node.geometry.computeVertexNormals();
      }
    });

    if (nodes.yellow_WhiteCar_0) {
      nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
        roughness: 0.2,
        metalness: 0.05,
        color: 'red',
        envMapIntensity: 1,
        clearcoatRoughness: 0.5,
        clearcoat: 1,
      });
    }
  }, [nodes, materials]);

  return <primitive object={scene} {...props} />;
}
