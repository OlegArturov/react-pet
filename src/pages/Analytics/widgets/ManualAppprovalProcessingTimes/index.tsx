import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';

import { DropdownItem } from '../../components/Dropdown';

import translations from '../../translations';
import WidgetWrapper from '../WidgetWrapper';
import { AnalyticWidgetPeriod } from '../../HOC/TimePeriodDropdown';
import {
  ManualApprovalProcessingTimesData,
  ManualApprovalProcessingTimesDataResponse,
  manualApprovalProcessingTimesMockData,
} from './mockData';
import useManualApprovalProcessingTimesGraphConfig from './useManualApprovalProcessingTimesGraphConfig';
import { AnalyticWidgetType } from '../../index';
import { api } from '../../api/apiClient';

interface ManualApprovalProcessingTimesProps {
  hideWidget: () => void;
  globalSelectedPeriod: DropdownItem;
  dragHandleRef?: React.Ref<HTMLButtonElement>;
}

const ManualApprovalProcessingTimes = ({
  hideWidget,
  globalSelectedPeriod,
  dragHandleRef,
}: ManualApprovalProcessingTimesProps) => {
  const [widgetDataResponse, setWidgetDataResponse] =
    useState<ManualApprovalProcessingTimesDataResponse | null>(null);

  const { series, options } = useManualApprovalProcessingTimesGraphConfig({
    data: widgetDataResponse,
  });

  const [selectedPeriod, setSelectedPeriod] = useState<DropdownItem>({
    label: globalSelectedPeriod.label || translations.periods[AnalyticWidgetPeriod.LAST_6_MONTHS],
    value: globalSelectedPeriod.value || AnalyticWidgetPeriod.LAST_6_MONTHS,
  });

  // const endpoint = `/dashboard/data?widget=${AnalyticWidgetType.MANUAL_APPROVAL_PROCESSING_TIMES}`;
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // const fetchData = useCallback(() => {
  //   setLoading(true);
  //   api
  //     .get(`${endpoint}&range=${selectedPeriod.value}`)
  //     .then((res) => {
  //       console.log('res', res);
  //       setWidgetDataResponse(res as ManualApprovalProcessingTimesData);
  //     })
  //     .catch((err) => {
  //       setError(err.message || 'Unknown error');
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [selectedPeriod]);

  // useEffect(() => {
  //   fetchData();
  // }, [selectedPeriod]);

  useEffect(() => {
    if (globalSelectedPeriod) {
      setSelectedPeriod(globalSelectedPeriod);
    }
  }, [globalSelectedPeriod]);

  useEffect(() => {
    switch (selectedPeriod.value) {
      case AnalyticWidgetPeriod.LAST_6_MONTHS:
        setWidgetDataResponse(manualApprovalProcessingTimesMockData);
        break;
      case AnalyticWidgetPeriod.LAST_30_DAYS:
        setWidgetDataResponse(manualApprovalProcessingTimesMockData);
        break;
      default:
        setWidgetDataResponse(manualApprovalProcessingTimesMockData);
        break;
    }
  }, [selectedPeriod]);

  return (
    <WidgetWrapper
      title={translations.widgetComponents.manualApprovalProcessingTimes.title}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={setSelectedPeriod}
      hideWidget={hideWidget}
      dragHandleRef={dragHandleRef}
    >
      <Chart options={options} series={series} type="area" height={350} />
    </WidgetWrapper>
  );
};

export default ManualApprovalProcessingTimes;
