import React, { useEffect, useState } from 'react';
import WidgetWrapper from '../WidgetWrapper';
import { DropdownItem } from '../../components/Dropdown';
import { AnalyticWidgetPeriod } from '../../HOC/TimePeriodDropdown';
import translations from '../../translations';
import TableComponent, { TableColumn } from '../../components/Table';
import {
  TopFiveMostPopularAPIsData,
  topFiveMostPopularAPIsMockData,
  topFiveMostPopularAPIsMockDataMonthly,
  topFiveMostPopularAPIsMockDataYearly,
} from './mockData';

interface TopFiveMostPopularAPIsProps {
  globalSelectedPeriod: DropdownItem;
  hideWidget: () => void;
  dragHandleRef?: React.Ref<HTMLButtonElement>;
}

const TopFiveMostPopularAPIs = ({
  globalSelectedPeriod,
  hideWidget,
  dragHandleRef,
}: TopFiveMostPopularAPIsProps) => {
  const [topFiveMostPopularAPIsData, setTopFiveMostPopularAPIsData] =
    useState<TopFiveMostPopularAPIsData>(topFiveMostPopularAPIsMockData);
  const columns: TableColumn[] = [
    {
      field: 'number',
      headerName: translations.widgetComponents.TopFiveMostPopularAPIs.table.fields.number,
      renderCell: (_row, index) => <>{index + 1}</>,
      width: '10%',
    },
    {
      field: 'name',
      headerName: translations.widgetComponents.TopFiveMostPopularAPIs.table.fields.api,
      width: '45%',
    },
    {
      field: 'value',
      headerName: translations.widgetComponents.TopFiveMostPopularAPIs.table.fields.calls,
      width: '45%',
    },
  ];

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
        setTopFiveMostPopularAPIsData(topFiveMostPopularAPIsMockData);
        break;
      case AnalyticWidgetPeriod.LAST_30_DAYS:
        setTopFiveMostPopularAPIsData(topFiveMostPopularAPIsMockDataMonthly);
        break;
      default:
        setTopFiveMostPopularAPIsData(topFiveMostPopularAPIsMockDataYearly);
        break;
    }
  }, [selectedPeriod]);

  return (
    <WidgetWrapper
      title={translations.widgetComponents.TopFiveMostPopularAPIs.title}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={setSelectedPeriod}
      hideWidget={hideWidget}
      dragHandleRef={dragHandleRef}
    >
      <TableComponent
        columns={columns}
        rows={topFiveMostPopularAPIsData.data}
        onRowClick={() => {}}
        emptyPageContent={<></>}
        isDataLoading={false}
        isDataError={false}
        onRefetch={() => {}}
      />
    </WidgetWrapper>
  );
};

export default TopFiveMostPopularAPIs;
