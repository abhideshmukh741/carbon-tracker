import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '1.5rem 0' }}>
            <div className="container flex justify-between items-center">
                
                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span style={{ fontSize: '1.25rem', fontWeight: '600', letterSpacing: '-0.02em' }}>EcoAnalytics</span>
                </div>

                {/* Centered Glass Nav Links */}
                <div className="glass-panel" style={{ borderRadius: '50px', padding: '0.6rem 2rem', display: 'flex', gap: '2rem' }}>
                    {!user ? (
                        <Link to="/" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8, fontWeight: 500 }}>Home</Link>
                    ) : (
                        <>
                            <Link to="/calculate" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8, fontWeight: 500 }}>Calculate</Link>
                            <Link to="/dashboard" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8, fontWeight: 500 }}>Dashboard</Link>
                            <Link to="/profile" style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8, fontWeight: 500 }}>Profile</Link>
                        </>
                    )}
                </div>

                {/* Right CTA */}
                <div>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Welcome, <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{user.username}</span>
                            </div>
                            <Link to="/calculate" className="btn btn-orange" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>New Calculation</Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Log out</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: '0.5rem 0', fontWeight: 500 }}>Log in</Link>
                            <Link to="/register" className="btn btn-orange" style={{ padding: '0.5rem 1.5rem' }}>Get Started</Link>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default NavBar;
