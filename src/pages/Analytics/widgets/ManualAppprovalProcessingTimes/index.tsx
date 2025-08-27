import React, { useState, useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';

import { DropdownItem } from '../../components/Dropdown';

import translations from '../../translations';
import WidgetWrapper from '../WidgetWrapper';
import { AnalyticWidgetPeriod } from '../../HOC/TimePeriodDropdown';
import {
  ManualApprovalProcessingTimesDataResponse,
  manualApprovalProcessingTimesMockData,
} from './mockData';
import useManualApprovalProcessingTimesGraphConfig from './useManualApprovalProcessingTimesGraphConfig';
import { AnalyticWidgetType } from '../../index';
import { api } from '../../api/apiClient';
import GraphLoader from '../../components/GraphLoader';
import EmptyPage from '../../components/EmptyPage';

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

  const [selectedPeriod, setSelectedPeriod] = useState<DropdownItem | null>(null);

  const endpoint = `/dashboard/data?widget=${AnalyticWidgetType.MANUAL_APPROVAL_PROCESSING_TIME}`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    api
      .get(`${endpoint}&range=${selectedPeriod?.value}`)
      .then((res) => {
        console.log('res', res);
        setWidgetDataResponse(res as ManualApprovalProcessingTimesDataResponse);
        // setWidgetDataResponse(manualApprovalProcessingTimesMockData);
      })
      .catch((err) => {
        setError(err.message || 'Unknown error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [selectedPeriod, dragHandleRef]);

  useEffect(() => {
    if (globalSelectedPeriod) {
      setSelectedPeriod({
        label:
          globalSelectedPeriod.label || translations.periods[AnalyticWidgetPeriod.LAST_6_MONTHS],
        value: globalSelectedPeriod.value || AnalyticWidgetPeriod.LAST_6_MONTHS,
      });
    }
  }, [globalSelectedPeriod]);

  // useEffect(() => {
  //   switch (selectedPeriod.value) {
  //     case AnalyticWidgetPeriod.LAST_6_MONTHS:
  //       setWidgetDataResponse(manualApprovalProcessingTimesMockData);
  //       break;
  //     case AnalyticWidgetPeriod.LAST_30_DAYS:
  //       setWidgetDataResponse(manualApprovalProcessingTimesMockData);
  //       break;
  //     default:
  //       setWidgetDataResponse(manualApprovalProcessingTimesMockData);
  //       break;
  //   }
  // }, [selectedPeriod]);

  return (
    <WidgetWrapper
      title={translations.widgetComponents.manualApprovalProcessingTimes.title}
      selectedPeriod={selectedPeriod!}
      setSelectedPeriod={setSelectedPeriod}
      hideWidget={hideWidget}
      dragHandleRef={dragHandleRef}
    >
      {loading ? (
        <GraphLoader />
      ) : (
        options &&
        series &&
        (widgetDataResponse?.data?.length ?? 0) > 0 && (
          <Chart
            id="manual-approval-processing-times-chart"
            options={options}
            series={series}
            type="area"
            height={350}
          />
        )
      )}

      {!loading && error && !widgetDataResponse?.data?.length && (
        <EmptyPage isError fetchData={fetchData} />
      )}

      {!loading && !error && !widgetDataResponse?.data?.length && (
        <EmptyPage fetchData={fetchData} />
      )}
    </WidgetWrapper>
  );
};

export default ManualApprovalProcessingTimes;
