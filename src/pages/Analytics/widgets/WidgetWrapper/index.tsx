import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DropdownItem } from '../../components/Dropdown';
import React from 'react';
import { translations } from '../../translations';
import { colors } from '../../theme/variables';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import TimePeriodDropdown from '../../HOC/TimePeriodDropdown';
import NestedDropdown from '../../components/NestedDropdown';
import { IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// import { MenuItemData, NestedDropdown } from 'mui-nested-menu';

export enum TitleVariant {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

export enum ChartType {
  KPI_WIDGET = 'KPI_WIDGET',
  LINE_CHART = 'LINE_CHART',
  BAR_CHART = 'BAR_CHART',
}

export enum SettingsActionType {
  HIDE_WIDGET = 'HIDE_WIDGET',
}

interface WidgetWrapperProps {
  children: React.ReactNode;
  title: string;
  titleVariant?: TitleVariant;
  selectedPeriod: DropdownItem;
  setSelectedPeriod: (period: DropdownItem) => void;
  hideWidget: () => void;
  // Optional ref to expose the internal drag handle button (IconButton)
  dragHandleRef?: React.Ref<HTMLButtonElement>;
}

const WidgetWrapper = React.forwardRef<HTMLDivElement, WidgetWrapperProps>(function WidgetWrapper(
  {
    children,
    title,
    titleVariant = TitleVariant.LARGE,
    selectedPeriod,
    setSelectedPeriod,
    hideWidget,
    dragHandleRef,
  }: WidgetWrapperProps,
  ref,
) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const settingsDropdownItems = [
    {
      label: translations.widgetSettingsDropdown.options.hideWidget,
      value: SettingsActionType.HIDE_WIDGET,
      icon: (
        <VisibilityOffOutlined
          fontSize="inherit"
          sx={{ fontSize: 17, color: colors.grayTextMid }}
        />
      ),
    },
    // {
    //   label: translations.widgetSettingsDropdown.options.chartType,
    //   value: 'chartType',
    //   icon: (
    //     <BarChartOutlined fontSize="inherit" sx={{ fontSize: 17, color: colors.grayTextMid }} />
    //   ),
    //   children: Object.values(ChartType).map((type) => ({
    //     label: translations.widgetSettingsDropdown.options.chartTypeOptions[type],
    //     value: type,
    //   })),
    // },
  ];

  const onSettingsDropdownItemClick = (item: DropdownItem) => {
    if (item.value === SettingsActionType.HIDE_WIDGET) {
      hideWidget();
    }
  };

  return (
    <StyledWidgetWrapper ref={ref}>
      <StyledWidgetHeader
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'flex-start' : 'center'}
      >
        <StyledWidgetTitle
          variant={titleVariant === TitleVariant.LARGE ? 'h2' : 'h4'}
          fontSize={titleVariant === TitleVariant.LARGE ? 20 : 14}
          lineHeight={titleVariant === TitleVariant.LARGE ? '32px' : '24px'}
          color={colors.mainText}
          order={isMobile ? 2 : 1}
        >
          {title}
        </StyledWidgetTitle>
        <StyledFiltersWrapper order={isMobile ? 1 : 2} width={isMobile ? '100%' : 'auto'}>
          <TimePeriodDropdown
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
          <NestedDropdown
            items={settingsDropdownItems}
            onItemClick={onSettingsDropdownItemClick}
            icon={
              <SettingsOutlined
                fontSize="inherit"
                sx={{ fontSize: 17, color: colors.grayTextMid }}
              />
            }
          />
          <IconButton
            aria-label="drag-widget"
            sx={{
              cursor: 'grab',
              zIndex: 10,
              pointerEvents: 'auto',
              marginLeft: isMobile ? 'auto' : '0',
            }}
            ref={dragHandleRef}
          >
            <DragIndicatorIcon sx={{ fontSize: 20, color: colors.grayTextMid }} />
          </IconButton>
        </StyledFiltersWrapper>
      </StyledWidgetHeader>
      <StyledWidgetContent>{children}</StyledWidgetContent>
    </StyledWidgetWrapper>
  );
});

export default WidgetWrapper;

const StyledWidgetWrapper = styled(Paper)({
  padding: 25,
});

const StyledWidgetHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 20,
});

const StyledWidgetTitle = styled(Typography)({
  fontWeight: 600,
});

const StyledWidgetContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledFiltersWrapper = styled(Box)({
  display: 'flex',
});
