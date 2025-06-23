import React from 'react';
import { useRouter } from 'next/router';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Member } from '../../types/member/member';

interface TopAgentProps {
	dealer: Member;
}
const TopAgentCard = (props: TopAgentProps) => {
	const { dealer } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const agentImage = dealer?.memberImage
		? `${process.env.REACT_APP_API_URL}/${dealer?.memberImage}`
		: '/img/profile/defaultUser.svg';

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="top-agent-card">
				<img src={agentImage} alt="" />

				<strong>{dealer?.memberNick}</strong>
				<span>{dealer?.memberType}</span>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-agent-card-v2">
				{/* TOP - Image va Name, Phone */}
				<Box className="top-box">
					<img src={agentImage} alt={dealer.memberNick} className="profile-img" />
					<Box className="info">
					<Box className="nickname-box">
						<PersonIcon fontSize="small" />
						<Typography className="nickname">{dealer.memberNick}</Typography>
					</Box>
					<Box className="phone-box">
						<PhoneIcon fontSize="small" />
						<Typography className="phone">{dealer.memberPhone}</Typography>
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
						<Typography>{dealer.memberProperties}</Typography>
					</Box>
					</Box>
					<Box className="stat-item">
					<Typography className="stat-title">Followers</Typography>
					<Box className="icon-value">
						<GroupIcon fontSize="small" />
						<Typography>{dealer.memberFollowers || 0}</Typography>
					</Box>
					</Box>
					<Box className="stat-item">
					<Typography className="stat-title">Followings</Typography>
					<Box className="icon-value">
						<PersonAddIcon fontSize="small" />
						<Typography>{dealer.memberFollowings || 0}</Typography>
					</Box>
					</Box>
				</Box>

				{/* Divider */}
				<Box className="divider" />

				{/* Description */}
				<Typography className="desc-text">{dealer.memberDesc || 'No Description'}</Typography>

				{/* Bottom - Views & Likes and Read More */}
				<Box className="bottom-box">
					<Box className="read-more">Read More...</Box>
					<Box className="actions">
					<Box className="icon-text">
						<VisibilityIcon fontSize="small" />
						<Typography>{dealer.memberViews}</Typography>
					</Box>
					<Box className="icon-text">
						<FavoriteBorderIcon fontSize="small" />
						<Typography>{dealer.memberLikes}</Typography>
					</Box>
					</Box>
				</Box>
            </Stack>
		);
	}
};

export default TopAgentCard;
