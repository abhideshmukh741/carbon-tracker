import React from 'react';

const MetricCard = ({ title, value, subtext, icon, color }) => {
    return (
        <div className="card-dark" style={{ borderTop: `4px solid ${color}`, display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '3rem', opacity: 0.15, pointerEvents: 'none' }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: 400, margin: 0 }}>{title}</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
            <p style={{ fontSize: '0.9rem', color: color, margin: 0, fontWeight: 500 }}>{subtext}</p>
        </div>
    );
};

export default MetricCard;
