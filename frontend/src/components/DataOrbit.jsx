import React from 'react';

const DataOrbit = () => {
    return (
        <div className="data-orbit-container">
            {/* The pulsing cube-style core replacing the Earth icon */}
            <div className="orbit-core cube-core">
                <div className="cube-face cube-front"></div>
                <div className="cube-face cube-back"></div>
            </div>
            
            {/* Ring 1 - primary campus insights */}
            <div className="orbit-ring ring-1">
                <div className="orbit-node node-orange" style={{ top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <div className="orbit-popup popup-orange">⚡ Live Energy Feed</div>
                </div>
                <div className="orbit-node node-green" style={{ top: '45%', left: '100%', transform: 'translate(-50%, -50%)' }}>
                    <div className="orbit-popup popup-green">♻️ Campus Node Active</div>
                </div>
                <div className="orbit-node node-blue" style={{ top: '100%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <div className="orbit-popup popup-blue">💧 Water Tracking</div>
                </div>
            </div>
            
            {/* Ring 2 - supporting analytics */}
            <div className="orbit-ring ring-2">
                <div className="orbit-node node-secondary" style={{ top: '18%', left: '12%', transform: 'translate(-50%, -50%)' }}>
                    <div className="orbit-popup popup-green">🌿 Resource Optimizer</div>
                </div>
                <div className="orbit-node node-secondary" style={{ top: '25%', left: '85%', transform: 'translate(-50%, -50%)' }}>
                    <div className="orbit-popup popup-blue">📊 Predictive Insights</div>
                </div>
                <div className="orbit-node node-orange" style={{ top: '78%', left: '85%', transform: 'translate(-50%, -50%)' }}>
                    <div className="orbit-popup popup-orange">🛰️ Emissions Monitoring</div>
                </div>
            </div>
            
            {/* Ring 3 - future-facing actions */}
            <div className="orbit-ring ring-3">
                <div className="orbit-node node-green" style={{ top: '0%', left: '25%', transform: 'translate(-50%, -50%)' }}>
                    <div className="orbit-popup popup-green">🚴 Sustainable Commute</div>
                </div>
                <div className="orbit-node node-blue" style={{ top: '10%', left: '75%', transform: 'translate(-50%, -50%)' }}>
                    <div className="orbit-popup popup-blue">🥗 Food Footprint</div>
                </div>
            </div>
        </div>
    );
};

export default DataOrbit;
