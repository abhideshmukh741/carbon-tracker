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
        <div className="container fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-6">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" name="username" required onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" required onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Department</label>
                        <input type="text" name="department" required onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" required minLength="6" onChange={handleChange} className="form-input" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4" style={{ width: '100%' }}>Register</button>
                    <p className="text-center mt-4" style={{ fontSize: '0.9rem' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)' }}>Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
