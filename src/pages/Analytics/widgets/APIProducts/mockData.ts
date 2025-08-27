export interface APIProductsData {
  currentValue: number;
  trendValue: number;
  trend: 'up' | 'down';
}

export const apiProductsMockData: APIProductsData = {
  currentValue: 89,
  trendValue: 5,
  trend: 'up',
};

export const apiProductsMockDataYearly: APIProductsData = {
  currentValue: 99,
  trendValue: 10,
  trend: 'up',
};

export const apiProductsMockDataMonthly: APIProductsData = {
  currentValue: 13,
  trendValue: 2,
  trend: 'down',
};
