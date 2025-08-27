import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { colors } from '../../theme/variables';
import React from 'react';
import Dropdown, { DropdownItem, MenuType, OpenerType } from '../Dropdown';
import TimePeriodDropdown from '../../HOC/TimePeriodDropdown';
import translations from '../../translations';
import { useMediaQuery } from '@mui/material';

interface HeaderProps {
  selectedWidgets: DropdownItem[];
  setSelectedWidgets: (widgets: DropdownItem[]) => void;
  selectedPeriod: DropdownItem;
  setSelectedPeriod: (period: DropdownItem) => void;
}

const Header = ({
  selectedWidgets,
  setSelectedWidgets,
  selectedPeriod,
  setSelectedPeriod,
}: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledHeaderWrapper
      sx={{
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
      }}
    >
      <StyledHeaderTitle color={colors.mainText}>{translations.header.title}</StyledHeaderTitle>
      <StyledFiltersWrapper>
        <Dropdown
          title={translations.header.widgetsDropdownOpen}
          menuType={MenuType.MULTIPLE}
          openerType={OpenerType.BUTTON}
          items={selectedWidgets}
          setItems={setSelectedWidgets}
        />
        <TimePeriodDropdown selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
      </StyledFiltersWrapper>
    </StyledHeaderWrapper>
  );
};

const StyledHeaderWrapper = styled(Paper)({
  padding: 25,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledHeaderTitle = styled(Typography)({
  fontSize: 24,
  fontWeight: 500,
});

const StyledFiltersWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export default Header;
