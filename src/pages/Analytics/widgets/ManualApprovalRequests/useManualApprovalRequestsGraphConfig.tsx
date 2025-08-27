import React, { useMemo } from 'react';
import { ApexOptions } from 'apexcharts';
import { ManualApprovalRequestsDataItem } from './mockData';
import { colors } from '../../theme/variables';
import translations from '../../translations';

export interface ManualApprovalRequestsGraphConfig {
  series: ApexAxisChartSeries;
  options: ApexOptions;
}

const useManualApprovalRequestsGraphConfig = ({
  data,
}: {
  data: ManualApprovalRequestsDataItem[] | null;
}): ManualApprovalRequestsGraphConfig => {
  const categories = useMemo(() => (data ? data?.map((d) => d.date) : []), [data]);

  const series = useMemo<Required<ManualApprovalRequestsGraphConfig>['series']>(
    () => [
      {
        name: translations.widgetComponents.manualApprovalRequests.title,
        data: data?.map((d) => d.value) || [],
        color: colors.blueMain,
      },
    ],
    [data],
  );

  const yMax = useMemo(() => {
    const maxVal = Math.max(0, ...(data ? data?.map((d) => d.value) : []));
    if (maxVal <= 10) return 10;
    return Math.ceil(maxVal / 10) * 10;
  }, [data]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'bar',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          columnWidth: '55%',
          borderRadius: 4,
          borderRadiusApplication: 'end',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (value: number) => `${value}`,
        offsetY: 0,
        style: {
          colors: ['#FFFFFF'],
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: "'Noto Sans', sans-serif",
        },
      },
      grid: {
        strokeDashArray: 2,
        strokeColor: colors.grid,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        padding: { bottom: 20 },
      },
      annotations: {
        yaxis: [{ y: 0, borderColor: colors.gridZero, strokeDashArray: 0, strokeWidth: 1 }],
      },
      xaxis: {
        categories,
        tickPlacement: 'between',
        tooltip: { enabled: false },
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: {
          rotate: -30,
          style: {
            colors: colors.mainText,
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: "'Noto Sans', sans-serif",
          },
        },
      },
      yaxis: {
        min: 0,
        max: yMax,
        tickAmount: 5,
        labels: {
          formatter: (v: number) => `${v}`,
          style: {
            colors: colors.mainText,
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: "'Noto Sans', sans-serif",
          },
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'bottom' as const,
        horizontalAlign: 'center' as const,
        fontFamily: "'Noto Sans', sans-serif",
        fontWeight: 400,
        labels: {
          colors: colors.mainText,
        },
      },
      colors: [colors.blueMain],
      tooltip: {
        x: { show: true },
      },
    }),
    [categories, yMax],
  );

  return {
    series,
    options,
  };
};

export default useManualApprovalRequestsGraphConfig;
