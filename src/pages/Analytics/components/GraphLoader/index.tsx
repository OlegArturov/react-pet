import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/material/styles';

const GraphLoader = () => {
  return (
    <StyledLoadingWrapper>
      <CircularProgress />
    </StyledLoadingWrapper>
  );
};

const StyledLoadingWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '350px',
});

export default GraphLoader;
