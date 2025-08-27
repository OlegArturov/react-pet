import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import translations from '../../translations';
import { colors } from '../../theme/variables';

const EmptyPage = ({ isError, fetchData }: { isError?: boolean; fetchData: () => void }) => {
  return (
    <StyledEmptyPageWrapper>
      <Typography
        variant="body1"
        color={isError ? colors.redMain : colors.mainText}
        fontSize={22}
        fontWeight={500}
      >
        {isError ? translations.errors.unknown_error : translations.errors.no_data}
      </Typography>
      <Button variant="outlined" color="primary" onClick={fetchData}>
        {translations.common.try_again}
      </Button>
    </StyledEmptyPageWrapper>
  );
};

const StyledEmptyPageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  justifyContent: 'center',
  alignItems: 'center',
  height: '350px',
});

export default EmptyPage;
