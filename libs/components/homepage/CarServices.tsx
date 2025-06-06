import React from 'react';
import { Stack, Box, Button, Link } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ArrowForward } from '@mui/icons-material';
import { useRouter } from 'next/router';


const CarServices = () => {
	const device = useDeviceDetect();
	const router =useRouter();

    const handleNavigate = () => {
		router.push('/price');
    };

	if (device === 'mobile') {
		return <div>CarServices</div>;
	} else {
		return (
			<Stack className={'events'}>
			<Stack className={'container'}>
				<Stack className={'card-wrapper'}>
					{/* Looking for a Car Card */}
					<Box className={'service-card buy-card'}>
						<Box className={'card-content'}>
							<h2>Are You Looking For a Car ?</h2>
							<p>Find your perfect vehicle from our extensive collection of quality cars.</p>
							<Button
								className={'get-started-btn buy-btn'}
									endIcon={<ArrowForward />}
									onClick={handleNavigate}
							>
								Get Started
							</Button>
						</Box>
						<Box className={'card-icon'}>
							<svg width="100" height="100" viewBox="0 0 100 100" fill="none">
								<circle cx="50" cy="50" r="40" fill="#4A9EFF" fillOpacity="0.1"/>
								<path d="M25 45h50l-8 20H33l-8-20z" fill="#4A9EFF"/>
								<circle cx="35" cy="65" r="6" fill="#4A9EFF"/>
								<circle cx="65" cy="65" r="6" fill="#4A9EFF"/>
								<path d="M45 35l5-10 5 10z" fill="#FF6B9D" stroke="#FF6B9D" strokeWidth="2"/>
							</svg>
						</Box>
					</Box>

					{/* Sell a Car Card */}
					<Box className={'service-card sell-card'}>
						<Box className={'card-content'}>
							<h2>Do You Want to Sell a Car ?</h2>
							<p>Get the best price for your vehicle with our trusted selling platform.</p>
							<Button 
								className={'get-started-btn buy-btn'}
								endIcon={<ArrowForward />}
								onClick={handleNavigate}
							>
								Get Started
							</Button>
						</Box>
						<Box className={'card-icon'}>
							<svg width="100" height="100" viewBox="0 0 100 100" fill="none">
								<circle cx="50" cy="50" r="40" fill="#FF6B9D" fillOpacity="0.1"/>
								<rect x="35" y="30" width="30" height="20" rx="2" fill="#FF6B9D"/>
								<path d="M40 25h20v10H40z" fill="#4A9EFF"/>
								<text x="50" y="45" textAnchor="middle" fill="white" fontSize="12">$</text>
								<path d="M30 55l5 5 5-5" stroke="#FF6B9D" strokeWidth="2" fill="none"/>
							</svg>
						</Box>
					</Box>
				</Stack>
			</Stack>
		</Stack>
		);
	}
};

export default CarServices;
