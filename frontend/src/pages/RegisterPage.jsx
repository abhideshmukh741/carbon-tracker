import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
    const [data, setData] = useState({ username: '', email: '', password: '', department: 'General' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await register(data.username, data.email, data.password, data.department);
            navigate('/');
        } catch (error) {
            alert('Registration failed. Username or email might be taken.');
        }
    };

    return (
        <div className="container fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', position: 'relative', padding: '3rem 0' }}>
            {/* Background Ambient Glow */}
            <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, #3b82f6 0%, transparent 60%)', filter: 'blur(100px)', opacity: '0.15', zIndex: -1 }}></div>

            <div className="card glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
                {/* Subtle top border highlight */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }}></div>

                <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Create Account</h2>
                <p className="text-center mb-8" style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Join us to track and reduce your carbon footprint</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div className="form-group m-0">
                            <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Username</label>
                            <input type="text" name="username" required onChange={handleChange} className="form-input" style={{ padding: '0.9rem', fontSize: '1rem', backgroundColor: 'rgba(255,255,255,0.03)' }} />
                        </div>
                        <div className="form-group m-0">
                            <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Department</label>
                            <input type="text" name="department" required onChange={handleChange} className="form-input" style={{ padding: '0.9rem', fontSize: '1rem', backgroundColor: 'rgba(255,255,255,0.03)' }} />
                        </div>
                    </div>
                    
                    <div className="form-group mb-6">
                        <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Email Address</label>
                        <input type="email" name="email" required onChange={handleChange} className="form-input" style={{ padding: '1rem', fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,0.03)' }} />
                    </div>
                    
                    <div className="form-group mb-8">
                        <label className="form-label" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Password</label>
                        <input type="password" name="password" required minLength="6" onChange={handleChange} className="form-input" style={{ padding: '1rem', fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,0.03)' }} />
                    </div>
                    
                    <button type="submit" className="btn" style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.5px', backgroundColor: '#3b82f6', color: '#fff', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)' }}>
                        Create Account
                    </button>
                    
                    <p className="text-center mt-6" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '4px' }}>Sign in here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
