import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
            navigate('/calculate');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', position: 'relative' }}>
            {/* Background Ambient Glow */}
            <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent-orange) 0%, transparent 60%)', filter: 'blur(80px)', opacity: '0.15', zIndex: -1 }}></div>
            
            <div className="card glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
                {/* Subtle top border highlight */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'linear-gradient(90deg, transparent, var(--accent-orange), transparent)' }}></div>
                
                <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Welcome Back</h2>
                <p className="text-center mb-8" style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Enter your credentials to access your dashboard</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-6">
                        <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Username</label>
                        <input type="text" name="username" required onChange={handleChange} className="form-input" style={{ padding: '1rem', fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,0.03)' }} />
                    </div>
                    <div className="form-group mb-8">
                        <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Password</label>
                        <input type="password" name="password" required onChange={handleChange} className="form-input" style={{ padding: '1rem', fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,0.03)' }} />
                    </div>
                    <button type="submit" className="btn btn-orange" style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.5px', boxShadow: '0 10px 20px rgba(255, 122, 69, 0.2)' }}>
                        Sign In
                    </button>
                    <p className="text-center mt-6" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--text-primary)', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '4px' }}>Create one here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
