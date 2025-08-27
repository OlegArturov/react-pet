export interface ManualApprovalRequestsDataItem {
  date: string;
  value: number;
}

export interface ManualApprovalRequestsResponse {
  data: ManualApprovalRequestsDataItem[];
}

export const manualApprovalRequestsMockData: ManualApprovalRequestsDataItem[] = [
  {
    date: 'Jan, 2025',
    value: 1,
  },
  {
    date: 'Feb, 2025',
    value: 2,
  },
  {
    date: 'Mar, 2025',
    value: 3,
  },
  {
    date: 'Apr, 2025',
    value: 4,
  },
  {
    date: 'May, 2025',
    value: 5,
  },
  {
    date: 'Jun, 2025',
    value: 10,
  },
];

export const manualApprovalRequestsMockDataMonthly: ManualApprovalRequestsDataItem[] = [
  { date: 'Jun 01, 2025', value: 1 },
  { date: 'Jun 02, 2025', value: 2 },
  { date: 'Jun 03, 2025', value: 3 },
  { date: 'Jun 04, 2025', value: 4 },
  { date: 'Jun 05, 2025', value: 5 },
  { date: 'Jun 06, 2025', value: 6 },
  { date: 'Jun 07, 2025', value: 7 },
  { date: 'Jun 08, 2025', value: 8 },
  { date: 'Jun 09, 2025', value: 9 },
  { date: 'Jun 10, 2025', value: 10 },
  { date: 'Jun 11, 2025', value: 11 },
  { date: 'Jun 12, 2025', value: 12 },
  { date: 'Jun 13, 2025', value: 13 },
  { date: 'Jun 14, 2025', value: 14 },
  { date: 'Jun 15, 2025', value: 15 },
  { date: 'Jun 16, 2025', value: 16 },
  { date: 'Jun 17, 2025', value: 17 },
  { date: 'Jun 18, 2025', value: 18 },
  { date: 'Jun 19, 2025', value: 19 },
  { date: 'Jun 20, 2025', value: 20 },
  { date: 'Jun 21, 2025', value: 21 },
  { date: 'Jun 22, 2025', value: 22 },
  { date: 'Jun 23, 2025', value: 23 },
  { date: 'Jun 24, 2025', value: 24 },
  { date: 'Jun 25, 2025', value: 25 },
  { date: 'Jun 26, 2025', value: 26 },
  { date: 'Jun 27, 2025', value: 27 },
  { date: 'Jun 28, 2025', value: 28 },
  { date: 'Jun 29, 2025', value: 29 },
  { date: 'Jun 30, 2025', value: 30 },
];

export const manualApprovalRequestsMockDataYearly: ManualApprovalRequestsDataItem[] = [
  { date: 'Jan, 2025', value: 1 },
  { date: 'Feb, 2025', value: 2 },
  { date: 'Mar, 2025', value: 3 },
  { date: 'Apr, 2025', value: 4 },
  { date: 'May, 2025', value: 5 },
  { date: 'Jun, 2025', value: 6 },
  { date: 'Jul, 2025', value: 7 },
  { date: 'Aug, 2025', value: 8 },
  { date: 'Sep, 2025', value: 9 },
  { date: 'Oct, 2025', value: 10 },
  { date: 'Nov, 2025', value: 11 },
  { date: 'Dec, 2025', value: 12 },
];
