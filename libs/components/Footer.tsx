import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { Stack, Box } from '@mui/material';
import moment from 'moment';

const Footer = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return (
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
					    <Box sx={{
								display: 'flex',
								alignItems: 'center',
							}} component={'div'} className={'footer-box'}>
							<img src="/img/logo/111.png" alt="" className={'logo'} />
							<div><strong style={{color: "#e685b5"}}>CARMART</strong></div>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 3945 0097</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
						    <span>24/7 support center</span>
							<p>+82 10 3432 1221</p>
							<span>Support?</span>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us on social media</p>
							<div style={{cursor: "pointer"}} className={'media-box'}>
							<FacebookOutlinedIcon sx={{ transition: '0.3s', '&:hover': { color: "#e685b5" } }} />
							<TelegramIcon sx={{ transition: '0.3s', '&:hover': { color: "#e685b5" } }} />
							<InstagramIcon sx={{ transition: '0.3s', '&:hover': { color: "#e685b5" } }} />
							<TwitterIcon sx={{ transition: '0.3s', '&:hover': { color: "#e685b5" } }} />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'bottom'}>
						    <div>
								<strong>Popular Search</strong>
								<span>Brand Cars for Rent</span>
								<span>Cars with low price</span>
								<span>Credit cars</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
								<strong>Partnership</strong>
								<span>BWM</span>
								<span>MERS</span>
								<span>AUDI</span>
								<span>KIA</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span style={{color: "#e685b5"}}>©<strong> CARMART</strong> - All rights reserved. CARMART {moment().year()}</span>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
						<Box sx={{
								display: 'flex',
								alignItems: 'center',
							}} component={'div'} className={'footer-box'}>
							<img src="/img/logo/111.png" alt="" className={'logo'} />
							<div><strong style={{color: "#e685b5"}}>CARMART</strong></div>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 3945 0097</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>24/7 support center</span>
							<p>+82 10 3432 1221</p>
							<span>Support?</span>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us on social media</p>
							<div style={{cursor: "pointer"}} className={'media-box'}>
							<FacebookOutlinedIcon sx={{ transition: '0.3s', '&:hover': { color: "#e685b5" } }} />
							<TelegramIcon sx={{ transition: '0.3s', '&:hover': { color: "#e685b5" } }} />
							<InstagramIcon sx={{ transition: '0.3s', '&:hover': { color: "#e685b5" } }} />
							<TwitterIcon sx={{ transition: '0.3s', '&:hover': { color: "#e685b5" } }} />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'top'}>
							<strong>keep yourself up to date</strong>
							<div>
								<input type="text" placeholder={'Your Email'} />
								<span style={{color: "#e685b5"}}>Subscribe</span>
							</div>
						</Box>
						<Box component={'div'} className={'bottom'}>
							<div>
								<strong>Popular Search</strong>
								<span>Brand Cars for Rent</span>
								<span>Cars with low price</span>
								<span>Credit cars</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
								<strong>Partnership</strong>
								<span>BWM</span>
								<span>MERS</span>
								<span>AUDI</span>
								<span>KIA</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span style={{color: "#e685b5"}}>© <strong> CARMART</strong> - All rights reserved. CARMART {moment().year()}</span>
					<span>Privacy · Terms · Sitemap</span>
				</Stack>
			</Stack>
		);
	}
};

export default Footer;
