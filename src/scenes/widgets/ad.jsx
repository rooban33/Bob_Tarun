// AdvertWidget.jsx

import React, { useState, useEffect } from 'react';
import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const Advert = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    'https://pictures.brafton.com/x_0_0_0_14119699_800.jpg',
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
      
        </Typography>
        <Typography color={medium}>Weather</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={images[imageIndex]} // Use current image URL based on imageIndex
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}></Typography>
        <Typography color={medium}></Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
 
      </Typography>
    </WidgetWrapper>
  );
};

export { Advert }; // Exporting AdvertWidget component using named export
