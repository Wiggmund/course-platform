import React from 'react';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    rating?: {
      low: React.CSSProperties['color'];
      middle: React.CSSProperties['color'];
      high: React.CSSProperties['color'];
    };
  }


  interface BreakpointOverrides {
    ss: true;
  }
}