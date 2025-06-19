import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import PopularPropertyCard from './PopularPropertyCard';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { PropertiesInquiry } from '../../types/property/property.input';


const CarOptions = () => {
    const device = useDeviceDetect();

    // Static brand data
    const brands = [
        { id: 1, name: 'BMW', logo: '/img/brand/bmw.webp' },
        { id: 2, name: 'Mercedes-Benz', logo: '/img/brand/mers.webp' },
        { id: 3, name: 'Audi', logo: '/img/brand/audi.webp' },
        { id: 4, name: 'Ford', logo: '/img/brand/ford.webp' },
        { id: 5, name: 'Peugeot', logo: '/img/brand/peug.webp' },
        { id: 6, name: 'Volkswagen', logo: '/img/brand/volks.webp' }
    ];


    if (device === 'mobile') {
        return (
            <Stack className={'popular-brand'}>
                <Stack className={'container'}>
                    <Stack className={'info-box'}>
                        <span>Explore Our Premium Brands</span>
                    </Stack>
                    <Stack className={'card-box'}>
                        {brands.map((brand) => (
                                <div key={brand.id} className={'brand-card'}>
                                    <div className={'brand-logo'}>
                                        <img src={brand.logo} alt={brand.name} />
                                    </div>
                                    <p className={'brand-name'}>{brand.name}</p>
                                </div>
                            ))}
                    </Stack>
                </Stack>
            </Stack>
        );
    } else {
        return (
            <Stack className={'popular-brand'}>
                <Stack className={'container'}>
                    <Stack className={'info-box'}>
                        <Box component={'div'} className={'left'}>
                            <span style={{ color: '#dee2e6' }}>Explore Our Premium Brands</span>
                        </Box>
                        <Box component={'div'} className={'right'}>
                            <div className={'more-box'}>
                                <Link href={'/property'}>
                                    <span style={{ color: '#dee2e6' }}>See All Brands</span>
                                </Link>
                                <NorthEastIcon className={'arrow-icon'} />
                            </div>
                        </Box>
                    </Stack>
                    <Stack className={'card-box'}>
                        {brands.map((brand) => (
                                <div key={brand.id} className={'brand-card'}>
                                    <div className={'brand-logo'}>
                                        <img src={brand.logo} alt={brand.name} />
                                    </div>
                                    <p className={'brand-name'}>{brand.name}</p>
                                </div>
                            ))}
                    </Stack>
                </Stack>
            </Stack>
        );
    }
};

export default CarOptions;
