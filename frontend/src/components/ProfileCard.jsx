import React from 'react';

const ProfileCard = ({ user }) => {
    if (!user) return null;
    
    // Auto-generate avatar initials
    const initials = user.username ? user.username.substring(0, 2).toUpperCase() : 'U';

    return (
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', height: '100%' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120px', background: 'linear-gradient(135deg, var(--accent-orange), #f43f5e)', opacity: 0.8 }}></div>
            
            <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', border: '5px solid var(--bg-card)', zIndex: 1, marginTop: '50px', boxShadow: '0 8px 16px rgba(0,0,0,0.5)', color: 'var(--text-primary)' }}>
                {initials}
            </div>
            
            <h2 style={{ marginTop: '1.5rem', marginBottom: '0.2rem', fontSize: '1.8rem' }}>{user.username}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem' }}>{user.email}</p>
            
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Department</span>
                    <span style={{ fontWeight: 500 }}>{user.department || 'General'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Role</span>
                    <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{user.role || 'Member'}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
