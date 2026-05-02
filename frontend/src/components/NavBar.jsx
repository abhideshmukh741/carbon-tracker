import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/login');
    };

    return (
        <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '1.5rem 0', background: isMobile ? 'rgba(17,18,20,0.95)' : 'transparent', borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div className="container flex justify-between items-center relative">
                
                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span style={{ fontSize: '1.25rem', fontWeight: '600', letterSpacing: '-0.02em' }}>EcoAnalytics</span>
                </div>

                {/* Hamburger Icon */}
                {isMobile && (
                    <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {menuOpen ? (
                                <path d="M18 6L6 18M6 6l12 12"/>
                            ) : (
                                <path d="M3 12h18M3 6h18M3 18h18"/>
                            )}
                        </svg>
                    </button>
                )}

                {/* Nav Links & CTA */}
                <div className={isMobile ? (menuOpen ? 'mobile-nav-visible' : 'mobile-nav-hidden') : 'flex items-center justify-between'} style={{ gap: '2rem', flex: isMobile ? 'none' : 1, marginLeft: isMobile ? 0 : '4rem' }}>
                    
                    {/* Links */}
                    <div className={isMobile ? "flex-col" : "glass-panel"} style={!isMobile ? { borderRadius: '50px', padding: '0.6rem 2rem', display: 'flex', gap: '2rem', margin: '0 auto' } : { display: 'flex', gap: '1.5rem', textAlign: 'center' }}>
                        {!user ? (
                            <Link to="/" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8, fontWeight: 500 }}>Home</Link>
                        ) : (
                            <>
                                <Link to="/calculate" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8, fontWeight: 500 }}>Calculate</Link>
                                <Link to="/dashboard" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8, fontWeight: 500 }}>Dashboard</Link>
                                <Link to="/profile" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', opacity: 0.8, fontWeight: 500 }}>Profile</Link>
                            </>
                        )}
                    </div>

                    {/* CTA */}
                    <div>
                        {user ? (
                            <div className={isMobile ? "flex-col" : "flex items-center"} style={{ gap: '1.5rem', alignItems: isMobile ? 'stretch' : 'center' }}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    Welcome, <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{user.username}</span>
                                </div>
                                <Link to="/calculate" onClick={() => setMenuOpen(false)} className="btn btn-orange" style={!isMobile ? { padding: '0.5rem 1.2rem', fontSize: '0.9rem' } : {}}>New Calculation</Link>
                                <button onClick={handleLogout} className="btn btn-outline" style={!isMobile ? { padding: '0.5rem 1.2rem', fontSize: '0.9rem' } : {}}>Log out</button>
                            </div>
                        ) : (
                            <div className={isMobile ? "flex-col" : "flex"} style={{ gap: '1rem' }}>
                                <Link to="/login" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', padding: isMobile ? '0.5rem' : '0.5rem 0', fontWeight: 500, textAlign: 'center' }}>Log in</Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn btn-orange" style={!isMobile ? { padding: '0.5rem 1.5rem' } : {}}>Get Started</Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavBar;
