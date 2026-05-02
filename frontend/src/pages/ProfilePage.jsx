import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import ProfileCard from '../components/ProfileCard';
import PredictionList from '../components/PredictionList';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        api.get('/predictions/')
            .then(res => setHistory(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!user) return null;

    return (
        <div className="container fade-in" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 600, marginBottom: '2rem' }}>User Hub</h1>
            
            <div className="grid grid-cols-2 mt-8" style={{ gap: '1.5rem', alignItems: 'start' }}>
                <div style={{ height: '500px' }}>
                    <ProfileCard user={user} />
                </div>
                
                <div style={{ height: '500px' }}>
                    <PredictionList history={history} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
