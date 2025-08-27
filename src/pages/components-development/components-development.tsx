import React from 'react';

import { Box, Typography } from '@mui/material';
import Dashboard from '../../components/Dashboard/Dashboard';

const ComponentsDevelopmentPage = () => {
  return (
    <>
      <Typography>Dashboard widget (local)</Typography>

      <Box>
        <Dashboard />
      </Box>
    </>
  );
};

export default ComponentsDevelopmentPage;
