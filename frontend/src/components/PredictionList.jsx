import React from 'react';

const PredictionList = ({ history }) => {
    if (!history || history.length === 0) {
        return (
            <div className="card-dark" style={{ textAlign: 'center', padding: '5rem 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>📊</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Data Found</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Start tracking your habits to see predictions here.</p>
            </div>
        );
    }

    const getStatusStyle = (level) => {
        switch((level || "").toLowerCase()) {
            case 'excellent': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' };
            case 'average': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' };
            case 'high': 
            case 'poor': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' };
            default: return { bg: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)' };
        }
    };

    return (
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem 0' }}>
            <h2 style={{ padding: '0 2rem 1.5rem', margin: 0, borderBottom: '1px solid var(--glass-border)' }}>Prediction History</h2>
            <div style={{ overflowY: 'auto', padding: '1.5rem 2rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {history.map(item => {
                    const style = getStatusStyle(item.carbon_level);
                    return (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {new Date(item.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{item.predicted_co2} <span style={{fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-secondary)'}}>kg CO₂</span></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span>🚗</span> {item.transport_mode || 'N/A'}
                                </div>
                                <div style={{ background: style.bg, color: style.color, border: style.border, padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, minWidth: '90px', textAlign: 'center' }}>
                                    {item.carbon_level || 'Unknown'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PredictionList;
