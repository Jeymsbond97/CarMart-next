import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import PaletteIcon from '@mui/icons-material/Palette';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface TrendPropertyCardProps {
	property: Property;
	likePropertyHandler: any
}

const TrendPropertyCard = (props: TrendPropertyCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (propertyId: string) => {
		await router.push({ pathname: 'property/detail', query: { id: propertyId } });
	}

	if (device === 'mobile') {
		return (
			<Stack className="trend-card-box" key={property._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => pushDetailHandler(property._id)}
				>
					<div>${property.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(property._id)}>{property.propertyTitle}</strong>
					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property.propertyColor}</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{property.propertyFuel}</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{property.propertyTransmission}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>
							{property.propertyRent ? 'Rent' : ''} {property.propertyRent && property.propertySell && '/'}{' '}
							{property.propertySell ? 'Sell' : ''}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="trend-card-box" key={property._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => pushDetailHandler(property._id)}
				>
					<div>${property.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(property._id)}>{property.propertyTitle}</strong>
					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>
					<Divider sx={{ mt: '15px', mb: '12px' }} />
					<div className={'options'}>
						<div>
						<PaletteIcon sx={{ fontSize: '18px', color: '#476f9b', mb: '5px'}} />
							<span>{property.propertyColor}</span>
						</div>
						<div>
						<LocalGasStationIcon sx={{ fontSize: '18px', color: '#476f9b', mb: '5px'}} />
							<span>{property.propertyFuel}</span>
						</div>
						<div>
						<SettingsIcon sx={{ fontSize: '18px', color: '#476f9b', mb: '5px'}} />
							<span>{property.propertyTransmission}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>
							{property.propertyRent ? 'Rent' : ''} {property.propertyRent && property.propertySell && '/'}{' '}
							{property.propertySell ? 'Sell' : ''}
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default TrendPropertyCard;
