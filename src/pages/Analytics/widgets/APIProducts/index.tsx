import { useEffect } from 'react';
import translations from '../../translations';
import WidgetWrapper, { TitleVariant } from '../WidgetWrapper';
import { AnalyticWidgetPeriod } from '../../HOC/TimePeriodDropdown';
import { useState } from 'react';
import { DropdownItem } from '../../components/Dropdown';
import StatisticTrendData from '../../components/StatisticTrendData';
import {
  APIProductsData,
  apiProductsMockData,
  apiProductsMockDataMonthly,
  apiProductsMockDataYearly,
} from './mockData';

interface APIProductsProps {
  globalSelectedPeriod: DropdownItem;
  hideWidget: () => void;
  dragHandleRef?: React.Ref<HTMLButtonElement>;
}

const APIProducts = ({ globalSelectedPeriod, hideWidget, dragHandleRef }: APIProductsProps) => {
  const [widgetDataResponse, setWidgetDataResponse] =
    useState<APIProductsData>(apiProductsMockData);

  const [selectedPeriod, setSelectedPeriod] = useState<DropdownItem>({
    label: globalSelectedPeriod.label || translations.periods[AnalyticWidgetPeriod.LAST_6_MONTHS],
    value: globalSelectedPeriod.value || AnalyticWidgetPeriod.LAST_6_MONTHS,
  });

  useEffect(() => {
    if (globalSelectedPeriod) {
      setSelectedPeriod(globalSelectedPeriod);
    }
  }, [globalSelectedPeriod]);

  useEffect(() => {
    switch (selectedPeriod.value) {
      case AnalyticWidgetPeriod.LAST_6_MONTHS:
        setWidgetDataResponse(apiProductsMockData);
        break;
      case AnalyticWidgetPeriod.LAST_30_DAYS:
        setWidgetDataResponse(apiProductsMockDataMonthly);
        break;
      default:
        setWidgetDataResponse(apiProductsMockDataYearly);
        break;
    }
  }, [selectedPeriod]);

  return (
    <WidgetWrapper
      title={translations.widgetComponents.APIProducts.title}
      titleVariant={TitleVariant.SMALL}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={setSelectedPeriod}
      hideWidget={hideWidget}
      dragHandleRef={dragHandleRef}
    >
      <StatisticTrendData
        currentValue={widgetDataResponse.currentValue}
        trendValue={widgetDataResponse.trendValue}
        trend={widgetDataResponse.trend}
      />
    </WidgetWrapper>
  );
};

export default APIProducts;
