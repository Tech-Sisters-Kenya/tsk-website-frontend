'use client';

import * as React from 'react';

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);
  const [availableHeight, setAvailableHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const updateDimensions = () => {
      const isMobileView = window.innerWidth < breakpoint;
      setIsMobile(isMobileView);

      // Calculate available height considering footer and other fixed elements
      const viewportHeight = window.innerHeight;
      const footer = document.querySelector('footer');
      const navbar = document.querySelector('nav');

      let occupiedHeight = 0;

      if (footer) {
        //getBoundingClientRect() returns the size of an element and its position relative to the viewport.
        const footerRect = footer.getBoundingClientRect();
        occupiedHeight += footerRect.height;
      }

      if (navbar) {
        const navbarRect = navbar.getBoundingClientRect();
        occupiedHeight += navbarRect.height;
      }

      // Add some padding for safety
      const safetyPadding = 20;
      setAvailableHeight(viewportHeight - occupiedHeight - safetyPadding);
    };

    //listen for the events
    mql.addEventListener('change', updateDimensions);
    updateDimensions();

    // Also listen for resize events to recalculate when footer/navbar dimensions change
    window.addEventListener('resize', updateDimensions);

    return () => {
      //remove listeners when component unmounts to prevent memory leaks
      mql.removeEventListener('change', updateDimensions);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [breakpoint]);

  return { isMobile: !!isMobile, availableHeight };
}
