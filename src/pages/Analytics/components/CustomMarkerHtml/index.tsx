export const getCustomMarkerHtml = (fill: string) => {
  return `
    <div style="display:inline-flex;align-items:center;gap:1px;height:12px;left:15px;position:absolute">
      <span style="display:inline-block;width:4px;height:2px;background:${fill};"></span>
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${fill};"></span>
      <span style="display:inline-block;width:4px;height:2px;background:${fill};"></span>
    </div>`;
};

export const getCustomMarkerNode = (fill: string) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1px',
        height: '12px',
      }}
    >
      <span
        style={{ display: 'inline-block', width: '4px', height: '2px', background: fill }}
      ></span>
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: fill,
        }}
      ></span>
      <span
        style={{ display: 'inline-block', width: '4px', height: '2px', background: fill }}
      ></span>
    </div>
  );
};
