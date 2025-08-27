export interface UserAccountOverTimeDataItem {
  date: string;
  value: number;
}

export enum Roles {
  DEVELOPER = 'developer',
  PRODUCT_OWNER = 'product_owner',
}

export interface UserAccountOverTimeGraphData {
  date: string;
  value: number;
}

export interface UserAccountOverTimeGraphDataResponse {
  role: Roles;
  graphData: UserAccountOverTimeGraphData[];
}

export interface UserAccountOverTimeResponse {
  status: string;
  message: string;
  data: UserAccountOverTimeGraphDataResponse[];
}

export const userAccountOverTimeMockData: UserAccountOverTimeResponse = {
  status: 'OK',
  message: 'OK',
  data: [
    {
      role: Roles.DEVELOPER,
      graphData: [
        { date: 'Jan, 2025', value: 100 },
        { date: 'Feb, 2025', value: 42 },
        { date: 'Mar, 2025', value: 75 },
        { date: 'Apr, 2025', value: 78 },
        { date: 'May, 2025', value: 60 },
        { date: 'Jun, 2025', value: 50 },
      ],
    },
    {
      role: Roles.PRODUCT_OWNER,
      graphData: [
        { date: 'Jan, 2025', value: 110 },
        { date: 'Feb, 2025', value: 123 },
        { date: 'Mar, 2025', value: 155 },
        { date: 'Apr, 2025', value: 121 },
        { date: 'May, 2025', value: 81 },
        { date: 'Jun, 2025', value: 135 },
      ],
    },
  ],
};

export const userAccountOverTimeMockDataYearly: UserAccountOverTimeResponse = {
  message: 'OK',
  status: 'OK',
  data: [
    {
      role: Roles.DEVELOPER,
      graphData: [
        { date: 'Jan, 2025', value: 100 },
        { date: 'Feb, 2025', value: 130 },
        { date: 'Mar, 2025', value: 150 },
        { date: 'Apr, 2025', value: 120 },
        { date: 'May, 2025', value: 110 },
        { date: 'Jun, 2025', value: 105 },
        { date: 'Jul, 2025', value: 102 },
        { date: 'Aug, 2025', value: 101 },
        { date: 'Sep, 2025', value: 80 },
        { date: 'Oct, 2025', value: 90 },
        { date: 'Nov, 2025', value: 110 },
        { date: 'Dec, 2025', value: 120 },
      ],
    },
    {
      role: Roles.PRODUCT_OWNER,
      graphData: [
        { date: 'Jan, 2025', value: 130 },
        { date: 'Feb, 2025', value: 77 },
        { date: 'Mar, 2025', value: 100 },
        { date: 'Apr, 2025', value: 110 },
        { date: 'May, 2025', value: 120 },
        { date: 'Jun, 2025', value: 65 },
        { date: 'Jul, 2025', value: 105 },
        { date: 'Aug, 2025', value: 96 },
        { date: 'Sep, 2025', value: 90 },
        { date: 'Oct, 2025', value: 140 },
        { date: 'Nov, 2025', value: 180 },
        { date: 'Dec, 2025', value: 120 },
      ],
    },
  ],
};

export const userAccountOverTimeMockDataMonthly: UserAccountOverTimeResponse = {
  message: 'OK',
  status: 'OK',
  data: [
    {
      role: Roles.DEVELOPER,
      graphData: [
        { date: 'Jun 01, 2025', value: 32 },
        { date: 'Jun 02, 2025', value: 45 },
        { date: 'Jun 03, 2025', value: 28 },
        { date: 'Jun 04, 2025', value: 60 },
        { date: 'Jun 05, 2025', value: 54 },
        { date: 'Jun 06, 2025', value: 39 },
        { date: 'Jun 07, 2025', value: 72 },
        { date: 'Jun 08, 2025', value: 68 },
        { date: 'Jun 09, 2025', value: 51 },
        { date: 'Jun 10, 2025', value: 49 },
        { date: 'Jun 11, 2025', value: 80 },
        { date: 'Jun 12, 2025', value: 77 },
        { date: 'Jun 13, 2025', value: 65 },
        { date: 'Jun 14, 2025', value: 40 },
        { date: 'Jun 15, 2025', value: 35 },
        { date: 'Jun 16, 2025', value: 58 },
        { date: 'Jun 17, 2025', value: 62 },
        { date: 'Jun 18, 2025', value: 70 },
        { date: 'Jun 19, 2025', value: 55 },
        { date: 'Jun 20, 2025', value: 47 },
        { date: 'Jun 21, 2025', value: 90 },
        { date: 'Jun 22, 2025', value: 85 },
        { date: 'Jun 23, 2025', value: 73 },
        { date: 'Jun 24, 2025', value: 66 },
        { date: 'Jun 25, 2025', value: 52 },
        { date: 'Jun 26, 2025', value: 58 },
        { date: 'Jun 27, 2025', value: 61 },
        { date: 'Jun 28, 2025', value: 69 },
        { date: 'Jun 29, 2025', value: 74 },
        { date: 'Jun 30, 2025', value: 60 },
      ],
    },
    {
      role: Roles.PRODUCT_OWNER,
      graphData: [
        { date: 'Jun 01, 2025', value: 20 },
        { date: 'Jun 02, 2025', value: 25 },
        { date: 'Jun 03, 2025', value: 30 },
        { date: 'Jun 04, 2025', value: 22 },
        { date: 'Jun 05, 2025', value: 28 },
        { date: 'Jun 06, 2025', value: 35 },
        { date: 'Jun 07, 2025', value: 40 },
        { date: 'Jun 08, 2025', value: 38 },
        { date: 'Jun 09, 2025', value: 45 },
        { date: 'Jun 10, 2025', value: 42 },
        { date: 'Jun 11, 2025', value: 50 },
        { date: 'Jun 12, 2025', value: 48 },
        { date: 'Jun 13, 2025', value: 52 },
        { date: 'Jun 14, 2025', value: 55 },
        { date: 'Jun 15, 2025', value: 60 },
        { date: 'Jun 16, 2025', value: 58 },
        { date: 'Jun 17, 2025', value: 62 },
        { date: 'Jun 18, 2025', value: 65 },
        { date: 'Jun 19, 2025', value: 70 },
        { date: 'Jun 20, 2025', value: 68 },
        { date: 'Jun 21, 2025', value: 72 },
        { date: 'Jun 22, 2025', value: 75 },
        { date: 'Jun 23, 2025', value: 78 },
        { date: 'Jun 24, 2025', value: 80 },
        { date: 'Jun 25, 2025', value: 76 },
        { date: 'Jun 26, 2025', value: 74 },
        { date: 'Jun 27, 2025', value: 70 },
        { date: 'Jun 28, 2025', value: 66 },
        { date: 'Jun 29, 2025', value: 62 },
        { date: 'Jun 30, 2025', value: 60 },
      ],
    },
  ],
};
