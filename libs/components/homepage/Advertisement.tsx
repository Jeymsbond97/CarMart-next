import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Button, Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, OrbitControls } from '@react-three/drei'
import { Lamborghini } from '../common/3Dmodels/Lamborghini'
import { FaTachometerAlt, FaCogs, FaGasPump, FaDollarSign } from 'react-icons/fa';
import { ArrowForward } from '@mui/icons-material';

const Advertisement = () => {
	const device = useDeviceDetect();
	const Models = [Lamborghini];

	if (device == 'mobile') {
		return (
			<Stack className={'video-frame'}>
				<video
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				>
					<source src="/video/1.mp4" type="video/mp4" />
				</video>
			</Stack>
		);
	} else {
		return (
            <Stack className="video-frame">
				<Stack className="container">
					<div className="text-box">
						<h1>EXPERIENCE THE FUTURE: 2026 LAMBORGHINI UNVEILED</h1>
						<p>
						Be the first to witness the design revolution. Our client is launching this next-generation Lamborghini in 2026 — built with innovation, power, and luxury at its core. Sleek lines, futuristic curves, and unmatched performance await.
						</p>
						<div className="car-specs">
							<div className="spec-item">
							<FaTachometerAlt className="icon" />
							<span className="label">0-100 km/h:</span>
							<span className="value">3.2s</span>
							</div>
							<div className="spec-item">
							<FaCogs className="icon" />
							<span className="label">Transmission:</span>
							<span className="value">Automatic</span>
							</div>
							<div className="spec-item">
							<FaGasPump className="icon" />
							<span className="label">Fuel Type:</span>
							<span className="value">Petrol</span>
							</div>
							<div className="spec-item">
							<FaDollarSign className="icon" />
							<span className="label">Expected Price:</span>
							<span className="value">$210,000</span>
							</div>
						</div>
						{/* <button className="learn-more">Learn More</button> */}
						<Button
							className={'get-started-btn buy-btn'}
							endIcon={<ArrowForward />}
						>
							Lear More
						</Button>
					</div>

					<div className="canvas-wrapper">
						<Canvas
						gl={{ logarithmicDepthBuffer: true, antialias: false }}
						dpr={[1, 1.5]}
						camera={{ position: [0, 0, 13], fov: 27 }}
						>
						<color attach="background" args={['#2b3035']} />
						<ambientLight intensity={0.5} />
						<directionalLight
							position={[10, 10, 5]}
							intensity={1}
							castShadow
							shadow-mapSize-width={1024}
							shadow-mapSize-height={1024}
						/>
						<Lamborghini scale={0.015} />
						<hemisphereLight intensity={0.5} />
						<ContactShadows
							resolution={1024}
							frames={1}
							position={[0, -1.16, 0]}
							scale={15}
							blur={0.5}
							opacity={1}
							far={20}
						/>
						<mesh scale={4} position={[3, -1.161, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
							<ringGeometry args={[0.9, 1, 4, 1]} />
							<meshStandardMaterial color="white" roughness={0.75} />
						</mesh>
						<mesh scale={4} position={[-3, -1.161, -1]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
							<ringGeometry args={[0.9, 1, 3, 1]} />
							<meshStandardMaterial color="white" roughness={0.75} />
						</mesh>
						<Environment resolution={312}>
							<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
							<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
							<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
							<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
							<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
							<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
							<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
							<Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
							<Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
							<Lightformer form="ring" color="white" intensity={10} scale={3} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
						</Environment>
						<OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
						</Canvas>
					</div>
				</Stack>
            </Stack>
		);
	}
};

export default Advertisement;
