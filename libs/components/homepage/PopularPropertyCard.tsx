import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import PaletteIcon from '@mui/icons-material/Palette';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface PopularPropertyCardProps {
	property: Property;
}

const PopularPropertyCard = (props: PopularPropertyCardProps) => {
	const { property } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (propertyId: string) => {
		await router.push({ pathname: 'property/detail', query: { id: propertyId } });
	}

	if (device === 'mobile') {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => pushDetailHandler(property._id)}
				>
					{property && property?.propertyRank >= 40 ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}

					<div className={'price'}>${property.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(property._id)}>{property.propertyTitle}</strong>
					<p className={'desc'}>{property.propertyAddress}</p>
					<div className={'options'}>
						<div>
						    <PaletteIcon sx={{ fontSize: '18px', color: '#476f9b' }} />
							<span>{property?.propertyColor}</span>
						</div>
						<div>
						<LocalGasStationIcon sx={{ fontSize: '18px', color: '#476f9b' }} />
							<span>{property?.propertyFuel}</span>
						</div>
						<div>
						<SettingsIcon sx={{ fontSize: '18px', color: '#476f9b' }} />
							<span>{property?.propertyTransmission}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{property?.propertyRent ? 'rent' : 'sale'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => pushDetailHandler(property._id)}
				>
					{property && property?.propertyRank >= 50 ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}

					<div className={'price'}>${property.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(property._id)}>{property.propertyTitle}</strong>
					{/* <p className={'desc'}>{property.propertyAddress}</p> */}
					<Stack className="address">
					    <Typography className={'brand'}>
						    {property.propertyBrand}
						</Typography>
						<Typography className={'desc'}>
							{property.propertyAddress}
						</Typography>
					</Stack>
					<Divider sx={{ mt: '15px', mb: '2px' }} />
					<div className={'options'}>
						<div>
						<PaletteIcon sx={{ fontSize: '18px', color: '#476f9b' }} />
							<span>{property?.propertyColor}</span>
						</div>
						<div>
						<LocalGasStationIcon sx={{ fontSize: '18px', color: '#476f9b' }} />
							<span>{property?.propertyFuel}</span>
						</div>
						<div>
						<SettingsIcon sx={{ fontSize: '18px', color: '#476f9b' }} />
							<span>{property?.propertyTransmission}</span>
						</div>
						<div>
						<FlagIcon sx={{ fontSize: '18px', color: '#476f9b' }} />
							<span>{property?.propertyOdometer}km</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{property?.propertyRent ? 'rent' : 'sale'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PopularPropertyCard;
