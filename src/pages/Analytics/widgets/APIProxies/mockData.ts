export interface APIProxiesData {
  currentValue: number;
  trendValue: number;
  trend: 'up' | 'down';
}

export const apiProxiesMockData: APIProxiesData = {
  currentValue: 156,
  trendValue: 12,
  trend: 'down',
};

export const apiProxiesMockDataYearly: APIProxiesData = {
  currentValue: 168,
  trendValue: 12,
  trend: 'up',
};

export const apiProxiesMockDataMonthly: APIProxiesData = {
  currentValue: 144,
  trendValue: 12,
  trend: 'down',
};
