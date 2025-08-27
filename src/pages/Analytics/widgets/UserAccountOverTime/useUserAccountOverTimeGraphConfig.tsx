import React, { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Box, Typography } from '@mui/material';
import translations from '../../translations';
import { colors } from '../../theme/variables';
import { ApexOptions } from 'apexcharts';
import { Roles, UserAccountOverTimeGraphDataResponse } from './mockData';
import { getCustomMarkerHtml, getCustomMarkerNode } from '../../components/CustomMarkerHtml';

interface UserAccountOverTimeGraphConfigProps {
  data: UserAccountOverTimeGraphDataResponse[] | null;
}

const useUserAccountOverTimeGraphConfig = ({
  data,
}: UserAccountOverTimeGraphConfigProps): {
  series: ApexAxisChartSeries | undefined;
  options: ApexOptions;
} => {
  const categories = useMemo(() => {
    if (!data) return [] as string[];
    const uniqueDates = new Set<string>();
    data.forEach((seriesItem) => {
      seriesItem.graphData.forEach((point) => uniqueDates.add(point.date));
    });
    const sortedDates = Array.from(uniqueDates).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
    return sortedDates;
  }, [data]);

  const colorsMap = {
    [Roles.DEVELOPER]: colors.blueMain,
    [Roles.PRODUCT_OWNER]: colors.greenMain,
  };

  const series = useMemo(
    () =>
      data?.map((d) => {
        const valueByDate = new Map<string, number>(
          d.graphData.map((point) => [point.date, point.value]),
        );
        return {
          name: translations.widgetComponents.userAccountOverTime.roles[d.role],
          data: categories.map((date) => valueByDate.get(date) ?? 0),
          color: colorsMap[d.role],
        };
      }),
    [data, categories],
  );

  const legendMarkersHtml = useMemo(() => {
    if (!data) return [] as Array<() => string>;
    return data.map((d) => () => getCustomMarkerHtml(colorsMap[d.role]));
  }, [data]);

  const yMax = useMemo(() => {
    const allValues = data?.flatMap((d) => d.graphData.map((d) => d.value)) || [];
    const maxVal = Math.max(0, ...allValues);
    return Math.ceil(maxVal + 10);
  }, [data]);

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
          // formatter: (v: string) => {
          //   if (!v) return '';
          //   if (categories.length > 10) {
          //     const d = new Date(v);
          //     if (!Number.isNaN(d.getTime())) {
          //       const mm = String(d.getMonth() + 1).padStart(2, '0');
          //       const dd = String(d.getDate()).padStart(2, '0');
          //       const yyyy = d.getFullYear();
          //       return `${mm}/${dd}/${yyyy}`;
          //     }
          //   }
          //   return v;
          // },
          formatter: (v: string) => v || '',
          rotate: -30,
          style: {
            colors: colors.mainText,
            fontSize: categories.length > 10 ? '10px' : '12px',
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
          formatter: (v: number) => `${v?.toFixed(0) || 0}`,
          style: {
            colors: colors.mainText,
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: "'Noto Sans', sans-serif",
          },
        },
      },
      legend: {
        position: 'bottom' as const,
        horizontalAlign: 'center' as const,
        fontFamily: "'Noto Sans', sans-serif",
        fontWeight: 400,
        labels: {
          colors: colors.mainText,
        },
        markers: {
          customHTML: legendMarkersHtml as any,
          offsetX: -2,
          offsetY: 0,
        },
      },
      colors: ['#0062AC', '#3CB371'],
      tooltip: {
        shared: true,
        intersect: false,
        x: { show: true },
        custom: ({ series, dataPointIndex, w }) => {
          try {
            const label = categories?.[dataPointIndex] ?? '';
            const names: string[] = (w as any)?.globals?.seriesNames || [];
            const palette: string[] = (w as any)?.globals?.colors || [];
            const rows = names.map((name, i) => {
              const val = series?.[i]?.[dataPointIndex];
              if (val === undefined || val === null) return null;
              const color = palette?.[i] || '#666';
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    margin: '2px 0',
                  }}
                >
                  {getCustomMarkerNode(color)}
                  <Typography
                    variant="body2"
                    sx={{ color: colors.mainText, fontSize: '12px', fontWeight: 400 }}
                    style={{ marginBottom: '0 !important' }}
                  >
                    {name}:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: colors.mainText, fontSize: '12px', fontWeight: 400 }}
                  >
                    {Number(val).toFixed(0)}
                  </Typography>
                </div>
              );
            });
            const node = (
              <div style={{ minWidth: '150px', borderColor: colors.grayLight }}>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontFamily: "'Noto Sans', sans-serif",
                    padding: '8px 10px 0',
                    color: colors.mainText,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    padding: '8px',
                    fontSize: '12px',
                    fontWeight: 400,
                    fontFamily: "'Noto Sans', sans-serif",
                  }}
                >
                  {rows}
                </div>
              </div>
            );
            return ReactDOMServer.renderToStaticMarkup(node as any);
          } catch (_e) {
            return undefined as unknown as string;
          }
        },
      },
    }),
    [categories, yMax, legendMarkersHtml],
  );

  return {
    series,
    options,
  };
};

export default useUserAccountOverTimeGraphConfig;
