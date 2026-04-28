import React, { useState } from 'react';
import { predict_api } from '../services/api';
import api from '../services/api';

const CalculationPage = () => {
    const [formData, setFormData] = useState({
        electricity_kwh: '',
        water_usage_liters: '',
        transport_mode: 'Bus',
        transport_km: '',
        food_type: 'mixed',
        waste_kg: ''
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                electricity_kwh: parseFloat(formData.electricity_kwh),
                water_usage_liters: parseFloat(formData.water_usage_liters),
                transport_mode: formData.transport_mode,
                transport_km: parseFloat(formData.transport_km),
                food_type: formData.food_type,
                waste_kg: parseFloat(formData.waste_kg)
            };
            const predictRes = await predict_api.post('/predict', payload);
            setResult(predictRes.data);

            const token = localStorage.getItem('access_token');
            if(token) {
                await api.post('/predictions/save/', {
                    ...payload,
                    predicted_co2: predictRes.data.predicted_co2,
                    carbon_level: predictRes.data.carbon_level.level
                }).catch(() => {}); // silent fail if user isn't logged in correctly
            }
        } catch (error) {
            console.error("Prediction Error:", error);
            alert("Error running prediction.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        
        <div className="container" style={{ paddingTop: '160px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="flex justify-between gap-8 fade-in-up" style={{ flexWrap: 'wrap' }}>
                
                {/* Left Side: Typography */}
                <div style={{ flex: '1 1 500px', paddingRight: '2rem' }}>
                    <h1 className="huge-title">Calculate & <br/>Balance Your <br/>Footprint</h1>
                    <p style={{ maxWidth: '450px', marginBottom: '2rem' }}>
                        Empowering the world with actionable data. Our AI models analyze your habits and predict your environmental impact.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {/* Fake active clients stat similar to mockup */}
                        <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', borderRadius: '50px' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#ff7a45', zIndex: 3 }}></div>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4ade80', marginLeft: '-12px', zIndex: 2 }}></div>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#60a5fa', marginLeft: '-12px', zIndex: 1 }}></div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Campus Wide</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Live Analytics</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Prediction Form overlay */}
                <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
                    {result ? (
                         <div className="glass-panel" style={{ padding: '2rem', animation: 'fadeInUp 0.5s ease-out' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Insight</h2>
                            <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>Based on recent habits</p>
                            
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', fontSize: '2.5rem', marginBottom: '1rem' }}>
                                    {result.carbon_level.icon}
                                </div>
                                <h1 style={{ fontSize: '3rem', fontWeight: 600, color: result.carbon_level.color }}>{result.predicted_co2} kg</h1>
                                <h3 style={{ fontWeight: 500, fontSize: '1.2rem', marginTop: '0.5rem' }}>{result.carbon_level.level}</h3>
                                <p style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>{result.carbon_level.message}</p>
                            </div>

                            <button onClick={() => setResult(null)} className="btn btn-orange w-full">Recalculate</button>
                         </div>
                    ) : (
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Estimate Emission</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="flex gap-4">
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Electricity (kWh/day)</label>
                                        <input type="number" step="0.1" name="electricity_kwh" required onChange={handleChange} className="form-input glass-dropdown" />
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Water (Liters/day)</label>
                                        <input type="number" step="0.1" name="water_usage_liters" required onChange={handleChange} className="form-input glass-dropdown" />
                                    </div>
                                </div>
                                
                                <div className="flex gap-4">
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Mode of Transport</label>
                                        <select name="transport_mode" onChange={handleChange} className="form-input glass-dropdown" value={formData.transport_mode}>
                                            <option value="Walk">Walk</option>
                                            <option value="Bike">Bike</option>
                                            <option value="Bus">Bus / Transit</option>
                                            <option value="Car">Car</option>
                                        </select>
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Distance (km/day)</label>
                                        <input type="number" step="0.1" name="transport_km" required onChange={handleChange} className="form-input glass-dropdown" />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Diet</label>
                                        <select name="food_type" onChange={handleChange} className="form-input glass-dropdown" value={formData.food_type}>
                                            <option value="veg">Vegetarian</option>
                                            <option value="mixed">Mixed Diet</option>
                                            <option value="non_veg">Non-Vegetarian</option>
                                        </select>
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label className="form-label">Waste (kg/day)</label>
                                        <input type="number" step="0.1" name="waste_kg" required onChange={handleChange} className="form-input glass-dropdown" />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-orange w-full" disabled={loading} style={{ marginTop: '0.5rem' }}>
                                    {loading ? 'Analyzing...' : 'Get Instant Insight'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>

            </div>
            
            {/* If there's a result, show the cool feature section below */}
            {result && (
                <div className="container" style={{ marginTop: '4rem', padding: 0 }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 600, maxWidth: '400px', lineHeight: 1.1 }}>Implement Green Lifestyle</h2>
                    <p style={{ maxWidth: '500px', marginBottom: '3rem' }}>Actionable steps directly generated from your results, empowering you to protect the planet.</p>
                    
                    <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {result.recommendations.map((rec, i) => (
                            <div key={i} className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                    {rec.icon}
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>{rec.impact} Impact</h3>
                                <p style={{ fontSize: '0.95rem' }}>{rec.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div style={{ height: '4rem' }}></div>
        </div>
        </>
    );
};

export default CalculationPage;
