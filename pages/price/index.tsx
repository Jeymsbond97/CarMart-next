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
                <h4 style={{ textAlign: 'center' }}>
                    Pricing that Empowers Your Choices
                </h4>
                <h5 style={{ textAlign: 'center', marginBottom: '32px' }}>
                    Discover the Perfect Plan Tailored to Your Needs with Clear and Competitive Options!
                </h5>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" className="card">
                    {pricingPlans.map((plan, index) => (
                    <Box key={index} className="pricing-card">
                        <h6>
                        {plan.title} {plan.mostPopular && <span className='most-popular'>(Most Popular)</span> }
                        </h6>

                        <h3>
                        {plan.price}
                        <span>{plan.period}</span>
                        </h3>

                        <Box mt={2} className="pricing-card1">
                        {plan.features.map((feature, i) => (
                            <p key={i} className="feature-item">✅ {feature}</p>
                        ))}
                        {plan.unavailable.map((feature, i) => (
                            <p key={i} className="feature-item-unavailable">❌ {feature}</p>
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
