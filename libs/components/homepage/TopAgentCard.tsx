import React from 'react';
import { useRouter } from 'next/router';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
				<img src={agentImage} alt={dealer.memberNick} className="profile-img" />

				<Typography className="nickname">{dealer.memberNick}</Typography>

				<Box className="stats-box">
					<Typography>{dealer.memberProperties} Listings</Typography>
					<Typography>{dealer.memberFollowers || 0} Followers</Typography>
					<Typography>{dealer.memberFollowings || 0} Followings</Typography>
				</Box>

				<Box className="actions-box">
					<Box className="view-box">
					<IconButton><VisibilityIcon /></IconButton>
					<Typography>{dealer.memberViews}</Typography>
					</Box>
					<Box className="like-box">
					<IconButton><FavoriteBorderIcon /></IconButton>
					<Typography>{dealer.memberLikes}</Typography>
					</Box>
				</Box>
			</Stack>
		);
	}
};

export default TopAgentCard;
