import React, { useMemo } from 'react';

import ReactDOMServer from 'react-dom/server';
import { Box, Typography } from '@mui/material';
import translations from '../../translations';
import { colors } from '../../theme/variables';
import { ApexOptions } from 'apexcharts';
import { ManualApprovalProcessingTimesDataResponse } from './mockData';

interface ManualApprovalProcessingTimesGraphConfigProps {
  data: ManualApprovalProcessingTimesDataResponse | null;
}

const useManualApprovalProcessingTimesGraphConfig = ({
  data,
}: ManualApprovalProcessingTimesGraphConfigProps): {
  series: ApexAxisChartSeries;
  options: ApexOptions;
} => {
  const categories = useMemo(() => data?.data.map((d) => d.date) || [], [data]);

  const parseToHours = (timeStr: string): number => {
    const hoursMatch = timeStr.match(/(\d+)\s*h/i);
    const minutesMatch = timeStr.match(/(\d+)\s*m/i);
    const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;
    return hours + minutes / 60;
  };

  const series = useMemo(
    () => [
      {
        name: translations.widgetComponents.manualApprovalProcessingTimes.averageApprovalTime,
        data: data?.data.map((d) => parseToHours(d.averageApprovalTime)) || [],
        color: colors.blueMain,
      },
    ],
    [data],
  );

  const yMax = useMemo(() => {
    const values = data?.data.map((d) => parseToHours(d.averageApprovalTime)) || [];
    const maxVal = Math.max(0, ...values);
    return Math.ceil(maxVal);
  }, [data]);

  const yTickAmount = useMemo(() => {
    const ticks = yMax <= 10 ? Math.max(2, yMax) : 5;
    return ticks;
  }, [yMax]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'area',
        toolbar: { show: false },
      },
      stroke: { curve: 'straight', width: 1 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      markers: { size: 3.5 },
      dataLabels: { enabled: false },
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
        tickPlacement: 'between' as const,
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
        tickAmount: yTickAmount,
        labels: {
          formatter: (v: number) => `${Math.trunc(v)}h`,
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
        position: 'bottom' as const,
        horizontalAlign: 'center' as const,
        showForSingleSeries: true,
        fontFamily: "'Noto Sans', sans-serif",
        fontWeight: 400,
        labels: {
          colors: colors.mainText,
        },
      },
      colors: ['#0062AC', '#3CB371'],
      tooltip: {
        x: { show: true },
        custom: (opts: any) => {
          const i = opts?.dataPointIndex ?? 0;
          const point = data?.data?.[i];
          const date = categories?.[i] ?? '';
          if (!point) return '';

          const node = (
            <div style={{ minWidth: '150px', borderColor: colors.grayLight }}>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: colors.grayLightest,
                  fontSize: '12px',
                  fontWeight: 400,
                  fontFamily: "'Noto Sans', sans-serif",
                  padding: '8px 10px',
                  borderBottom: `1px solid ${colors.grayLight}`,
                }}
              >
                <Typography>{date}</Typography>
              </div>
              <div
                style={{
                  padding: '8px',
                  fontSize: '12px',
                  fontWeight: 400,
                  fontFamily: "'Noto Sans', sans-serif",
                }}
              >
                <Typography variant="body2" style={{ marginBottom: '10px' }}>
                  {translations.widgetComponents.manualApprovalProcessingTimes.averageApprovalTime}:{' '}
                  <b>{point.averageApprovalTime}</b>
                </Typography>
                <Typography variant="body2">
                  {translations.widgetComponents.manualApprovalProcessingTimes.totalNumberRequest}:{' '}
                  <b>{point.totalNumberRequest}</b>
                </Typography>
              </div>
            </div>
          );
          return ReactDOMServer.renderToStaticMarkup(node as any);
        },
      },
    }),
    [categories, yMax, yTickAmount, data],
  );
  return {
    series,
    options,
  };
};

export default useManualApprovalProcessingTimesGraphConfig;
