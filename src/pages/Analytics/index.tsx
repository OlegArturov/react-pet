import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import UserAccountOverTime from './widgets/UserAccountOverTime';
import { colors } from './theme/variables';
import { DropdownItem } from './components/Dropdown';
import translations from './translations';
import { AnalyticWidgetPeriod } from './HOC/TimePeriodDropdown';
import APIProducts from './widgets/APIProducts';
import APIProxies from './widgets/APIProxies';
import TopFiveMostPopularAPIs from './widgets/TopFiveMostPopularAPIs';
import TranslationStatusByLanguage from './widgets/TranslationStatusByLanguage';
import ManualApprovalRequests from './widgets/ManualApprovalRequests';
import ManualApprovalProcessingTimes from './widgets/ManualAppprovalProcessingTimes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';

import './styles/index.css';
import './styles/fonts.css';
import { hydrateRoot } from 'react-dom/client';

export enum AnalyticWidgetType {
  // API_PRODUCTS = 'API_PRODUCTS',
  // API_PROXIES = 'API_PROXIES',
  USER_ACCOUNTS_OVER_TIME = 'user_accounts_over_time',
  // TOP_FIVE_MOST_POPULAR_APIS = 'TOP_FIVE_MOST_POPULAR_APIS',
  // TRANSLATION_STATUS_BY_LANGUAGE = 'TRANSLATION_STATUS_BY_LANGUAGE',
  MANUAL_APPROVAL_REQUESTS = 'manual_approval_requests',
  MANUAL_APPROVAL_PROCESSING_TIME = 'manual_approval_processing_time',
}

const VISIBILITY_STORAGE_KEY = 'analytics_widgets_visibility_v1';

const Analytics = () => {
  const widgetsArray: DropdownItem[] = Object.values(AnalyticWidgetType).map((widget) => ({
    label: translations.widgets[widget],
    value: widget,
    selected: true,
  }));

  const [selectedWidgets, setSelectedWidgets] = useState<DropdownItem[]>(() => {
    try {
      const raw = localStorage.getItem(VISIBILITY_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, boolean> | string[];
        // Support two formats: array of visible values or map value->boolean
        if (Array.isArray(parsed)) {
          const visible = new Set(parsed as string[]);
          return Object.values(AnalyticWidgetType).map((widget) => ({
            label: translations.widgets[widget],
            value: widget,
            selected: visible.has(widget),
          }));
        }
        if (parsed && typeof parsed === 'object') {
          return Object.values(AnalyticWidgetType).map((widget) => ({
            label: translations.widgets[widget],
            value: widget,
            selected: parsed[widget] !== false,
          }));
        }
      }
    } catch (_e) {}
    return widgetsArray;
  });
  const [flatSelectedWidgets, setFlatSelectedWidgets] = useState<AnalyticWidgetType[]>([]);

  const [selectedPeriod, setSelectedPeriod] = useState<DropdownItem>({
    label: translations.periods[AnalyticWidgetPeriod.LAST_6_MONTHS],
    value: AnalyticWidgetPeriod.LAST_6_MONTHS,
  });

  useEffect(() => {
    setFlatSelectedWidgets(
      selectedWidgets
        .filter((widget) => widget.selected)
        .map((widget) => widget.value as AnalyticWidgetType),
    );
  }, [selectedWidgets]);

  // Persist visibility selection
  useEffect(() => {
    try {
      const map: Record<string, boolean> = {};
      for (const item of selectedWidgets) {
        map[item.value] = !!item.selected;
      }
      localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(map));
    } catch (_e) {}
  }, [selectedWidgets]);

  const hideWidget = (widget: AnalyticWidgetType) => {
    setSelectedWidgets(
      selectedWidgets.map((w) => (w.value === widget ? { ...w, selected: false } : w)),
    );
  };

  // Map widget type -> component renderer
  const renderWidgetByType = (
    type: AnalyticWidgetType,
    handleRef: React.Ref<HTMLButtonElement>,
  ): React.ReactElement | null => {
    switch (type) {
      // case AnalyticWidgetType.API_PRODUCTS:
      //   return (
      //     <APIProducts
      //       globalSelectedPeriod={selectedPeriod}
      //       hideWidget={() => hideWidget(AnalyticWidgetType.API_PRODUCTS)}
      //       dragHandleRef={handleRef}
      //     />
      //   );
      // case AnalyticWidgetType.API_PROXIES:
      //   return (
      //     <APIProxies
      //       globalSelectedPeriod={selectedPeriod}
      //       hideWidget={() => hideWidget(AnalyticWidgetType.API_PROXIES)}
      //       dragHandleRef={handleRef}
      //     />
      //   );
      case AnalyticWidgetType.USER_ACCOUNTS_OVER_TIME:
        return (
          <UserAccountOverTime
            globalSelectedPeriod={selectedPeriod}
            hideWidget={() => hideWidget(AnalyticWidgetType.USER_ACCOUNTS_OVER_TIME)}
            dragHandleRef={handleRef}
          />
        );
      // case AnalyticWidgetType.TOP_FIVE_MOST_POPULAR_APIS:
      //   return (
      //     <TopFiveMostPopularAPIs
      //       globalSelectedPeriod={selectedPeriod}
      //       hideWidget={() => hideWidget(AnalyticWidgetType.TOP_FIVE_MOST_POPULAR_APIS)}
      //       dragHandleRef={handleRef}
      //     />
      //   );
      // case AnalyticWidgetType.TRANSLATION_STATUS_BY_LANGUAGE:
      //   return (
      //     <TranslationStatusByLanguage
      //       globalSelectedPeriod={selectedPeriod}
      //       hideWidget={() => hideWidget(AnalyticWidgetType.TRANSLATION_STATUS_BY_LANGUAGE)}
      //       dragHandleRef={handleRef}
      //     />
      //   );
      case AnalyticWidgetType.MANUAL_APPROVAL_REQUESTS:
        return (
          <ManualApprovalRequests
            globalSelectedPeriod={selectedPeriod}
            hideWidget={() => hideWidget(AnalyticWidgetType.MANUAL_APPROVAL_REQUESTS)}
            dragHandleRef={handleRef}
          />
        );
      case AnalyticWidgetType.MANUAL_APPROVAL_PROCESSING_TIME:
        return (
          <ManualApprovalProcessingTimes
            globalSelectedPeriod={selectedPeriod}
            hideWidget={() => hideWidget(AnalyticWidgetType.MANUAL_APPROVAL_PROCESSING_TIME)}
            dragHandleRef={handleRef}
          />
        );
      default:
        return null;
    }
  };

  // Initial layout definition based on current visibility
  const preferredInitialRows: AnalyticWidgetType[][] = [
    // [AnalyticWidgetType.API_PRODUCTS, AnalyticWidgetType.API_PROXIES].filter((t) =>
    //   flatSelectedWidgets.includes(t),
    // ) as AnalyticWidgetType[],
    [AnalyticWidgetType.USER_ACCOUNTS_OVER_TIME].filter((t) =>
      flatSelectedWidgets.includes(t),
    ) as AnalyticWidgetType[],
    // [
    //   AnalyticWidgetType.TOP_FIVE_MOST_POPULAR_APIS,
    //   AnalyticWidgetType.TRANSLATION_STATUS_BY_LANGUAGE,
    // ].filter((t) => flatSelectedWidgets.includes(t)) as AnalyticWidgetType[],
    [
      AnalyticWidgetType.MANUAL_APPROVAL_REQUESTS,
      AnalyticWidgetType.MANUAL_APPROVAL_PROCESSING_TIME,
    ].filter((t) => flatSelectedWidgets.includes(t)) as AnalyticWidgetType[],
  ].filter((row) => row.length > 0);

  const [rows, setRows] = useState<AnalyticWidgetType[][]>(preferredInitialRows);
  const hasInitializedLayoutRef = useRef(false);

  // Restore saved layout once when visible list ready
  useEffect(() => {
    if (hasInitializedLayoutRef.current) return;
    if (!flatSelectedWidgets.length) return;
    const visibleSet = new Set(flatSelectedWidgets);
    try {
      const raw = localStorage.getItem('analytics_layout_rows_v1');
      if (raw) {
        const parsed = JSON.parse(raw) as AnalyticWidgetType[][];
        if (Array.isArray(parsed)) {
          const restored = parsed
            .map((row) => (Array.isArray(row) ? row : []).filter((w) => visibleSet.has(w)))
            .filter((r) => r.length > 0) as AnalyticWidgetType[][];
          if (restored.length) {
            setRows(restored);
            hasInitializedLayoutRef.current = true;
            return;
          }
        }
      }
    } catch (_err) {}
    hasInitializedLayoutRef.current = true;
  }, [flatSelectedWidgets]);

  // Keep rows in sync with visibility changes: remove hidden, append newly shown at bottom
  useEffect(() => {
    setRows((prev) => {
      if (!hasInitializedLayoutRef.current) return prev;
      const visibleSet = new Set(flatSelectedWidgets);
      // If nothing has been set yet – initialize using preferred grouped layout
      if (!prev.length && preferredInitialRows.length) {
        try {
          localStorage.setItem('analytics_layout_rows_v1', JSON.stringify(preferredInitialRows));
        } catch (_e) {}
        return preferredInitialRows;
      }
      const filtered = prev
        .map((r) => r.filter((w) => visibleSet.has(w)))
        .filter((r) => r.length > 0);

      const alreadyPlaced = new Set(filtered.flat());
      const notPlaced = flatSelectedWidgets.filter((w) => !alreadyPlaced.has(w));

      const result = [...filtered];
      for (const w of notPlaced) {
        result.push([w]);
      }
      try {
        localStorage.setItem('analytics_layout_rows_v1', JSON.stringify(result));
      } catch (_e) {}
      return result;
    });
  }, [flatSelectedWidgets]);

  // drag handle refs per widget
  const handleRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const setHandleRef = (widget: AnalyticWidgetType) => (el: HTMLButtonElement | null) => {
    handleRefs.current[widget] = el;
  };

  // FLIP animation refs
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const preRectsRef = useRef<Map<string, DOMRect>>(new Map());
  const capturePreLayoutPositions = () => {
    const map = new Map<string, DOMRect>();
    const current = itemRefs.current;
    for (const key in current) {
      const el = current[key];
      if (el) {
        map.set(key, el.getBoundingClientRect());
      }
    }
    preRectsRef.current = map;
  };

  // helpers
  const removeWidgetFromRows = (
    layout: AnalyticWidgetType[][],
    widget: AnalyticWidgetType,
  ): { next: AnalyticWidgetType[][]; fromRowIndex: number; removedEntireSourceRow: boolean } => {
    let fromRowIndex = -1;
    let removedEntireSourceRow = false;
    const next = layout
      .map((row, idx) => {
        if (fromRowIndex === -1 && row.includes(widget)) {
          fromRowIndex = idx;
          removedEntireSourceRow = row.length === 1;
        }
        const filtered = row.filter((w) => w !== widget);
        return filtered;
      })
      .filter((r) => r.length > 0);
    return { next, fromRowIndex, removedEntireSourceRow };
  };

  const onDropIntoNewRow = (widget: AnalyticWidgetType, targetRowIndex: number) => {
    capturePreLayoutPositions();
    setRows((prev) => {
      const { next, fromRowIndex, removedEntireSourceRow } = removeWidgetFromRows(prev, widget);
      let adjustedIndex = targetRowIndex;
      if (fromRowIndex !== -1 && removedEntireSourceRow && fromRowIndex < targetRowIndex) {
        adjustedIndex = targetRowIndex - 1;
      }
      const result = [...next.slice(0, adjustedIndex), [widget], ...next.slice(adjustedIndex)];
      try {
        localStorage.setItem('analytics_layout_rows_v1', JSON.stringify(result));
      } catch (_e) {}
      return result;
    });
  };

  const onDropIntoRowSide = (
    widget: AnalyticWidgetType,
    targetRowIndex: number,
    side: 'left' | 'right',
  ) => {
    capturePreLayoutPositions();
    setRows((prev) => {
      const { next, fromRowIndex, removedEntireSourceRow } = removeWidgetFromRows(prev, widget);
      const adjustedIndex =
        fromRowIndex !== -1 && fromRowIndex < targetRowIndex && removedEntireSourceRow
          ? targetRowIndex - 1
          : targetRowIndex;
      // Important: after removing a single-widget source row directly above the target,
      // adjustedIndex equals fromRowIndex (because rows shifted up). This is STILL a valid move
      // into the (original) lower row and must not be treated as a no-op.
      if (fromRowIndex === adjustedIndex) {
        const isMovingIntoNextRow = removedEntireSourceRow && targetRowIndex === fromRowIndex + 1;
        if (!isMovingIntoNextRow) {
          return prev;
        }
      }
      const targetRow = next[adjustedIndex] ?? [];
      if (targetRow.length !== 1) {
        return prev; // only allow placing into a single-widget row
      }
      const existing = targetRow[0];
      const newRow = side === 'left' ? [widget, existing] : [existing, widget];
      const result = next.map((r, idx) => (idx === adjustedIndex ? newRow : r));
      try {
        localStorage.setItem('analytics_layout_rows_v1', JSON.stringify(result));
      } catch (_e) {}
      return result;
    });
  };

  const onSwapWidgets = (sourceWidget: AnalyticWidgetType, targetWidget: AnalyticWidgetType) => {
    if (sourceWidget === targetWidget) return;
    capturePreLayoutPositions();
    setRows((prev) => {
      let sourceRowIdx = -1;
      let sourceColIdx = -1;
      let targetRowIdx = -1;
      let targetColIdx = -1;
      for (let ri = 0; ri < prev.length; ri++) {
        const row = prev[ri];
        for (let ci = 0; ci < row.length; ci++) {
          const w = row[ci];
          if (w === sourceWidget) {
            sourceRowIdx = ri;
            sourceColIdx = ci;
          }
          if (w === targetWidget) {
            targetRowIdx = ri;
            targetColIdx = ci;
          }
        }
      }
      if (
        sourceRowIdx === -1 ||
        targetRowIdx === -1 ||
        sourceColIdx === -1 ||
        targetColIdx === -1
      ) {
        return prev;
      }
      const result = prev.map((r) => [...r]);
      if (sourceRowIdx === targetRowIdx) {
        const row = result[sourceRowIdx];
        [row[sourceColIdx], row[targetColIdx]] = [row[targetColIdx], row[sourceColIdx]];
      } else {
        const sourceRow = result[sourceRowIdx];
        const targetRow = result[targetRowIdx];
        const tmp = sourceRow[sourceColIdx];
        sourceRow[sourceColIdx] = targetRow[targetColIdx];
        targetRow[targetColIdx] = tmp;
      }
      try {
        localStorage.setItem('analytics_layout_rows_v1', JSON.stringify(result));
      } catch (_e) {}
      return result;
    });
  };

  // Animate to new positions after layout changes (FLIP)
  useLayoutEffect(() => {
    const pre = preRectsRef.current;
    if (!pre || pre.size === 0) return;
    const current = itemRefs.current;
    pre.forEach((oldRect, key) => {
      const el = current[key];
      if (!el) return;
      const newRect = el.getBoundingClientRect();
      const deltaX = oldRect.left - newRect.left;
      const deltaY = oldRect.top - newRect.top;
      if (deltaX !== 0 || deltaY !== 0) {
        el.style.transition = 'transform 0s';
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        void el.getBoundingClientRect();
        el.style.transition = 'transform 250ms ease';
        el.style.transform = '';
      }
    });
    preRectsRef.current = new Map();
  }, [rows]);

  const theme = createTheme({
    typography: {
      fontFamily:
        "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif",
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 1,
        },
        styleOverrides: {
          elevation1: {
            boxShadow: '0px 5px 25px 0px rgba(0, 98, 172, 0.1)',
            borderRadius: 6,
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  // Enable Atlaskit's auto-scroll on the analytics scroll container during drag
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const containerEl = wrapperRef.current;
    if (!containerEl) return;
    return autoScrollForElements({
      element: containerEl,
      getAllowedAxis: () => 'vertical',
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledAnalyticsWrapper
        ref={wrapperRef as any}
        container
        size={{ md: 12 }}
        direction={'column'}
      >
        <Header
          selectedWidgets={selectedWidgets}
          setSelectedWidgets={setSelectedWidgets}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        {/* DnD: Between-rows drop zone at top */}
        <Box
          className="analytics-drop-between"
          ref={(el) => {
            const element = el as unknown as HTMLElement | null;
            if (!element) return;
            dropTargetForElements({
              element: element as unknown as Element,
              getData: () => ({ type: 'between', index: 0 }),
              onDragEnter: () => element.classList.add('hover'),
              onDragLeave: () => element.classList.remove('hover'),
              onDrop: (args) => {
                const widget = args.source.data.widget as AnalyticWidgetType;
                onDropIntoNewRow(widget, 0);
                element.classList.remove('hover');
              },
            });
          }}
        />

        {/* Empty state when no widgets are visible */}
        {rows.length === 0 && (
          <StyledEmptyState>
            <StyledEmptyStateTitle>{translations.widgets.no_widgets_title}</StyledEmptyStateTitle>
            <StyledEmptyStateDescription>
              {translations.widgets.no_widgets_description}
            </StyledEmptyStateDescription>
          </StyledEmptyState>
        )}

        {/* Render rows */}
        {rows.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <Grid container size={{ xs: 12 }} spacing={3} className="analytics-row">
              {/* Side drop targets if single widget in row */}
              {row.length === 1 && (
                <>
                  <Box
                    className="analytics-drop-side left"
                    ref={(el) => {
                      const element = el as unknown as HTMLElement | null;
                      if (!element) return;
                      dropTargetForElements({
                        element: element as unknown as Element,
                        getData: () => ({ type: 'side', side: 'left', rowIndex }),
                        onDragEnter: () => element.classList.add('hover'),
                        onDragLeave: () => element.classList.remove('hover'),
                        onDrop: (args) => {
                          const widget = args.source.data.widget as AnalyticWidgetType;
                          onDropIntoRowSide(widget, rowIndex, 'left');
                          element.classList.remove('hover');
                        },
                      });
                    }}
                  />
                  {/* Center swap zone that does not overlap side add zones */}
                  <Box
                    className="analytics-swap-center"
                    ref={(el) => {
                      const element = el as unknown as HTMLElement | null;
                      if (!element) return;
                      dropTargetForElements({
                        element: element as unknown as Element,
                        getData: () => ({ type: 'swap-center', rowIndex }),
                        onDragEnter: () => element.classList.add('hover'),
                        onDragLeave: () => element.classList.remove('hover'),
                        onDrop: (args) => {
                          const source = args.source?.data?.widget as
                            | AnalyticWidgetType
                            | undefined;
                          if (!source) {
                            element.classList.remove('hover');
                            return;
                          }
                          const target = row[0];
                          onSwapWidgets(source, target);
                          element.classList.remove('hover');
                        },
                      });
                    }}
                  />
                  <Box
                    className="analytics-drop-side right"
                    ref={(el) => {
                      const element = el as unknown as HTMLElement | null;
                      if (!element) return;
                      dropTargetForElements({
                        element: element as unknown as Element,
                        getData: () => ({ type: 'side', side: 'right', rowIndex }),
                        onDragEnter: () => element.classList.add('hover'),
                        onDragLeave: () => element.classList.remove('hover'),
                        onDrop: (args) => {
                          const widget = args.source.data.widget as AnalyticWidgetType;
                          onDropIntoRowSide(widget, rowIndex, 'right');
                          element.classList.remove('hover');
                        },
                      });
                    }}
                  />
                </>
              )}

              {row.map((widget, idx) => (
                <Grid
                  key={widget}
                  size={{ xs: 12, md: row.length === 2 ? 6 : 12 }}
                  className={row.length === 2 ? 'analytics-widget-drop-target' : undefined}
                  ref={(el) => {
                    const element = el as unknown as HTMLElement | null;
                    if (!element) return;
                    itemRefs.current[widget] = element as unknown as HTMLElement;
                    // Register draggable for whole card, but with a handle
                    const handle = handleRefs.current[widget];
                    draggable({
                      element: element,
                      // @ts-ignore: dragHandle is supported by library
                      dragHandle: handle ?? undefined,
                      getInitialData: () => ({ widget }),
                    });
                    // Enable swap by dropping onto a widget cell only in two-widget rows
                    if (row.length === 2) {
                      dropTargetForElements({
                        element: element as unknown as Element,
                        getData: () => ({ type: 'widget', rowIndex, targetWidget: widget }),
                        onDragEnter: () => element.classList.add('hover'),
                        onDragLeave: () => element.classList.remove('hover'),
                        onDrop: (args) => {
                          const source = args.source?.data?.widget as
                            | AnalyticWidgetType
                            | undefined;
                          if (!source) {
                            element.classList.remove('hover');
                            return;
                          }
                          onSwapWidgets(source, widget);
                          element.classList.remove('hover');
                        },
                      });
                    }
                  }}
                >
                  {renderWidgetByType(widget, setHandleRef(widget))}
                </Grid>
              ))}
            </Grid>

            {/* Between-rows drop zone after each row */}
            <Box
              className="analytics-drop-between"
              ref={(el) => {
                const element = el as unknown as HTMLElement | null;
                if (!element) return;
                dropTargetForElements({
                  element: element as unknown as Element,
                  getData: () => ({ type: 'between', index: rowIndex + 1 }),
                  onDragEnter: () => element.classList.add('hover'),
                  onDragLeave: () => element.classList.remove('hover'),
                  onDrop: (args) => {
                    const widget = args.source.data.widget as AnalyticWidgetType;
                    // If dragged from above rows and source row was removed fully, adjust index
                    // We already adjust inside handler based on current layout; so pass the raw target index here
                    onDropIntoNewRow(widget, rowIndex + 1);
                    element.classList.remove('hover');
                  },
                });
              }}
            />
          </React.Fragment>
        ))}
      </StyledAnalyticsWrapper>
    </ThemeProvider>
  );
};

const StyledAnalyticsWrapper = styled(Grid)({
  width: '100%',
  // height: '100%',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  padding: 25,
  overflow: 'auto',
});

const StyledEmptyState = styled(Box)({
  padding: 24,
  textAlign: 'center',
  color: colors.mainText,
});

const StyledEmptyStateTitle = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  color: colors.mainText,
  marginBottom: 10,
});

const StyledEmptyStateDescription = styled(Typography)({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  color: colors.grayTextMid,
});

const container: Element | null = document.getElementById('apiboostAnalyticsDashboard');

if (container) {
  hydrateRoot(container, <Analytics />);
}

export default Analytics;
