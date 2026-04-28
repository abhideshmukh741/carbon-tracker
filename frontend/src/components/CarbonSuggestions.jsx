import React from 'react';

const CarbonSuggestions = ({ avgCo2, campusAvg }) => {
    const threshold = campusAvg || 250;
    const isHigh = avgCo2 > threshold;

    if (!isHigh) {
        return (
            <div className="glass-panel" style={{ padding: '2rem', marginTop: '1.5rem', borderLeft: '4px solid #10b981' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#10b981' }}>Great Job! 🌿</h2>
                <p>Your carbon footprint ({avgCo2.toFixed(1)} kg) is within the acceptable threshold (Campus Avg: {threshold} kg). Keep up the green habits!</p>
            </div>
        );
    }

    const suggestions = [
        { icon: '🚌', text: 'Switch 1-2 weekly commutes to public transit or carpooling to significantly reduce transport emissions.' },
        { icon: '🥗', text: 'Consider a plant-based diet for at least 2 days a week to lower food-related CO₂.' },
        { icon: '🔌', text: 'Audit your room or home electricity—turn off standby appliances and switch to LED lighting.' }
    ];

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginTop: '1.5rem', borderLeft: '4px solid #ef4444', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>⚠️</span>
                <div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#ef4444' }}>High Carbon Footprint Detected</h2>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>Your average ({avgCo2.toFixed(1)} kg) is above the campus threshold ({threshold} kg). Let's work on reducing it!</p>
                </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                {suggestions.map((s, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '12px', display: 'flex', gap: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
                        <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarbonSuggestions;
