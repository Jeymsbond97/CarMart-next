import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
import { Home } from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgImage = '';

			switch (router.pathname) {
				case '/property':
					title = 'Cars Search';
					desc = 'Home / cars';
					bgImage = '/img/banner/properties.png';
					break;
				case '/agent':
					title = 'Dealers';
					desc = 'Home / dealers';
					bgImage = '/img/banner/agents.webp';
					break;
				case '/agent/detail':
					title = 'Dealer Page';
					desc = 'Home / dealer page';
					bgImage = '/img/banner/header2.svg';
					break;
				case '/mypage':
					title = 'My Page';
					desc = 'Home / my page';
					bgImage = '/img/banner/header1.svg';
					break;
				case '/community':
					title = 'Blog';
					desc = 'Home / blog';
					bgImage = '/img/banner/header2.svg';
					break;
				case '/community/detail':
					title = 'Blog Detail';
					desc = 'Home / blog detail';
					bgImage = '/img/banner/header2.svg';
					break;
				case '/cs':
					title = 'FAQ';
					desc = 'Home / faq';
					bgImage = '/img/banner/header2.svg';
					break;
				case '/account/join':
					title = 'Register';
					desc = 'Home / Login';
					bgImage = '/img/banner/header2.svg';
					setAuthHeader(true);
					break;
				case '/member':
					title = 'Member Page';
					desc = 'Home / member';
					bgImage = '/img/banner/header1.svg';
					break;
				case '/price':
					title = 'Price Page';
					desc = 'Home / price';
					bgImage = '/img/banner/header1.svg';
					break;
				default:
					break;
			}

			return { title, desc, bgImage };
		}, [router.pathname]);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Nestar</title>
						<meta name={'title'} content={`Nestar`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>Carmart</title>
						<meta name={'title'} content={`Carmart`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack
							className={`header-basic ${authHeader && 'auth'}`}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<Stack className="desc-section">
									<Home
										sx={{
											color: '#dee2e6',
											fontSize: 18,
											marginRight: '4px'
										}}
									/>
									<span>{t(memoizedValues.desc)}</span>
								</Stack>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						{user?._id && <Chat />}

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;
