export const translations = {
  header: {
    title: 'API Analytics',
    widgetsDropdownOpen: 'Widgets',
  },
  errors: {
    unknown_error: 'Something went wrong, try again later.',
    no_data: 'No data available.',
  },
  common: {
    try_again: 'Try again',
  },
  widgets: {
    API_PRODUCTS: 'API Products',
    API_PROXIES: 'API Proxies',
    user_accounts_over_time: 'User Accounts Over Time',
    TOP_FIVE_MOST_POPULAR_APIS: 'Top 5 Most Popular APIs',
    TRANSLATION_STATUS_BY_LANGUAGE: 'Translation Status by Language',
    manual_approval_requests: 'Manual Approval Requests',
    manual_approval_processing_times: 'Manual Approval Processing Times',
    no_widgets_title: 'No widgets selected',
    no_widgets_description:
      'You have hidden all widgets. Use the Select Widgets menu to choose which ones to show.',
  },
  periods: {
    LAST_30_DAYS: 'Last 30 Days',
    LAST_6_MONTHS: 'Last 6 Months',
    LAST_12_MONTHS: 'Last 12 Months',
    ALL_TIME: 'All Time',
  },
  widgetSettingsDropdown: {
    options: {
      hideWidget: 'Hide Widget',
      chartType: 'Chart Type',
      chartTypeOptions: {
        KPI_WIDGET: 'KPI Widget',
        LINE_CHART: 'Line Chart',
        BAR_CHART: 'Bar Chart',
      },
    },
  },
  widgetComponents: {
    userAccountOverTime: {
      title: 'User Account Over Time',
      roles: {
        developer: 'Developers',
        product_owner: 'Product Owners',
      },
    },
    APIProducts: {
      title: 'API Products',
    },
    APIProxies: {
      title: 'API Proxies',
    },
    TopFiveMostPopularAPIs: {
      title: 'Top 5 Most Popular APIs',
      table: {
        fields: {
          number: '#',
          api: 'API',
          calls: 'Calls',
        },
      },
    },
    TranslationStatusByLanguage: {
      title: 'Translation Status by Language',
      table: {
        fields: {
          language: 'Language',
          content: 'Content',
          translated: 'Translated',
          untranslated: 'Untranslated',
          progress: 'Progress',
        },
      },
    },
    manualApprovalRequests: {
      title: 'Manual Approval Requests',
    },
    manualApprovalProcessingTimes: {
      title: 'Manual Approval Processing Times',
      averageApprovalTime: 'Average Approval Time',
      totalNumberRequest: 'Total Number of Requests',
    },
  },
};

export default translations;
