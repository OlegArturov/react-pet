import React, { useState } from 'react';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import './TestDashboard.css';

const widgetsList = [
  { id: 'widget-1', content: '📊 Sales Graph' },
  { id: 'widget-2', content: '📈 KPIs' },
  { id: 'widget-3', content: '📅 Calendar' },
];


export default function DragAndDropTest() {
  const [layout, setLayout] = useState({
    full: ['widget-1'],
    left: ['widget-2'],
    right: ['widget-3'],
  });

  const onDrop = (widgetId, zone) => {
    setLayout((prev) => {
      const newLayout = {
        full: [],
        left: [],
        right: [],
      };
      for (const z of Object.keys(prev)) {
        newLayout[z] = prev[z].filter((id) => id !== widgetId);
      }
      newLayout[zone].push(widgetId);
      return newLayout;
    });
  };

  const renderZone = (zone, label) => {
    return (
      <div
        className={`drop-zone ${zone}`}
        ref={(el) => {
          if (!el) return;
          dropTargetForElements({
            element: el,
            getData: () => ({ zone }),
            onDragEnter: () => el.classList.add('hover'),
            onDragLeave: () => el.classList.remove('hover'),
            onDrop: (args) => {
              onDrop(args.source.data.id, zone);
              el.classList.remove('hover');
            },
          });
        }}
      >
        <h4>{label}</h4>
        {layout[zone].map((widgetId) => {
          const widget = widgetsList.find((w) => w.id === widgetId);
          if (!widget) return null;
          return (
            <div
              key={widget.id}
              className="widget"
              ref={(el) => {
                if (!el) return;
                draggable({
                  element: el,
                  getInitialData: () => ({ id: widget.id }),
                });
              }}
            >
              {widget.content}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="dashboard-wrapper">
      {renderZone('full', '🔵 Full Width')}
      <div className="two-column">
        {renderZone('left', '🟢 Left')}
        {renderZone('right', '🟡 Right')}
      </div>
    </div>
  );
}