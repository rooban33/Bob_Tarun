import React, { useState, useEffect } from 'react';
import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    'https://izismile.com/img/img2/20090227/bonus/6/creo_26.jpg',
    'https://www.foreo.com/mysa/wp-content/uploads/sites/2/2020/03/2.loreal_adformen_mascara-768x1024.jpg',
    'http://1.bp.blogspot.com/-NMbog6aObLA/TwiT9huAztI/AAAAAAAACgI/lkQstfY_xe8/s1600/advertisement+LG.jpg',
    'http://1.bp.blogspot.com/-NMbog6aObLA/TwiT9huAztI/AAAAAAAACgI/lkQstfY_xe8/s1600/advertisement+LG.jpg',
    // Add more image URLs here as needed
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment imageIndex to cycle through images
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run effect only once on component mount

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={images[imageIndex]} // Use current image URL based on imageIndex
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>THE FOOD EXPRESS</Typography>
        <Typography color={medium}>THEFOODEXPRESS.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
