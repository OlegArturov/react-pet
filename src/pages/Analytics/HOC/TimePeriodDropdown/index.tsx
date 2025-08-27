import React from 'react';
import Dropdown, { DropdownItem, MenuType, OpenerType } from '../../components/Dropdown';
import translations from '../../translations';

export enum AnalyticWidgetPeriod {
  LAST_30_DAYS = 'LAST_30_DAYS',
  LAST_6_MONTHS = 'LAST_6_MONTHS',
  LAST_12_MONTHS = 'LAST_12_MONTHS',
  ALL_TIME = 'ALL_TIME',
}

interface TimePeriodDropdownProps {
  selectedPeriod: DropdownItem;
  setSelectedPeriod: (period: DropdownItem) => void;
}

const TimePeriodDropdown = ({ selectedPeriod, setSelectedPeriod }: TimePeriodDropdownProps) => {
  const periodsArray: DropdownItem[] = Object.values(AnalyticWidgetPeriod).map((period) => ({
    label: translations.periods[period],
    value: period,
  }));

  return (
    <Dropdown
      title={selectedPeriod?.label}
      menuType={MenuType.SINGLE}
      openerType={OpenerType.BUTTON}
      items={periodsArray}
      onItemClick={setSelectedPeriod}
      selectedItem={selectedPeriod}
    />
  );
};

export default TimePeriodDropdown;
