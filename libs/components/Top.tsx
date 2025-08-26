import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Logout } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';


const Top = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);
    const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
    const notificationOpen = Boolean(notificationAnchor);

	// NotificationHandler
	const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
		setNotificationAnchor(event.currentTarget);
	};

	const handleNotificationClose = () => {
		setNotificationAnchor(null);
	};

	/** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/property/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	/** HANDLERS **/
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 35) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	const [showScrollTop, setShowScrollTop] = useState(false);
	useEffect(() => {
		const onScroll = () => {
		setColorChange(window.scrollY >= 35);
		setShowScrollTop(window.scrollY >= 150);
		};
		window.addEventListener('scroll', onScroll);
		onScroll(); // sahifa yuklanganda ham tekshir
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	// Icon Handlers
	const handleFavoritesClick = () => {
		router.push({
			pathname: '/mypage',
			query: { category: 'myFavorites' }
		});
	};

	const handleRecentlyVisitedClick = () => {
		router.push({
			pathname: '/mypage',
			query: { category: 'recentlyVisited' }
		});
	};

	const isHome = router.pathname === '/';

	// const localInfoClass = `local-info ${isHome && colorChange ? 'scrolled-home' : ''}` as string;
	const navbarMainClass: string = `navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''} ${isHome ? 'dark-font' : 'light-font'}`;

    const containerClass: string = `container ${isHome ? (colorChange ? 'light-font' : 'dark-font') : ''}`;


	if (device == 'mobile') {
		return (
			<Stack className={'top'}>
				<Link href={'/'}>
					<div>{t('Home')}</div>
				</Link>
				<Link href={'/property'}>
					<div>{t('Listing')}</div>
				</Link>
				<Link href={'/agent'}>
					<div> {t('Dealer')} </div>
				</Link>
				<Link href={'/community?articleCategory=FREE'}>
					<div> {t('Blog')} </div>
				</Link>
				<Link href={'/cs'}>
					<div> {t('Faq')} </div>
				</Link>
			</Stack>
		);
	} else {
		return (
			<Stack className="navbar">
				<Stack className={navbarMainClass}>
					<Stack className={containerClass}>
						<Box component={'div'} className={'logo-box'}>
							<Link href={'/'}>
								<img src="/img/logo/111.png" alt="" />
							</Link>
						</Box>
						<Box className={`local-info ${isHome && colorChange ? ' scrolled-home' : ''}` as any}>
							<div className="info-block">
								<LocationOnIcon className="info-icon" />
								<div className="info-text">
								<p className="info-title">KOREA</p>
								<p className="info-sub">SEOUL, 12B Street</p>
								</div>
							</div>
							<div className="divider" />
							<div className="info-block">
								<AccessTimeIcon className="info-icon" />
								<div className="info-text">
								<p className="info-title">Mon - Sat: 9AM - 22PM</p>
								<p className="info-sub">Sunday Closed</p>
								</div>
							</div>
							<div className="divider" />
							<div className="info-block">
								<EmailIcon className="info-icon" />
								<div className="info-text">
								<p className="info-title">+82 10 3945 0097</p>
								<p className="info-sub">jeyms@gmail.com</p>
								</div>
							</div>
						</Box>

						<Box component={'div'} className={'user-box'}>
							{user?._id ? (
								<>
									<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
										<Link href={'/mypage'}>
										<img
											src={
												user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
											}
											alt=""
										/>
										</Link>
									</div>

									{/* <Menu
										id="basic-menu"
										anchorEl={logoutAnchor}
										open={logoutOpen}
										onClose={() => {
											setLogoutAnchor(null);
										}}
										sx={{ mt: '5px' }}
									>
										<MenuItem onClick={() => logOut()}>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											Logout
										</MenuItem>
									</Menu> */}
								</>
							) : (
								<Link href={'/account/join'}>
									<div className={'join-box'}>
										<AccountCircleOutlinedIcon />
										<span>
											{t('Register')}
										</span>
									</div>
								</Link>
							)}

							<div className={'lan-box'}>
								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								>
									<Box component={'div'} className={'flag'}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
										) : (
											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
										)}
									</Box>
								</Button>

								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<img
											className="img-flag"
											src={'/img/flag/langen.png'}
											onClick={langChoice}
											id="en"
											alt={'usaFlag'}
										/>
										{t('English')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<img
											className="img-flag"
											src={'/img/flag/langkr.png'}
											onClick={langChoice}
											id="kr"
											alt={'koreanFlag'}
										/>
										{t('Korean')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="ru">
										<img
											className="img-flag"
											src={'/img/flag/langru.png'}
											onClick={langChoice}
											id="ru"
											alt={'russiaFlag'}
										/>
										{t('Russian')}
									</MenuItem>
								</StyledMenu>
							</div>
						</Box>
					</Stack>

					<div className="horizontal-divider">&nbsp;</div>

					<Stack className={`container-bottom ${isHome ? (colorChange ? 'light-font' : 'dark-font') : ''}`}>
						    <Box component={'div'} className={`router-box ${isHome && colorChange ? 'scrolled-home' : ''}`}>
								<Link href={'/'}>
								<div className={router.pathname === '/' ? 'active' : ''}>{t('Home')}</div>
								</Link>
								<Link href={'/property'}>
								<div className={router.pathname === '/property' ? 'active' : ''}>{t('Listing')}</div>
								</Link>
								<Link href={'/agent'}>
								<div className={router.pathname === '/agent' ? 'active' : ''}>{t('Dealers')}</div>
								</Link>
								<Link href={'/community?articleCategory=FREE'}>
								<div className={router.pathname.startsWith('/community') ? 'active' : ''}>{t('Blog')}</div>
								</Link>
								{user?._id && (
								<Link href={'/mypage'}>
									<div className={router.pathname === '/mypage' ? 'active' : ''}>{t('My Page')}</div>
								</Link>
								)}
								<Link href={'/cs'}>
								<div className={router.pathname === '/cs' ? 'active' : ''}>{t('Faq')}</div>
								</Link>
							</Box>
							{user?._id && (
								<Box className={`router-icons ${isHome && colorChange ? 'scrolled-home' : ''}`}>
								<div className="icon-badge" onClick={handleFavoritesClick}>
									< FavoriteBorderIcon  />
								</div>
								<div className="icon-badge">
									<VisibilityOutlinedIcon onClick={handleRecentlyVisitedClick} />
								</div>
								<div className="icon-badge" onClick={handleNotificationClick} style={{ cursor: 'pointer' }}>
									<NotificationsOutlinedIcon />
									<span className="badge"></span>
								</div>
								<Menu
								anchorEl={notificationAnchor}
								open={notificationOpen}
								onClose={handleNotificationClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								PaperProps={{
									sx: {
										minWidth: 200,
										maxWidth: 340,
										borderRadius: 2,
										boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
										border: '1px solid #e0e0e0'
									}
								}}
								>
									<Box sx={{ p: 1, borderBottom: '1px solid #f0f0f0' }}>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
											<span style={{ fontWeight: 600, fontSize: '16px' }}>Notifications</span>
											<span style={{ color: '#666', fontSize: '12px' }}>0 New</span>
										</Box>
									</Box>
								<Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
									<Box sx={{
										p: 3,
										textAlign: 'center',
										color: '#999',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 1
									}}>
										<span style={{ fontSize: '14px' }}>No notifications yet</span>
										<span style={{ fontSize: '12px', color: '#bbb' }}>We'll notify you when something arrives!</span>
									</Box>
								</Box>
							</Menu>
							</Box>
						)}
					</Stack>

					<div className="horizontal-divider">&nbsp;</div>
				</Stack>
				{showScrollTop && (
				<div
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					style={{
					position: 'fixed',
					bottom: '5px',
					right: '48px',
					color: '#000',
					cursor: 'pointer',
					fontSize: '35px',
					fontWeight: "900",
					zIndex: 9999,
					}}
				>
					↑
				</div>
				)}
			</Stack>
		);
	}
};

export default withRouter(Top);
