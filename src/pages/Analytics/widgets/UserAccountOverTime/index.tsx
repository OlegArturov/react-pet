import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';
import { UserAccountOverTimeResponse } from './mockData';
import { DropdownItem } from '../../components/Dropdown';

import translations from '../../translations';
import WidgetWrapper from '../WidgetWrapper';
import { AnalyticWidgetPeriod } from '../../HOC/TimePeriodDropdown';
import useUserAccountOverTimeGraphConfig from './useUserAccountOverTimeGraphConfig';
import { api } from '../../api/apiClient';
import { AnalyticWidgetType } from '../../index';
import { Box, styled } from '@mui/material';
import GraphLoader from '../../components/GraphLoader';
import EmptyPage from '../../components/EmptyPage';

interface UserAccountOverTimeProps {
  hideWidget: () => void;
  globalSelectedPeriod: DropdownItem;
  dragHandleRef?: React.Ref<HTMLButtonElement>;
}

const UserAccountOverTime = ({
  hideWidget,
  globalSelectedPeriod,
  dragHandleRef,
}: UserAccountOverTimeProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<DropdownItem | null>(null);

  const [widgetDataResponse, setWidgetDataResponse] = useState<UserAccountOverTimeResponse | null>(
    null,
  );

  const endpoint = `/dashboard/data?widget=${AnalyticWidgetType.USER_ACCOUNTS_OVER_TIME}`;

  const fetchData = () => {
    setLoading(true);
    api
      .get(`${endpoint}&range=${selectedPeriod?.value}`)
      .then((res) => {
        setWidgetDataResponse(res as UserAccountOverTimeResponse);
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

  const { series, options } = useUserAccountOverTimeGraphConfig({
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
      title={translations.widgetComponents.userAccountOverTime.title}
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
            options={options}
            series={series}
            type="area"
            height={350}
            id="user-account-over-time-chart"
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

export default UserAccountOverTime;
