import React, { useEffect, useState } from 'react';

const EnergyCore = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate a set of procedural particles with random trajectories
        const p = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            dx: `${Math.random() * 400 - 200}px`,
            dy: `${Math.random() * 400 - 200}px`,
            delay: `${Math.random() * 5}s`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        }));
        setParticles(p);
    }, []);

    return (
        <div className="procedural-hero-container">
            {/* The multi-layered blurring energy blob system */}
            <div className="energy-blob-wrapper">
                <div className="energy-blob blob-1"></div>
                <div className="energy-blob blob-2"></div>
                <div className="energy-blob blob-3"></div>
            </div>

            {/* The white-hot center core */}
            <div className="energy-core-glow"></div>

            {/* Floating particle system that connects the core to the page content */}
            <div className="particle-system">
                {particles.map(p => (
                    <div 
                        key={p.id} 
                        className="particle" 
                        style={{ 
                            '--dx': p.dx, 
                            '--dy': p.dy, 
                            left: '50%', 
                            top: '50%', 
                            animationDelay: p.delay 
                        }} 
                    />
                ))}
            </div>

            {/* Central Iconography with no sharp image edges */}
            <div style={{ zIndex: 10, fontSize: '5rem', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' }}>
                ☘️
            </div>
        </div>
    );
};

export default EnergyCore;
