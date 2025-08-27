export interface TopFiveMostPopularAPIsItem {
  name: string;
  value: string;
}

export interface TopFiveMostPopularAPIsData {
  data: TopFiveMostPopularAPIsItem[];
}

export const topFiveMostPopularAPIsMockData: TopFiveMostPopularAPIsData = {
  data: [
    {
      name: 'PayConnect',
      value: '99, 999',
    },
    {
      name: 'GlobalTransfer',
      value: '99, 999',
    },
    {
      name: 'InstantPay',
      value: '99, 999',
    },
    {
      name: 'FlexPay',
      value: '99, 999',
    },
    {
      name: 'MerchantLink',
      value: '99, 999',
    },
  ],
};

export const topFiveMostPopularAPIsMockDataMonthly: TopFiveMostPopularAPIsData = {
  data: [
    {
      name: 'MerchantLink',
      value: '99, 999',
    },
    {
      name: 'InstantPay',
      value: '99, 999',
    },
    {
      name: 'GlobalTransfer',
      value: '99, 999',
    },

    {
      name: 'FlexPay',
      value: '99, 999',
    },
    {
      name: 'PayConnect',
      value: '99, 999',
    },
  ],
};

export const topFiveMostPopularAPIsMockDataYearly: TopFiveMostPopularAPIsData = {
  data: [
    {
      name: 'GlobalTransfer',
      value: '99, 999',
    },
    {
      name: 'InstantPay',
      value: '99, 999',
    },
    {
      name: 'MerchantLink',
      value: '99, 999',
    },

    {
      name: 'FlexPay',
      value: '99, 999',
    },
    {
      name: 'PayConnect',
      value: '99, 999',
    },
  ],
};
