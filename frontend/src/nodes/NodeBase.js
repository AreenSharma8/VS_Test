// NodeBase.js


import { Handle } from 'reactflow';

export default function NodeBase({ id, type, label, fields = [], handles = [], style = {}, onFieldChange = () => {} }) {
  return (
    <div className={`node node--${type}`} id={id}>
      <div className="node__header">
        <span className="node__title">{label}</span>
      </div>
      <div className="node__body">
        {fields.map(({ name, value, type, options }, idx) => (
          <label key={idx} style={{ display: 'block', marginBottom: 4 }}>
            {name}:
            {type === 'select' ? (
              <select value={value} onChange={e => onFieldChange(name, e.target.value)} style={{ marginLeft: 6 }}>
                {options && options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input type={type || 'text'} value={value} onChange={e => onFieldChange(name, e.target.value)} style={{ marginLeft: 6 }} />
            )}
          </label>
        ))}
      </div>
      {handles.map((h, idx) => (
        <Handle key={idx} type={h.type} position={h.position} id={h.id} style={h.style || {}} />
      ))}
    </div>
  );
}

