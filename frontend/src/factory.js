// frontend/src/nodes/factory.js
import React, { memo } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import './node.css';

const posMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

function Control({ ctrl, value, onChange }) {
  switch (ctrl.kind) {
    case 'text':
      return (
        <label className="node__field">
          <span className="node__label">{ctrl.label}</span>
          <input
            className="node__control"
            type="text"
            placeholder={ctrl.placeholder}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      );
    case 'number':
      return (
        <label className="node__field">
          <span className="node__label">{ctrl.label}</span>
          <input
            className="node__control"
            type="number"
            min={ctrl.min}
            max={ctrl.max}
            step={ctrl.step ?? 1}
            value={value ?? ctrl.default ?? 0}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </label>
      );
    case 'textarea':
      return (
        <label className="node__field">
          <span className="node__label">{ctrl.label}</span>
          <textarea
            className="node__control"
            rows={ctrl.rows ?? 3}
            placeholder={ctrl.placeholder}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      );
    case 'select':
      return (
        <label className="node__field">
          <span className="node__label">{ctrl.label}</span>
          <select
            className="node__control"
            value={value ?? ctrl.options?.[0]?.value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          >
            {ctrl.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      );
    case 'toggle':
      return (
        <label className="node__field node__field--inline">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="node__label">{ctrl.label}</span>
        </label>
      );
    default:
      return null;
  }
}

export function createNodeType(config) {
  const Node = memo(function NodeComponent({ id, data = {}, selected }) {
    const merged = { ...(config.defaults || {}), ...(data || {}) };
    const { setNodes } = useReactFlow();

    const updateData = (patch) => {
      setNodes((ns) =>
        ns.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, ...patch } } : n
        )
      );
      config.onDataChange?.(patch, { id });
    };

    return (
      <div className={`node ${config.variant || ''} ${selected ? 'is-selected' : ''}`}>
        <header className="node__header" style={{ background: config.color }}>
          {config.icon ? <span className="node__icon">{config.icon}</span> : null}
          <span className="node__title">{merged.label || config.label}</span>
        </header>

        <div className="node__body">
          {config.renderBody ? (
            config.renderBody({ id, data: merged })
          ) : (
            merged.text ? <p className="node__text">{merged.text}</p> : null
          )}

          {Array.isArray(config.controls) &&
            config.controls.map((ctrl) => (
              <Control
                key={ctrl.key}
                ctrl={ctrl}
                value={merged[ctrl.key]}
                onChange={(val) => updateData({ [ctrl.key]: val })}
              />
            ))}
        </div>

        {/* Targets (inputs) */}
        {config.handles?.targets?.map((h) => (
          <Handle
            key={`t-${h.id}`}
            type="target"
            position={posMap[h.position || 'left']}
            id={h.id}
            isConnectable={h.isConnectable ?? true}
            style={h.style}
          />
        ))}

        {/* Sources (outputs) */}
        {config.handles?.sources?.map((h) => (
          <Handle
            key={`s-${h.id}`}
            type="source"
            position={posMap[h.position || 'right']}
            id={h.id}
            isConnectable={h.isConnectable ?? true}
            style={h.style}
          />
        ))}
      </div>
    );
  });

  Node.displayName = config.type || config.label || 'Node';
  return Node;
}