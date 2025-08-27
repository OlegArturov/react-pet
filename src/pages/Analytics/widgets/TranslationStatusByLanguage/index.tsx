import Table, { TableColumn } from '../../components/Table';
import { DropdownItem } from '../../components/Dropdown';
import React, { useEffect, useState } from 'react';
import translations from '../../translations';
import { AnalyticWidgetPeriod } from '../../HOC/TimePeriodDropdown';
import FlagIcon from '../../components/Flag';
import {
  TranslationStatusByLanguageDataItem,
  translationStatusByLanguageMockData,
  translationStatusByLanguageMockDataMonthly,
  translationStatusByLanguageMockDataYearly,
} from './mockData';
import WidgetWrapper from '../WidgetWrapper';
import { Box, styled } from '@mui/system';
import CircularProgressBar from '../../components/CircularProgressBar';

interface TranslationStatusByLanguageProps {
  globalSelectedPeriod: DropdownItem;
  hideWidget: () => void;
  dragHandleRef?: React.Ref<HTMLButtonElement>;
}

const TranslationStatusByLanguage = ({
  globalSelectedPeriod,
  hideWidget,
  dragHandleRef,
}: TranslationStatusByLanguageProps) => {
  const [translationStatusByLanguageData, setTranslationStatusByLanguageData] = useState<
    TranslationStatusByLanguageDataItem[]
  >(translationStatusByLanguageMockData);

  const columns: TableColumn[] = [
    {
      field: 'language',
      headerName: translations.widgetComponents.TranslationStatusByLanguage.table.fields.language,
      renderCell: (row) => (
        <StyledLanguageCell>
          <FlagIcon countryCode={row.countryCode} />
          <span>{row.language}</span>
        </StyledLanguageCell>
      ),
      width: '20%',
    },
    {
      field: 'content',
      headerName: translations.widgetComponents.TranslationStatusByLanguage.table.fields.content,
      width: '20%',
    },
    {
      field: 'translated',
      headerName: translations.widgetComponents.TranslationStatusByLanguage.table.fields.translated,
      width: '20%',
    },
    {
      field: 'untranslated',
      headerName:
        translations.widgetComponents.TranslationStatusByLanguage.table.fields.untranslated,
      width: '20%',
    },
    {
      field: 'progress',
      headerName: translations.widgetComponents.TranslationStatusByLanguage.table.fields.progress,
      renderCell: (row) => {
        const value = Math.max(0, Math.min(100, Number(row.progress) || 0));
        const size = 24;
        const strokeWidth = 3;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const dash = (circumference * value) / 100;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <CircularProgressBar
              size={size}
              strokeWidth={strokeWidth}
              radius={radius}
              circumference={circumference}
              dash={dash}
              animate
              durationMs={1000}
            />
            <Box component="span">{`${value}%`}</Box>
          </Box>
        );
      },
      width: '20%',
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
        setTranslationStatusByLanguageData(translationStatusByLanguageMockData);
        break;
      case AnalyticWidgetPeriod.LAST_30_DAYS:
        setTranslationStatusByLanguageData(translationStatusByLanguageMockDataMonthly);
        break;
      default:
        setTranslationStatusByLanguageData(translationStatusByLanguageMockDataYearly);
        break;
    }
  }, [selectedPeriod]);

  return (
    <WidgetWrapper
      title={translations.widgetComponents.TranslationStatusByLanguage.title}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={setSelectedPeriod}
      hideWidget={hideWidget}
      dragHandleRef={dragHandleRef}
    >
      <Table columns={columns} rows={translationStatusByLanguageData} />
    </WidgetWrapper>
  );
};

const StyledLanguageCell = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  svg: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default TranslationStatusByLanguage;
