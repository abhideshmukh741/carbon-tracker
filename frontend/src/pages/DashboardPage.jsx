import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MetricCard from '../components/MetricCard';
import CarbonSuggestions from '../components/CarbonSuggestions';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get('dashboard/stats/')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!stats) return <div className="text-center mt-8 fade-in huge-title" style={{paddingTop: '160px'}}>Loading dashboard...</div>;

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: 'rgba(20,20,20,0.95)', border: '1px solid var(--glass-border)', padding: '15px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: 'var(--text-primary)' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color || entry.fill || COLORS[index%COLORS.length], margin: 0, fontWeight: 500 }}>
                            {entry.name || 'Value'}: {entry.value?.toFixed ? entry.value.toFixed(1) : entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="container fade-in" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 600, marginBottom: '2rem' }}>Analytics Dashboard</h1>
            
            {/* KPI Section */}
            <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                <MetricCard 
                    title="Total Predictions" 
                    value={stats.stats.total || 0} 
                    subtext="Logs recorded" 
                    icon="📊" 
                    color="#3b82f6" 
                />
                <MetricCard 
                    title="Average Footprint" 
                    value={`${(stats.stats.avg_co2 || 0).toFixed(1)}`}
                    subtext="kg CO₂ per entry" 
                    icon="🌍" 
                    color="#10b981" 
                />
                <MetricCard 
                    title="Max Footprint" 
                    value={`${(stats.stats.max_co2 || 0).toFixed(1)}`}
                    subtext="kg CO₂ single entry" 
                    icon="🔥" 
                    color="#ef4444" 
                />
            </div>

            {/* AI Suggestions if high */}
            <CarbonSuggestions avgCo2={stats.stats.avg_co2 || 0} campusAvg={stats.campus_avg} />
            
            <div className="grid grid-cols-2 mt-8" style={{ gap: '2rem' }}>
                <div className="card-dark" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Monthly Emission Trend</h2>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart data={stats.monthly}>
                                <defs>
                                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" tick={{fontSize: 12}} dy={10} axisLine={false} tickLine={false}/>
                                <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} dx={-10} axisLine={false} tickLine={false}/>
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="avg_co2" name="Avg CO₂" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorCo2)" dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#111214' }} activeDot={{ r: 6 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card-dark" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Source Breakdown</h2>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={stats.source_breakdown} dataKey="pct" nameKey="label" cx="50%" cy="50%" innerRadius={70} outerRadius={110} stroke="none" labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = outerRadius + 25;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    return (
                                        <text x={x} y={y} fill="var(--text-secondary)" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
                                            {`${value}%`}
                                        </text>
                                    );
                                }}>
                                    {stats.source_breakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
            <div className="card-dark mt-8" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex-col-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-secondary)' }}>Footprint Benchmark Comparison</h2>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '20px' }}>Your Avg vs Global/Campus</span>
                </div>
                <div style={{ height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={[
                            { name: 'Your Average', co2: stats.benchmark_bars.values[0] },
                            { name: 'National Avg', co2: stats.benchmark_bars.values[1] },
                            { name: 'Campus Avg', co2: stats.benchmark_bars.values[2] }
                        ]} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} dy={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} dx={-10} axisLine={false} tickLine={false} />
                            <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} content={<CustomTooltip />} />
                            <Bar dataKey="co2" name="Avg CO₂" radius={[6, 6, 0, 0]} maxBarSize={60}>
                                {
                                    [...Array(3)].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#f59e0b', '#10b981'][index]} />
                                    ))
                                }
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
