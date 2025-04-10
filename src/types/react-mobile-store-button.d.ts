declare module 'react-mobile-store-button' {
  import React from 'react';

  interface MobileStoreButtonProps {
    store: 'ios' | 'android';
    url: string;
    linkProps?: Record<string, string | number | boolean>;
    linkStyles?: React.CSSProperties;
  }

  const MobileStoreButton: React.FC<MobileStoreButtonProps>;
  
  export default MobileStoreButton;
}
