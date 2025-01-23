'use client';

import React from 'react';
import Starfield from './Starfield'; // Import the Starfield component
import Body from './Body';
import D3BarChart from './D3BarChart';

const Page = () => {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Starfield Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <Starfield />
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
        <D3BarChart />
        <Body />
      </div>
    </div>
  );
};

export default Page;