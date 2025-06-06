import React from 'react';
import { Stack, Box, Button, Link } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ArrowForward } from '@mui/icons-material';

interface EventData {
	eventTitle: string;
	city: string;
	description: string;
	imageSrc: string;
}
const eventsData: EventData[] = [
	{
		eventTitle: 'Paradise City Theme Park',
		city: 'Incheon',
		description:
			'Experience magic and wonder in Incheon with a visit to the night-themed indoor theme park Wonderbox at Paradise City!',
		imageSrc: '/img/events/INCHEON.webp',
	},
	{
		eventTitle: 'Taebaeksan Snow Festival',
		city: 'Seoul',
		description: 'If you have the opportunity to travel to South Korea, do not miss the Taebaeksan Snow Festival!',
		imageSrc: '/img/events/SEOUL.webp',
	},
	{
		eventTitle: 'Suseong Lake Event',
		city: 'Daegu',
		description: 'The Suseong Lake Festival is a culture and arts festival held alongside Suseongmot Lake!',
		imageSrc: '/img/events/DAEGU.webp',
	},
	{
		eventTitle: 'Sand Festival',
		city: 'Busan',
		description:
			'Haeundae Sand Festival, the nation’s largest eco-friendly exhibition on sand, is held at Haeundae Beach!',
		imageSrc: '/img/events/BUSAN.webp',
	},
];

const EventCard = ({ event }: { event: EventData }) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				style={{
					backgroundImage: `url(${event?.imageSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Box component={'div'} className={'info'}>
					<strong>{event?.city}</strong>
					<span>{event?.eventTitle}</span>
				</Box>
				<Box component={'div'} className={'more'}>
					<span>{event?.description}</span>
				</Box>
			</Stack>
		);
	}
};

const CarServices = () => {
	const device = useDeviceDetect();

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
							<Link to="/price" style={{ textDecoration: 'none' }}>
  <Button 
    className={'get-started-btn buy-btn'}
    endIcon={<ArrowForward />}
  >
    Get Started
  </Button>
</Link>

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
