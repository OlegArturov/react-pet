import React, { useCallback, useEffect, useState } from 'react';
import { ManualApprovalRequestsResponse } from './mockData';
import useManualApprovalRequestsGraphConfig from './useManualApprovalRequestsGraphConfig';
import WidgetWrapper from '../WidgetWrapper';
import translations from '../../translations';
import { AnalyticWidgetPeriod } from '../../HOC/TimePeriodDropdown';
import { DropdownItem } from '../../components/Dropdown';
import Chart from 'react-apexcharts';
import { AnalyticWidgetType } from '../../index';
import { api } from '../../api/apiClient';
import GraphLoader from '../../components/GraphLoader';
import EmptyPage from '../../components/EmptyPage';

interface ManualApprovalRequestsProps {
  hideWidget: () => void;
  globalSelectedPeriod: DropdownItem;
  dragHandleRef?: React.Ref<HTMLButtonElement>;
}

const ManualApprovalRequests = ({
  hideWidget,
  globalSelectedPeriod,
  dragHandleRef,
}: ManualApprovalRequestsProps) => {
  const [widgetDataResponse, setWidgetDataResponse] =
    useState<ManualApprovalRequestsResponse | null>(null);

  const [selectedPeriod, setSelectedPeriod] = useState<DropdownItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const endpoint = `/dashboard/data?widget=${AnalyticWidgetType.MANUAL_APPROVAL_REQUESTS}`;

  const fetchData = () => {
    setLoading(true);
    api
      .get(`${endpoint}&range=${selectedPeriod?.value}`)
      .then((res) => {
        setWidgetDataResponse(res as ManualApprovalRequestsResponse);
      })
      .catch((err) => {
        setError(err.message || 'Unknown error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedPeriod) {
      fetchData();
    }
  }, [selectedPeriod, dragHandleRef]);

  const { series, options } = useManualApprovalRequestsGraphConfig({
    data: widgetDataResponse?.data || null,
  });

  useEffect(() => {
    if (globalSelectedPeriod) {
      setSelectedPeriod({
        label:
          globalSelectedPeriod.label || translations.periods[AnalyticWidgetPeriod.LAST_6_MONTHS],
        value: globalSelectedPeriod.value || AnalyticWidgetPeriod.LAST_6_MONTHS,
      });
    }
  }, [globalSelectedPeriod]);

  return (
    <WidgetWrapper
      title={translations.widgetComponents.manualApprovalRequests.title}
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
          <Chart options={options} series={series} type="bar" height={350} />
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

export default ManualApprovalRequests;
