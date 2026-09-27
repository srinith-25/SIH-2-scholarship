import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const MobileFrame = ({ children, isMobileView }) => {
  if (!isMobileView) {
    // Responsive Web Portal View
    return (
      <div className="container" style={{ padding: '24px 16px', minHeight: '85vh' }}>
        {children}
      </div>
    );
  }

  // Realistic Mobile Device Shell
  return (
    <div style={{ padding: '16px 8px', display: 'flex', justifyContent: 'center' }}>
      <div className="mobile-device-shell">
        {/* Device Screen */}
        <div className="mobile-device-screen">
          {/* Status Bar */}
          <div className="mobile-notch-bar">
            <span>02:48 PM</span>
            <div className="notch-pill" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Signal size={12} />
              <span style={{ fontSize: '10px' }}>5G</span>
              <BatteryMedium size={14} />
            </div>
          </div>

          {/* App Body */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            {children}
          </div>

          {/* Home indicator bar */}
          <div style={{ 
            height: '14px', 
            backgroundColor: '#ffffff', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 40
          }}>
            <div style={{ width: '120px', height: '4px', backgroundColor: '#94a3b8', borderRadius: '4px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
