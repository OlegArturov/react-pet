export interface ManualApprovalProcessingTimesDataItem {
  date: string;
  averageApprovalTime: string;
  totalNumberRequest: number;
}

export interface ManualApprovalProcessingTimesDataResponse {
  status: string;
  message: string;
  data: ManualApprovalProcessingTimesDataItem[];
}

export const manualApprovalProcessingTimesMockData: ManualApprovalProcessingTimesDataResponse = {
  status: '200',
  message: 'OK',
  data: [
    {
      date: 'Jan, 2025',
      averageApprovalTime: '2h 45m',
      totalNumberRequest: 43,
    },
    {
      date: 'Feb, 2025',
      averageApprovalTime: '1h 30m',
      totalNumberRequest: 33,
    },
    {
      date: 'Mar, 2025',
      averageApprovalTime: '3h 15m',
      totalNumberRequest: 12,
    },
    {
      date: 'Apr, 2025',
      averageApprovalTime: '4h 30m',
      totalNumberRequest: 44,
    },
    {
      date: 'May, 2025',
      averageApprovalTime: '5h 45m',
      totalNumberRequest: 115,
    },
    {
      date: 'Jun, 2025',
      averageApprovalTime: '12h 45m',
      totalNumberRequest: 43,
    },
  ],
};
