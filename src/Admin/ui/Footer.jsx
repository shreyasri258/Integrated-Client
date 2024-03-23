import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  const location = useLocation();
  
  if (location.pathname.includes('/ansForm')) {
   
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-1 text-center">
      <Typography variant="body2" color="textSecondary">
        <Link href="#" color="inherit">
          &copy; rights reserved at Proctorpal
        </Link>
      </Typography>
    </div>
  );
};

export default Footer;
