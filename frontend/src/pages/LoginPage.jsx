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
        <div className="container fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" name="username" required onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" required onChange={handleChange} className="form-input" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4" style={{ width: '100%' }}>Login</button>
                    <p className="text-center mt-4" style={{ fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)' }}>Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
