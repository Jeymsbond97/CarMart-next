import React, { useEffect } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

const pricingPlans = [
    {
        title: 'BASIC',
        price: '$39',
        period: '/month',
        features: [
            'Standard vehicle listing',
            '5 high-quality images per listing',
            'Vehicle details (make, model, year)',
            'Contact information for new buyers',
    ],
    unavailable: [
        'Featured placement in search results',
        'Priority customer support',
        'Social media sharing options',
        'Enhanced search visibility',
        'Video tour integration',
        'Premium vehicle listing with unlimited',
    ]
    },
    {
        title: 'PROFESSIONAL',
        price: '$69',
        period: '/month',
        mostPopular: true,
        features: [
            'Premium vehicle with unlimited images',
            'Featured and prioritized placement',
            'Vehicle history report integration',
            'Premium customer support',
            'Social media sharing options',
            'Enhanced search visibility',
            'Video tour integration',
    ],
    unavailable: [
        'Featured on the homepage carousel',
        'Exclusive access to promotions',
        'Ultra search visibility'
    ]
    },
    {
        title: 'ENTERPRISE',
        price: '$99',
        period: '/month',
        features: [
            'VIP vehicle listing with images',
            'Top-tier placement in search results',
            'Vehicle history report integration',
            'Video tour integration',
            'Featured on the homepage carousel',
            'Exclusive access to promotions',
            'Advanced lead tracking & analytics',
            'Premium customer support',
            'Social media sharing options',
            'Ultra search visibility'
    ],
    unavailable: []
    }
];

const PricePage: NextPage = () => {
    const device = useDeviceDetect();
    const user = useReactiveVar(userVar);

    /** APOLLO REQUESTS **/

    /** LIFECYCLES **/
    //     if (!router.isReady) return;
    //     if (!category) {
    //         router.replace(
    //             {
    //                 pathname: router.pathname,
    //                 query: { ...router.query, category: 'properties' },
    //             },
    //             undefined,
    //             { shallow: true },
    //         );
    //     }
    // }, [category, router]);

    /** HANDLERS **/

    if (device === 'mobile') {
        return <>PRICE MOBILE</>;
    } else {
        return (
        <Stack id="member-page">
            <Stack className="container">
                <Typography variant="h4" textAlign="center" color="white" mb={4}>
                    Pricing that Empowers Your Choices
                </Typography>
                <Typography variant="h5" textAlign="center" color="white" mb={4}>
                Discover the Perfect Plan Tailored to Your Needs with Clear and Competitive Options!
                </Typography>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center">
                {pricingPlans.map((plan, index) => (
                    <Box
                        key={index}
                        className='pricing-card'
                    >
                    <Typography variant="h6" textAlign="center" gutterBottom>
                        {plan.title} {plan.mostPopular && '(Most Popular)'}
                    </Typography>
                    <Typography variant="h3" textAlign="center" color="#FF6B9D">
                        {plan.price}<Typography variant="h6" component="span" color="#ccc">{plan.period}</Typography>
                    </Typography>
                    <Box mt={2} className="pricing-card1">
                        {plan.features.map((feature, i) => (
                        <Typography key={i} color="white" variant="body2" mb={1}>✅ {feature}</Typography>
                        ))}
                        {plan.unavailable.map((feature, i) => (
                        <Typography key={i} color="#666" variant="body2" mb={1}>❌ {feature}</Typography>
                        ))}
                    </Box>
                    <Box mt={3} className="pricing-card1" textAlign="center">
                        <Button variant="contained" color="primary">SIGN UP</Button>
                    </Box>
                    </Box>
                ))}
                </Stack>
            </Stack>
        </Stack>
        );
    }
};

export default withLayoutBasic(PricePage);
