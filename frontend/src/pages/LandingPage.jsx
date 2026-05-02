import React from 'react';
import { Link } from 'react-router-dom';
import EnergyCore from '../components/EnergyCore';

const LandingPage = () => {
    return (
        <div style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}>
            <div className="landing-hero-bg"></div>
            
            <div className="container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
                
                {/* Header Branding */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
                    <div className="brand-showcase" style={{ textAlign: 'center', flexDirection: 'column' }}>
                        <img 
                            src="https://mit.asia/wp-content/themes/mit/images/logo.png" 
                            alt="MIT Logo" 
                            style={{ height: '60px', objectFit: 'contain', filter: 'drop-shadow(0px 0px 20px rgba(255,255,255,0.3))' }}
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Maharashtra_Institute_of_Technology_logo.png/640px-Maharashtra_Institute_of_Technology_logo.png'; 
                            }}
                        />
                        <div style={{ marginTop: '1rem' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', letterSpacing: '4px', textTransform: 'uppercase' }}>MIT</div>
                            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>Chhatrapati Sambhajinagar</div>
                        </div>
                    </div>
                </div>

                {/* Main Headline */}
                <h1 className="big-headline">
                    We Predict <span>Sustainability</span> Carbon Footprint
                </h1>

                {/* Central Hero Concept - Procedural Code-Driven Entity */}
                <EnergyCore />

                {/* Metadata Stages (The "Never Seen Before" layout from the video) */}
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                    <div className="stage-card fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h4 style={{ color: 'var(--accent-orange)', fontSize: '0.75rem', letterSpacing: '0.25em', marginBottom: '0.75rem' }}>Phase 01</h4>
                        <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>SOWING</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Aggregating campus-wide electricity and resource consumption data points.</p>
                    </div>
                    <div className="stage-card fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h4 style={{ color: 'var(--accent-orange)', fontSize: '0.75rem', letterSpacing: '0.25em', marginBottom: '0.75rem' }}>Phase 02</h4>
                        <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>SPROUT</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Processing raw data through our AI models to detect initial patterns.</p>
                    </div>
                    <div className="stage-card fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h4 style={{ color: 'var(--accent-orange)', fontSize: '0.75rem', letterSpacing: '0.25em', marginBottom: '0.75rem' }}>Phase 03</h4>
                        <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>GROW</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Training predictive algorithms to forecast environmental impact cycles.</p>
                    </div>
                    <div className="stage-card fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <h4 style={{ color: 'var(--accent-orange)', fontSize: '0.75rem', letterSpacing: '0.25em', marginBottom: '0.75rem' }}>Phase 04</h4>
                        <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.75rem' }}>BLOOM</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Delivering actionable green insights to the MIT academic community.</p>
                    </div>
                </div>

                {/* CTA Overlay */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem', gap: '2rem' }}>
                    <Link to="/calculate" className="btn btn-orange" style={{ padding: '1.2rem 4rem', fontSize: '1.1rem', borderRadius: '50px', boxShadow: '0 0 30px rgba(255, 122, 69, 0.3)' }}>
                        Launch Predictor
                    </Link>
                    <a href={import.meta.env.VITE_DJANGO_URL ? (import.meta.env.VITE_DJANGO_URL.endsWith('/api') || import.meta.env.VITE_DJANGO_URL.endsWith('/api/') ? import.meta.env.VITE_DJANGO_URL.replace(/\/api\/?$/, '/admin/') : import.meta.env.VITE_DJANGO_URL.replace(/\/+$/, '') + '/admin/') : 'http://localhost:8001/admin/'} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '1.2rem 4rem', fontSize: '1.1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                        Admin Portal
                    </a>
                </div>
                
            </div>
        </div>
    );
};

export default LandingPage;
