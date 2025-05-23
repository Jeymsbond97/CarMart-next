import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export function Lamborghini(props) {
    const ref = useRef();
    const { scene, nodes, materials } = useGLTF('/lambo.glb');

  useFrame(() => {
    if (ref.current) {
      // X va Y o'qlari bo'yicha asta-sekin aylantiramiz
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

    nodes['glass_003'].scale.setScalar(2.7);

    materials.FrameBlack && Object.assign(materials.FrameBlack, {
      metalness: 0.75,
      roughness: 0,
      color: 'black',
    });

    materials.Chrome && Object.assign(materials.Chrome, {
      metalness: 1,
      roughness: 0,
      color: '#333',
    });

    materials.BreakDiscs && Object.assign(materials.BreakDiscs, {
      metalness: 0.2,
      roughness: 0.2,
      color: '#555',
    });

    materials.TiresGum && Object.assign(materials.TiresGum, {
      metalness: 0,
      roughness: 0.4,
      color: 'white',
    });

    materials.GreyElements && Object.assign(materials.GreyElements, {
      metalness: 0,
      color: '#292929',
    });

    materials.emitbrake && Object.assign(materials.emitbrake, {
      emissiveIntensity: 3,
      toneMapped: false,
    });

    materials.LightsFrontLed && Object.assign(materials.LightsFrontLed, {
      emissiveIntensity: 3,
      toneMapped: false,
    });

    if (nodes.yellow_WhiteCar_0) {
      nodes.yellow_WhiteCar_0.material = new THREE.MeshPhysicalMaterial({
        roughness: 0.2,
        metalness: 0.05,
        color: 'black',
        envMapIntensity: 1,
        clearcoatRoughness: 0.5,
        clearcoat: 1,
      });
    }
  }, [nodes, materials]);

  return <primitive  object={scene} {...props} />;
}
