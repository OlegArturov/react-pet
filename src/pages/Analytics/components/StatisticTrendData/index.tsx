import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { colors } from '../../theme/variables';

interface StatisticTrendDataProps {
  currentValue: number;
  trendValue: number;
  trend: 'up' | 'down';
}

const StatisticTrendData = ({ currentValue, trendValue, trend }: StatisticTrendDataProps) => {
  return (
    <StyledStatisticTrendDataWrapper>
      <StyledStatisticCurrentValue>{currentValue || '-'}</StyledStatisticCurrentValue>
      <StyledStatisticTrendValue sx={{ color: trend === 'up' ? colors.greenMain : colors.redMain }}>
        {trend === 'up' ? '+' : '-'}
        {trendValue || '-'}
      </StyledStatisticTrendValue>
    </StyledStatisticTrendDataWrapper>
  );
};

const StyledStatisticTrendDataWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'baseline',
});

const StyledStatisticCurrentValue = styled(Typography)({
  fontSize: 24,
  marginRight: 4,
  lineHeight: '40px',
  fontWeight: 600,
});

const StyledStatisticTrendValue = styled(Typography)({
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '20px',
});

export default StatisticTrendData;
