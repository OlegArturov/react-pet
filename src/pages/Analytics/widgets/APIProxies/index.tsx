import React, { useEffect, useState } from 'react';
import WidgetWrapper, { TitleVariant } from '../WidgetWrapper';
import translations from '../../translations';
import StatisticTrendData from '../../components/StatisticTrendData';
import { DropdownItem } from '../../components/Dropdown';
import { AnalyticWidgetPeriod } from '../../HOC/TimePeriodDropdown';
import {
  APIProxiesData,
  apiProxiesMockData,
  apiProxiesMockDataMonthly,
  apiProxiesMockDataYearly,
} from './mockData';

interface APIProxiesProps {
  globalSelectedPeriod: DropdownItem;
  hideWidget: () => void;
  dragHandleRef?: React.Ref<HTMLButtonElement>;
}

const APIProxies = ({ globalSelectedPeriod, hideWidget, dragHandleRef }: APIProxiesProps) => {
  const [widgetDataResponse, setWidgetDataResponse] = useState<APIProxiesData>(apiProxiesMockData);

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
        setWidgetDataResponse(apiProxiesMockData);
        break;
      case AnalyticWidgetPeriod.LAST_30_DAYS:
        setWidgetDataResponse(apiProxiesMockDataMonthly);
        break;
      default:
        setWidgetDataResponse(apiProxiesMockDataYearly);
        break;
    }
  }, [selectedPeriod]);

  return (
    <WidgetWrapper
      title={translations.widgetComponents.APIProxies.title}
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

export default APIProxies;
