import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIcon from '@mui/icons-material/Phone';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface AgentCardProps {
	dealer: any;
	likeMemberHandler: any
}

const AgentCard = (props: AgentCardProps) => {
	const { dealer, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = dealer?.memberImage
		? `${REACT_APP_API_URL}/${dealer?.memberImage}`
		: '/img/profile/defaultUser.svg';

		const getMemberTypeInfo = (memberType: string) => {
			switch (memberType) {
				case 'USER':
					return { icon: <PersonIcon className="phoneIcon" fontSize="small" />, text: 'User' };
				case 'DEALER':
					return { icon: <BusinessIcon className="phoneIcon" fontSize="small" />, text: 'Dealer' };
				default:
					return { icon: <PersonIcon className="phoneIcon" fontSize="small" />, text: 'Member' };
			}
		};
		const memberTypeInfo = getMemberTypeInfo(dealer?.memberType);

	if (device === 'mobile') {
		return <div>DEALER CARD</div>;
	} else {
		return (
			// <Stack className="agent-general-card">
			// 	<Link
			// 		href={{
			// 			pathname: '/agent/detail',
			// 			query: { agentId: agent?._id },
			// 		}}
			// 	>
			// 		<Box
			// 			component={'div'}
			// 			className={'agent-img'}
			// 			style={{
			// 				backgroundImage: `url(${imagePath})`,
			// 				backgroundSize: 'cover',
			// 				backgroundPosition: 'center',
			// 				backgroundRepeat: 'no-repeat',
			// 			}}
			// 		>
			// 			<div>{agent?.memberProperties} properties</div>
			// 		</Box>
			// 	</Link>

			// 	<Stack className={'agent-desc'}>
			// 		<Box component={'div'} className={'agent-info'}>
			// 			<Link
			// 				href={{
			// 					pathname: '/agent/detail',
			// 					query: { agentId: 'id' },
			// 				}}
			// 			>
			// 				<strong>{agent?.memberFullName ?? agent?.memberNick}</strong>
			// 			</Link>
			// 			<span>Agent</span>
			// 		</Box>
			// 		<Box component={'div'} className={'buttons'}>
			// 			<IconButton color={'default'}>
			// 				<RemoveRedEyeIcon />
			// 			</IconButton>
			// 			<Typography className="view-cnt">{agent?.memberViews}</Typography>
			// 			<IconButton color={'default'}>
			// 				{agent?.meLiked && agent?.meLiked[0]?.myFavorite ? (
			// 					<FavoriteIcon color={'primary'} />
			// 				) : (
			// 					<FavoriteBorderIcon />
			// 				)}
			// 			</IconButton>
			// 			<Typography className="view-cnt">{agent?.memberLikes}</Typography>
			// 		</Box>
			// 	</Stack>
			// </Stack>
			<Stack className="top-agent-card-v2">
				{/* TOP - Image va Name, Phone */}
				<Box className="top-box">
					<Link
						href={{
							pathname: '/agent/detail',
							query: { agentId: dealer?._id },
						}}
					>
						<img src={imagePath} alt={dealer.memberNick} className="profile-img" />
					</Link>
					<Box className="info">
						<Box className="nickname-box">
							<PersonIcon fontSize="small" />
							<Link
								href={{
									pathname: '/agent/detail',
									query: { agentId: dealer?._id },
								}}
							>
								<Typography className="nickname">{dealer?.memberFullName ?? dealer?.memberNick}</Typography>
							</Link>
						</Box>
						<Box className="phone-box">
							<PhoneIcon className='phoneIcon' fontSize="small" />
							<Typography className="phone">{dealer?.memberPhone || 'No phone'}</Typography>
						</Box>
						<Box className="phone-box">
							{memberTypeInfo.icon}
							<Typography className="phone">{memberTypeInfo.text}</Typography>
						</Box>
					</Box>
				</Box>

				{/* Divider */}
				<Box className="divider" />

				{/* Stats with icons */}
				<Box className="stats-box">
					<Box className="stat-item">
						<Typography className="stat-title">Listings</Typography>
						<Box className="icon-value">
							<DriveEtaIcon fontSize="small" />
							<Typography>{dealer?.memberProperties || 0}</Typography>
						</Box>
					</Box>
					<Box className="stat-item">
						<Typography className="stat-title">Followers</Typography>
						<Box className="icon-value">
							<GroupIcon fontSize="small" />
							<Typography>{dealer?.memberFollowers || 0}</Typography>
						</Box>
					</Box>
					<Box className="stat-item">
						<Typography className="stat-title">Followings</Typography>
						<Box className="icon-value">
							<PersonAddIcon fontSize="small" />
							<Typography>{dealer?.memberFollowings || 0}</Typography>
						</Box>
					</Box>
				</Box>

				{/* Divider */}
				<Box className="divider" />

				{/* Description */}
				<Typography className="desc-text">{dealer?.memberDesc || 'No description available'}</Typography>

				{/* Bottom - Views & Likes and Read More */}
				<Box className="bottom-box">
					<Link
						href={{
							pathname: '/agent/detail',
							query: { agentId: dealer?._id },
						}}
					>
						<Box className="read-more">Read More...</Box>
					</Link>
					<Box className="actions">
						<Box className="icon-text">
							<VisibilityIcon fontSize="small" />
							<Typography>{dealer?.memberViews || 0}</Typography>
						</Box>
						<Box className="icon-text">
							<IconButton color={'default'} size="small" onClick={() => likeMemberHandler(user, dealer?._id) }>
								{dealer?.meLiked && dealer?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }}  />
								) : (
									<FavoriteBorderIcon fontSize="small" />
								)}
							</IconButton>
							<Typography>{dealer?.memberLikes || 0}</Typography>
						</Box>
					</Box>
				</Box>
			</Stack>
		);
	}
};

export default AgentCard;
